import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { CartDrawer } from './components/CartDrawer';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { ProductGrid } from './components/ProductGrid';
import { ContactForm } from './components/ContactForm';
import { CheckoutPage } from './pages/CheckoutPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { CartProvider } from './context/CartContext';
import type { Category } from './lib/supabase';

function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Home');

  return (
    <>
      <Hero />
      <CategoryNav activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-amber-950 mb-2">
            {activeCategory === 'Home' ? 'Our Collection' : activeCategory}
          </h2>
          <p className="text-stone-600">
            {activeCategory === 'Home' && 'Handpicked premium cacao products'}
            {activeCategory === 'Wellness' && 'Ceremonial cacao and mental clarity products'}
            {activeCategory === 'Health' && 'Pure products for heart health and antioxidants'}
            {activeCategory === 'Sport' && 'Energy-boosting cacao blends for pre/post-workout'}
            {activeCategory === 'Sustainability' && 'Eco-friendly packaging and fair-trade sourcing'}
          </p>
        </div>
        <ProductGrid category={activeCategory} />
      </main>

      <ContactForm />
    </>
  );
}

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>

      <footer className="bg-stone-900 text-stone-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="mb-2">&copy; 2024 Cacaosap. All rights reserved.</p>
            <p className="text-sm text-stone-400">Crafted for cacao lovers, by cacao lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

export default App;
