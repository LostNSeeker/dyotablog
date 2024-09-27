import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const auth = localStorage.getItem('username');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <Link to="/">Dyota</Link>
          </div>
          <div className="navbar-buttons">
            {auth ? (
                <div className="flex items-center space-x-1">
                  <span className="text-gray-1000 text-center">Hello, {JSON.parse(auth).username}</span>
                  <button onClick={logout} className="btn logout flex justify-around">Logout</button>
                </div>
            ) : (
                <>
                  <Link to="/login" className="btn login">Log in</Link>
                  <Link to="/signup" className="btn signup">Sign up</Link>
                </>
            )}
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <div className={`bar ${isOpen ? 'open' : ''}`}></div>
            <div className={`bar ${isOpen ? 'open' : ''}`}></div>
            <div className={`bar ${isOpen ? 'open' : ''}`}></div>
          </div>
          <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/Blog-form">Create Blog</Link></li>
              <li><Link to="/resources">Resources</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
            </ul>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
