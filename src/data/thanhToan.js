const payments = {
    form: {
      fullName: '',
      phone: '',
      email: '',
      city: '',
      district: '',
      address: '',
      orderNote: '',
      paymentMethod: 'bankTransfer'
    },
    cities: [
      'Hà Nội', 'TP Hồ Chí Minh', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng', 'An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu', 'Bắc Ninh', 'Bến Tre', 'Bình Định', 'Bình Dương', 'Bình Phước', 'Bình Thuận', 'Cà Mau', 'Cao Bằng', 'Đắk Lắk', 'Đắk Nông', 'Điện Biên', 'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Giang', 'Hà Nam', 'Hà Tĩnh', 'Hải Dương', 'Hậu Giang', 'Hòa Bình', 'Hưng Yên', 'Khánh Hòa', 'Kiên Giang', 'Kon Tum', 'Lai Châu', 'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Long An', 'Nam Định', 'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Phú Yên', 'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị', 'Sóc Trăng', 'Sơn La', 'Tây Ninh', 'Thái Bình', 'Thái Nguyên', 'Thanh Hóa', 'Thừa Thiên Huế', 'Tiền Giang', 'Trà Vinh', 'Tuyên Quang', 'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái'
    ], // Example cities
    districts: {
      'Hà Nội': ['Ba Đình', 'Hoàn Kiếm', 'Tây Hồ', 'Long Biên', 'Cầu Giấy', 'Đống Đa', 'Hai Bà Trưng', 'Hoàng Mai', 'Thanh Xuân', 'Sóc Sơn', 'Đông Anh', 'Gia Lâm', 'Nam Từ Liêm', 'Thanh Trì', 'Bắc Từ Liêm', 'Mê Linh', 'Hà Đông', 'Sơn Tây', 'Ba Vì', 'Phúc Thọ', 'Đan Phượng', 'Hoài Đức', 'Quốc Oai', 'Thạch Thất', 'Chương Mỹ', 'Thanh Oai', 'Thường Tín', 'Phú Xuyên', 'Ứng Hòa', 'Mỹ Đức'],
      'TP Hồ Chí Minh': ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 9', 'Quận 10', 'Quận 11', 'Quận 12', 'Bình Tân', 'Bình Thạnh', 'Gò Vấp', 'Phú Nhuận', 'Tân Bình', 'Tân Phú', 'Thủ Đức', 'Bình Chánh', 'Cần Giờ', 'Củ Chi', 'Hóc Môn', 'Nhà Bè'],
      'Đà Nẵng': ['Hải Châu', 'Thanh Khê', 'Sơn Trà', 'Ngũ Hành Sơn', 'Liên Chiểu', 'Cẩm Lệ', 'Hòa Vang', 'Hoàng Sa'],
      'Cần Thơ': ['Ninh Kiều', 'Ô Môn', 'Bình Thủy', 'Cái Răng', 'Thốt Nốt', 'Vĩnh Thạnh', 'Cờ Đỏ', 'Phong Điền', 'Thới Lai'],
      'Hải Phòng': ['Hồng Bàng', 'Ngô Quyền', 'Lê Chân', 'Hải An', 'Kiến An', 'Đồ Sơn', 'Dương Kinh', 'Thủy Nguyên', 'An Dương', 'An Lão', 'Kiến Thụy', 'Tiên Lãng', 'Vĩnh Bảo', 'Cát Hải', 'Bạch Long Vĩ'],
      // Add more cities and districts as needed
    },
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    qrCodeBank: require('@/assets/qr-mb.jpg'), // Use require to load the image
    qrCodeMomo: require('@/assets/qr-code.jpg') // Use require to load the image
  };
  
  export default payments;