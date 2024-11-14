<template>
    <div class="contact">
      <h1>Liên Hệ</h1>
      <div class="contact-info">
        <p><strong>ĐỊA CHỈ TRỤ SỞ:</strong> 389/3/4A Quốc Lộ 13 - Hiệp Bình Phước - Thủ Đức</p>
        <p><strong>SỐ ĐIỆN THOẠI:</strong> 0348468065</p>
        <p><strong>EMAIL:</strong> Dangminhn10@gmail.com</p>
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
  .contact {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  
  .contact-info {
    margin-bottom: 20px;
  }
  
  .contact-info p {
    line-height: 1.6;
    margin-bottom: 10px;
    color: #555;
  }
  
  .map {
    display: flex;
    justify-content: center;
  }
  
  iframe {
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  </style>