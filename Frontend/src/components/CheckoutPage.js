import React from 'react';
import './CheckoutPage.css';

const CheckoutPage = ({ contentDetails, userDetails }) => {
  return (
    <div className="checkout-container">
      <h1>Checkout Page</h1>
        
      <div className="checkout-section">
        <h2>Content Details</h2>
        <p><strong>Title:</strong> {contentDetails.title}</p>
        <p><strong>Description:</strong> {contentDetails.description}</p>
        <p><strong>Price:</strong> ${contentDetails.price}</p>
      </div>

      <div className="checkout-section">
        <h2>User Details</h2>
        <p><strong>Name:</strong> {userDetails.name}</p>
        <p><strong>Email:</strong> {userDetails.email}</p>
        <p><strong>Address:</strong> {userDetails.address}</p>
      </div>

      <button className="checkout-button">Confirm and Pay</button>
    </div>
  );
};

export default CheckoutPage;
