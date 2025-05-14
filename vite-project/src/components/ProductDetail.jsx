import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchProducts from '../utils/useFetchProducts';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { products, loading, error } = useFetchProducts();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const selectedProduct = products.find((product) => product.id === parseInt(id));
    setProduct(selectedProduct);
  }, [id, products]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.title} className="product-image" />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p className="product-price">${product.price}</p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
  );
};

export default ProductDetail;