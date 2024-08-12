import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignupView from './components/SignupView';
import LoginView from './components/LoginView';
import ContentView from './components/ContentView';
import Navbar from './components/Navbar';
import DetailsView from './components/DetailsView';
import CheckoutPage from './components/CheckoutPage';
import MapComponent from './components/MapComponent'; // Import MapComponent
import './App.css';

const contentCities = {
  Maine: [
    "Portland", "Lewiston", "Bangor", "South Portland", "Auburn",
    "Biddeford", "Sanford", "Brunswick", "Saco", "Westbrook"
  ],
  Massachusetts: [
    "Boston", "Worcester", "Springfield", "Lowell", "Cambridge",
    "New Bedford", "Brockton", "Quincy", "Lynn", "Fall River"
  ]
};

const mapCities = {
  Maine: [
    { name: "Portland", lat: 43.6591, lng: -70.2568 },
    { name: "Lewiston", lat: 44.1004, lng: -70.2148 },
    { name: "Bangor", lat: 44.8012, lng: -68.7778 },
    { name: "South Portland", lat: 43.6415, lng: -70.2409 },
    { name: "Auburn", lat: 44.0979, lng: -70.2312 },
    { name: "Biddeford", lat: 43.4926, lng: -70.4534 },
    { name: "Sanford", lat: 43.4393, lng: -70.7743 },
    { name: "Brunswick", lat: 43.9106, lng: -69.9653 },
    { name: "Saco", lat: 43.5009, lng: -70.4428 },
    { name: "Westbrook", lat: 43.6770, lng: -70.3711 }
  ],
  Massachusetts: [
    { name: "Boston", lat: 42.3601, lng: -71.0589 },
    { name: "Worcester", lat: 42.2626, lng: -71.8023 },
    { name: "Springfield", lat: 42.1015, lng: -72.5898 },
    { name: "Lowell", lat: 42.6334, lng: -71.3162 },
    { name: "Cambridge", lat: 42.3736, lng: -71.1097 },
    { name: "New Bedford", lat: 41.6362, lng: -70.9342 },
    { name: "Brockton", lat: 42.0834, lng: -71.0184 },
    { name: "Quincy", lat: 42.2529, lng: -71.0023 },
    { name: "Lynn", lat: 42.4668, lng: -70.9495 },
    { name: "Fall River", lat: 41.7015, lng: -71.1550 }
  ],
  NewYork: [
    { name: "New York City", lat: 40.7128, lng: -74.0060 },
    { name: "Buffalo", lat: 42.8864, lng: -78.8784 },
    { name: "Rochester", lat: 43.1566, lng: -77.6088 },
    { name: "Yonkers", lat: 40.9312, lng: -73.8988 },
    { name: "Syracuse", lat: 43.0481, lng: -76.1474 },
    { name: "Albany", lat: 42.6526, lng: -73.7562 },
    { name: "New Rochelle", lat: 40.9115, lng: -73.7824 },
    { name: "Mount Vernon", lat: 40.9126, lng: -73.8371 },
    { name: "Schenectady", lat: 42.8142, lng: -73.9396 },
    { name: "Utica", lat: 43.1009, lng: -75.2327 }
  ],
  Seattle: [
    { name: "Seattle", lat: 47.6062, lng: -122.3321 },
    { name: "Bellevue", lat: 47.6104, lng: -122.2007 },
    { name: "Tacoma", lat: 47.2529, lng: -122.4443 },
    { name: "Kent", lat: 47.3809, lng: -122.2348 },
    { name: "Everett", lat: 47.9780, lng: -122.2021 },
    { name: "Renton", lat: 47.4829, lng: -122.2171 },
    { name: "Federal Way", lat: 47.3223, lng: -122.3126 },
    { name: "Kirkland", lat: 47.6769, lng: -122.2053 },
    { name: "Auburn", lat: 47.3073, lng: -122.2285 },
    { name: "Marysville", lat: 48.0518, lng: -122.1771 }
  ]
};

const App = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <div className="App">
          <Navbar user={user} handleLogout={handleLogout} />
          <div className="content">
            <Routes>
              <Route path="/register" element={<SignupView />} />
              <Route path="/login" element={<LoginView setUser={handleLoginSuccess} />} />
              <Route path="/content" element={<ContentView cities={contentCities} />} />
              <Route path="/details/:id" element={<DetailsView />} />
              <Route path="/checkout/:id" element={<CheckoutPage />} />
              <Route path="/reviews-location" element={<MapComponent cities={mapCities} />} /> {/* Map Component Route */}
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
