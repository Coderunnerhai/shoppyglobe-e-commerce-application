import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItemFromCart, updateItemQuantity } from "../utils/cartActions";
import { selectCartItems, selectCartTotalPrice } from "../utils/cartSelectors";
import CartItem from './CartItem';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);

  const handleRemoveItem = (item) => {
    dispatch(removeItemFromCart(item));
  };

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity > 0) {
      dispatch(updateItemQuantity(itemId, quantity));
    }
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={handleRemoveItem}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
      )}
      <div className="cart-summary">
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <button className="checkout-btn" onClick={() => { if (cartItems.length > 0) {
      navigate('/checkout');
    } else {
      alert('Your cart is empty!');
    }
  }}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;