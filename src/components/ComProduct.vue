<template>
  <div class="product-list">
    <router-link
      v-for="product in products"
      :key="product.id"
      :to="{ name: 'ProductDetail', params: { id: product.id } }"
      class="no-underline"
    >
      <div class="product-card">
        <div class="stock-status" :class="{ 'out-of-stock': product.quantity === 0 }">
          {{ product.quantity > 0 ? 'Còn hàng' : 'Hết hàng' }}
        </div>
        <img :src="product.imageUrl" :alt="product.productName" class="product-image" />
        <h2>{{ product.productName }}</h2>
        <p>{{ product.description }}</p>
        <p>Price: {{ product.priceRange }} VND</p>
        <span class="rating">⭐ {{ product.starRating }}</span>
      </div>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        this.products = response.data.filter((product, index, self) => index === self.findIndex(p => p.id === product.id));
      } catch (error) {
        console.error('There was an error!', error);
      }
    }
  }
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.no-underline {
  text-decoration: none;
}

.product-card {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  width: 250px;
  height: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 15px;
  color: #333;
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
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}

h2,
p,
.rating {
  text-decoration: none;
  color: #333;
}

.rating {
  color: #f39c12;
}
</style>