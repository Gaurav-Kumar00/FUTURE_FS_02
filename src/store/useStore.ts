import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, User, Order, FilterState } from '../types';
import { products } from '../data/products';

interface StoreState {
  // Products
  products: Product[];
  filteredProducts: Product[];
  filters: FilterState;
  selectedProduct: Product | null;
  
  // Cart
  cartItems: CartItem[];
  isCartOpen: boolean;
  
  // User
  user: User | null;
  isLoginModalOpen: boolean;
  
  // Orders
  orders: Order[];
  
  // UI
  currentPage: 'home' | 'product' | 'cart' | 'checkout' | 'orders';
  
  // Actions
  setFilters: (filters: Partial<FilterState>) => void;
  applyFilters: () => void;
  setSelectedProduct: (product: Product | null) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setUser: (user: User | null) => void;
  toggleLoginModal: () => void;
  addOrder: (order: Order) => void;
  setCurrentPage: (page: 'home' | 'product' | 'cart' | 'checkout' | 'orders') => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      products,
      filteredProducts: products,
      filters: {
        search: '',
        category: 'All',
        priceRange: [0, 1000],
        sortBy: 'name'
      },
      selectedProduct: null,
      cartItems: [],
      isCartOpen: false,
      user: null,
      isLoginModalOpen: false,
      orders: [],
      currentPage: 'home',
      
      // Actions
      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters }
        }));
        get().applyFilters();
      },
      
      applyFilters: () => {
        const { filters, products } = get();
        let filtered = [...products];
        
        // Search filter
        if (filters.search) {
          filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            product.description.toLowerCase().includes(filters.search.toLowerCase()) ||
            product.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
          );
        }
        
        // Category filter
        if (filters.category !== 'All') {
          filtered = filtered.filter(product => product.category === filters.category);
        }
        
        // Price range filter
        filtered = filtered.filter(product =>
          product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
        );
        
        // Sort
        switch (filters.sortBy) {
          case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
          default:
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }
        
        set({ filteredProducts: filtered });
      },
      
      setSelectedProduct: (product) => set({ selectedProduct: product }),
      
      addToCart: (product) => {
        set((state) => {
          const existingItem = state.cartItems.find(item => item.product.id === product.id);
          if (existingItem) {
            return {
              cartItems: state.cartItems.map(item =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            };
          } else {
            return {
              cartItems: [...state.cartItems, { product, quantity: 1 }]
            };
          }
        });
      },
      
      removeFromCart: (productId) => {
        set((state) => ({
          cartItems: state.cartItems.filter(item => item.product.id !== productId)
        }));
      },
      
      updateCartQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set((state) => ({
          cartItems: state.cartItems.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          )
        }));
      },
      
      clearCart: () => set({ cartItems: [] }),
      
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      
      setUser: (user) => set({ user }),
      
      toggleLoginModal: () => set((state) => ({ isLoginModalOpen: !state.isLoginModalOpen })),
      
      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders]
        }));
      },
      
      setCurrentPage: (page) => set({ currentPage: page })
    }),
    {
      name: 'ecommerce-store',
      partialize: (state) => ({
        cartItems: state.cartItems,
        user: state.user,
        orders: state.orders
      })
    }
  )
);