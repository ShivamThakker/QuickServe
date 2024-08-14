import React, { useState } from 'react';
import axios from 'axios';
import './SignupView.css';

const SignupView = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phoneNumber', phoneNumber);
    formData.append('email', email);
    formData.append('service', service);
    formData.append('hourlyRate', hourlyRate);
    formData.append('photo', photo);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/signup`, formData);
      setMessage({ type: 'success', text: 'User registered successfully' });
      clearForm();
    } catch (error) {
      setMessage({ type: 'error', text: 'User with this email id already registered' });
    }
  };

  const clearForm = () => {
    setName('');
    setPhoneNumber('');
    setEmail('');
    setService('');
    setHourlyRate('');
    setPhoto(null);
    document.getElementById('photoInput').value = '';
  };

  return (
    <div className="signup-view">
      <h1 className="title">User Registration</h1>
      <div className="form-container">
        {message && (
          <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
            {message.text}
          </div>
        )}
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="input-field"
        />
        <input 
          type="text" 
          placeholder="Phone Number (with country code)" 
          value={phoneNumber} 
          onChange={(e) => setPhoneNumber(e.target.value)} 
          className="input-field"
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="input-field"
        />
        <input 
          type="text" 
          placeholder="Services You Want To Provide" 
          value={service} 
          onChange={(e) => setService(e.target.value)} 
          className="input-field"
        />
        <input 
          type="text" 
          placeholder="Per Hour Rate in USD" 
          value={hourlyRate} 
          onChange={(e) => setHourlyRate(e.target.value)} 
          className="input-field"
        />
        <input 
          type="file" 
          id="photoInput"
          onChange={(e) => setPhoto(e.target.files[0])} 
          className="input-field file-input"
        />
        <button onClick={handleSignup} className="submit-button">Submit</button>
      </div>
    </div>
  );
}

export default SignupView;
 