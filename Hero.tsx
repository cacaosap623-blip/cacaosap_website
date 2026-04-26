import { Home, Leaf, Heart, Zap, Sprout } from 'lucide-react';
import type { Category } from '../lib/supabase';

interface CategoryNavProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const CATEGORIES: { id: Category; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'Home', label: 'Home', icon: Home },
  { id: 'Wellness', label: 'Wellness', icon: Leaf },
  { id: 'Health', label: 'Health', icon: Heart },
  { id: 'Sport', label: 'Sport', icon: Zap },
  { id: 'Sustainability', label: 'Sustainability', icon: Sprout },
];

export function CategoryNav({ activeCategory, onCategoryChange }: CategoryNavProps) {
  return (
    <nav className="bg-white border-b border-stone-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((category) => {
            const IconComponent = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors border-b-2 ${
                  isActive
                    ? 'text-amber-900 border-amber-700'
                    : 'text-stone-600 border-transparent hover:text-amber-800'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
