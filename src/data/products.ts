import { Product } from '../types';

export const categories = [
  'All',
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Sports',
  'Books',
  'Beauty'
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 89.99,
    originalPrice: 129.99,
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.',
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
    ],
    rating: 4.5,
    reviews: 128,
    inStock: true,
    tags: ['wireless', 'bluetooth', 'noise-cancelling']
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    description: 'Advanced fitness tracking with heart rate monitor, GPS, and 7-day battery life.',
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    images: [
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
    ],
    rating: 4.8,
    reviews: 256,
    inStock: true,
    tags: ['fitness', 'smartwatch', 'health']
  },
  {
    id: '3',
    name: 'Classic Denim Jacket',
    price: 79.99,
    originalPrice: 99.99,
    description: 'Timeless denim jacket made from premium cotton with vintage wash.',
    category: 'Clothing',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    images: [
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
    ],
    rating: 4.3,
    reviews: 89,
    inStock: true,
    tags: ['denim', 'casual', 'vintage']
  },
  {
    id: '4',
    name: 'Modern Coffee Table',
    price: 249.99,
    description: 'Sleek modern coffee table with tempered glass top and oak legs.',
    category: 'Home & Garden',
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    images: [
      'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
    ],
    rating: 4.6,
    reviews: 42,
    inStock: true,
    tags: ['furniture', 'modern', 'glass']
  },
  {
    id: '5',
    name: 'Professional Camera Lens',
    price: 599.99,
    description: '85mm f/1.4 portrait lens with premium optics and fast autofocus.',
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    images: [
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
    ],
    rating: 4.9,
    reviews: 167,
    inStock: true,
    tags: ['photography', 'lens', 'professional']
  },
  {
    id: '6',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    description: 'Soft organic cotton t-shirt in classic fit with sustainable production.',
    category: 'Clothing',
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    images: [
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
    ],
    rating: 4.2,
    reviews: 203,
    inStock: true,
    tags: ['organic', 'cotton', 'sustainable']
  },
  {
    id: '7',
    name: 'Yoga Mat Pro',
    price: 59.99,
    description: 'Extra-thick yoga mat with superior grip and eco-friendly materials.',
    category: 'Sports',
    image: 'https://images.pexels.com/photos/3822187/pexels-photo-3822187.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    images: [
      'https://images.pexels.com/photos/3822187/pexels-photo-3822187.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
    ],
    rating: 4.7,
    reviews: 312,
    inStock: true,
    tags: ['yoga', 'fitness', 'eco-friendly']
  },
  {
    id: '8',
    name: 'Bestselling Novel Collection',
    price: 39.99,
    originalPrice: 59.99,
    description: 'Collection of three bestselling novels in beautiful hardcover editions.',
    category: 'Books',
    image: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    images: [
      'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
    ],
    rating: 4.4,
    reviews: 78,
    inStock: true,
    tags: ['books', 'fiction', 'collection']
  },
  {
    id: '9',
    name: 'Natural Skincare Set',
    price: 89.99,
    description: 'Complete skincare routine with natural ingredients and dermatologist approval.',
    category: 'Beauty',
    image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    images: [
      'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
    ],
    rating: 4.6,
    reviews: 145,
    inStock: true,
    tags: ['skincare', 'natural', 'organic']
  },
  {
    id: '10',
    name: 'Minimalist Desk Lamp',
    price: 129.99,
    description: 'LED desk lamp with adjustable brightness and wireless charging base.',
    category: 'Home & Garden',
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    images: [
      'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
    ],
    rating: 4.5,
    reviews: 97,
    inStock: false,
    tags: ['lighting', 'desk', 'wireless-charging']
  }
];