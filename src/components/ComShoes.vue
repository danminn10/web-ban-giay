<template>
  <div class="shoes-container">
    <!-- Phần bộ lọc và sắp xếp -->
    <div class="controls">
      <input v-model="searchQuery" placeholder="🔍 Tìm kiếm sản phẩm..." />
      <select v-model="sortOrder" @change="sortProducts">
        <option value="asc">⬆️ Giá: Thấp đến Cao</option>
        <option value="desc">⬇️ Giá: Cao đến Thấp</option>
      </select>
    </div>

    <!-- Danh sách sản phẩm -->
    <div class="product-list">
      <router-link
        v-for="product in paginatedProducts"
        :key="product.id"
        :to="{ name: 'ProductDetail', params: { id: product.id } }"
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
          <h2><i class="fas fa-box-open"></i> {{ product.productName }}</h2>

          <!-- Mô tả sản phẩm -->
          <p><i class="fas fa-info-circle"></i> {{ product.description }}</p>

          <!-- Giá sản phẩm -->
          <p class="price"><i class="fas fa-tag"></i> Giá: {{ product.priceRange.toLocaleString() }} VND</p>

          <!-- Đánh giá sản phẩm -->
          <span class="rating">
            <i class="fas fa-star"></i> {{ product.starRating }}
          </span>
        </div>
      </router-link>
    </div>

    <!-- Phân trang -->
    <div class="pagination">
      <button v-if="currentPage > 1" @click="prevPage">⬅️ Trước</button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button v-if="currentPage < totalPages" @click="nextPage">Tiếp ➡️</button>
    </div>
  </div>
</template>

  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ComShoes',
    data() {
      return {
        products: [],
        searchQuery: '',
        sortOrder: 'asc',
        currentPage: 1,
        itemsPerPage: 4,
      };
    },
    computed: {
      filteredProducts() {
        let filtered = this.products.filter(product =>
          product.productName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        if (this.sortOrder === 'asc') {
          filtered.sort((a, b) => a.priceRange - b.priceRange);
        } else {
          filtered.sort((a, b) => b.priceRange - a.priceRange);
        }
        return filtered;
      },
      paginatedProducts() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredProducts.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
      },
    },
    methods: {
      async fetchProducts() {
        try {
          const response = await axios.get('http://localhost:3000/api/products');
          this.products = response.data;
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      },
      sortProducts() {
        this.filteredProducts;
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
    },
    created() {
      this.fetchProducts();
    },
  };
  </script>
  
  <style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

.shoes-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f6f9;
  font-family: 'Roboto', Arial, sans-serif;
}

.controls {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  justify-content: center;
}

.controls input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 300px;
  font-size: 14px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.controls select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
  width: 100%;
  grid-auto-rows: 1fr;
}

.no-underline {
  text-decoration: none;
}

.product-card {
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-height: 400px;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.stock-status {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #27ae60;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
}

.stock-status.out-of-stock {
  background-color: #e74c3c;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
}

h2 {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

p {
  font-size: 0.95rem;
  color: #7f8c8d;
  margin-bottom: 10px;
}

p.price {
  font-size: 1rem;
  font-weight: bold;
  color: #34495e;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.rating {
  font-size: 1rem;
  color: #f39c12;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.rating i {
  margin-right: 4px;
}

.pagination {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  align-items: center;
}

.pagination button {
  padding: 10px 20px;
  font-size: 14px;
  color: white;
  background-color: #3498db;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.pagination button:hover {
  background-color: #2980b9;
}

.pagination span {
  font-size: 14px;
  font-weight: bold;
  color: #34495e;
}
</style>
