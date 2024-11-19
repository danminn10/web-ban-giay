<template>
  <div class="news-container">
    <h1>Tin Tức Mới Nhất Về Giày Sneaker 2024</h1>
    <div class="news-grid">
      <div class="news-article" v-for="article in articles" :key="article.id">
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
  </div>
</template>

<script>
export default {
  name: 'ComTinTuc',
  data() {
    return {
      articles: [
        {
          id: 1,
          title: 'Những đôi giày sneaker phổ biến nhất năm 2024',
          summary:
            'Cùng điểm qua những đôi giày sneaker đang làm mưa làm gió trên thị trường năm nay.',
          image:
            'https://www.elleman.vn/app/uploads/2024/07/10/235560/cover10724-sneakers-elleman-1.png',
          link: 'https://www.elleman.vn/phong-cach/thoi-trang/10-doi-sneakers-nam-elleman-2024/',
        },
        {
          id: 2,
          title: 'Cách chọn giày sneaker phù hợp với dáng người của bạn',
          summary:
            'Hướng dẫn cách chọn giày sneaker phù hợp với dáng người của bạn để tạo ấn tượng tốt.',
          image:
            'https://lh7-us.googleusercontent.com/wGbao0TdNwIMp2GK4kbDiZkJ6fghuaN8WKgcxEQKiaNWR8gnfKZt_CSycdF5AXuNJeqfhvqPnWQ-__WZZfTUdQ8kHQRTErGdIrNq8Hr77gMSNi0IP3h6KrdiEygx-PrcWRTS4eJFmm6brtqWcAeBrkk',
          link: 'https://sport1.vn/blogs/tin-tuc/cach-lua-chon-giay-sneaker-phu-hop-voi-dang-nguoi-cua-ban?srsltid=AfmBOorByAovfCRgo-UWGdCw_FQ0eobIYaaxGIwYE4iyf9ghcWFp6Qis',
        },
        {
          id: 3,
          title: 'Top 10 thương hiệu giày sneaker nổi tiếng',
          summary:
            'Danh sách 10 thương hiệu giày sneaker nổi tiếng và được yêu thích nhất hiện nay.',
          image:
            'https://cdn.chiaki.vn/unsafe/0x960/left/top/smart/filters:quality(70)/https://chiaki.vn/upload/news/content/2024/01/cac-hang-giay-den-tu-thuong-hieu-noi-tieng-jpg-1705911971-22012024152611.jpg',
          link: 'https://chiaki.vn/tin-tuc/cac-hang-giay-noi-tieng',
        },
        {
          id: 4,
          title: 'Giày sneaker: Xu hướng màu sắc nổi bật năm 2024',
          summary:
            'Khám phá những xu hướng màu sắc mới nhất trên các đôi giày sneaker năm 2024.',
          image:
            'https://via.placeholder.com/300',
          link: '#',
        },
        {
          id: 5,
          title: 'Những mẫu giày thể thao chạy bộ tốt nhất 2024',
          summary:
            'Những đôi giày chạy bộ đáng chú ý dành cho những người yêu thích thể thao.',
          image:
            'https://via.placeholder.com/300',
          link: '#',
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Tổng thể container */
.news-container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  color: #333;
}

/* Lưới tin tức */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

/* Bài viết */
.news-article {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.news-article:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Hình ảnh */
.article-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

/* Nội dung bài viết */
.article-content {
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}

.article-content h2 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #333;
}

.article-content p {
  font-size: 1rem;
  margin-bottom: 10px;
  color: #555;
}

.article-content .read-more {
  color: #3498db;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.article-content .read-more:hover {
  text-decoration: underline;
}
</style>
