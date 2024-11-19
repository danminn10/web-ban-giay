const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    size: { // Bổ sung cột size
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'cart',
    timestamps: true,
    createdAt: 'added_at',
    updatedAt: false
});

// Khai báo mối quan hệ
Cart.belongsTo(User, { foreignKey: 'user_id' });
Cart.belongsTo(Product, { foreignKey: 'product_id', as: 'product' }); // Đảm bảo đặt alias 'product'


module.exports = Cart;
