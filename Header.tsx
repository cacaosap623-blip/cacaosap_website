import { useCart } from '../context/CartContext';
import { X, Minus, Plus, Trash2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, total } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'bg-opacity-50 opacity-100' : 'bg-opacity-0 opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transform transition-all duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-stone-200 bg-gradient-to-r from-amber-50 to-orange-50">
          <h2 className="text-2xl font-bold text-amber-950">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-stone-700 hover:bg-stone-100 p-2 rounded-full transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="text-5xl">🛍️</div>
              <p className="text-stone-600 text-center font-medium">Your cart is empty</p>
              <p className="text-sm text-stone-500 text-center">Add some premium cacao to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-stone-50 rounded-lg border border-stone-200 hover:border-amber-300 hover:bg-amber-50 transition-all duration-300 animate-in fade-in slide-in-from-right-2"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-stone-100">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-stone-900 line-clamp-2 text-sm">
                      {item.name}
                    </h3>
                    <p className="text-amber-700 font-bold mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2 bg-white rounded-full p-1 border border-stone-200">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-amber-100 rounded-full transition-colors"
                      >
                        <Minus className="w-3 h-3 text-amber-700" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-amber-100 rounded-full transition-colors"
                      >
                        <Plus className="w-3 h-3 text-amber-700" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto p-1 hover:bg-red-100 rounded-full transition-colors"
                      >
                        <Trash2 className="w-3 h-3 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-stone-200 p-6 space-y-4 bg-gradient-to-t from-stone-50 to-transparent">
            <div className="flex justify-between text-lg font-bold text-amber-950">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              onClick={onClose}
              className="block w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-105 active:scale-95 text-center shadow-md"
            >
              Proceed to Checkout
            </Link>

            <div className="flex items-center justify-center gap-2 text-xs text-stone-600 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Secure checkout powered by Stripe</span>
            </div>

            <button
              onClick={onClose}
              className="w-full border-2 border-amber-600 text-amber-700 font-semibold py-2 px-4 rounded-lg hover:bg-amber-50 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
