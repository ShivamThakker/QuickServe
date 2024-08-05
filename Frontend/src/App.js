import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignupView from './components/SignupView';
import LoginView from './components/LoginView';
import ContentView from './components/ContentView';
import DetailsView from './components/DetailsView'; // Ensure the import is correct
import Navbar from './components/Navbar';
import MapComponent from './components/MapComponent';
import './App.css';

const cities = {
  Maine: [
    { name: "Portland", lat: 43.6615, lng: -70.2553 },
    { name: "Lewiston", lat: 44.1004, lng: -70.2148 },
    // Add more cities
  ],
  Massachusetts: [
    { name: "Boston", lat: 42.3601, lng: -71.0589 },
    { name: "Worcester", lat: 42.2626, lng: -71.8023 },
    // Add more cities
  ]
};

const App = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('login');
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <div className="App">
          <Navbar user={user} handleLogout={handleLogout} />
          <MapComponent cities={cities} />
          <div className="content">
            <Routes>
              <Route path="/register" element={<SignupView />} />
              <Route path="/login" element={<LoginView setUser={handleLoginSuccess} />} />
              <Route path="/content" element={<ContentView cities={cities} />} />
              <Route path="/details" element={<DetailsView />} />
              <Route path="/" element={
                user ? (
                  <Navigate to="/content" />
                ) : (
                  <>
                    <div className="welcome-section">
                      <h1>Welcome to Quickserve</h1>
                      <p>Your one-stop solution for instant, affordable services</p>
                    </div>
                    <div className="services-offered">
                      <h2>Services Offered</h2>
                      <div className="services-list">
                        <div className="service-item">
                          <img src="images/barber.jpeg" alt="Barber" />
                          <p>Barber</p>
                        </div>
                        <div className="service-item">
                          <img src="images/snow.jpeg" alt="Snow Removal" />
                          <p>Snow Removal</p>
                        </div>
                        <div className="service-item">
                          <img src="images/plumber.png" alt="Garden Cleaner" />
                          <p>Plumber</p>
                        </div>
                        <div className="service-item">
                          <img src="images/mechanic.jpeg" alt="Mechanic" />
                          <p>Mechanic</p>
                        </div>
                        <div className="service-item">
                          <img src="images/carpenter.jpeg" alt="Carpenter" />
                          <p>Carpenter</p>
                        </div>
                      </div>
                    </div>
                    <div className="why-us">
                      <h2>Why Us?</h2>
                      <div className="why-us-items">
                        <div className="why-us-item">
                          <img src="images/24_7.png" alt="On Call Instant Service" />
                          <p>On Call Instant Service</p>
                        </div>
                        <div className="why-us-item">
                          <img src="/images/Affordable.png" alt="Affordable" />
                          <p>Affordable</p>
                        </div>
                        <div className="why-us-item">
                          <img src="images/experts.png" alt="Experts" />
                          <p>Experts</p>
                        </div>
                        <div className="why-us-item">
                          <img src="/images/easy_to_book.png" alt="Easy to Book" />
                          <p>Easy to Book</p>
                        </div>
                        <div className="why-us-item">
                          <img src="/images/min_wait_time.png" alt="Minimal Wait Time" />
                          <p>Minimal Wait Time</p>
                        </div>
                      </div>
                    </div>
                  </>
                )
              } />
            </Routes>
          </div>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;

