// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="/images/Quickserve.jpeg" alt="Quickserve Logo" />
          <span className="company-name">Quickserve</span>
        </Link>
      </div>
      <div className="navbar-links">
        {user ? (
          <>
            <span className="navbar-link">Welcome, {user.name}</span>
            <button onClick={handleLogout} className="navbar-link">Logout</button>
          </>
        ) : (
          <>
            <Link to="/register" className="navbar-link">Register as Professional</Link>
            <Link to="/login" className="navbar-link">Login / Sign Up</Link>
          </>
        )}
        <Link to="/content" className="navbar-link">Request a Service</Link>
      </div>
    </nav>
  );
};

export default Navbar;
