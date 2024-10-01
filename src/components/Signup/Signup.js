import React, { useState } from 'react';
import './Signup.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
      fullName: '',
      username: '', // New username field
      email: '',
      password: '',
      confirmPassword: '',
    });
    
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const validateForm = () => {
        const newErrors = {};
        const { fullName, username, email, password, confirmPassword } = formData;
      
        if (!fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!username.trim()) newErrors.username = 'Username is required'; // Validation for username
      
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
          newErrors.email = 'Enter a valid email';
        }
      
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!password) {
          newErrors.password = 'Password is required';
        } else if (!passwordRegex.test(password)) {
          newErrors.password = 'Password must contain at least 8 characters, including uppercase, lowercase, number, and a special character';
        }
      
        if (password !== confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
      
        return newErrors;
    };      
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length === 0) {
        console.log('Form submitted successfully:', formData);
        setShowModal(true);
      } else {
        setErrors(validationErrors);
      }
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
  
    return (
      <div className="signup-container">
        <h1>Sign Up</h1>
        <p className="form-instruction">Please fill in all the fields below to create your account.</p>
  
        <form onSubmit={handleSubmit} className="signup-form">
          {/* Full Name Field */}
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? 'input-error' : ''}
              placeholder="Enter your full name"
              required
            />
            {errors.fullName && <span className="error-text">{errors.fullName}</span>}
          </div>
  
          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'input-error' : ''}
              placeholder="Choose a username"
              required
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              placeholder="Enter your email"
              required
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
  
          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
              placeholder="Enter a password (min. 8 characters)"
              required
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
  
          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'input-error' : ''}
              placeholder="Confirm your password"
              required
            />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>
  
          <button type="submit" className="submit-button">Sign Up</button>
        </form>
  
        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Verify Your Email</h2>
              <p>A verification email has been sent to <strong>{formData.email}</strong>. Please check your inbox and follow the instructions to complete the registration process.</p>
              <button onClick={closeModal} className="close-modal-button">Close</button>
            </div>
          </div>
        )}
      </div>
    );
};

export default SignUp;
