import React, { useState } from 'react';
import './SignupView.css';

const SignupView = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');

  const handleSignup = () => {
    // Handle signup logic here
    console.log('Signing up with', name, phoneNumber, email, service, hourlyRate);
  };

  return (
    <div className="signup-view">
      <h1>User Registration</h1>
      <div className="form-container">
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Phone Number (with country code)" 
          value={phoneNumber} 
          onChange={(e) => setPhoneNumber(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Services You Want To Provide" 
          value={service} 
          onChange={(e) => setService(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Per Hour Rate in USD" 
          value={hourlyRate} 
          onChange={(e) => setHourlyRate(e.target.value)} 
        />
        <button className="upload-button">Upload Photo</button>
        <button onClick={handleSignup} className="submit-button">Submit</button>
      </div>
    </div>
  );
}

export default SignupView;
