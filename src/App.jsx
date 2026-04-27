import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar'; // Import your logic-heavy Navbar
import Footer from './components/Footer';
import Home from "./pages/Home.jsx"; 
import Products from "./pages/Products.jsx"; 
import Contact from "./pages/Contact.jsx"; 
import About from './pages/About';
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import MyRituals from './pages/MyRituals';
import Admin from "./pages/Admin";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Use the component that has the hamburger menu logic */}
        <Navbar /> 

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-rituals" element={<MyRituals />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;