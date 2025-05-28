import Product from '../Model/products.model.js';

// Default products to seed
const defaultProducts = [
  {
    name: 'Wireless Headphones',
    price: 59.99,
    description: 'High-quality wireless headphones with noise cancellation.',
    stock: 20,
  },
  {
    name: 'Smart Watch',
    price: 99.99,
    description: 'Feature-packed smart watch with fitness tracking.',
    stock: 15,
  },
  {
    name: 'Gaming Mouse',
    price: 29.99,
    description: 'Ergonomic gaming mouse with customizable buttons.',
    stock: 25,
  },
  {
    name: 'Bluetooth Speaker',
    price: 45.0,
    description: 'Portable Bluetooth speaker with excellent sound quality.',
    stock: 30,
  },
];

// 🔁 Seed products if not already present
export const seedDefaultProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(defaultProducts);
      console.log('🌱 Default products seeded successfully');
    } else {
      console.log('🌱 Products already exist, skipping seeding');
    }
  } catch (error) {
    console.error('❌ Error seeding default products:', error);
  }
};

// 📦 GET all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log('📦 Found products:', products); // Debug log
    res.json(products);
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// 🔍 GET product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (error) {
    console.error('❌ Error fetching product by ID:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
};

// ➕ POST create new product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const product = new Product({ name, price, description, stock });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('❌ Error creating product:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
};

// 📝 PUT update product by ID
export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, stock },
      { new: true }
    );

    if (!product)
      return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (error) {
    console.error('❌ Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
};

// ❌ DELETE product by ID
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};