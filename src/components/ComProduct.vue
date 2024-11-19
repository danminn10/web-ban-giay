<template>
  <div class="product-list">
    <router-link
      :to="{ name: 'ProductDetail', params: { id } }"
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

export default {
  name: 'ComProduct',
  props:['product'],
    data(){
        return{
            id: this.product.id
        }
    }
};
</script>

<style scoped>

.no-underline {
  text-decoration: none;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Bố cục dạng lưới tự động */
  gap: 10px;
  padding: 10px;
  background-color: #f4f6f9;
}

.product-card {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 8px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  /* Đảm bảo chiều cao đồng nhất */
  min-height: 450px; /* Đặt chiều cao tối thiểu để khắc phục */
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}


.stock-status {
  position: absolute;
  top: 10px;
  background-color: #27ae60; /* Xanh lá đậm hơn */
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85em;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
}

.stock-status.out-of-stock {
  background-color: #e74c3c; /* Đỏ đậm hơn */
}

.product-image {
  width: 100%;
  height: 180px; /* Tăng chiều cao để hình ảnh nổi bật hơn */
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 12px;
}

h2 {
  font-size: 1.1rem; /* Kích thước tiêu đề hợp lý */
  font-weight: bold;
  color: #2c3e50; /* Màu xanh đậm */
  margin-bottom: 8px;
}

p {
  font-size: 0.9rem; /* Kích thước chữ nhỏ gọn */
  color: #7f8c8d; /* Màu xám nhạt */
}

.rating {
  font-size: 1rem;
  font-weight: bold;
  color: #f39c12; /* Vàng đậm */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.price {
  font-size: 1.1rem;
  font-weight: bold;
  color: #34495e; /* Xanh đậm */
  margin: 10px 0;
}
</style>