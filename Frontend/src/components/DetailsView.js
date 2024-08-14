import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './DetailsView.css';

const DetailsView = () => {
  const [address, setAddress] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [serviceDetails, setServiceDetails] = useState({});
  const navigate = useNavigate();
  const { id } = useParams(); // Retrieve ID from route parameters

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/service-details/${id}`);
        const details = response.data;
        setServiceDetails(details);
        setAddress(details.address || '');
        setPricePerHour(details.pricePerHour || '');
      } catch (error) {
        console.error('Failed to fetch service details:', error);
      }
    };

    fetchServiceDetails();
  }, [id]);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPricePerHour(event.target.value);
  };

  const handleNextClick = async () => {
    try {
      // Send summary data to the backend
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/summary`, {
        serviceId: id, // Use the ID of the service details
        address,
        pricePerHour,
      });

      console.log('Summary saved successfully');
      navigate(`/checkout/${id}`); // Navigate to the next page
    } catch (error) {
      console.error('Error saving summary:', error);
    }
  };

  return (
    <div className="details-view">
      <h1>Details View</h1>
      <table>
        <tbody>
          <tr>
            <td>Service</td>
            <td>{serviceDetails.service || 'Static Service'}</td>
          </tr>
          <tr>
            <td>City</td>
            <td>{serviceDetails.city || 'Static City'}</td>
          </tr>
          <tr>
            <td>Date</td>
            <td>{serviceDetails.date || 'Static Date'}</td>
          </tr>
          <tr>
            <td>Time</td>
            <td>{serviceDetails.time || 'Static Time'}</td>
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
            <td>Amount willing to pay (per Hour)</td>
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
      <button onClick={handleNextClick} className="next-button">Next</button>
    </div>
  );
};

export default DetailsView;
