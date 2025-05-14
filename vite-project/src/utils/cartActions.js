import { addToCart, removeFromCart, modifyQuantity } from './cartSlice';

// Action to add an item to the cart
export const addItemToCart = (product) => (dispatch) => {
  dispatch(addToCart(product));
};

// Action to remove an item from the cart
export const removeItemFromCart = (product) => (dispatch) => {
  dispatch(removeFromCart(product));
};

// Action to modify the quantity of an item in the cart
export const updateItemQuantity = (productId, quantity) => (dispatch) => {
  dispatch(modifyQuantity({ id: productId, quantity }));
};