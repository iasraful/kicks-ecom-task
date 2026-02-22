
"use client";
import React, { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FiFilter, FiX } from 'react-icons/fi';
import { useCart } from '../context/cartContext';

const ProductPageContent = () => {
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  const categoryFromUrl = searchParams.get('category') || 'all';
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const itemsPerPage = 12;

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  useEffect(() => {
    setLoading(true);
    axios.get('https://api.escuelajs.co/api/v1/products')
      .then(res => {
        setProducts(res.data.slice(0, 50));
        // Extract unique categories
        const cats = [...new Set(res.data.map(p => p.category?.name).filter(Boolean))];
        setCategories(cats);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category?.name === selectedCategory);
    }

    // Filter by price
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, selectedCategory, priceRange]);

  return (
    <div className="bg-[#ecebe7] min-h-screen py-8">
      {/* Alert Notification */}
      {alertMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg z-50 animate-pulse">
          {alertMessage}
        </div>
      )}
      <div className="container mx-auto px-2 sm:px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-800">All Products</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-bold"
          >
            <FiFilter size={20} />
            Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {/* Sidebar Filters */}
          <div
            className={`${
              showFilters ? 'block' : 'hidden'
            } md:block md:col-span-1 bg-white rounded-2xl p-6 h-fit sticky top-4`}
          >
            <div className="flex items-center justify-between mb-6 md:hidden">
              <h2 className="text-xl font-bold text-black">Filters</h2>
              <button onClick={() => setShowFilters(false)}>
                <FiX size={24} />
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="text-sm font-black text-black mb-4">CATEGORY</h3>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    checked={selectedCategory === 'all'}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setShowFilters(false);
                    }}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">All Categories</span>
                </label>
                {categories.map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={selectedCategory === cat}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setShowFilters(false);
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-8">
              <h3 className="text-sm font-black text-black mb-4">PRICE RANGE</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-600 mb-2 block">Min: ${priceRange[0]}</label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 mb-2 block">Max: ${priceRange[1]}</label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setPriceRange([0, 1000]);
              }}
              className="w-full bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-lg transition"
            >
              Reset Filters
            </button>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3 lg:col-span-4">
            {loading ? (
              <div className="text-center py-12 text-lg font-semibold text-gray-500">Loading...</div>
            ) : error ? (
              <div className="text-center py-12 text-lg font-semibold text-red-500">{error}</div>
            ) : filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-col bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
                    >
                      {/* Image Container - Clickable */}
                      <Link
                        href={`/product/${product.id}`}
                        className="relative w-full h-40 sm:h-52 bg-gray-100 flex items-center justify-center overflow-hidden cursor-pointer group"
                        onMouseEnter={() => setHoveredProductId(product.id)}
                        onMouseLeave={() => setHoveredProductId(null)}
                      >
                        <img
                          src={
                            hoveredProductId === product.id && product.images && product.images[1]
                              ? product.images[1]
                              : product.images && product.images[0]
                              ? product.images[0]
                              : 'https://via.placeholder.com/300x200?text=No+Image'
                          }
                          alt={product.title}
                          className="w-full h-full object-contain p-2 hover:scale-110 transition duration-300"
                        />
                        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-lg">
                          New
                        </span>
                      </Link>

                      {/* Product Info */}
                      <div className="flex flex-col flex-1 p-3 sm:p-4">
                        <h3 className="text-xs sm:text-sm md:text-lg font-bold text-black mb-2 line-clamp-2 min-h-8">
                          {product.title}
                        </h3>

                        {/* Price */}
                        <span className="text-lg sm:text-xl font-black text-gray-800 mb-3">${product.price}</span>

                        {/* Buttons */}
                        <div className="flex items-center gap-2 mt-auto">
                          <button
                            onClick={() => {
                              addToCart({
                                id: product.id,
                                name: product.title,
                                price: product.price,
                                image: product.images?.[0] || 'https://via.placeholder.com/300x200',
                                quantity: 1
                              });
                              setAlertMessage(`✓ ${product.title} added to cart!`);
                              setTimeout(() => setAlertMessage(''), 3000);
                            }}
                            className="flex-1 bg-blue-600 text-white text-xs font-bold py-2 px-3 rounded-lg hover:bg-blue-700 transition"
                          >
                            Add to Cart
                          </button>
                          {/* <Link
                            href={`/product/${product.id}`}
                            className="bg-black text-white text-xs font-bold py-2 px-3 sm:px-4 rounded-lg hover:bg-gray-800 transition whitespace-nowrap"
                          >
                            View
                          </Link> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="bg-black text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition"
                  >
                    ← Prev
                  </button>

                  {[...Array(Math.ceil(filteredProducts.length / itemsPerPage))].map((_, idx) => (
                    <button
                      key={idx + 1}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`px-3 py-2 rounded-lg font-bold transition ${
                        currentPage === idx + 1
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-black border-2 border-gray-300 hover:border-black'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(Math.min(Math.ceil(filteredProducts.length / itemsPerPage), currentPage + 1))}
                    disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
                    className="bg-black text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition"
                  >
                    Next →
                  </button>
                </div>

                {/* Results Count */}
                <div className="mt-6 text-center text-sm font-semibold text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-lg font-semibold text-gray-500">
                No products found. Try adjusting your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Page wrapper with Suspense for useSearchParams
export default function ProductPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-12"><p>Loading products...</p></div>}>
      <ProductPageContent />
    </Suspense>
  );
}