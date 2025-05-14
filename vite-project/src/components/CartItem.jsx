import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CartItem.css';

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);
    onQuantityChange(item.id, newQuantity);
  };
  
  return (
    <div className="cart-item">
      <img src={item.thumbnail || "https://picsum.photos/200/300"} alt={item.title} />
      <div className="cart-item-details">
        <h4>{item.title}</h4>
        <p>${item.price} each</p>
        <div className="cart-item-quantity">
          <label>Quantity: </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="quantity-input"
          />
        </div>
        <p>Total: ${item.price * quantity}</p>
      </div>
      <button className="remove-btn" onClick={() => onRemove(item)}>
        Remove
      </button>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};

export default CartItem;