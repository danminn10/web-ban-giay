<template>
  <div class="contact">
    <h1>Liên Hệ</h1>
    <div class="contact-info">
      <div class="info-item">
        <i class="fas fa-map-marker-alt"></i>
        <p>
          <strong>Địa chỉ:</strong> 389/3/4A Quốc Lộ 13 - Hiệp Bình Phước - Thủ Đức
        </p>
      </div>
      <div class="info-item">
        <i class="fas fa-phone-alt"></i>
        <p><strong>Điện thoại:</strong> 0348468065</p>
      </div>
      <div class="info-item">
        <i class="fas fa-envelope"></i>
        <p><strong>Email:</strong> Dangminhn10@gmail.com</p>
      </div>
    </div>

    <div class="map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.123456789012!2d105.82123456789012!3d21.02456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abcd12345678%3A0x1234567890abcdef!2s72%20T%C3%A2y%20S%C6%A1n%2C%20%C4%90%E1%BB%91ng%20%C4%90a%2C%20H%C3%A0%20N%E1%BB%99i!5e0!3m2!1sen!2s!4v1634567890123!5m2!1sen!2s"
        width="600"
        height="450"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>
  </div>
</template>

  
  <script>
  export default {
    name: "ComContact",
  };
  </script>
  
  <style scoped>
/* Tổng thể container */
.contact {
  max-width: 800px;
  margin: auto;
  padding: 30px;
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

/* Tiêu đề */
h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  color: #2c3e50;
  font-weight: bold;
}

/* Thông tin liên hệ */
.contact-info {
  margin-bottom: 30px;
}

.info-item {
  display: flex;
  align-items: center; /* Căn chỉnh icon và text theo chiều dọc */
  margin-bottom: 20px; /* Tăng khoảng cách giữa các mục */
}

.info-item i {
  font-size: 1.5rem; /* Kích thước icon */
  color: #3498db; /* Màu xanh nổi bật */
  margin-right: 20px; /* Khoảng cách giữa icon và text */
}

.info-item p {
  font-size: 1rem;
  color: #555;
  margin: 0; /* Loại bỏ margin mặc định */
  /* Tạo khoảng cách với các icon */
  padding-left: 10px;
  
  line-height: 1.6;
}
</style>
