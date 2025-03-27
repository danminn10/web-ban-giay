<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Left Section -->
      <div class="footer-section">
        <h2>DANGMINH SHOES</h2>
        <p>Hộ Kinh Doanh Nguyễn Đăng Minh MST: 01E8027929</p>
        <p>
          DangMinh Shoes - Nhà phân phối chính hãng các thương hiệu thời trang
          quốc tế hàng đầu Việt Nam
        </p>
      </div>

      <!-- Store Information Section -->
      <div class="footer-section">
        <h3>HỆ THỐNG CỬA HÀNG</h3>
        <p>
          <i class="fas fa-map-marker-alt"></i> 389/3/4A, Quốc Lộ 13, Hiệp Bình
          Phước, Tp. Thủ Đức
        </p>
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
    <div class="footer-bottom">
      <p>&copy; 2024 DANGMINH SHOES. All Rights Reserved.</p>
    </div>
  </footer>
</template>


<script>
export default {
  name: "ComFooter"
};
</script>

<style scoped>
/* Tổng thể footer */
.footer {
  background-color: #f2f2f2; /* Nền sáng, dễ nhìn */
  padding: 40px 0; /* Khoảng cách rộng hơn */
  font-family: Arial, sans-serif;
  color: #333; /* Màu chữ trung tính */
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* Đổ bóng nhẹ */
}

.footer-content {
  display: flex;
  justify-content: space-between; /* Cân đối các phần */
  flex-wrap: wrap; /* Đáp ứng khi màn hình nhỏ */
  max-width: 1200px;
  margin: auto;
}

.footer-section {
  flex: 1;
  padding: 10px 20px;
  text-align: left;
  min-width: 250px; /* Đảm bảo cân đối trên màn hình nhỏ */
}

.footer-section h2,
.footer-section h3 {
  font-weight: bold;
  margin-bottom: 15px;
  color: #2c3e50;
}

.footer-section p,
.footer-section ul,
.footer-section li {
  margin: 8px 0;
  line-height: 1.6;
  font-size: 14px; /* Kích thước chữ dễ đọc */
  color: #555;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  cursor: pointer;
  transition: color 0.3s;
}

.footer-section ul li:hover {
  color: #3498db;
}

.social-icons {
  display: flex;
  gap: 15px; /* Khoảng cách đồng đều giữa các icon */
}

.social-icons i {
  font-size: 1.8em; /* Tăng kích thước icon */
  color: #555;
  transition: color 0.3s ease;
}

.social-icons i:hover {
  color: #3498db; /* Đổi màu khi hover */
}

.footer-bottom {
  text-align: center;
  margin-top: 30px;
  font-size: 14px;
  color: #777;
  border-top: 1px solid #ddd;
  padding-top: 15px;
}

/* Responsive */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column; /* Cột dọc trên màn hình nhỏ */
    align-items: center;
    text-align: center;
  }
  .footer-section {
    margin-bottom: 20px; /* Khoảng cách giữa các phần */
  }
  .social-icons {
    justify-content: center;
  }
}
</style>
