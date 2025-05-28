import Cart from '../Model/cart.model.js';
import Product from '../Model/products.model.js';
import mongoose from 'mongoose';

// Add item to cart
export const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) return res.status(400).json({ message: 'Product does not exist' });

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    const existingItem = cart.items.find(item => item.productId.equals(productId));
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add item to cart' });
  }
};

// Update item quantity in cart

export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.id;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Valid quantity required' });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // ✅ Add logging here
    console.log('Cart items:', cart.items);
    console.log('Looking for itemId:', itemId);

    // Find the item by subdocument id
    const item = cart.items.id(itemId);

    console.log('Found item:', item); // This will be null if not matched

    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({
      message: 'Cart item updated',
      cartItem: item,
      fullCart: cart,
    });
  } catch (error) {
    console.error('❌ Error updating cart item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Remove item from cart
export const removeItemFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    console.log('🛒 Cart contents before removal:', cart.items);
    console.log('🛠️ Product ID to remove:', productId);

    const objectId = new mongoose.Types.ObjectId(productId);

    // 🔍 Add this block to inspect what's happening
    if (cart.items.length > 0) {
      console.log('Type of item.productId:', typeof cart.items[0].productId);
      console.log('Type of objectId:', typeof objectId);
      console.log(
        'item.productId equals objectId:',
        cart.items[0].productId.equals(objectId)
      );
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(item => !item.productId.equals(objectId));

    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('❌ Failed to remove item:', error);
    res.status(500).json({ message: 'Failed to remove item from cart' });
  }
};