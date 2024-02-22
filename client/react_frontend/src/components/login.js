// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../login.css'
import axios from 'axios';

const Login = (props) => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      props.setToken(response.data.access_token);
      setLoading(false);
      navigate('/search');
      
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data.message : error.message);
      setError('Login failed. Please check your credentials and try again.');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Login;
