import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logoImg from '../assets/cacaosap.png';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { cartItems = [] } = useCart();
  
  // 1. State for the Slide-out Menu
  const [menuOpen, setMenuOpen] = useState(false);

  // 2. Calculate Cart Badge Count
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // 3. Helper Functions
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  
  const handleLogout = async () => {
    try {
      await logout();
      closeMenu();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="navbar">
      {menuOpen && <div className="overlay" onClick={closeMenu}></div>}
      {/* --- LOGO SECTION (Always Left) --- */}
      <Link to="/" className="logo-link" onClick={closeMenu}>
        <div className="logo-container">
          <img src={logoImg} alt="CACAOSAP Logo" className="logo-icon" />
          <h1 className="logo-text">
            CACAO<span className="orange-text">SAP</span>
          </h1>
        </div>
      </Link>
     <div className="nav-header-actions">
      {/* CART: Outside the drawer so it's always visible */}
      <Link to="/cart" className="header-cart" onClick={closeMenu}>
        🛒 {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </Link>

      {/* TOGGLE: The Hamburger */}
      <div className={`hamburger ${menuOpen ? 'toggle' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>

      {/* --- THE SLIDE-OUT DRAWER --- */}
      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        {/* Navigation Links */}
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/products/sustainability" onClick={closeMenu}>Sustainability</Link>
        <Link to="/products/wellness" onClick={closeMenu}>Wellness</Link>
        <Link to="/products/healthcare" onClick={closeMenu}>Healthcare</Link>
        <Link to="/products/sport" onClick={closeMenu}>Sport</Link>
        <Link to="/about" onClick={closeMenu}>About Us</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>
        <Link to="/register" onClick={closeMenu}>Register</Link>
        <Link to="/admin" onClick={closeMenu}>Admin</Link>
        
        {/* User Specific Links */}
        {currentUser && (
          <Link to="/my-rituals" className="rituals-link" onClick={closeMenu}>
            My Rituals
          </Link>
        )}

        {/* --- ACTION ITEMS (Cart & Auth) at the bottom of the list --- */}
        <hr className="menu-divider" />
        
      

        {currentUser ? (
          <button onClick={handleLogout} className="cart-link">
            Logout
          </button>
        ) : (
          <Link to="/login" className="cart-link" onClick={closeMenu}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;