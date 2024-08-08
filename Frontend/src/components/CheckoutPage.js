<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const [checkoutDetails, setCheckoutDetails] = useState(null);
  const { id } = useParams(); // Get the service ID from the URL

  useEffect(() => {
    const fetchCheckoutDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/checkout/${id}`);
        setCheckoutDetails(response.data);
      } catch (error) {
        console.error('Error fetching checkout details:', error);
      }
    };

    fetchCheckoutDetails();
  }, [id]);

  if (!checkoutDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="checkout-container">
      <h1>Checkout Page</h1>
        
      <div className="checkout-section">
        <h2>Service Details</h2>
        <p><strong>Service:</strong> {checkoutDetails.service}</p>
        <p><strong>Date:</strong> {checkoutDetails.date}</p>
        <p><strong>Time:</strong> {checkoutDetails.time}</p>
        <p><strong>City:</strong> {checkoutDetails.city}</p>
      </div>

      <div className="checkout-section">
        <h2>Summary Details</h2>
        <p><strong>Address:</strong> {checkoutDetails.address}</p>
        <p><strong>Price per Hour:</strong> ${checkoutDetails.pricePerHour}</p>
      </div>

      <button className="checkout-button">Confirm and Pay</button>
    </div>
  );
};

export default CheckoutPage;
=======
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
>>>>>>> 2bc987db3cd69c8891e96bc1954ef498ff34ba1d
