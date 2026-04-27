import React, { useState } from 'react';
import { db } from '../firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import "../App.css";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // We send to a collection named "messages"
      await addDoc(collection(db, "messages"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        sentAt: new Date()
      });
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' }); // Clear form AFTER success
    } catch (error) {
      console.error("Firebase Error:", error.message);
      alert("Submission failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page-wrapper">
      <section className="contact-container">
     {isSubmitted ? (
  <div className="success-message fade-in-up"> {/* Added class here */}
    <div className="success-icon">✓</div>
    <h1>Thank You!</h1>
    <p>Your message has been saved to our database.</p>
    <button className="submit-btn" onClick={() => setIsSubmitted(false)}>
      Send Another
    </button>
  </div>
) : (
          <>
            <h1>Get in Touch</h1>
            <p>Have questions about our Pure Cacao rituals? Send us a message.</p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input 
                type="text" 
                placeholder="Your Name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
              <textarea 
                placeholder="How can we help you?" 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required 
              ></textarea>
              
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
              
            </form>
        
          </>
        )}
      </section>
    </div>
  );
};

export default Contact;