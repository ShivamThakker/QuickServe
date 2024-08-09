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
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/checkout/${id}`);
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
