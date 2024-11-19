const sequelize = require('./database');
const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Payment = require('../models/Payment');

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Xóa bảng cũ và tạo lại
        console.log('Đồng bộ cơ sở dữ liệu thành công!');
    } catch (error) {
        console.error('Lỗi khi đồng bộ cơ sở dữ liệu:', error);
    }
};

syncDatabase();
