import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  seedDefaultProducts,
} from '../Controller/products.controller.js';

const router = express.Router();

// Routes
router.get('/', getAllProducts);
router.get('/seed', async (req, res) => {
  await seedDefaultProducts();
  res.json({ message: 'Default products seeded' });
});
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;