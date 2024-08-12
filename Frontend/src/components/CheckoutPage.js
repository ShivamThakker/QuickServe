import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const [checkoutDetails, setCheckoutDetails] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false); // State to manage dialog visibility
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

  const handleConfirmAndPay = () => {
    setShowConfirmation(true); // Show the confirmation dialog
  };

  if (!checkoutDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="checkout-container">
      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Appointment confirmed! You will receive your confirmation email shortly.</p>
          <button onClick={() => setShowConfirmation(false)}>Close</button>
        </div>
      )}

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

      <button className="checkout-button" onClick={handleConfirmAndPay}>Confirm and Pay</button>
    </div>
  );
};

export default CheckoutPage;
