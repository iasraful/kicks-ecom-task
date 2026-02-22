"use client";
import React from 'react';
import { FiHeart, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/cartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const delivery = 6.99;
  const tax = 0;
  const total = subtotal + delivery + tax;

  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:py-8 lg:py-12">
      <div className="mx-auto px-3 sm:px-4 lg:px-12">
        {/* Header Section */}
        <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2">
            Saving to celebrate
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            Enjoy up to 60% off thousands of styles during the End of Year sale - while supplies last. No code needed.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-base">
            Join us or Sign-in
          </a>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Your Bag Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-2xl sm:text-3xl font-black mb-2">Your Bag</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                Items in your bag not reserved -check out now to make them yours.
              </p>

              {/* Product Cards */}
              {cartItems.length > 0 ? (
                <div className="space-y-4 sm:space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      {/* Product Image */}
                      <div className="shrink-0 w-full sm:w-32 h-32">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg sm:text-xl font-black mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-1">{item.type}</p>
                          <p className="text-sm text-gray-600 mb-3">{item.color}</p>
                        </div>

                        {/* Size and Quantity */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
                          <div className="flex items-center gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-gray-600 mb-1">
                                Size
                              </label>
                              <select className="border border-gray-300 rounded px-3 py-2 text-sm">
                                <option>{item.size}</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-gray-600 mb-1">
                                Quantity
                              </label>
                              <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="bg-gray-100 hover:bg-gray-200 px-3 py-2 text-sm font-bold transition"
                                >
                                  −
                                </button>
                                <span className="px-4 py-2 text-sm font-bold min-w-10 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="bg-gray-100 hover:bg-gray-200 px-3 py-2 text-sm font-bold transition"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price and Actions */}
                      <div className="flex flex-col items-end justify-between">
                        <span className="text-xl sm:text-2xl font-black text-blue-600">
                          ${item.price.toFixed(2)}
                        </span>
                        <div className="flex gap-3 mt-4 sm:mt-0">
                          <button className="text-gray-600 hover:text-red-600 transition text-xl">
                            <FiHeart />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-600 hover:text-red-600 transition text-xl"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">Your bag is empty</p>
              )}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 sticky top-4">
              <h2 className="text-2xl sm:text-3xl font-black mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="font-semibold">{cartItems.length} ITEM{cartItems.length !== 1 ? 'S' : ''}</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Delivery</span>
                  <span>${delivery.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Sales Tax</span>
                  <span>-</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6 text-lg sm:text-xl">
                <span className="font-black">Total</span>
                <span className="font-black">${total.toFixed(2)}</span>
              </div>

              <button className="w-full bg-black hover:bg-gray-800 text-white font-black py-3 sm:py-4 rounded-lg transition mb-6 text-sm sm:text-base uppercase tracking-wide">
                Checkout
              </button>

              <a href="#" className="block text-center text-blue-600 hover:text-blue-700 text-sm sm:text-base font-semibold">
                Use a promo code
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;