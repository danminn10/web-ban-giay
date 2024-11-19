const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./Order');

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    paymentMethod: {
        type: DataTypes.ENUM('credit_card', 'paypal', 'bank_transfer'),
        allowNull: false
    },
    paymentStatus: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending'
    },
    transactionId: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'payments',
    timestamps: true,
    createdAt: 'payment_date',
    updatedAt: false
});

// Khai báo mối quan hệ
Payment.belongsTo(Order, { foreignKey: 'order_id' });

module.exports = Payment;
