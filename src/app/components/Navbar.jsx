'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { FiMenu, FiX, FiSearch, FiUser } from 'react-icons/fi';
import { useCart } from '../context/cartContext';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b-2 border-gray-200 rounded-2xl">
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between px-6 lg:px-12 py-4">
        
        {/* Left: Navigation Links */}
        <div className="flex items-center gap-8">
          <a href="#" className="text-sm font-bold hover:text-gray-700 transition flex items-center gap-2">
            New Drops <span className="text-lg">🔥</span>
          </a>
          <div className="relative group">
            <button className="text-sm font-bold hover:text-gray-700 transition">
              Men
            </button>
          </div>
          <div className="relative group">
            <button className="text-sm font-bold hover:text-gray-700 transition">
              Women
            </button>
          </div>
           <div className="relative group">
            <Link href="/product" className="text-sm font-bold hover:text-gray-700 transition">
              All Products
            </Link>
          </div>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/" className="text-3xl font-black text-black">KICKS</Link>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-6">
          <button className="hover:text-gray-700 transition">
            <FiSearch size={20} />
          </button>
          <button className="hover:text-gray-700 transition">
            <FiUser size={20} />
          </button>
          <Link href="/cart" className="relative hover:text-gray-700 transition">
            <div className="w-6 h-6 rounded-full bg-orange-400 flex items-center justify-center text-black text-xs font-bold">
              {getCartCount()}
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-4">
        {/* Left: Mobile Menu Button */}
        <button
          className="hover:text-gray-700 transition"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Center: Logo */}
        <Link href="/" className="text-2xl font-black text-black">KICKS</Link>

        {/* Right: Icons */}
        <div className="flex items-center gap-4">
          <button className="hover:text-gray-700 transition">
            <FiUser size={20} />
          </button>
          <Link href="/cart" className="relative hover:text-gray-700 transition">
            <div className="w-6 h-6 rounded-full bg-orange-400 flex items-center justify-center text-black text-xs font-bold">
              {getCartCount()}
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col gap-4 px-4 py-4">
            <a href="#" className="text-sm font-bold hover:text-gray-700 transition flex items-center gap-2">
              New Drops <span className="text-lg">🔥</span>
            </a>
            <Link href="/product/men" className="text-sm font-bold hover:text-gray-700 transition">
              Men
            </Link>
            <Link href="/product/women" className="text-sm font-bold hover:text-gray-700 transition">
              Women
            </Link>
              <Link href="/product" className="text-sm font-bold hover:text-gray-700 transition">
              All Products
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;