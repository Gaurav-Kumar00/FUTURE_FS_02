import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatPrice } from '../../utils/validation';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct, setCurrentPage } = useStore();
  
  const handleViewProduct = () => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.originalPrice && (
          <Badge variant="warning" className="absolute top-2 left-2">
            Sale
          </Badge>
        )}
        {!product.inStock && (
          <Badge variant="error" className="absolute top-2 right-2">
            Out of Stock
          </Badge>
        )}
        
        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleViewProduct}
              className="bg-white text-slate-600 border-white hover:bg-slate-50"
            >
              <Eye className="h-4 w-4" />
            </Button>
            {product.inStock && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddToCart}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-slate-600 mb-2 line-clamp-2">
          {product.description}
        </p>
        
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-slate-600">
            ({product.reviews})
          </span>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-slate-800">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-slate-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {product.inStock ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddToCart}
              className="flex items-center space-x-1"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:block">Add</span>
            </Button>
          ) : (
            <Badge variant="error">Out of Stock</Badge>
          )}
        </div>
      </div>
    </div>
  );
};