import { useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  const [showDevelopers, setShowDevelopers] = useState(false);


  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Tech Hub</h3>
          <p>Your all-in-one solution for text and image processing tasks.</p>
        </div>

        <div className="footer-section">
          <h3>Features</h3>
          <ul>
            <li><a href="#remove-bg">Remove Background</a></li>
            <li><a href="#image-to-text">Image to Text</a></li>
            <li><a href="#summarizer">Summarizer</a></li>
            <li><a href="#paraphrase">Paraphrase</a></li>
            <li><a href="#grammar-fix">Grammar Fix</a></li>
            <li><a href="#qr-generator">QR Generator</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Tech Hub. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
