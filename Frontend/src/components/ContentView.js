// src/components/ContentView.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContentView.css';

const ContentView = ({ cities }) => {
  const [selectedService, setSelectedService] = useState("");
  const [selectedCity, setSelectedCity] = useState("Portland, ME");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const navigate = useNavigate();

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleNextClick = () => {
    navigate('/details');
  };

  return (
    <div className="content-view">
      <h1>Request a Service</h1>
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
        <input type="date" value={selectedDate} onChange={handleDateChange} />
        <input type="time" value={selectedTime} onChange={handleTimeChange} />
      </div>
      <button className="next-button" onClick={handleNextClick}>Next</button>
    </div>
  );
};

export default ContentView;
