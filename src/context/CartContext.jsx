import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Cart retrieval error:", error);
      return [];
    }
  });

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // 1. Add to Cart Logic
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // 2. Update Quantity (Prevent negative numbers)
  const updateQuantity = (id, change) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // 3. Remove Item Logic (Fixed: Now properly exported)
  const removeFromCart = (id) => {
    if (window.confirm("Remove this ritual from your selection?")) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // 4. Clear Cart (Great for after a successful checkout)
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      updateQuantity, 
      removeFromCart, // Required for your Trash icon to work
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};