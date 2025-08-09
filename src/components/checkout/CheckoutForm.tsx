import React from 'react';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { checkoutSchema, formatPrice } from '../../utils/validation';
import { ShippingAddress, Order } from '../../types';

interface CheckoutFormData extends ShippingAddress {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export const CheckoutForm: React.FC = () => {
  const { 
    cartItems, 
    setCurrentPage, 
    clearCart, 
    user,
    addOrder 
  } = useStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      country: 'United States'
    }
  });
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  
  const onSubmit = async (data: CheckoutFormData) => {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create order
    const order: Order = {
      id: Date.now().toString(),
      userId: user?.id || 'guest',
      items: cartItems,
      total,
      status: 'processing',
      createdAt: new Date().toISOString(),
      shippingAddress: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country
      }
    };
    
    addOrder(order);
    clearCart();
    alert('Order placed successfully! Check your order history for details.');
    setCurrentPage('home');
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <p className="text-slate-600 text-lg mb-4">Your cart is empty</p>
        <Button onClick={() => setCurrentPage('home')}>
          Continue Shopping
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => setCurrentPage('home')}
        className="mb-6 flex items-center space-x-2"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Shopping</span>
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Checkout</h1>
            <p className="text-slate-600">Complete your order below</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Shipping Information */}
            <div className="bg-white p-6 rounded-lg border space-y-4">
              <h3 className="font-semibold text-slate-800 mb-4">Shipping Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  {...register('firstName')}
                  error={errors.firstName?.message}
                />
                <Input
                  label="Last Name"
                  {...register('lastName')}
                  error={errors.lastName?.message}
                />
              </div>
              
              <Input
                type="email"
                label="Email"
                {...register('email')}
                error={errors.email?.message}
              />
              
              <Input
                label="Address"
                {...register('address')}
                error={errors.address?.message}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  {...register('city')}
                  error={errors.city?.message}
                />
                <Input
                  label="State"
                  {...register('state')}
                  error={errors.state?.message}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="ZIP Code"
                  {...register('zipCode')}
                  error={errors.zipCode?.message}
                />
                <Input
                  label="Country"
                  {...register('country')}
                  error={errors.country?.message}
                />
              </div>
            </div>
            
            {/* Payment Information */}
            <div className="bg-white p-6 rounded-lg border space-y-4">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Payment Information</span>
                <Lock className="h-4 w-4 text-emerald-600" />
              </h3>
              
              <Input
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                {...register('cardNumber')}
                error={errors.cardNumber?.message}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  placeholder="MM/YY"
                  {...register('expiryDate')}
                  error={errors.expiryDate?.message}
                />
                <Input
                  label="CVV"
                  placeholder="123"
                  {...register('cvv')}
                  error={errors.cvv?.message}
                />
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : `Place Order - ${formatPrice(total)}`}
            </Button>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg border h-fit space-y-4">
          <h3 className="font-semibold text-slate-800">Order Summary</h3>
          
          {/* Items */}
          <div className="space-y-3">
            {cartItems.map(item => (
              <div key={item.product.id} className="flex justify-between items-center">
                <div className="flex space-x-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-sm">{item.product.name}</p>
                    <p className="text-slate-600 text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-medium">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          
          <hr />
          
          {/* Totals */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          
          {shipping === 0 && (
            <div className="bg-emerald-50 text-emerald-800 p-3 rounded-lg text-sm">
              🎉 You qualify for free shipping!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};