import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import routes
import usersRoutes from './Routes/users.routes.js';
import productsRoutes from './Routes/products.routes.js';
import cartRoutes from './Routes/cart.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/shoppyglobe')
.then(async () => {
  console.log('MongoDB connected');
  
  // Seed default products on startup
  // Import seed function dynamically here to avoid circular imports
  const { seedDefaultProducts } = await import('./Controller/products.controller.js');
  await seedDefaultProducts();
})
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});