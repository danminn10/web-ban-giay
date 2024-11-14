<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Left Section -->
      <div class="footer-section">
        <h2>AUTHENTIC SHOES</h2>
        <p>Hộ Kinh Doanh Nguyễn Đăng Minh MST: 01E8027929</p>
        <p>DangMinh Shoes - Nhà phân phối chính hãng các thương hiệu thời trang quốc tế hàng đầu Việt Nam</p>
      </div>

      <!-- Store Information Section -->
      <div class="footer-section">
        <h3>HỆ THỐNG CỬA HÀNG</h3>
        <p><i class="fas fa-map-marker-alt"></i> 561 Nguyễn Đình Chiểu Phường 2, Quận 3, TP. Hồ Chí Minh</p>
        <p><i class="fas fa-phone"></i> Hotline: 0348468065</p>
        <p><i class="fas fa-envelope"></i> Email: Dangminhn10@gmail.com</p>
      </div>

      <!-- About Us Section -->
      <div class="footer-section">
        <h3>Về chúng tôi</h3>
        <ul>
          <li>Giới Thiệu</li>
          <li>Tuyển Dụng</li>
        </ul>
        <h3>Kết nối với chúng tôi</h3>
        <div class="social-icons">
          <i class="fab fa-facebook"></i>
          <i class="fab fa-instagram"></i>
          <i class="fab fa-tiktok"></i>
          <i class="fab fa-twitter"></i>
          <i class="fab fa-youtube"></i>
        </div>
      </div>

      <!-- Customer Support Section -->
      <div class="footer-section">
        <h3>Hỗ trợ khách hàng</h3>
        <ul>
          <li>Hướng dẫn mua hàng</li>
          <li>Chính sách đổi trả và bảo hành</li>
          <li>Chính Sách Thanh Toán</li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "ComFooter"
};
</script>

<style scoped>
.footer {
  background-color: #f8f9fa;
  padding: 20px 0;
  font-family: Arial, sans-serif;
  color: #333;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.footer-section {
  width: 22%;
  min-width: 200px;
}

.footer-section h2 {
  font-weight: bold;
}

.footer-section h3 {
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 5px;
}

.footer-section p,
.footer-section ul,
.footer-section li {
  margin: 5px 0;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  cursor: pointer;
}

.social-icons i {
  font-size: 1.6em;
  margin-right: 15px; /* Added more spacing between icons */
  color: #333;
  cursor: pointer;
  transition: color 0.3s;
}

.social-icons i:hover {
  color: #3498db;
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
}

.gov-logo {
  height: 50px;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
  }
  .footer-section {
    width: 90%;
    margin-bottom: 20px;
  }
}
</style>