<template>
  <div class="cart">
    <h2>Giỏ hàng của bạn</h2>
    <div v-if="cart.length === 0">
      <p>Giỏ hàng của bạn đang trống.</p>
      <router-link to="/" class="continue-shopping">Tiếp tục mua sắm</router-link>
    </div>
    <div v-else>
      <div class="cart-item" v-for="(item, index) in cart" :key="item.productId">
        <img :src="item.imageUrl" alt="Product Image" class="product-image" />
        <div class="product-details">
          <p>{{ item.productName }} - {{ item.size }}</p>
          <p>{{ item.priceRange.toLocaleString() }} ₫</p>
          <div class="quantity-controls">
            <button @click="decreaseQuantity(index)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(index)">+</button>
          </div>
        </div>
        <button @click="removeFromCart(index)" class="remove-button">Xóa</button>
      </div>
      <div class="cart-summary">
        <div class="summary-item">
          <span>Tạm tính:</span>
          <span>{{ subtotal.toLocaleString() }} ₫</span>
        </div>
        <button @click="proceedToCheckout" class="checkout-button">Tiến hành đặt hàng</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: JSON.parse(localStorage.getItem('cart')) || []
    };
  },
  computed: {
    subtotal() {
      return this.cart.reduce((acc, item) => acc + item.priceRange * item.quantity, 0);
    }
  },
  methods: {
    increaseQuantity(index) {
      this.cart[index].quantity++;
      this.updateCart();
    },
    decreaseQuantity(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
        this.updateCart();
      }
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);
      this.updateCart();
    },
    updateCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    proceedToCheckout() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser) {
        alert('Vui lòng đăng nhập để tiếp tục thanh toán.');
        this.$router.push('/login');
      } else {
        this.$router.push('/checkout');
      }
    }
  }
};
</script>

<style scoped>
.cart {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 20px;
}

.product-details {
  flex-grow: 1;
}

.quantity-controls {
  display: flex;
  align-items: center;
}

.quantity-controls button {
  width: 30px;
  height: 30px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.quantity-controls button:hover {
  background-color: #2980b9;
}

.quantity-controls span {
  margin: 0 10px;
}

.remove-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #c0392b;
}

.cart-summary {
  margin-top: 20px;
  border-top: 1px solid #ddd;
  padding-top: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.checkout-button {
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.checkout-button:hover {
  background-color: #2980b9;
}

.continue-shopping {
  display: inline-block;
  margin-top: 20px;
  color: #3498db;
  text-decoration: none;
}

.continue-shopping:hover {
  text-decoration: underline;
}
</style>