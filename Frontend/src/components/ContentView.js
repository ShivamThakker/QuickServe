import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ContentView.css';

const ContentView = ({ cities }) => {
  const [selectedService, setSelectedService] = useState("");
  const [selectedCity, setSelectedCity] = useState("Portland, ME");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Define time slots
  const timeSlots = [
    { label: '7 AM - 10 AM', value: '7am-10am' },
    { label: '10 AM - 1 PM', value: '10am-1pm' },
    { label: '1 PM - 4 PM', value: '1pm-4pm' },
    { label: '4 PM - 7 PM', value: '4pm-7pm' },
  ];

  // Retrieve user data on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleNextClick = async () => {
    if (!user) {
      console.error('User not defined');
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/service-requests`, {
        service: selectedService,
        city: selectedCity,
        date: selectedDate,
        time: selectedTimeSlot,
        userId: user.googleId,
      });

      const { _id } = response.data;
      
      if (!_id) {
        console.error('No ID returned from the API');
        return;
      }

      navigate(`/details/${_id}`); // Pass the ID to the route
    } catch (error) {
      console.error('Error submitting service request:', error);
    }
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };

  return (
    <div className="content-view">
      <h1 className="title">Request a Service</h1>
      <div className="service-selection">
        <div className="service-options">
          <label><input type="radio" name="service" value="Home Cleaner" onChange={handleServiceChange} /> Home Cleaner</label>
          <label><input type="radio" name="service" value="Plumber" onChange={handleServiceChange} /> Plumber</label>
          <label><input type="radio" name="service" value="Day Caretaker" onChange={handleServiceChange} /> Day Caretaker</label>
          <label><input type="radio" name="service" value="Plower" onChange={handleServiceChange} /> Plower</label>
          <label><input type="radio" name="service" value="Mechanic" onChange={handleServiceChange} /> Mechanic</label>
        </div>
      </div>
      <div className="location-selection">
        <h2>Location</h2>
        <select value={selectedCity} onChange={handleCityChange}>
          {Object.entries(cities).map(([state, cityList]) => (
            <optgroup key={state} label={state}>
              {cityList.map(city => (
                <option key={city} value={`${city}, ${state}`}>{city}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      <div className="datetime-selection">
        <h2>Date & Time</h2>
        <div className="datetime-inputs">
          <input type="date" value={selectedDate} onChange={handleDateChange} />
          <select value={selectedTimeSlot} onChange={handleTimeSlotChange}>
            <option value="">Select a time slot</option>
            {timeSlots.map(slot => (
              <option key={slot.value} value={slot.value}>{slot.label}</option>
            ))}
          </select>
        </div>
      </div>
      <button className="next-button" onClick={handleNextClick}>Next</button>
    </div>
  );
};

export default ContentView;
