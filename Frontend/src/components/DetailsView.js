// src/components/DetailsView.js
import React, { useState } from 'react';
import './DetailsView.css';

const DetailsView = () => {
  const [address, setAddress] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPricePerHour(event.target.value);
  };

  return (
    <div className="details-view">
      <h1>Details View</h1>
      <table>
        <tbody>
          <tr>
            <td>Service</td>
            <td>Static Service</td>
          </tr>
          <tr>
            <td>City</td>
            <td>Static City</td>
          </tr>
          <tr>
            <td>Date</td>
            <td>Static Date</td>
          </tr>
          <tr>
            <td>Time</td>
            <td>Static Time</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>
              <input 
                type="text" 
                value={address} 
                onChange={handleAddressChange} 
                placeholder="Enter your address" 
              />
            </td>
          </tr>
          <tr>
            <td>Price per Hour</td>
            <td>
              <input 
                type="number" 
                value={pricePerHour} 
                onChange={handlePriceChange} 
                placeholder="Enter your price per hour" 
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DetailsView;
