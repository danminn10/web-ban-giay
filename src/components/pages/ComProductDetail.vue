<template>
  <div class="product-detail">
    <!-- Kiểm tra trạng thái tải -->
    <div v-if="isLoading" class="loading">Đang tải dữ liệu...</div>
    <div v-else-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-else>
      <!-- Phần trên với hình ảnh và thông tin cơ bản -->
      <div class="top-section">
        <div class="left-column">
          <div class="image-container">
            <img :src="product.imageUrl" :alt="product.productName" class="product-image" />
            <div class="stock-status" :class="{ 'out-of-stock': product.quantity === 0 }">
              <i class="fas" :class="product.quantity > 0 ? 'fa-check-circle' : 'fa-times-circle'"></i>
              {{ stockStatus }}
            </div>
          </div>
        </div>
        <div class="right-column">
          <h2>
            <i class="fas fa-box"></i> {{ product.productName }}
          </h2>
          <p class="price">
            <i class="fas fa-tag"></i> Giá: {{ product.priceRange.toLocaleString() }} VND
          </p>
          <div class="size-selection">
            <label><i class="fas fa-shoe-prints"></i> Chọn size:</label>
            <div class="size-buttons">
              <button
                v-for="size in product.availableSizes"
                :key="size"
                :class="{ 'selected': selectedSize === size }"
                @click="selectSize(size)"
              >
                {{ size }}
              </button>
            </div>
          </div>
          <button class="add-to-cart" @click="addToCart" :disabled="product.quantity === 0">
            <i class="fas fa-cart-plus"></i> Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      <!-- Đường line phân cách -->
      <hr class="divider" />

      <!-- Phần dưới với chi tiết mô tả sản phẩm -->
      <div class="details-section">
        <h3 @click="toggleDetails" class="details-header">
          <i class="fas fa-info-circle"></i> Chi tiết sản phẩm 
          <i :class="detailsOpen ? 'fas fa-minus' : 'fas fa-plus'"></i>
        </h3>
        <transition name="fade">
          <div v-if="detailsOpen" class="details-content">
            <p>{{ product.description }}</p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>




<script>
import axios from 'axios';

export default {
  name: 'ComProductDetail',
  data() {
    return {
      product: null, // Thông tin sản phẩm từ API
      selectedSize: '', // Kích thước được chọn
      isLoading: true, // Trạng thái tải dữ liệu
      errorMessage: '', // Thông báo lỗi
      cart: [], // Dữ liệu giỏ hàng
      detailsOpen: false // Trạng thái mở/đóng chi tiết mô tả
    };
  },
  methods: {
    // Lấy thông tin chi tiết sản phẩm
    async fetchProduct() {
        try {
          const response = await axios.get(`http://localhost:3000/api/products/${this.$route.params.id}`);
          this.product = response.data;
          this.isLoading = false; // Tắt trạng thái tải sau khi lấy xong dữ liệu
        } catch (error) {
          console.error('Error fetching product:', error);
          this.errorMessage = 'Không tìm thấy sản phẩm!';
          this.isLoading = false;
        }
      },
      // Chọn kích thước
      selectSize(size) {
        this.selectedSize = size;
      },
      // Thêm sản phẩm vào giỏ hàng
      async addToCart() {
      if (!this.selectedSize) {
          alert('Vui lòng chọn size trước khi thêm vào giỏ hàng!');
          return;
      }

      const cartItem = {
          productId: this.product.id,
          quantity: 1, // Số lượng mặc định là 1
          selectedSize: this.selectedSize, // Size đã chọn
      };

      const currentUser = localStorage.getItem('currentUser') 
        ? JSON.parse(localStorage.getItem('currentUser')) 
        : null; // Kiểm tra xem người dùng đã đăng nhập hay chưa

      try {
          if (currentUser) {
              // Nếu người dùng đã đăng nhập, lưu vào cơ sở dữ liệu
              const response = await axios.post('http://localhost:3000/api/cart', {
                  userId: currentUser.id,
                  ...cartItem,
              });
              alert(response.data||'Sản phẩm đã được thêm vào giỏ hàng (cơ sở dữ liệu)!');
              this.$router.push('/cart'); // Chuyển hướng đến trang giỏ hàng
          } else {
            const cart = localStorage.getItem('cart') 
                ? JSON.parse(localStorage.getItem('cart')) 
                : [];
            const existingItem = cart.find(
                (item) =>
                    item.productId === cartItem.productId &&
                    item.selectedSize === cartItem.selectedSize
            );

            if (existingItem) {
              existingItem.quantity += cartItem.quantity; // Nếu đã tồn tại, tăng số lượng
            } else {
              const newProduct = { ...this.product, size: this.selectedSize, quantity: 1 };
              cart.push(newProduct); // Nếu chưa tồn tại, thêm mới
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Sản phẩm đã được thêm vào giỏ hàng (local storage)!');
            this.$router.push('/cart'); // Chuyển hướng đến trang giỏ hàng
          }
      } catch (error) {
          console.error('Lỗi khi thêm vào giỏ hàng:', error);
          alert('Không thể thêm vào giỏ hàng. Vui lòng thử lại!');
      }
  },

    // Đóng/mở chi tiết mô tả
    toggleDetails() {
      this.detailsOpen = !this.detailsOpen;
    }
  },
  computed: {
    // Kiểm tra trạng thái tồn kho
    stockStatus() {
      return this.product && this.product.quantity > 0 ? 'Còn hàng' : 'Hết hàng';
    }
  },
  created() {
    this.fetchProduct(); // Lấy dữ liệu khi component được tạo
  }
};
</script>


<style scoped>
.product-detail {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', Arial, sans-serif; /* Font hiện đại */
  max-width: 1200px;
  margin: auto;
}

.top-section {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: flex-start;
}

.left-column {
  flex: 1; /* Đảm bảo hình ảnh không chiếm toàn bộ không gian */
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-column {
  flex: 1.2; /* Thông tin bên phải chiếm nhiều không gian hơn */
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.image-container {
  position: relative;
  width: 100%; /* Hình ảnh chiếm toàn bộ chiều rộng container */
  max-width: 400px; /* Giới hạn chiều rộng tối đa */
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%; /* Đảm bảo hình ảnh tự co dãn theo container */
  height: auto;
}

.stock-status {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #28a745;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  gap: 5px;
}

.stock-status.out-of-stock {
  background-color: #dc3545;
}

h2 {
  font-size: 1.8rem;
  color: #333;
}

.price {
  font-size: 1.5rem;
  color: #e67e22;
  font-weight: bold;
}

.size-selection {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.size-selection label {
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #34495e;
}

.size-buttons {
  display: flex;
  gap: 10px;
}

.size-buttons button {
  padding: 10px 15px;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.size-buttons button.selected {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}

.add-to-cart {
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; /* Khoảng cách giữa icon và chữ */
  transition: background-color 0.3s;
}

.add-to-cart:hover {
  background-color: #0056b3;
}

.add-to-cart:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.divider {
  border: none;
  height: 1px;
  background: #ddd;
  margin: 20px 0;
}

.details-section {
  display: flex;
  flex-direction: column;
}

.details-header {
  font-size: 1.2rem;
  font-weight: bold;
  color: #34495e;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.details-content {
  margin-top: 10px;
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
