import React, { useState } from 'react';
import './Checkout.css';

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order Placed:', formData);
    alert('Order placed successfully!');
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <section>
          <h3>Shipping Details</h3>
          <label>
            Full Name
            <input type="text" name="fullName" required onChange={handleChange} />
          </label>
          <label>
            Email
            <input type="email" name="email" required onChange={handleChange} />
          </label>
          <label>
            Address
            <input type="text" name="address" required onChange={handleChange} />
          </label>
          <label>
            City
            <input type="text" name="city" required onChange={handleChange} />
          </label>
          <label>
            Postal Code
            <input type="text" name="postalCode" required onChange={handleChange} />
          </label>
          <label>
            Country
            <input type="text" name="country" required onChange={handleChange} />
          </label>
        </section>

        <section>
          <h3>Payment Details</h3>
          <label>
            Payment Method
            <select name="paymentMethod" onChange={handleChange}>
              <option value="card">Credit/Debit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </label>

          {formData.paymentMethod === 'card' && (
            <>
              <label>
                Card Number
                <input type="text" name="cardNumber" required onChange={handleChange} />
              </label>
              <label>
                Expiry
                <input type="text" name="expiry" placeholder="MM/YY" required onChange={handleChange} />
              </label>
              <label>
                CVV
                <input type="text" name="cvv" required onChange={handleChange} />
              </label>
            </>
          )}
        </section>

        <button type="submit" className="place-order-btn">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;