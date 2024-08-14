import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Add this if you have custom styling

const Navbar = ({ user, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutAndRedirect = () => {
    handleLogout();
    navigate('/'); // Redirect to the homepage after logging out
  };

  const handleRequestServiceClick = () => {
    if (!user) {
      navigate('/login'); // Redirect to login if user is not logged in
    } else {
      navigate('/content'); // Navigate to request service page if logged in
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="/images/Quickserve.jpeg" alt="Quickserve Logo" />
          <span className="company-name">Quickserve.ai</span>
        </Link>
      </div>
      <div className="navbar-links">
        <button onClick={handleRequestServiceClick} className="navbar-link">Request a Service</button>
        <Link to="/reviews-location" className="navbar-link">Reviews/Location</Link>
        {user ? (
          <>
            <span className="navbar-link">Welcome, {user.name}</span>
            <button onClick={handleLogoutAndRedirect} className="navbar-link logout-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/register" className="navbar-link">Register as Professional</Link>
            <Link to="/login" className="navbar-link">Login / Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
