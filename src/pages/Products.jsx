import React from 'react';
import { useParams } from 'react-router-dom';
import "../App.css";
import { useCart } from "../context/CartContext";

// 1. ALL ASSET IMPORTS (Make sure these paths match your folder)
import wellness1 from '../assets/Anti-Aging 6D5N Cacao Ritual.png';
import wellness2 from '../assets/Deep Tissue Cacao Butter Massage.png';
import wellness3 from '../assets/Mindful Meditation & Cocoa Breath.png';
import sport1 from '../assets/Aron.png'; 
import sport2 from '../assets/Cacao Jungle Trekking Expedition.png';
import sport3 from '../assets/Surf & Cocoa Recovery Program.png';
import health1 from '../assets/Cardiovascular Cacao Consultation.png';
import health2 from '../assets/Dermatology Cacao Skin Therapy.png';
import health3 from '../assets/Neuro-Focus Cognitive Therapy.png';
import sustain1 from '../assets/Zero-Waste Cacao Farm Workshop.png';
import sustain2 from '../assets/Ethical Sourcing Safari.png';
import sustain3 from '../assets/The Art of Bean-to-Bar Crafting.png';

const Products = () => {
 const { cartItems, addToCart, updateQuantity } = useCart();
  const { category } = useParams(); 
  const productData = {
    wellness: [
      { id: 'w1', name: "Anti-Aging 6D5N Cacao Ritual", price: 187577, type: "Premium Care", img: wellness1, description: "A premium 6-day cellular renewal program using raw cacao antioxidants." },
      { id: 'w2', name: "Deep Tissue Cacao Butter Massage", price: 45000, type: "Therapy", img: wellness2, description: "Intensive muscle recovery treatment with organic warm cacao butter." },
      { id: 'w3', name: "Mindful Meditation & Cocoa Breath", price: 68713, type: "Wellness", img: wellness3, description: "Spiritual cacao ceremony and guided meditation in the heart of the jungle." }
    ],
    sport: [
      { id: 's1', name: "Elite Iron-Man Cacao Fuel Pack", price: 55000, type: "Energy", img: sport1, description: "High-performance endurance training kit with concentrated cacao flavanols." },
      { id: 's2', name: "Cacao Jungle Trekking Expedition", price: 32400, type: "Adventure", img: sport2, description: "Full-day hiking adventure with natural cacao energy snacks provided." },
      { id: 's3', name: "Surf & Cocoa Recovery Program", price: 89900, type: "Recovery", img: sport3, description: "Morning surfing sessions followed by cacao-protein recovery therapy." }
    ],
    healthcare: [
      { id: 'h1', name: "Cardiovascular Cacao Consultation", price: 125000, type: "Medical", img: health1, description: "Heart health assessment and personalized cacao-based dietary planning." },
      { id: 'h2', name: "Dermatology Cacao Skin Therapy", price: 92500, type: "Skin Care", img: health2, description: "Advanced skin repair treatment utilizing pure cacao polyphenols." },
      { id: 'h3', name: "Neuro-Focus Cognitive Therapy", price: 110000, type: "Brain Health", img: health3, description: "Brain health program focusing on cacao's effect on memory and focus." }
    ],
    sustainability: [
      { id: 'su1', name: "Zero-Waste Cacao Farm Workshop", price: 15000, type: "Education", img: sustain1, description: "Hands-on experience in sustainable cacao farming and circular waste management." },
      { id: 'su2', name: "Ethical Sourcing Safari", price: 24800, type: "Eco-Tour", img: sustain2, description: "A tour of fair-trade cacao plantations and local chocolate cooperatives." },
      { id: 'su3', name: "The Art of Bean-to-Bar Crafting", price: 18500, type: "Craft", img: sustain3, description: "Masterclass in creating organic chocolate from fermented Thai cacao beans." }
    ]
  };

  const displayProducts = productData[category] || [];

  return (
    <div className="shop-container">
      <aside className="sidebar">
        <h3>FILTER BY</h3>
        <div className="search-box">
          <input type="text" placeholder="Search rituals..." />
        </div>
        <div className="filter-section">
          <h4>Category</h4>
          <label><input type="checkbox" /> Organic</label>
          <label><input type="checkbox" /> Raw Cacao</label>
          <label><input type="checkbox" /> Premium</label>
        </div>
      </aside>

      <main className="shop-main">
        <header className="shop-header">
          <h1 style={{textTransform: 'capitalize'}}>
            Cacao <span className="orange-text">{category}</span>
          </h1>
          <div className="shop-meta">
            <p>{displayProducts.length} items available</p>
            <div className="sort-by">
              Sort by: <strong>Recommended</strong>
            </div>
          </div>
        </header>

        <div className="product-grid">
          {displayProducts.map((item) => {
            const cartItem = cartItems.find((i) => i.id === item.id);
            const quantity = cartItem ? cartItem.quantity : 0;

            return (
              <div className="item-card" key={item.id}>
                <div className="item-img" style={{ backgroundImage: `url(${item.img})` }}>
                  <div className="description-overlay">
                    <p>{item.description}</p>
                  </div>
                </div>

                <div className="item-details">
                  <span className="product-category">Pure Cacao • {item.type}</span>
                  <h3>{item.name}</h3>

                  <div className="price-action-area">
                    <p className="item-price">from <span>฿{item.price.toLocaleString()}</span></p>
                    
                    <div className="quantity-controls">
                      {quantity === 0 ? (
                        <button 
  className="add-cart-btn" 
  onClick={() => {
    addToCart(item);
    // You could trigger the Cart Drawer to open here
    // setIsCartOpen(true); 
  }}
>
  + Add to Ritual
</button>
                      ) : (
                        <div className="food-app-counter">
                          <button 
                            className="counter-btn" 
                            onClick={() => updateQuantity(item.id, -1)}
                          >−</button>
                          <span className="qty-display">{quantity}</span>
                          <button 
                            className="counter-btn" 
                            onClick={() => updateQuantity(item.id, 1)}
                          >+</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Products;