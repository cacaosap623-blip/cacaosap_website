import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>Your Selection</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="drawer-items">
          {cartItems.length === 0 ? (
            <p className="empty-msg">Your ritual cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="drawer-item">
                <img src={item.img} alt={item.name} className="drawer-img" />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>฿{item.price.toLocaleString()}</p>
                  <div className="qty-controls">
                    <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
                <button className="delete-btn" onClick={() => removeFromCart(item.id)}>🗑</button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <div className="total-row">
              <span>Total</span>
              <span>฿{total.toLocaleString()}</span>
            </div>
            <button 
              className="checkout-btn" 
              onClick={() => { onClose(); navigate('/checkout'); }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;