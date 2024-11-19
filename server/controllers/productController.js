const Product = require('../models/Product');

// Lấy danh sách sản phẩm
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

// Lấy chi tiết sản phẩm theo ID
exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
        }
        res.json(product);
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
};
// Thêm sản phẩm mới
exports.addProduct = async (req, res) => {
    const { productName, productCode, releaseDate, description, priceRange, starRating, imageUrl, availableSizes, quantity } = req.body;

    try {
        const newProduct = await Product.create({
            productName,
            productCode,
            releaseDate,
            description,
            priceRange,
            starRating,
            imageUrl,
            availableSizes,
            quantity
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm mới:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
};
