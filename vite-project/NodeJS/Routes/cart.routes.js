import express from 'express';
import { addItemToCart, updateCartItem, removeItemFromCart } from '../Controller/cart.controller.js';
import { authMiddleware } from '../Controller/users.controller.js';  // Import auth middleware from users controller or create a separate file if you want

const router = express.Router();

router.post('/', authMiddleware, addItemToCart);
router.put('/:id', authMiddleware, updateCartItem);
router.delete('/:productId', authMiddleware, removeItemFromCart);

export default router;