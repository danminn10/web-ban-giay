const express = require('express');
const {
    register,
    login,
    authenticateToken,
    getProfile
} = require('../controllers/authController'); // Đường dẫn đúng đến file controller

const router = express.Router();

router.post('/register', register); // Sử dụng hàm register
router.post('/login', login);       // Sử dụng hàm login
router.get('/profile', authenticateToken, getProfile); // Middleware và hàm lấy thông tin

module.exports = router;
