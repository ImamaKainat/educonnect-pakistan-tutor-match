
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <span className="logo-text">EduConnect<span className="logo-highlight">Pakistan</span></span>
            </Link>
          </div>
          
          <div className="mobile-menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          
          <nav className={`navigation ${menuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/tutors" className="nav-link">Find Tutors</Link>
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>
          
          <div className="auth-actions">
            {isAuthenticated ? (
              <div className="profile-menu">
                <div className="avatar" onClick={toggleProfileMenu}>
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <div className="avatar-placeholder">{user.name.charAt(0)}</div>
                  )}
                </div>
                
                <div className={`dropdown-menu ${profileMenuOpen ? 'active' : ''}`}>
                  <div className="dropdown-header">
                    <p>{user.name}</p>
                    <small>{user.email}</small>
                  </div>
                  
                  <Link to="/profile" className="dropdown-item">
                    <i className="icon profile-icon"></i>
                    <span>Profile</span>
                  </Link>
                  
                  {user.role === 'student' && (
                    <>
                      <Link to="/sessions" className="dropdown-item">
                        <i className="icon sessions-icon"></i>
                        <span>My Sessions</span>
                      </Link>
                      <Link to="/wishlist" className="dropdown-item">
                        <i className="icon wishlist-icon"></i>
                        <span>Wishlist</span>
                      </Link>
                    </>
                  )}
                  
                  {user.role === 'tutor' && (
                    <Link to="/tutor-dashboard" className="dropdown-item">
                      <i className="icon dashboard-icon"></i>
                      <span>Dashboard</span>
                    </Link>
                  )}
                  
                  {user.role === 'admin' && (
                    <Link to="/admin-dashboard" className="dropdown-item">
                      <i className="icon dashboard-icon"></i>
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  
                  <div className="dropdown-divider"></div>
                  
                  <button onClick={handleLogout} className="dropdown-item">
                    <i className="icon logout-icon"></i>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-outline">Login</Link>
                <Link to="/signup" className="btn btn-primary">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
