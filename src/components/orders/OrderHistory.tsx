import React from 'react';
import { Package, Calendar, CreditCard } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Badge } from '../ui/Badge';
import { formatPrice, formatDate } from '../../utils/validation';

export const OrderHistory: React.FC = () => {
  const { orders, user } = useStore();
  
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-slate-600 text-lg">Please log in to view your order history</p>
      </div>
    );
  }
  
  const userOrders = orders.filter(order => order.userId === user.id);
  
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'shipped': return 'default';
      case 'processing': return 'warning';
      default: return 'default';
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Order History</h1>
        <p className="text-slate-600">Track and manage your orders</p>
      </div>
      
      {userOrders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 text-lg">No orders yet</p>
          <p className="text-slate-500 mt-1">Start shopping to see your orders here</p>
        </div>
      ) : (
        <div className="space-y-6">
          {userOrders.map(order => (
            <div key={order.id} className="bg-white rounded-lg border shadow-sm p-6">
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                  <Package className="h-5 w-5 text-slate-600" />
                  <div>
                    <p className="font-semibold">Order #{order.id}</p>
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge variant={getStatusVariant(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                  <div className="text-right">
                    <p className="font-semibold">{formatPrice(order.total)}</p>
                    <div className="flex items-center space-x-1 text-sm text-slate-600">
                      <CreditCard className="h-4 w-4" />
                      <span>{order.items.length} items</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Items */}
              <div className="border-t pt-4">
                <div className="grid gap-3">
                  {order.items.map(item => (
                    <div key={item.product.id} className="flex items-center space-x-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">{item.product.name}</p>
                        <p className="text-sm text-slate-600">
                          Quantity: {item.quantity} × {formatPrice(item.product.price)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Shipping Address */}
              <div className="border-t pt-4 mt-4">
                <p className="font-medium text-slate-800 mb-2">Shipping Address</p>
                <p className="text-sm text-slate-600">
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                  {order.shippingAddress.address}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                  {order.shippingAddress.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};