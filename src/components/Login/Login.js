import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Assuming you have your CSS for styling

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();  // Hook to navigate programmatically

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation (replace with your authentication logic)
    if (username === '' || password === '') {
      setError('Please enter both username and password');
      return;
    }

    // Simulate successful login
    const user = {
      username, // Use username here
      password, // Optional, if you need it later
      photo: 'https://via.placeholder.com/40' // Placeholder profile image
    };

    onLogin(user);  // Pass the user info to the parent component (App.js)
    
    // Redirect to homepage after login
    navigate('/');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
