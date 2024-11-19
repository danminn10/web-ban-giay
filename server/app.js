const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes'); // Đường dẫn đúng đến authRoutes
const ordersRouter = require('./routes/orderRoutes'); // Đường dẫn đúng đến orderRoutes

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
// Route xác thực
app.use('/api/auth', authRoutes);
app.use('/api/orders', ordersRouter); // Đường dẫn đúng đến ordersRouter

// để kiểm tra request đi qua router:
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.path}`);
    next();
});


module.exports = app;
