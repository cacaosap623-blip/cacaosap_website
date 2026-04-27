import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
// Final Term Upgrade: Using professional icons
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // EMPTY STATE POLISH
  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "120px 20px", textAlign: "center", backgroundColor: "#FAF9F6", minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <ShoppingBag size={64} color="#d7ccc8" style={{ marginBottom: "20px" }} />
        <h1 style={{ color: "#3e2723", fontSize: "2.5rem", marginBottom: "10px" }}>Your Cart is Empty</h1>
        <p style={{ color: "#8d6e63", maxWidth: "400px", lineHeight: "1.6" }}>Looks like you haven’t started your ritual journey yet. Explore our curated cacao collections.</p>
        <Link to="/products/wellness">
          <button style={{ 
            marginTop: "30px", 
            padding: "15px 40px", 
            backgroundColor: "#ff6d00", 
            color: "white", 
            border: "none", 
            borderRadius: "50px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(255, 109, 0, 0.3)"
          }}>
            Explore Products
          </button>
        </Link>
      </div>
    );
  }

  return (
  // Change this line (around line 36)
<div style={{ padding: "160px 5% 60px", backgroundColor: "#FAF9F6", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        <header style={{ marginBottom: "40px", borderBottom: "1px solid #e0e0e0", paddingBottom: "20px" }}>
          <h1 style={{ color: "#3e2723", fontSize: "2.2rem", margin: 0 }}>Your Ritual Selection</h1>
          <p style={{ color: "#8d6e63", marginTop: "5px" }}>{cartItems.length} Items in your bag</p>
        </header>

       <div className="cart-flex-container">
          
          {/* ITEM LIST SECTION */}
          <div className="cart-items-container">
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                  marginBottom: "20px",
                  padding: "25px",
                  borderRadius: "20px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.02)",
                  transition: "transform 0.2s ease"
                }}
              >
                {/* Product Image */}
                <div style={{ width: "100px", height: "100px", backgroundColor: "#f5f5f5", borderRadius: "15px", marginRight: "25px", overflow: "hidden" }}>
                   {item.img ? (
                     <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                   ) : (
                     <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>📦</div>
                   )}
                </div>

                <div style={{ flex: 2 }}>
                  <h3 style={{ margin: "0 0 5px 0", color: "#3e2723", fontSize: "1.2rem" }}>{item.name}</h3>
                  <p style={{ color: "#ff6d00", fontWeight: "700", fontSize: "1.1rem" }}>฿{item.price.toLocaleString()}</p>
                </div>

                {/* Final Term Upgrade: Professional Quantity Controls */}
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", backgroundColor: "#f9f8f6", padding: "8px 15px", borderRadius: "50px" }}>
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: item.quantity <= 1 ? "#ccc" : "#3e2723" }}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={18} />
                    </button>
                    
                    <span style={{ fontWeight: "bold", fontSize: "1.1rem", minWidth: "25px", textAlign: "center" }}>{item.quantity}</span>
                    
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: "#3e2723" }}
                    >
                      <Plus size={18} />
                    </button>
                </div>

                <div style={{ flex: 1, textAlign: "right", margin: "0 20px" }}>
                  <strong style={{ fontSize: "1.3rem", color: "#3e2723" }}>
                    ฿{(item.price * item.quantity).toLocaleString()}
                  </strong>
                </div>

                {/* Remove Button with Trash Icon */}
               <button 
  onClick={() => {
    console.log("Removing item:", item.id); // This helps you check if it works in the console
    removeFromCart(item.id);
  }}
  style={{ 
    background: "#fff1f0", 
    border: "1px solid #ffa39e", 
    color: "#f5222d", 
    cursor: "pointer", 
    padding: "12px", 
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
    zIndex: 10,           // Pushes it to the front
    pointerEvents: "auto" // Ensures the mouse can "see" it
  }}
  // Added a hover effect to make it look professional
  onMouseOver={(e) => e.currentTarget.style.background = "#ffd8d6"}
  onMouseOut={(e) => e.currentTarget.style.background = "#fff1f0"}
>
  <Trash2 size={20} />
</button>
              </div>
            ))}
          </div>

          {/* STICKY SUMMARY SECTION */}
      <div className="order-summary-sidebar">
            <div style={{ backgroundColor: "#3e2723", padding: "40px", borderRadius: "24px", color: "white", boxShadow: "0 20px 40px rgba(62, 39, 35, 0.2)" }}>
              <h3 style={{ marginBottom: "25px", color: "white", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "15px", fontSize: "1.5rem" }}>Order Summary</h3>
              
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", color: "rgba(255,255,255,0.7)" }}>
                <span>Items Subtotal</span>
                <span>฿{total.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "25px", color: "rgba(255,255,255,0.7)" }}>
                <span>Shipping</span>
                <span style={{ color: "#81c784", fontWeight: "bold" }}>Free Ritual Delivery</span>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "2rem", fontWeight: "bold", color: "white", marginTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px" }}>
                <span>Total</span>
                <span>฿{total.toLocaleString()}</span>
              </div>

              <button 
                onClick={() => navigate("/checkout")}
                style={{ 
                  marginTop: "30px", 
                  width: "100%",
                  padding: "20px", 
                  backgroundColor: "#ff6d00", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "50px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
                }}
              >
                Proceed to Checkout <ArrowRight size={20} />
              </button>
              
              <p style={{ textAlign: "center", marginTop: "25px", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
                Complimentary sustainable packaging included.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;