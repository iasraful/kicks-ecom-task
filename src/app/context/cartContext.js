"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('kicks_cart');
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
        return [];
      }
    }
    return [];
  });

  const [notification, setNotification] = useState(null);

  // Persist to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('kicks_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Add to cart function
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      // If product already in cart, increase quantity
      setCartItems(prev => prev.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + (product.quantity || 1) }
          : item
      ));
    } else {
      // Add new product to cart
      setCartItems(prev => [...prev, { ...product, quantity: product.quantity || 1 }]);
    }
    showNotification(`✓ ${product.name || product.title} added to cart!`);
  };

  // Remove from cart function
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  // Update quantity function
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => prev.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  // Clear cart function
  const clearCart = () => {
    setCartItems([]);
  };

  // Get cart total
  const getCartTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  // Get cart item count
  const getCartCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const value = {
    cartItems,
    notification,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      {/* Global Notification Toast - Absolute positioning to avoid layout shift */}
      {notification && (
        <div className="fixed bottom-8 right-8 bg-black text-white px-6 py-4 rounded-xl font-bold shadow-2xl z-[100] border border-gray-800 animate-bounce-in">
          {notification}
        </div>
      )}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export default CartContext;
