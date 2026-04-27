import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useCart } from '../context/CartContext'; 
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import "../App.css";

const Checkout = () => {
  const { cartItems, clearCart } = useCart(); 
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({ 
    name: currentUser?.displayName || '', 
    phone: '', 
    address: '' 
  });
  
  const [orderId, setOrderId] = useState(null); // Added to show confirmation number
  const [isOrdered, setIsOrdered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cartItems ? cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) : 0;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (!cartItems || cartItems.length === 0) {
      return alert("Your ritual cart is empty!");
    }

    setIsSubmitting(true);
    try {
      // Save order to Firestore
      const docRef = await addDoc(collection(db, "orders"), {
        userId: currentUser?.uid || "guest", 
        customer,
        items: cartItems,
        total,
        status: "New Order",
        createdAt: new Date()
      });
      
      setOrderId(docRef.id); // Save the Firestore ID
      setIsOrdered(true);
      clearCart(); 
    } catch (error) {
      console.error("Order Error:", error);
      alert("Failed to place order. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS VIEW
  if (isOrdered) {
    return (
      <div className="checkout-page-wrapper fade-in" style={{ padding: "100px 20px", textAlign: 'center' }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "white", padding: "50px", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: '5rem', color: '#4CAF50', marginBottom: '10px' }}>✓</div>
          <h1 style={{ color: "#3e2723", marginBottom: "10px" }}>Ritual Confirmed</h1>
          <p style={{ color: "#666", marginBottom: "5px" }}>Thank you, {customer.name}. Your journey begins shortly.</p>
          <p style={{ fontSize: "0.9rem", color: "#999" }}>Order Confirmation: <span style={{ color: "#ff6d00", fontWeight: "bold" }}>{orderId?.substring(0, 8).toUpperCase()}</span></p>
          
          <button 
            onClick={() => navigate("/")} 
            className="submit-btn"
            style={{ marginTop: '40px', padding: '15px 50px', backgroundColor: '#3e2723', color: 'white', borderRadius: "50px", border: 'none', cursor: 'pointer', fontWeight: "bold" }}
          >
            Return to Sanctuary
          </button>
        </div>
      </div>
    );
  }

  // CHECKOUT FORM VIEW
  return (
    <div className="checkout-page-wrapper" style={{ padding: "60px 10%", backgroundColor: "#FAF9F6", minHeight: "100vh" }}>
      <div className="checkout-container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ color: "#3e2723", marginBottom: "40px", fontSize: "2.5rem" }}>Finalize Your Ritual</h1>
        
        <div className="checkout-layout">
          
          {/* Form Section */}
          <form onSubmit={handlePlaceOrder} className="checkout-form" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h3 style={{ color: "#3e2723", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>Delivery Details</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <label style={{ fontSize: "0.8rem", color: "#888", marginBottom: "-10px" }}>Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Somchai Cacao" 
                  value={customer.name}
                  required 
                  style={{ padding: "15px", borderRadius: "8px", border: "1px solid #eee", backgroundColor: "white" }}
                  onChange={(e) => setCustomer({...customer, name: e.target.value})} 
                />
                
                <label style={{ fontSize: "0.8rem", color: "#888", marginBottom: "-10px" }}>Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="081-XXX-XXXX" 
                  required 
                  style={{ padding: "15px", borderRadius: "8px", border: "1px solid #eee", backgroundColor: "white" }}
                  onChange={(e) => setCustomer({...customer, phone: e.target.value})} 
                />
                
                <label style={{ fontSize: "0.8rem", color: "#888", marginBottom: "-10px" }}>Shipping Address</label>
                <textarea 
                  placeholder="Street name, Building, City, Zip Code" 
                  required 
                  style={{ padding: "15px", borderRadius: "8px", border: "1px solid #eee", backgroundColor: "white", minHeight: "120px", resize: "none" }}
                  onChange={(e) => setCustomer({...customer, address: e.target.value})} 
                />
            </div>

            <button 
              type="submit" 
              className="submit-btn" 
              disabled={isSubmitting || cartItems.length === 0}
              style={{ 
                backgroundColor: isSubmitting ? "#8d6e63" : "#3e2723", 
                color: "white", 
                padding: "20px", 
                cursor: isSubmitting ? "not-allowed" : "pointer", 
                fontWeight: "bold",
                fontSize: "1.1rem",
                borderRadius: "12px",
                border: "none",
                marginTop: "10px",
                transition: "0.3s"
              }}
            >
              {isSubmitting ? "Processing Ritual..." : `Pay ฿${total.toLocaleString()}`}
            </button>
          </form>

          {/* Summary Section */}
          <div className="order-summary" style={{ background: "white", padding: "40px", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", height: "fit-content" }}>
            <h3 style={{ marginBottom: "25px", color: "#3e2723" }}>Order Summary</h3>
            <div style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "10px" }}>
              {cartItems.map((item, index) => (
                <div key={index} style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", alignItems: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: "600", color: "#3e2723" }}>{item.name}</span>
                    <span style={{ fontSize: "0.85rem", color: "#888" }}>Quantity: {item.quantity}</span>
                  </div>
                  <span style={{ fontWeight: "600" }}>฿{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: "30px", borderTop: "2px solid #FAF9F6", paddingTop: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", color: "#888" }}>
                <span>Subtotal</span>
                <span>฿{total.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", color: "#888" }}>
                <span>Shipping</span>
                <span style={{ color: "#4CAF50", fontWeight: "bold" }}>FREE</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.6rem", fontWeight: "bold", color: "#3e2723" }}>
                <span>Total</span>
                <span>฿{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );// Example for your checkout page button
<button 
  className="pay-button" 
  onClick={() => window.location.href = 'https://buy.stripe.com/test_9B6aEQgjuduAe9i0nCe7m00'}
>
  Pay ฿32,400
</button>
};

export default Checkout;