// // src/App.js
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import SignupView from './components/SignupView';
// import LoginView from './components/LoginView';
// import ContentView from './components/ContentView';
// import './App.css';

// const cities = {
//   Maine: [
//     "Portland", "Lewiston", "Bangor", "South Portland", "Auburn",
//     "Biddeford", "Sanford", "Brunswick", "Saco", "Westbrook"
//   ],
//   Massachusetts: [
//     "Boston", "Worcester", "Springfield", "Lowell", "Cambridge",
//     "New Bedford", "Brockton", "Quincy", "Lynn", "Fall River"
//   ]
// };

// const App = () => {
//   const [user, setUser] = useState(null);

//   const handleLoginSuccess = (userData) => {
//     setUser(userData);
//   };

//   return (
//     <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
//       <Router>
//         <div className="App">
//           <nav className="navbar">
//             <div className="logo">
//               <Link to="/">
//                 <img src="/images/Quickserve.jpeg" alt="Quickserve Logo" />
//                 <span className="company-name">Quickserve</span>
//               </Link>
//             </div>
//             <div className="navbar-links">
//               <Link to="/register" className="navbar-link">Register as Professional</Link>
//               <Link to="/login" className="navbar-link">Login / Sign Up</Link>
//               <Link to="/content" className="navbar-link">Request a Service</Link>
//             </div>
//           </nav>
//           <div className="content">
//             <Routes>
//               <Route path="/register" element={<SignupView />} />
//               <Route path="/login" element={<LoginView setUser={handleLoginSuccess} />} />
//               <Route path="/content" element={<ContentView cities={cities} />} />
//               <Route path="/" element={
//                 user ? (
//                   <Navigate to="/content" />
//                 ) : (
//                   <>
//                     <div className="welcome-section">
//                       <h1>Welcome to Quickserve</h1>
//                       <p>Your one-stop solution for instant, affordable services</p>
//                     </div>
//                     <div className="services-offered">
//                       <h2>Services Offered</h2>
//                       <div className="services-list">
//                         <Link to="/" className="service-item">
//                           <img src="images/barber.jpeg" alt="Barber" />
//                           <p>Barber</p>
//                         </Link>
//                         <Link to="/" className="service-item">
//                           <img src="images/snow.jpeg" alt="Snow Removal" />
//                           <p>Snow Removal</p>
//                         </Link>
//                         <Link to="/" className="service-item">
//                           <img src="images/plumber.png" alt="Garden Cleaner" />
//                           <p>Plumber</p>
//                         </Link>
//                         <Link to="/" className="service-item">
//                           <img src="images/mechanic.jpeg" alt="Mechanic" />
//                           <p>Mechanic</p>
//                         </Link>
//                         <Link to="/" className="service-item">
//                           <img src="images/carpenter.jpeg" alt="Mechanic" />
//                           <p>Carpenter</p>
//                         </Link>
//                       </div>
//                     </div>
//                     <div className="why-us">
//                       <h2>Why Us?</h2>
//                       <div className="why-us-items">
//                         <div className="why-us-item">
//                           <Link to="/">
//                             <img src="images/24_7.png" alt="On Call Instant Service" />
//                           </Link>
//                           <p>On Call Instant Service</p>
//                         </div>
//                         <div className="why-us-item">
//                           <Link to="/">
//                             <img src="/images/affordable.png" alt="Affordable" />
//                           </Link>
//                           <p>Affordable</p>
//                         </div>
//                         <div className="why-us-item">
//                           <Link to="/">
//                             <img src="images/experts.png" alt="Experts" />
//                           </Link>
//                           <p>Experts</p>
//                         </div>
//                         <div className="why-us-item">
//                           <Link to="/">
//                             <img src="/images/easy_to_book.png" alt="Easy to Book" />
//                           </Link>
//                           <p>Easy to Book</p>
//                         </div>
//                         <div className="why-us-item">
//                           <Link to="/">
//                             <img src="/images/min_wait_time.png" alt="Minimal Wait Time" />
//                           </Link>
//                           <p>Minimal Wait Time</p>
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 )
//               } />
//             </Routes>
//           </div>
//         </div>
//       </Router>
//     </GoogleOAuthProvider>
//   );
// };

// export default App;

// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignupView from './components/SignupView';
import LoginView from './components/LoginView';
import ContentView from './components/ContentView';
import Navbar from './components/Navbar';  // Import Navbar component
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
          <Navbar user={user} handleLogout={handleLogout} />  {/* Use Navbar component */}
          <div className="content">
            <Routes>
              <Route path="/register" element={<SignupView />} />
              <Route path="/login" element={<LoginView setUser={handleLoginSuccess} />} />
              <Route path="/content" element={<ContentView cities={cities} />} />
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
                          <img src="/images/affordable.png" alt="Affordable" />
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
