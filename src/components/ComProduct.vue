<template>
  <div class="product-list">
    <router-link
      :to="{ name: 'ProductDetail', params: { id } }"
      class="no-underline"
    >
      <div class="product-card">
        <!-- Trạng thái tồn kho -->
        <div class="stock-status" :class="{ 'out-of-stock': product.quantity === 0 }">
          <i class="fas" :class="product.quantity > 0 ? 'fa-check-circle' : 'fa-times-circle'"></i>
          {{ product.quantity > 0 ? 'Còn hàng' : 'Hết hàng' }}
        </div>

        <!-- Hình ảnh sản phẩm -->
        <img :src="product.imageUrl" :alt="product.productName" class="product-image" />

        <!-- Tên sản phẩm -->
        <h2><i class="fas fa-box"></i> {{ product.productName }}</h2>

        <!-- Mô tả sản phẩm -->
        <p><i class="fas fa-info-circle"></i> {{ product.description }}</p>

        <!-- Giá sản phẩm -->
        <p class="price">
          <i class="fas fa-tag"></i> Giá: {{ product.priceRange.toLocaleString() }} VND
        </p>
        <!-- Đánh giá sản phẩm -->
        <span class="rating">
          <i class="fas fa-star"></i> {{ product.starRating }}
        </span>
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Giao diện dạng lưới tự động */
  gap: 15px;
  padding: 15px;
  background-color: #f4f6f9; /* Màu nền sáng nhẹ */
}

.product-card {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  /* Đảm bảo chiều cao đồng nhất */
  min-height: 450px;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.stock-status {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #27ae60; /* Màu xanh lá đậm */
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85em;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px; /* Khoảng cách giữa icon và chữ */
}

.stock-status.out-of-stock {
  background-color: #e74c3c; /* Màu đỏ */
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 12px;
}

h2 {
  font-size: 1.1rem;
  font-weight: bold;
  color: #2c3e50; /* Màu xanh đậm */
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px; /* Khoảng cách giữa icon và chữ */
}

p {
  font-size: 0.9rem;
  color: #7f8c8d; /* Màu xám nhạt */
}

p.price {
  font-size: 1rem;
  font-weight: bold;
  color: #34495e; /* Xanh đậm */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px; /* Khoảng cách giữa icon và chữ */
}

.rating {
  font-size: 1rem;
  font-weight: bold;
  color: #f39c12; /* Màu vàng đậm */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px; /* Khoảng cách giữa icon và chữ */
}
</style>
