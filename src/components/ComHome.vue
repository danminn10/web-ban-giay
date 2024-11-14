<template>
  <div class="home">
    <h1>Welcome to Our Store</h1>
    <div class="product-list">
      <ComProduct />
    </div>
  </div>
</template>

<script>
import ComProduct from './ComProduct.vue';
import './css/ComHome.css';
export default {
  name: 'ComHome',
  components: {
    ComProduct,
  },
};

</script>