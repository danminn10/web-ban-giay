const { Sequelize } = require('sequelize');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const sequelize = require('../config/database');

exports.createOrder = async (req, res) => {
    const { userId, shippingAddress, orderNote, paymentMethod } = req.body;

    if (!userId || !shippingAddress || !paymentMethod) {
        return res.status(400).json({ error: 'Thiếu thông tin cần thiết để tạo hóa đơn' });
    }

    const transaction = await sequelize.transaction();

    try {
        // Lấy giỏ hàng của người dùng
        const cartItems = await Cart.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Product,
                    as: 'product',
                    attributes: ['id', 'productName', 'priceRange', 'quantity']
                }
            ]
        });

        if (!cartItems.length) {
            await transaction.rollback();
            return res.status(400).json({ error: 'Giỏ hàng trống. Không thể tạo hóa đơn.' });
        }

        // Tính tổng tiền hóa đơn
        const totalAmount = cartItems.reduce((total, cartItem) => {
            const product = cartItem.product; // Truy xuất product từ cartItem
            if (!product) {
                throw new Error(`Không tìm thấy thông tin sản phẩm cho item ID: ${cartItem.id}`);
            }
            return total + (product.priceRange * cartItem.quantity);
        }, 0);
        
        // Tạo hóa đơn
        const newOrder = await Order.create(
            {
                user_id: userId,
                totalAmount,
                shippingAddress,
                paymentMethod,
                orderNote
            },
            { transaction }
        );

        // Tạo các mục hóa đơn và cập nhật số lượng sản phẩm
        const orderItems = await Promise.all(
            cartItems.map(async (cartItem) => {
                const product = cartItem.product;

                // Kiểm tra số lượng sản phẩm
                if (product.quantity < cartItem.quantity) {
                    throw new Error(`Sản phẩm "${product.productName}" không đủ số lượng.`);
                }

                // Trừ số lượng sản phẩm
                product.quantity -= cartItem.quantity;
                await product.save({ transaction });

                return {
                    order_id: newOrder.id,
                    product_id: product.id,
                    quantity: cartItem.quantity,
                    price: product.priceRange
                };
            })
        );

        // Thêm mục hóa đơn vào bảng `order_items`
        await OrderItem.bulkCreate(orderItems, { transaction });

        // Xóa giỏ hàng sau khi tạo hóa đơn
        await Cart.destroy({ where: { user_id: userId } }, { transaction });

        await transaction.commit();
        res.status(201).json({ message: 'Đặt hàng thành công!', order: newOrder });
    } catch (error) {
        await transaction.rollback();
        console.error('Lỗi khi tạo hóa đơn:', error.message);
        res.status(500).json({ error: error.message || 'Lỗi server. Vui lòng thử lại sau!' });
    }
};
