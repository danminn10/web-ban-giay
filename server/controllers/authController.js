const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Model User
const JWT_SECRET = 'dientokencuabanvao'; // Secret key bảo mật

// API đăng ký
exports.register = async (req, res) => {
    try {
        const { fullName, email, phone, password } = req.body;

        // Kiểm tra các trường thông tin
        if (!fullName || !email || !phone || !password) {
            return res.status(400).json({ error: 'Thiếu thông tin cần thiết' });
        }

        // Kiểm tra email đã tồn tại
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email đã tồn tại' });
        }

        // Hash mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        const newUser = await User.create({
            fullName,
            email,
            phone,
            password: hashedPassword
        });

        res.status(201).json({
            message: 'Đăng ký thành công',
            user: { id: newUser.id, fullName: newUser.fullName, email: newUser.email, phone: newUser.phone }
        });
    } catch (error) {
        console.error('Lỗi khi đăng ký:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi trên server' });
    }
};

// API đăng nhập
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Tìm người dùng theo email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Email hoặc mật khẩu không đúng' });
        }

        // Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Email hoặc mật khẩu không đúng' });
        }

        // Tạo JWT
        const token = jwt.sign({ email: user.email, id: user.id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({
            message: 'Đăng nhập thành công',
            token,
            user: { id: user.id, fullName: user.fullName, email: user.email, phone: user.phone }
        });
    } catch (error) {
        console.error('Lỗi khi đăng nhập:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi trên server' });
    }
};

// Middleware xác thực token
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header không tồn tại' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
      return res.status(401).json({ error: 'Token không được cung cấp' });
  }

  try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log('Decoded token:', decoded);
      req.user = decoded;
      next();
  } catch (err) {
      console.error('Token không hợp lệ:', err);
      if (err.name === 'TokenExpiredError') {
          return res.status(403).json({ error: 'Token đã hết hạn' });
      }
      if (err.name === 'JsonWebTokenError') {
          return res.status(403).json({ error: 'Token không hợp lệ' });
      }
      res.status(500).json({ error: 'Lỗi không xác định' });
  }
};



// API lấy thông tin người dùng
exports.getProfile = async (req, res) => {
    try {
        // Tìm người dùng theo id được lưu trong token
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'Người dùng không tồn tại' });
        }

        res.json({
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi trên server' });
    }
};
