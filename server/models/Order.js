const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
        defaultValue: 'pending'
    },
    shippingAddress: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'orders',
    timestamps: true,
    createdAt: 'order_date',
    updatedAt: false
});

// Khai báo mối quan hệ
Order.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Order;
