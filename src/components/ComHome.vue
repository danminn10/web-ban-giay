<template>
  <div class="home">
    <h1>Welcome to Our Store</h1>
    <div class="product-list">
      <ComProduct v-for="item in products" :key="item.id" :product="item"/>
    </div>
  </div>
</template>

<script>
import ComProduct from './ComProduct.vue';
import '@/components/css/ComHome.css';
import axios from 'axios';

export default {
  name: 'ComHome',
  components: {
    ComProduct
  },
  data(){
    return{
      products: []
    }
  },
  created(){
    this.fetchProducts();
  },
  methods: {
    async fetchProducts(){
      try{
        const response = await axios.get('http://localhost:3000/api/products');
        this.products = response.data;
      } catch(error){
        console.error('Error fetching products:', error);
      }
    }
  }
};
</script>