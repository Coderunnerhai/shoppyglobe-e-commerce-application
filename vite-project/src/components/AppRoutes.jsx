import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Checkout from './Checkout';

const ProductList = lazy(() => import('./ProductList'));
const ProductDetail = lazy(() => import('./ProductDetail'));
const Cart = lazy(() => import('./Cart'));
const NotFound = lazy(() => import('./NotFound'));

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
  );
};

export default AppRoutes;