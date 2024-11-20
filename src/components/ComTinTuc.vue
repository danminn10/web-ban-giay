<template>
  <div class="news-container">
    <h1>Tin Tức Mới Nhất Về Giày Sneaker</h1>
    <div class="news-grid">
      <div
        class="news-article"
        v-for="article in paginatedArticles"
        :key="article.id"
        data-aos="fade-up"
      >
        <img :src="article.image" alt="Article Image" class="article-image" />
        <div class="article-content">
          <h2>{{ article.title }}</h2>
          <p>{{ article.summary }}</p>
          <a :href="article.link" target="_blank" class="read-more">
            Đọc thêm <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- Nút phân trang -->
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="prevPage">previous</button>
      <span>Trang {{ currentPage }} of {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="nextPage">next</button>
    </div>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: 'ComTinTuc',
  data() {
    return {
      articles: [
        { id: 1, title: 'Top Sneaker Hot Nhất Instagram 2024', summary: 'Cùng điểm qua những đôi sneaker làm mưa làm gió trên Instagram.', image: 'https://shopgiayreplica.com/wp-content/uploads/2023/11/giay-nike-air-jordan-1-low-year-dragon-2024-womens-like-auth-2-800x650.jpg', link: 'https://www.instagram.com/23.trk_sneaker.authentic/p/C_-j7Uszezg/?img_index=1' },
        { id: 2, title: 'Giày Sneaker Đáng Mua Trên TikTok', summary: 'Những đôi giày sneaker phổ biến được yêu thích trên TikTok.', image: 'https://drake.vn/image/catalog/H%C3%ACnh%20content/hinh-anh-giay-vans/hinh-anh-giay-vans-17.jpg', link: 'https://www.tiktok.com/@bo2hand/video/7222976030380723483' },
        { id: 3, title: 'Top 5 Sneaker Được Like Nhiều Nhất Trên Facebook', summary: 'Các mẫu giày sneaker đẹp được yêu thích trên Facebook.', image: 'https://ngockhanhstore.vn/wp-content/uploads/2024/01/giay-the-thao-lv-nam-chinh-hang-2.jpg', link: 'https://www.facebook.com/watch/?v=508891622133461' },
        { id: 4, title: 'Bộ Sưu Tập Sneaker Trên Pinterest', summary: 'Khám phá những đôi sneaker được ghim nhiều nhất trên Pinterest.', image: 'https://i.pinimg.com/236x/d8/73/ce/d873ce445020177bbad6285ef9f4c435.jpg', link: 'https://www.pinterest.com/pegiayvn/những-bộ-sưu-tập-sneaker-nhìn-là-mê/' },
        { id: 5, title: 'Sneaker Tốt Nhất Theo Đánh Giá Reddit', summary: 'Cộng đồng Reddit đánh giá cao các mẫu giày nào?', image: 'https://kenh14cdn.com/2018/1/25/gi4-15168763848402122546780.jpg', link: 'https://www.reddit.com/r/vozforums/comments/10be6z1/tài_chính_700800k_nên_mua_giày_gì/?rdt=40960' },
        { id: 6, title: 'Sneaker Trending 2024', summary: 'Những mẫu giày sneaker đang trending 2024.', image: 'https://cdn.shopify.com/s/files/1/0456/5070/6581/files/top-23-mau-giay-sneaker-dang-duoc-san-lung-nhat-nam-2022_600x600.jpg?v=1666940188', link: 'https://supersports.com.vn/blogs/news/nhung-doi-giay-sneaker?srsltid=AfmBOoq5d72YscO1xqnUmBJ62NOiCGZiuSHcNc5daEBh6ZZ0CCnQ6CH_' },
        { id: 7, title: 'Săn Sale Sneaker Trên Shopee', summary: 'Các đôi sneaker giá tốt trên Shopee được săn lùng nhiều nhất.', image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lw47usttkzq173', link: 'Săn Sale Sneaker Trên Shopee' },
        { id: 8, title: 'Sneaker Đỉnh Nhất Trên YouTube', summary: 'Cùng xem các Youtuber review về giày sneaker.', image: 'https://shopgiayreplica.com/wp-content/uploads/2024/02/giay-nike-air-jordan-1-low-year-of-the-dragon-2024-mens-like-auth-2.jpg', link: 'https://www.youtube.com/watch?v=as7otmqbAMQ' },
      ],
      currentPage: 1,
      itemsPerPage: 4,
    };
  },
  computed: {
    // Tính toán tổng số trang
    totalPages() {
      return Math.ceil(this.articles.length / this.itemsPerPage);
    },
    // Lấy danh sách bài viết của trang hiện tại
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.articles.slice(start, end);
    },
  },
  methods: {
    // Chuyển đến trang trước
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    // Chuyển đến trang kế tiếp
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
  created() {
    AOS.init({
      duration: 1200,
    });
  },
};
</script>

<style scoped>
/* Tổng thể container */
.news-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Hiển thị chính xác 4 cột */
  gap: 20px; /* Khoảng cách giữa các bài viết */
}

.news-article {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  background: linear-gradient(145deg, #ffffff, #f2f2f2);
  box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.news-container {
  max-width: 1300px; /* Đảm bảo chiều rộng container đủ lớn */
  margin: auto;
  padding: 20px;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #2c3e50;
}

.news-article:hover {
  transform: translateY(-10px) scale(1.03);
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
}

/* Hình ảnh */
.article-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

/* Nội dung bài viết */
.article-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.article-content h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #2c3e50;
}

.article-content p {
  font-size: 1rem;
  margin-bottom: 20px;
  color: #7f8c8d;
}

.article-content .read-more {
  color: #3498db;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s ease;
}

.article-content .read-more:hover {
  color: #1abc9c;
  text-decoration: underline;
}

/* Phân trang */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  background-color: #3498db;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button:hover {
  background-color: #2980b9;
}

.pagination button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.pagination span {
  font-size: 1rem;
  font-weight: bold;
  color: #2c3e50;
}
</style>
