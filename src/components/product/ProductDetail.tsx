import React, { useState } from 'react';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatPrice } from '../../utils/validation';

export const ProductDetail: React.FC = () => {
  const { selectedProduct, addToCart, setCurrentPage } = useStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  if (!selectedProduct) {
    return null;
  }
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(selectedProduct);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => setCurrentPage('home')}
        className="mb-6 flex items-center space-x-2"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Products</span>
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden">
            <img
              src={selectedProduct.images[selectedImageIndex]}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {selectedProduct.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {selectedProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    index === selectedImageIndex
                      ? 'border-blue-600'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${selectedProduct.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="default">{selectedProduct.category}</Badge>
              {selectedProduct.originalPrice && (
                <Badge variant="warning">Sale</Badge>
              )}
              {!selectedProduct.inStock && (
                <Badge variant="error">Out of Stock</Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              {selectedProduct.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(selectedProduct.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-slate-600">
                {selectedProduct.rating} ({selectedProduct.reviews} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl font-bold text-slate-800">
                {formatPrice(selectedProduct.price)}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-xl text-slate-500 line-through">
                  {formatPrice(selectedProduct.originalPrice)}
                </span>
              )}
              {selectedProduct.originalPrice && (
                <Badge variant="success">
                  Save {formatPrice(selectedProduct.originalPrice - selectedProduct.price)}
                </Badge>
              )}
            </div>
          </div>
          
          {/* Description */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Description</h3>
            <p className="text-slate-600 leading-relaxed">
              {selectedProduct.description}
            </p>
          </div>
          
          {/* Tags */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Features</h3>
            <div className="flex flex-wrap gap-2">
              {selectedProduct.tags.map(tag => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Add to Cart */}
          {selectedProduct.inStock && (
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center space-x-4">
                <label className="font-medium text-slate-700">Quantity:</label>
                <div className="flex items-center border border-slate-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x border-slate-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </Button>
                
                <Button variant="outline" className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span className="hidden sm:block">Wishlist</span>
                </Button>
                
                <Button variant="outline" className="flex items-center space-x-2">
                  <Share2 className="h-5 w-5" />
                  <span className="hidden sm:block">Share</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};