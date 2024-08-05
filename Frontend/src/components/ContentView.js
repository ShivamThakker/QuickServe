import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContentView.css';
import axios from 'axios';

const citiesArray = [
  { name: "Portland", lat: 43.6615, lng: -70.2553, state: "Maine" },
  { name: "Lewiston", lat: 44.1004, lng: -70.2148, state: "Maine" },
  { name: "Augusta", lat: 44.3106, lng: -69.7795, state: "Maine" },
  { name: "Bangor", lat: 44.8012, lng: -68.7778, state: "Maine" },
  { name: "Auburn", lat: 44.0979, lng: -70.2312, state: "Maine" },
  { name: "South Portland", lat: 43.6415, lng: -70.2409, state: "Maine" },
  { name: "Biddeford", lat: 43.4926, lng: -70.4534, state: "Maine" },

  { name: "Boston", lat: 42.3601, lng: -71.0589, state: "Massachusetts" },
  { name: "Worcester", lat: 42.2626, lng: -71.8023, state: "Massachusetts" },
  { name: "Springfield", lat: 42.1015, lng: -72.5898, state: "Massachusetts" },
  { name: "Cambridge", lat: 42.3736, lng: -71.1097, state: "Massachusetts" },
  { name: "Lowell", lat: 42.6334, lng: -71.3162, state: "Massachusetts" },
  { name: "Brockton", lat: 42.0834, lng: -71.0184, state: "Massachusetts" },
  { name: "Quincy", lat: 42.2529, lng: -71.0023, state: "Massachusetts" },

  { name: "Seattle", lat: 47.6062, lng: -122.3321, state: "Washington" },

  { name: "New York City", lat: 40.7128, lng: -74.0060, state: "New York" },
  { name: "Buffalo", lat: 42.8864, lng: -78.8784, state: "New York" },
  { name: "Rochester", lat: 43.1566, lng: -77.6088, state: "New York" },
  { name: "Yonkers", lat: 40.9312, lng: -73.8988, state: "New York" },
  { name: "Syracuse", lat: 43.0481, lng: -76.1474, state: "New York" },
  { name: "Albany", lat: 42.6526, lng: -73.7562, state: "New York" },
  { name: "New Rochelle", lat: 40.9115, lng: -73.7824, state: "New York" },
  { name: "Mount Vernon", lat: 40.9126, lng: -73.8371, state: "New York" },
  { name: "Schenectady", lat: 42.8142, lng: -73.9396, state: "New York" },
  { name: "Utica", lat: 43.1009, lng: -75.2327, state: "New York" },
  { name: "White Plains", lat: 41.0340, lng: -73.7629, state: "New York" }
  // Add more cities as needed
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
