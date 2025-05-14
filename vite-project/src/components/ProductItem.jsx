import React from 'react';
import PropTypes from 'prop-types';
import './ProductItem.css';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../utils/cartActions';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
  };

  return (
    <div className="product-item">
      <img src={product.thumbnail} alt={product.title} className="product-thumbnail" />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string
  }).isRequired,
};

export default ProductItem;