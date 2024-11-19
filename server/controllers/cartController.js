const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Thêm sản phẩm vào giỏ hàng
exports.addToCart = async (req, res) => {
    const { userId, productId, quantity, selectedSize } = req.body;

    if (!productId || !selectedSize) {
        return res.status(400).json({ error: 'Thiếu thông tin cần thiết để thêm vào giỏ hàng' });
    }

    try {
        // Kiểm tra xem sản phẩm có tồn tại không
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Sản phẩm không tồn tại' });
        }

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa (theo user_id, product_id, size)
        const existingCartItem = await Cart.findOne({
            where: { user_id: userId, product_id: productId, size: selectedSize },
        });

        if (existingCartItem) {
            // Nếu đã tồn tại, tăng số lượng
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            return res.status(200).json(existingCartItem);
        }

        // Nếu chưa tồn tại, thêm mới
        const cartItem = await Cart.create({
            user_id: userId,
            product_id: productId,
            quantity,
            size: selectedSize,
        });

        res.status(201).json(cartItem);
    } catch (error) {
        console.error('Lỗi khi thêm vào giỏ hàng:', error);
        res.status(500).json({ error: 'Lỗi server. Vui lòng thử lại sau!' });
    }
};

  

// Lấy giỏ hàng của người dùng
exports.getCart = async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'Vui lòng cung cấp userId' });
    }

    try {
        const cartItems = await Cart.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Product,
                    as: 'product', // Alias phải trùng với khai báo trong quan hệ
                    attributes: ['id', 'productName', 'imageUrl', 'priceRange'],
                },
            ],
        });

        // Debug dữ liệu
        console.log('Dữ liệu giỏ hàng:', JSON.stringify(cartItems, null, 2));

        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Lỗi khi lấy giỏ hàng:', {
            message: error.message,
            stack: error.stack,
        });
        res.status(500).json({ error: 'Lỗi server. Vui lòng thử lại sau!' });
    }
};




// Xóa sản phẩm khỏi giỏ hàng
exports.removeFromCart = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Cart.destroy({ where: { id } });
        res.json({ message: result ? 'Xóa thành công' : 'Không tìm thấy sản phẩm trong giỏ' });
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

// Chỉnh sửa số lượng sản phẩm trong giỏ hàng
exports.updateCart = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
        const cartItem = await Cart.findByPk(id);
        if (!cartItem) {
            return res.status(404).json({ error: 'Sản phẩm không tồn tại trong giỏ' });
        }

        if (quantity > 0) {
            cartItem.quantity = quantity;
            await cartItem.save();
        } else {
            await cartItem.destroy();
        }

        res.json(cartItem);
    } catch (error) {
        console.error('Lỗi khi cập nhật giỏ hàng:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
};
