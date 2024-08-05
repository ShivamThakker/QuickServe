import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContentView.css';
import axios from 'axios';

const citiesArray = [
  { name: "Portland", lat: 43.6615, lng: -70.2553, state: "Maine" },
  { name: "Lewiston", lat: 44.1004, lng: -70.2148, state: "Maine" },
  { name: "Boston", lat: 42.3601, lng: -71.0589, state: "Massachusetts" },
  { name: "Worcester", lat: 42.2626, lng: -71.8023, state: "Massachusetts" }
  // Add more cities
];

const ContentView = () => {
  const [selectedService, setSelectedService] = useState("");
  const [selectedCity, setSelectedCity] = useState("Portland, ME");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Cities array:", citiesArray);
  }, []);

  const handleNextClick = async () => {
    if (!user) {
      console.error('User not defined');
      return;
    }
    try {
      await axios.post('/api/service-requests', {
        service: selectedService,
        city: selectedCity,
        date: selectedDate,
        time: selectedTime,
        userId: user ? user.googleId : 'guest',
      });
      navigate('/details');
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

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
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
          {citiesArray.map(city => (
            <option key={city.name} value={`${city.name}, ${city.state}`}>{city.name}, {city.state}</option>
          ))}
        </select>
      </div>
      <div className="datetime-selection">
        <h2>Date & Time</h2>
        <div className="datetime-inputs">
          <input type="date" value={selectedDate} onChange={handleDateChange} />
          <input type="time" value={selectedTime} onChange={handleTimeChange} />
        </div>
      </div>
      <button className="next-button" onClick={handleNextClick}>Next</button>
    </div>
  );
};

export default ContentView;
