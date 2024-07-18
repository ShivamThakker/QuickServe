// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignupView from './components/SignupView';
import LoginView from './components/LoginView';
import ContentView from './components/ContentView';
import './App.css';

const cities = {
  Maine: [
    "Portland", "Lewiston", "Bangor", "South Portland", "Auburn",
    "Biddeford", "Sanford", "Brunswick", "Saco", "Westbrook"
  ],
  Massachusetts: [
    "Boston", "Worcester", "Springfield", "Lowell", "Cambridge",
    "New Bedford", "Brockton", "Quincy", "Lynn", "Fall River"
  ]
};

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Router>
        <div className="App">
          <nav className="navbar">
            <div className="logo">
              <img src="/images/Quickserve.jpeg" alt="Quickserve Logo" />
              <span className="company-name">Quickserve</span>
            </div>
            <div className="navbar-links">
              <Link to="/register" className="navbar-link">Register as Professional</Link>
              <Link to="/login" className="navbar-link">Login / Sign Up</Link>
              <Link to="/content" className="navbar-link">Request a Service</Link>
            </div>
          </nav>
          <div className="content">
            <Routes>
              <Route path="/register" element={<SignupView />} />
              <Route path="/login" element={<LoginView setUser={setUser} />} />
              <Route path="/content" element={<ContentView cities={cities} />} />
              <Route path="/" element={
                <>
                  <div className="service-location">
                    <label>Select your location for service</label>
                    <select>
                      <option>Select City</option>
                      {Object.entries(cities).map(([state, cityList]) => (
                        <optgroup key={state} label={state}>
                          {cityList.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  <div className="services-offered">
                    <h2>Services Offered</h2>
                    <div className="services-list">
                      <p>Barber</p>
                      <p>Snow Removal</p>
                      <p>Garden Cleaner</p>
                      <p>Mechanic</p>
                    </div>
                  </div>
                  <div className="why-us">
                    <h2>Why Us?</h2>
                    <div className="why-us-items">
                      <p>On Call Instant Service</p>
                      <p>Affordable</p>
                      <p>Experts</p>
                      <p>Easy to Book</p>
                      <p>Minimal Wait Time</p>
                    </div>
                  </div>
                </>
              } />
            </Routes>
          </div>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
