const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    releaseDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    priceRange: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    starRating: {
        type: DataTypes.DECIMAL(3, 2)
    },
    imageUrl: {
        type: DataTypes.STRING
    },
    availableSizes: {
        type: DataTypes.JSON
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = Product;
