import { Leaf, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onCartClick?: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  const { itemCount } = useCart();

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Leaf className="w-8 h-8 text-amber-700" />
          <h1 className="text-2xl font-bold text-amber-950">Cacaosap</h1>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-stone-700 hover:text-amber-700 transition-colors font-medium">
            Shop
          </a>
          <a href="#" className="text-stone-700 hover:text-amber-700 transition-colors font-medium">
            About
          </a>
          <button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-stone-700 hover:text-amber-700 transition-colors font-medium"
          >
            Contact
          </button>
        </nav>

        <button
          onClick={onCartClick}
          className="relative bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="hidden sm:inline">Cart</span>
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
