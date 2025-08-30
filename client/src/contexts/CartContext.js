import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const response = await api.get('/shopping/cart');
      const data = response.data;

      // Use the first cart in the array or default to empty items
      setCart(data[0] || { items: [] });
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart({ items: [] }); // fallback
    } finally {
      setLoading(false);
    }
  };


  const addToCart = async (product, quantity = 1) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return false;
    }

    try {
      const response = await api.put('/shopping/cart', { product: product });
      await fetchCart();
      // toast.success('Added to cart successfully!');
      return true;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add to cart';
      toast.error(message);
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/shopping/cart/${productId}`);
      await fetchCart();
      toast.success('Removed from cart successfully!');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to remove from cart';
      toast.error(message);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    // This would need to be implemented in the backend
    // For now, we'll just refetch the cart
    await fetchCart();
  };

  const clearCart = async () => {
    try {
      // This would need to be implemented in the backend
      setCart([]);
      toast.success('Cart cleared successfully!');
    } catch (error) {
      toast.error('Failed to clear cart');
    }
  };

  const getCartTotal = () => {
    if (!cart?.items || !Array.isArray(cart.items)) return 0;

    return cart.items.reduce(
      (total, item) => total + (item.product?.unit || 1) * (item.product?.price || 0),
      0
    );
  };

  const getCartCount = () => {
    if (!cart?.items || !Array.isArray(cart.items)) return 0;

    return cart.items.reduce((count, item) => count + (item.product?.unit || 1), 0);
  };


  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    fetchCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
