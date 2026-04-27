import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Add this inside your footer-container div in Footer.jsx */}
<div className="footer-social">
  <h3>Follow the Ritual</h3>
  <div className="social-icons">
    <a href="https://instagram.com" target="_blank" rel="noreferrer">
      <i className="fab fa-instagram"></i> Instagram
    </a>
    <a href="https://facebook.com" target="_blank" rel="noreferrer">
      <i className="fab fa-facebook"></i> Facebook
    </a>
  </div>
</div>
        <div className="footer-brand">
          <h2 className="footer-logo">CACAOSAP</h2>
          <p>Premium Cacao for a better life.</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products/sustainability">Sustainability</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-support">
          <h3>Support</h3>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/shipping">Shipping Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CACAOSAP. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;