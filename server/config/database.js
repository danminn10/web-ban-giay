const { Sequelize } = require('sequelize');

// Cấu hình thông tin kết nối MySQL
const sequelize = new Sequelize('webbh', 'root', '081004', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true // xác minh câu lênh sql được thực thi
});

// Kiểm tra kết nối
sequelize.authenticate()
    .then(() => console.log('Kết nối thành công đến MySQL!'))
    .catch(err => console.error('Không thể kết nối đến MySQL:', err));

module.exports = sequelize;
