<template>
  <div class="shoes">
    <h1>Giày Sneaker</h1>
    <div class="controls">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" v-model="searchQuery" placeholder="Tìm kiếm sản phẩm..." />   
      </div>
      <select v-model="sortOption">
        <option value="asc">Giá tăng dần</option>
        <option value="desc">Giá giảm dần</option>
        <option value="alpha">Tên (A-Z)</option>
      </select>
    </div>
    
    <div class="shoe-list">
      <!-- Pagination Controls with Current Page Indicator and Clickable Page Numbers -->
      <button @click="prevPage" :disabled="currentPage === 1">‹</button>

      <!-- Render page numbers dynamically -->
      <span
        v-for="page in pageNumbers"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="goToPage(page)"
        class="page-number"
      >
        {{ page }}
      </span>

      <button @click="nextPage" :disabled="currentPage === totalPages">›</button>

      <div class="shoe-slide">
        <!-- Display paginated shoes -->
        <ComProduct v-for="item in paginatedShoes" :key="item.id" :product="item" />
      </div>
    </div>
  </div>
</template>

<script>
import ComProduct from './ComProduct.vue';
import axios from 'axios';

export default {
  name: 'ComShoes',
  components: {
    ComProduct,
  },
  data() {
    return {
      shoes: [], // Array to store shoe data fetched from API
      searchQuery: '', // Search query for filtering products
      sortOption: 'asc', // Sorting option for product list
      currentPage: 1, // Current page in pagination
      pageSize: 4, // Number of items per page
    };
  },
  computed: {
    // Filter and sort shoes based on search query and selected sort option
    filteredShoes() {
      let filtered = this.shoes.filter(shoe =>
        shoe.productName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      if (this.sortOption === 'asc') {
        filtered.sort((a, b) => a.priceRange - b.priceRange);
      } else if (this.sortOption === 'desc') {
        filtered.sort((a, b) => b.priceRange - a.priceRange);
      } else if (this.sortOption === 'alpha') {
        filtered.sort((a, b) => a.productName.localeCompare(b.productName));
      }
      return filtered;
    },
    // Paginate filtered shoes based on current page and page size
    paginatedShoes() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredShoes.slice(start, end);
    },
    // Calculate the total number of pages based on filtered shoe length and page size
    totalPages() {
      return Math.ceil(this.filteredShoes.length / this.pageSize);
    },
    // Generate an array of page numbers for pagination
    pageNumbers() {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    },
  },
  created() {
    // Fetch shoes from API when component is created
    this.fetchShoes();
  },
  methods: {
    // Fetches shoe data from API
    async fetchShoes() {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        this.shoes = response.data;
      } catch (error) {
        console.error('There was an error fetching shoes:', error);
      }
    },
    // Moves to the previous page
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    // Moves to the next page
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
      }
    },
    // Jumps to the selected page
    goToPage(page) {
      this.currentPage = page;
    },
  },
}
</script>

<style scoped>
.shoes {
  padding: 20px;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box input {
  padding: 8px 32px 8px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
}

.search-box i {
  position: absolute;
  right: 8px;
  color: #aaa;
}

.controls select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.shoe-list {
  display: flex;
  align-items: center;
}

.shoe-slide {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  flex: 1;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Styling for pagination numbers */
.page-number {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  background-color: #eee;
}

.page-number.active {
  background-color: #3498db;
  color: white;
  font-weight: bold;
}
</style>
