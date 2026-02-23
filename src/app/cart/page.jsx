"use client";
import React from 'react';
import { useCart } from '../context/cartContext';
import Link from 'next/link';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const subtotal = getCartTotal();
  const shipping = 6.99;
  const tax = subtotal * 0.13;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-[#ecebe7] min-h-screen py-10 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-black">Saving to celebrate</h1>
          <p className="text-gray-600 font-medium">
            Enjoy up to 60% off during our Birthday Sale.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Bag Section */}
          <div className="flex-[2] bg-white rounded-3xl p-6 sm:p-8">
            <h2 className="text-2xl font-black text-black mb-2 uppercase italic">Your Bag</h2>
            <p className="text-gray-500 font-bold text-sm mb-6 uppercase">
              Items in your bag are not reserved — check out now to make them yours.
            </p>

            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 font-bold mb-4">Your bag is empty.</p>
                <Link href="/product" className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition">
                  SHOP NOW
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-gray-100 last:border-0">
                    {/* Item Image */}
                    <div className="w-full sm:w-40 h-40 bg-[#f7f8fa] rounded-2xl flex items-center justify-center p-4">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-lg font-black text-gray-800 uppercase italic line-clamp-2">{item.name}</h3>
                          <span className="text-lg font-black text-blue-600">${item.price}</span>
                        </div>
                        <p className="text-gray-400 font-bold text-sm mb-1 uppercase">Men's Road Running Shoes</p>
                        <p className="text-gray-400 font-bold text-sm uppercase">Enamel Green/Summit White</p>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border-2 border-gray-200 rounded-xl px-2 py-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:text-blue-600 transition"
                            >
                              <FiMinus size={18} />
                            </button>
                            <span className="w-8 text-center font-black text-black">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:text-blue-600 transition"
                            >
                              <FiPlus size={18} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition"
                          >
                            <FiTrash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary Section */}
          <div className="flex-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8">
              <h2 className="text-2xl font-black text-black mb-6 uppercase italic">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600 font-bold uppercase text-sm">
                  <span>Subtotal</span>
                  <span className="text-black">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-bold uppercase text-sm">
                  <span>Estimated Shipping</span>
                  <span className="text-black">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-bold uppercase text-sm">
                  <span>Estimated Tax</span>
                  <span className="text-black">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-4 border-t-2 border-gray-100 flex justify-between text-black font-black text-xl uppercase italic">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-black text-white font-black py-4 rounded-2xl mt-8 hover:bg-gray-800 transition tracking-wider uppercase italic">
                Checkout
              </button>
            </div>

            {/* Promo Code Box */}
            <div className="bg-white rounded-3xl p-6 flex items-center justify-between">
              <span className="font-black text-black uppercase italic">Promo Code</span>
              <button className="text-3xl font-light">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;