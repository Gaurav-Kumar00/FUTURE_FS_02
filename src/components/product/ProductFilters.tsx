import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { categories } from '../../data/products';
import { Input } from '../ui/Input';

export const ProductFilters: React.FC = () => {
  const { filters, setFilters } = useStore();
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
      <div className="flex items-center space-x-2 text-slate-700">
        <SlidersHorizontal className="h-5 w-5" />
        <h3 className="font-semibold">Filters</h3>
      </div>
      
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ category: e.target.value })}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      
      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.priceRange[0]}
            onChange={(e) => setFilters({
              priceRange: [Number(e.target.value), filters.priceRange[1]]
            })}
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.priceRange[1]}
            onChange={(e) => setFilters({
              priceRange: [filters.priceRange[0], Number(e.target.value)]
            })}
            className="w-full"
          />
        </div>
      </div>
      
      {/* Sort */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Sort by
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({ sortBy: e.target.value as any })}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="name">Name (A-Z)</option>
          <option value="price-low">Price (Low to High)</option>
          <option value="price-high">Price (High to Low)</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  );
};