# DANGMINH SHOES - E-commerce Platform

![DangMinh Shoes Logo](public/logo.png)

Một ứng dụng bán giày sneaker chính hãng với đầy đủ chức năng từ quản lý sản phẩm, giỏ hàng đến thanh toán.

## 📌 Tính năng chính

### Frontend (Vue 3)
- 🛍️ Trang sản phẩm với filter, phân trang
- 🛒 Giỏ hàng (local storage + database)
- 🔐 Xác thực người dùng (JWT)
- 💳 Thanh toán (COD/MoMo)
- 📱 Responsive design

### Backend (Node.js + MySQL)
- 🚀 RESTful API với Express
- 🔒 Xác thực JWT
- 🛢️ ORM Sequelize
- 💾 MySQL database

## 🛠️ Công nghệ sử dụng

### Frontend
- Vue 3 + Vue Router
- Axios (API communication)
- Font Awesome (icons)
- AOS (animations)
- Tailwind CSS (styling)

### Backend
- Node.js + Express
- Sequelize (ORM)
- MySQL
- JWT (authentication)
- Bcrypt (password hashing)

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 16+
- MySQL 8+
- Git

### Cài đặt Backend
```bash
cd server
npm install
Tạo file .env từ .env.example và cập nhật thông tin MySQL:

env
Copy
DB_NAME=webbh
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
Khởi tạo database:

bash
Copy
npx sequelize-cli db:create
npx sequelize-cli db:migrate
Chạy server:

bash
Copy
npm start
Cài đặt Frontend
bash
Copy
cd client
npm install
Chạy development server:

bash
Copy
npm run serve
📂 Cấu trúc thư mục
Copy
dangminh-shoes/
├── client/               # Frontend (Vue 3)
│   ├── public/           # Static files
│   ├── src/
│   │   ├── assets/       # Images, fonts
│   │   ├── components/   # Vue components
│   │   ├── router/       # Vue Router
│   │   └── views/        # Page components
│   └── package.json
│
├── server/               # Backend (Node.js)
│   ├── config/           # Database config
│   ├── controllers/      # Business logic
│   ├── models/           # Sequelize models
│   ├── routes/           # API endpoints
│   └── package.json
└── README.md
🌟 Đóng góp
Fork repository

Tạo branch mới (git checkout -b feature/your-feature)

Commit changes (git commit -m 'Add some feature')

Push lên branch (git push origin feature/your-feature)

Tạo Pull Request

📄 Giấy phép
MIT License - Xem file LICENSE để biết thêm chi tiết.

🛠️ Bảo trì bởi: [Tên của bạn]
📧 Liên hệ: your.email@example.com

Copy

### Các điểm cần lưu ý:
1. Thay thế các placeholder như `yourpassword`, `your_jwt_secret` bằng thông tin thực tế
2. Cập nhật thông tin bảo trì và liên hệ
3. Thêm logo thực tế vào thư mục `public/`

Bạn có thể tùy chỉnh thêm nếu cần bổ sung thông tin về:
- Các API endpoints
- Cấu hình database chi tiết