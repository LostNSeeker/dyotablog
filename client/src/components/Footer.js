import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo-section">
            <div className="footer-logo">
              <a href="/">
                <img src="your-logo-url.png" alt="Dyota" />
              </a>
            </div>
            <p className="footer-description">
              Design amazing digital experiences that create more happiness in the world.
            </p>
            <div className="footer-award">
              <p>⭐️ Best Design Tool</p>
              <p>2,000+ reviews</p>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h3>Product</h3>
              <ul>
                <li><a href="/overview">Overview</a></li>
                <li><a href="/features">Features</a></li>
                <li><a href="/solutions">Solutions <span className="highlight">New</span></a></li>
                <li><a href="/tutorials">Tutorials</a></li>
                <li><a href="/pricing">Pricing</a></li>
                <li><a href="/releases">Releases</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Resources</h3>
              <ul>
                <li><a href="/blog">Blog <span className="highlight">Blog</span></a></li>
                <li><a href="/newsletter">Newsletter</a></li>
                <li><a href="/events">Events</a></li>
                <li><a href="/help-centre">Help centre</a></li>
                <li><a href="/tutorials">Tutorials</a></li>
                <li><a href="/support">Support</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Company</h3>
              <ul>
                <li><a href="/about">About us</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/press">Press</a></li>
                <li><a href="/news">News</a></li>
                <li><a href="/media-kit">Media kit</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Legal</h3>
              <ul>
                <li><a href="/terms">Terms</a></li>
                <li><a href="/privacy">Privacy</a></li>
                <li><a href="/cookies">Cookies</a></li>
                <li><a href="/licenses">Licenses</a></li>
                <li><a href="/settings">Settings</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Dyota. All rights reserved.</p>
          <div className="footer-social-icons">
            <a href="https://facebook.com"><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
            <a href="https://instagram.com"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
            <a href="https://linkedin.com"><FontAwesomeIcon icon={faLinkedin} size="2x" /></a>
            <a href="https://twitter.com"><FontAwesomeIcon icon={faTwitter} size="2x" /></a>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
