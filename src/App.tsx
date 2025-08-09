import React, { useEffect } from 'react';
import { useStore } from './store/useStore';
import { Header } from './components/layout/Header';
import { CartSidebar } from './components/cart/CartSidebar';
import { LoginModal } from './components/auth/LoginModal';
import { HomePage } from './pages/HomePage';
import { ProductDetail } from './components/product/ProductDetail';
import { CheckoutForm } from './components/checkout/CheckoutForm';
import { OrderHistory } from './components/orders/OrderHistory';

function App() {
  const { currentPage, applyFilters } = useStore();
  
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);
  
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'product':
        return <ProductDetail />;
      case 'checkout':
        return <CheckoutForm />;
      case 'orders':
        return <OrderHistory />;
      default:
        return <HomePage />;
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        {renderCurrentPage()}
      </main>
      <CartSidebar />
      <LoginModal />
    </div>
  );
}

export default App;