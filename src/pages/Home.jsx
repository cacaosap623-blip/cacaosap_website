import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";

// Local image imports
import farmImg from '../assets/farm.jpg';
import wellnessImg from '../assets/wellness.png';
import medicalImg from '../assets/medical.jpg';
import sportImg from '../assets/sport.jpg';

const Home = () => {
  const categories = [
    { name: 'Wellness', img: wellnessImg, tilt: '-5deg' },
    { name: 'Sport', img: sportImg, tilt: '3deg' },
    { name: 'Healthcare', img: medicalImg, tilt: '-3deg' },
    { name: 'Sustainability', img: farmImg, tilt: '5deg' }
  ];

  return (
    <div className="home-wrapper">
      {/* 1. HERO SECTION - Now focuses on the Brand Message */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h3>THE ULTIMATE SUPERFOOD</h3>
            <h1>
              Harness the Pure <br /> 
              Power of Cacao for <br /> 
              <span className="orange-text">Everything</span>
            </h1>
            <p className="hero-subtitle">
              Discover the ancient secrets of premium cacao tailored for your modern lifestyle.
            </p>
            <a href="#about" className="explore-btn">Learn Our Story ↓</a>
          </div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION - Appears first to build trust */}
      <section id="about" className="about-preview">
        <div className="about-container">
          <div className="about-content">
            <h2 className="section-title">Why CACAO<span className="orange-text">SAP</span>?</h2>
            <p>
              We believe that wellness shouldn't be complicated. By sourcing the highest quality 
              cacao from sustainable farms, we create specialized formulas that support your 
              physical performance, mental clarity, and overall healthcare.
            </p>
            <Link to="/about" className="text-link">Read our full mission →</Link>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATEGORIES - The "Tilted Grid" follows the introduction */}
      <section className="products-preview">
        <div className="section-header">
          <h2 className="section-title">Explore Our Categories</h2>
        </div>
        <div className="tilted-grid">
          {categories.map((cat) => (
            <Link to={`/products/${cat.name.toLowerCase()}`} key={cat.name} className="card-link">
              <div style={{ transform: `rotate(${cat.tilt})` }}>
                <div className="tilted-card" style={{ backgroundImage: `url(${cat.img})` }}>
                  <div className="card-label">
                    <h2>{cat.name}</h2>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;