<template>
  <div class="about-container">
    <!-- Section 1 -->
    <div class="about-section">
      <div class="about-text">
        <p>
          Được thành lập từ năm 2015, là chuỗi bán lẻ Sneaker, Streetwear và phụ kiện thời trang chính hãng có thị phần số 1 Việt Nam với số lượt truy cập mua hàng tại website dangminh-shoes.com lên tới trên 10.000 lượt mỗi ngày từ khắp 63 tỉnh thành trên cả nước.
        </p>
        <h1>TỪ MỘT NHÀ SƯU TẦM SNEAKER</h1>
        <ul>
          <li>
            Biết được nhu cầu của người tiêu dùng Việt Nam luôn tìm kiếm những đôi giày chất lượng, nhiều kiểu dáng, màu sắc mang màu sắc riêng và quan trọng nhất là chúng phải 100% chính hãng. DangMinh Shoes đã ra đời.
          </li>
          <li>
            Xuất thân là một cửa hàng Online chuyên Order Sneaker của các thương hiệu lớn như Nike, Adidas hay Puma, MLB… trên thế giới từ Mỹ, Anh Quốc, Pháp, Nhật,… Trải qua 4 năm hình thành và phát triển, DangMinh Shoes đã giải quyết được phần nào mong muốn của người tiêu dùng.
          </li>
        </ul>
      </div>
      <div class="about-image">
        <img
          src="https://cdn.authentic-shoes.com/wp-content/uploads/2023/04/l4ihmlsqvs9fvesmo6dfle21ieuhirtw_adc2bbedc11543f08001a65f6e7a66b9_2048x2048.webp"
          alt="Store Image"
        />
      </div>
    </div>

    <!-- Section 2 -->
    <div class="about-section">
      <div class="about-image">
        <img
          src="https://cdn.authentic-shoes.com/wp-content/uploads/2023/04/bvm9dhfmyhb1lo9ph9rxf66xgk8s8hdq_7dc022616d1b45f0a126884c0e1292c4_2048x2048.webp"
          alt="Store Image"
        />
      </div>
      <div class="about-text">
        <h1>
          ĐẾN CHUỖI BÁN LẺ SNEAKER, STREETWEAR VÀ PHỤ KIỆN CHÍNH HÃNG TIÊN PHONG
          TẠI VIỆT NAM
        </h1>
        <ul>
          <li>
            Không dừng lại ở một cửa hàng online, năm 2018, DangMinh Shoes đã khai trương cửa hàng đầu tiên tại Hà Nội với hàng trăm mẫu có sẵn được bày bán, đánh dấu một bước chuyển mình từ kinh doanh Online sang Offline.
          </li>
          <li>
            Cửa hàng có mặt bằng nằm tại phố Tây Sơn, là con phố mua sắm sầm uất với nhiều shop quần áo, giày dép nổi tiếng. Với quy mô mẫu mã vô cùng phong phú, DangMinh Shoes luôn mang đến cho bạn những sản phẩm chất lượng từ các thương hiệu đình đám.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


  
<script>
export default {
  name: 'ComAbout',
}
</script>
  
<style scoped>
/* Tổng thể container */
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Roboto', Arial, sans-serif;
}

/* Mỗi phần giới thiệu */
.about-section {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  gap: 30px; /* Khoảng cách giữa text và hình ảnh */
}

.about-section:nth-child(even) {
  flex-direction: row-reverse; /* Đổi hướng cho các section chẵn */
}

/* Nội dung văn bản */
.about-text {
  flex: 1;
}

.about-text h1 {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: bold;
}

.about-text p {
  font-size: 1rem;
  color: #555;
  margin-bottom: 15px;
  line-height: 1.8;
}

.about-text ul {
  list-style-type: none;
  padding: 0;
}

.about-text ul li {
  margin-bottom: 10px;
  padding-left: 20px;
  position: relative;
  font-size: 1rem;
  color: #555;
}

.about-text ul li::before {
  content: "✓";
  position: absolute;
  left: 0;
  top: 0;
  color: #3498db;
  font-weight: bold;
  font-size: 1.2rem;
}

/* Hình ảnh */
.about-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.about-image img {
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Đổ bóng */
}

/* Responsive */
@media (max-width: 1024px) {
  .about-section {
    flex-direction: column; /* Một cột trên màn hình nhỏ */
    text-align: center;
  }

  .about-section:nth-child(even) {
    flex-direction: column; /* Đồng bộ cho màn hình nhỏ */
  }

  .about-text h1 {
    font-size: 1.5rem;
  }

  .about-text p,
  .about-text ul li {
    font-size: 0.95rem;
  }
}
</style>

