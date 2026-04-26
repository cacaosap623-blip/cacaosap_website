import { useEffect, useState } from 'react';
import { supabase, type Product, type Category } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Leaf, Check, Leaf as LeafIcon, Award } from 'lucide-react';

interface ProductGridProps {
  category: Category;
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-stone-100 animate-pulse">
      <div className="aspect-square bg-gradient-to-r from-stone-200 to-stone-100" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-stone-200 rounded w-3/4" />
        <div className="h-4 bg-stone-200 rounded w-full" />
        <div className="h-4 bg-stone-200 rounded w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-8 bg-stone-200 rounded w-24" />
          <div className="h-12 w-12 bg-stone-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({ category }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState<Set<string>>(new Set());
  const { addItem } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        let query = supabase
          .from('products')
          .select('*');

        if (category !== 'Home') {
          query = query.eq('category', category);
        }

        const { data, error: queryError } = await query.order('created_at', { ascending: false });

        if (queryError) throw queryError;
        setProducts(data || []);
        setImageLoading(new Set(data?.map(p => p.id) || []));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const handleImageLoad = (productId: string) => {
    setImageLoading(prev => {
      const next = new Set(prev);
      next.delete(productId);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-stone-600">No products available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-stone-100 transform hover:-translate-y-2"
        >
          <div className="overflow-hidden bg-gradient-to-br from-stone-100 to-stone-50 aspect-square relative">
            {imageLoading.has(product.id) && (
              <div className="absolute inset-0 flex items-center justify-center bg-stone-50">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full animate-spin" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%)' }} />
                  <div className="absolute inset-1 bg-white rounded-full" />
                </div>
              </div>
            )}
            <img
              src={product.img}
              alt={product.name}
              onLoad={() => handleImageLoad(product.id)}
              className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-300 ${
                imageLoading.has(product.id) ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg transform group-hover:scale-110 transition-transform">
                <Award className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-semibold text-amber-900">Ritual</span>
              </div>
              <div className="bg-emerald-600 bg-opacity-95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg transform group-hover:scale-110 transition-transform">
                <LeafIcon className="w-4 h-4 text-white" />
                <span className="text-xs font-semibold text-white">Eco</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold text-stone-900 mb-2 line-clamp-2">
              {product.name}
            </h3>

            {product.description && (
              <p className="text-sm text-stone-600 mb-4 line-clamp-2">
                {product.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-amber-900">
                ${product.price.toFixed(2)}
              </span>
              <button
                onClick={() => handleAddToCart(product)}
                className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  addedItem === product.id
                    ? 'bg-emerald-600 text-white shadow-lg scale-110'
                    : 'bg-amber-700 hover:bg-amber-800 text-white shadow-md'
                }`}
              >
                {addedItem === product.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <ShoppingCart className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
