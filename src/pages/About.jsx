import React from 'react';
import "../App.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="about-title">Our Story</h1>
        <p className="about-subtitle">Bringing the ancient ritual of pure cacao to the modern world.</p>
        <div className="about-image">
  <img 
    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000" 
    alt="Sustainably sourced cacao" 
    className="brand-image"
  />
</div>
        <div className="about-content-box">
          <h2 className="mission-header">The CACAOSAP Mission</h2>
          <p>
            At CACAOSAP, we believe in the transformative power of 100% pure, 
            sustainably sourced cacao. Our journey started with a simple goal: 
            to provide clean energy and wellness through nature's most 
            potent superfood.
          </p>
          <section className="about-ritual">
  <h2>The Ritual</h2>
  <div className="ritual-steps">
    <p>1. Whisk with hot water or plant milk.</p>
    <p>2. Set an intention for your day.</p>
    <p>3. Sip slowly and feel the natural energy.</p>
  </div>
</section>
        </div>
      </div>
    </div>
    
  );
};

export default About;