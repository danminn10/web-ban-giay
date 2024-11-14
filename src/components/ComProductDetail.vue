<template>
  <div class="product-detail">
    <div class="stock-status" :class="{ 'out-of-stock': product.quantity === 0 }">
      {{ product.quantity > 0 ? 'Còn hàng' : 'Hết hàng' }}
    </div>
    <img :src="product.imageUrl" :alt="product.productName" class="product-image" />
    <h2>{{ product.productName }}</h2>
    <p>{{ product.description }}</p>
    <p>Price: {{ product.priceRange }} VND</p>
    <div class="size-selection">
      <label for="size">Chọn size:</label>
      <select v-model="selectedSize">
        <option v-for="size in product.availableSizes" :key="size" :value="size">{{ size }}</option>
      </select>
    </div>
    <button @click="addToCart" :disabled="product.quantity === 0">Thêm vào giỏ hàng</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ComProductDetail',
  data() {
    return {
      product: {},
      selectedSize: '',
      cart: JSON.parse(localStorage.getItem('cart')) || []
    };
  },
  created() {
    const productId = this.$route.params.id;
    this.fetchProductDetails(productId);
  },
  methods: {
  // Fetch product details using Axios
  async fetchProductDetails(productId) {
    try {
      const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
      this.product = response.data;
      if (this.product.availableSizes.length > 0) {
        this.selectedSize = this.product.availableSizes[0];
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      alert('Không thể tải thông tin sản phẩm.');
    }
  },

  // Add product to cart
  addToCart() {
    if (!this.selectedSize) {
      alert('Vui lòng chọn size');
      return;
    }

    const productInCart = this.cart.find(x => x.productId == this.product.id && x.size == this.selectedSize);
    
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      const newProduct = {
        ...this.product,
        size: this.selectedSize,
        quantity: 1
      };
      this.cart.push(newProduct);
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(this.cart));
    alert('Sản phẩm đã được thêm vào giỏ hàng');
    this.$router.push('/cart');
  }
}
};
</script>

<style scoped>
.product-detail {
  position: relative;
  max-width: 600px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 15px; /* Set font size */
  color: #333; /* Minimalist text color */
}

.stock-status {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: green;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.9em;
}

.stock-status.out-of-stock {
  background-color: red;
}

.product-image {
  width: 100%;
  height: 300px; /* Set a fixed height for the image */
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}

h2, p, .rating, .size-selection, button {
  text-decoration: none;
  color: #333; /* Minimalist text color */
}

.size-selection {
  margin: 20px 0;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
