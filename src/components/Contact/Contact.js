import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>We’d love to hear from you! Get in touch with us for any queries, suggestions, or collaborations.</p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <h2>Send Us a Message</h2>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea id="message" rows="5" placeholder="Enter your message" required></textarea>
          </div>
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
