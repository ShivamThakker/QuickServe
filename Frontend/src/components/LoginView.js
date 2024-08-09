import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginView({ setUser }) {
  const navigate = useNavigate();
  const onSuccess = async (res) => {
    const token = res.credential; // Get the token from Google response
    const tokenData = jwtDecode(token);

    console.log('Login Success: Token received:', token); // Debug: Log the token
    console.log('Login Success: Token data:', tokenData); // Debug: Log the decoded token data

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/login`, { token });
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      console.log('Login Success: currentUser:', response.data);
      navigate('/content');
      // Redirect to homepage or any other page
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
        auto_select={true}
      />
    </div>
  );
}

export default LoginView;
