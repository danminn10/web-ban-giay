<template>
    <div class="tintuc">
      <h1>Tin Tức Về Giày</h1>
      <div class="news-article" v-for="article in articles" :key="article.id">
        <img :src="article.image" alt="Article Image" class="article-image" />
        <div class="article-content">
          <h2>{{ article.title }}</h2>
          <p>{{ article.summary }}</p>
          <a :href="article.link" target="_blank">Đọc thêm</a>
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
            summary: 'Cùng điểm qua những đôi giày sneaker đang làm mưa làm gió trên thị trường năm 2023.',
            image: 'https://www.elleman.vn/app/uploads/2024/07/10/235560/cover10724-sneakers-elleman-1.png',
            link: 'https://www.elleman.vn/phong-cach/thoi-trang/10-doi-sneakers-nam-elleman-2024/'
          },
          {
            id: 2,
            title: 'Cách chọn giày sneaker phù hợp với dáng người của bạn',
            summary: 'Hướng dẫn cách chọn giày sneaker phù hợp với dáng người của bạn.',
            image: 'https://lh7-us.googleusercontent.com/wGbao0TdNwIMp2GK4kbDiZkJ6fghuaN8WKgcxEQKiaNWR8gnfKZt_CSycdF5AXuNJeqfhvqPnWQ-__WZZfTUdQ8kHQRTErGdIrNq8Hr77gMSNi0IP3h6KrdiEygx-PrcWRTS4eJFmm6brtqWcAeBrkk',
            link: 'https://sport1.vn/blogs/tin-tuc/cach-lua-chon-giay-sneaker-phu-hop-voi-dang-nguoi-cua-ban?srsltid=AfmBOorByAovfCRgo-UWGdCw_FQ0eobIYaaxGIwYE4iyf9ghcWFp6Qis'
          },
          {
            id: 3,
            title: 'Top 10 thương hiệu giày sneaker nổi tiếng',
            summary: 'Danh sách 10 thương hiệu giày sneaker nổi tiếng và được yêu thích nhất hiện nay.',
            image: 'https://cdn.chiaki.vn/unsafe/0x960/left/top/smart/filters:quality(70)/https://chiaki.vn/upload/news/content/2024/01/cac-hang-giay-den-tu-thuong-hieu-noi-tieng-jpg-1705911971-22012024152611.jpg',
            link: 'https://chiaki.vn/tin-tuc/cac-hang-giay-noi-tieng'
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .tintuc {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .news-article {
    display: flex;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .article-image {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
  
  .article-content {
    padding: 10px;
    flex: 1;
  }
  
  .article-content h2 {
    margin: 0 0 10px;
  }
  
  .article-content p {
    margin: 0 0 10px;
  }
  
  .article-content a {
    color: #3498db;
    text-decoration: none;
  }
  
  .article-content a:hover {
    text-decoration: underline;
  }
  </style>