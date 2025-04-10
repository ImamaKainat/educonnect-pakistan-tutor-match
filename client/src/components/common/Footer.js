
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">EduConnect Pakistan</h3>
            <p className="footer-text">
              Connecting students with qualified tutors across Pakistan for quality education.
            </p>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">Home</Link>
              </li>
              <li>
                <Link to="/tutors" className="footer-link">Find Tutors</Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">For Tutors</h3>
            <ul className="footer-links">
              <li>
                <Link to="/join-as-tutor" className="footer-link">Become a Tutor</Link>
              </li>
              <li>
                <Link to="/tutor-resources" className="footer-link">Resources</Link>
              </li>
              <li>
                <Link to="/tutor-faq" className="footer-link">FAQ</Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <address className="footer-address">
              <p>Lahore, Pakistan</p>
              <p>Email: info@educonnect.pk</p>
              <p>Phone: +92 300 1234567</p>
            </address>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} EduConnect Pakistan. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="/terms" className="footer-link">Terms of Service</Link>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
