<template>
  <div class="cart-container">
    <h2>Giỏ hàng của bạn</h2>

    <!-- Hiển thị khi giỏ hàng trống -->
    <div v-if="cart.length === 0" class="empty-cart">
      <i class="fas fa-shopping-cart empty-icon"></i>
      <p>Giỏ hàng của bạn đang trống.</p>
      <router-link to="/" class="continue-shopping">
        <i class="fas fa-arrow-left"></i> Tiếp tục mua sắm
      </router-link>
    </div>

    <!-- Hiển thị danh sách sản phẩm trong giỏ hàng -->
    <div v-else>
      <div class="cart-items">
        <div
          class="cart-item"
          v-for="(item, index) in cart"
          :key="item.id || index"
        >
          <img
            :src="item.imageUrl || 'placeholder.png'"
            alt="Product Image"
            class="product-image"
          />
          <div class="product-details">
            <p class="product-name">{{ item.productName || 'Sản phẩm không xác định' }}</p>
            <p class="product-size">Size: {{ item.size || 'N/A' }}</p>
            <p class="product-price">{{ item.priceRange ? item.priceRange.toLocaleString() : '0' }} ₫</p>
            <div class="quantity-controls">
              <button @click="decreaseQuantity(index)">
                <i class="fas fa-minus"></i>
              </button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(index)">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <button @click="removeFromCart(index)" class="remove-button">
            <i class="fas fa-trash"></i> Xóa
          </button>
        </div>
      </div>

      <!-- Tổng giá trị và nút thanh toán -->
      <div class="cart-summary">
        <div class="summary-item">
          <span>Tổng cộng: </span>
          <span class="total-amount">{{ subtotal.toLocaleString() }} ₫</span>
        </div>
        <button @click="proceedToCheckout" class="checkout-button">
          <i class="fas fa-credit-card"></i> Thanh toán
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ComCart',
  data() {
    return {
      cart: [], // Dữ liệu giỏ hàng
      currentUser: JSON.parse(localStorage.getItem('currentUser')) || null, // Kiểm tra người dùng đăng nhập
    };
  },
  computed: {
    // Tính tổng giá trị giỏ hàng
    subtotal() {
      return this.cart.reduce((acc, item) => acc + (item.priceRange || 0) * item.quantity, 0);
    },
  },
  methods: {
    // Lấy giỏ hàng từ backend hoặc localStorage
    async fetchCart() {
      if (this.currentUser) {
          try {
              const response = await axios.get(`http://localhost:3000/api/cart?userId=${this.currentUser.id}`);
              if (!Array.isArray(response.data)) {
                  console.error('Dữ liệu trả về không phải là mảng:', response.data);
                  alert('Không thể tải giỏ hàng. Vui lòng thử lại sau!');
                  return;
              }

              // Map dữ liệu nhận được
              this.cart = response.data.map(item => {
                  return {
                      id: item.id,
                      productName: item.product?.productName || 'Sản phẩm không xác định',
                      imageUrl: item.product?.imageUrl || 'placeholder.png',
                      priceRange: item.product?.priceRange || 0,
                      quantity: item.quantity || 1,
                      size: item.size || 'N/A',
                  };
              });
          } catch (error) {
              console.error('Lỗi khi lấy giỏ hàng từ server:', error);
              alert('Không thể tải giỏ hàng. Vui lòng thử lại sau!');
          }
      } else {
          const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
          this.cart = storedCart;
      }
  },
    // Tăng số lượng sản phẩm
    async increaseQuantity(index) {
      const item = this.cart[index];
      if (this.currentUser) {
        // Cập nhật giỏ hàng trên server
        try {
          await axios.put(`http://localhost:3000/api/cart/${item.id}`, { quantity: item.quantity + 1 });
          item.quantity++;
        } catch (error) {
          console.error('Lỗi khi tăng số lượng:', error);
          alert('Không thể cập nhật giỏ hàng.');
        }
      } else {
        // Cập nhật giỏ hàng trong localStorage
        item.quantity++;
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    },
    // Giảm số lượng sản phẩm
    async decreaseQuantity(index) {
      const item = this.cart[index];
      if (item.quantity > 1) {
        if (this.currentUser) {
          // Cập nhật giỏ hàng trên server
          try {
            await axios.put(`http://localhost:3000/api/cart/${item.id}`, { quantity: item.quantity - 1 });
            item.quantity--;
          } catch (error) {
            console.error('Lỗi khi giảm số lượng:', error);
            alert('Không thể cập nhật giỏ hàng.');
          }
        } else {
          // Cập nhật giỏ hàng trong localStorage
          item.quantity--;
          localStorage.setItem('cart', JSON.stringify(this.cart));
        }
      }
    },
    // Xóa sản phẩm khỏi giỏ hàng
    async removeFromCart(index) {
      const item = this.cart[index];
      if (this.currentUser) {
        // Xóa sản phẩm trên server
        try {
          await axios.delete(`http://localhost:3000/api/cart/${item.id}`);
          this.cart.splice(index, 1);
        } catch (error) {
          console.error('Lỗi khi xóa sản phẩm:', error);
          alert('Không thể xóa sản phẩm khỏi giỏ hàng.');
        }
      } else {
        // Xóa sản phẩm trong localStorage
        this.cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    },
    // Chuyển đến trang thanh toán
    proceedToCheckout() {
      if (!this.currentUser) {
        alert('Vui lòng đăng nhập để tiếp tục thanh toán.');
        this.$router.push('/login');
      } else {
        this.$router.push('/checkout');
      }
    },
  },
  mounted() {
    this.fetchCart(); // Lấy dữ liệu giỏ hàng khi component được mount
    console.log('currentUser:', this.currentUser); // Log currentUser
  },
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

/* Container tổng thể */
.cart-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
}

/* Tiêu đề */
h2 {
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

/* Giỏ hàng trống */
.empty-cart {
  text-align: center;
  color: #888;
}
.empty-cart .empty-icon {
  font-size: 4rem;
  margin-bottom: 10px;
}
.continue-shopping {
  display: inline-block;
  margin-top: 20px;
  color: #3498db;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
}
.continue-shopping:hover {
  text-decoration: underline;
}

/* Danh sách sản phẩm */
.cart-items {
  margin-bottom: 30px;
}
.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}
.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
}
.product-details {
  flex: 1;
  margin-right: 20px;
}
.product-details p {
  margin: 5px 0;
}
.product-name {
  font-weight: 500;
  color: #333;
}
.quantity-controls button {
  width: 30px;
  height: 30px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  margin: 0 5px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.quantity-controls button:hover {
  background-color: #2980b9;
}
.remove-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
}
.remove-button:hover {
  background-color: #c0392b;
}

/* Tổng cộng và thanh toán */
.cart-summary {
  text-align: right;
}
.summary-item {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 15px;
}
.total-amount {
  font-weight: bold;
  color: #329bbd;
}
.checkout-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  background-color: #329bbd;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
}
.checkout-button:hover {
  background-color: #2b4c59;
}
</style>