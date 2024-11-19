const express = require('express');
const { addToCart, getCart, removeFromCart, updateCart } = require('../controllers/cartController');
const router = express.Router();

router.post('/', addToCart);
router.get('/', getCart);
router.delete('/:id', removeFromCart);
router.put('/:id', updateCart);

module.exports = router;
