
"use client";
import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FiFilter, FiX } from 'react-icons/fi';
import { useCart } from '../context/cartContext';
import { productsApi } from '@/lib/api';
import { useApi } from '@/hooks/useApi';
import { LoadingState, ErrorState, EmptyState } from '@/app/components/ApiStates';
import Link from 'next/link';

const ProductPageContent = () => {
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  const categoryFromUrl = searchParams.get('category') || 'all';

  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const itemsPerPage = 12;

  const {
    data: products = [],
    loading,
    error,
    execute: retry
  } = useApi(productsApi.getAll);

  // Derive unique categories from fetched products
  const categories = useMemo(() => {
    if (!products) return [];
    return [...new Set(products.map(p => p.category?.name).filter(Boolean))];
  }, [products]);

  // Filtering logic (Logic Refactor, UI stays the same)
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter(p => {
      const matchCategory = selectedCategory === 'all' || p.category?.name === selectedCategory;
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchCategory && matchPrice;
    });
  }, [products, selectedCategory, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-[#ecebe7] min-h-screen py-8">
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
            className={`${showFilters ? 'block' : 'hidden'
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
                      setCurrentPage(1);
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
                        setCurrentPage(1);
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
                    onChange={(e) => {
                      setPriceRange([parseInt(e.target.value), priceRange[1]]);
                      setCurrentPage(1);
                    }}
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
                    onChange={(e) => {
                      setPriceRange([priceRange[0], parseInt(e.target.value)]);
                      setCurrentPage(1);
                    }}
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
                setCurrentPage(1);
              }}
              className="w-full bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-lg transition"
            >
              Reset Filters
            </button>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3 lg:col-span-4">
            {loading ? (
              <LoadingState className="py-24" />
            ) : error ? (
              <ErrorState message={error} onRetry={retry} />
            ) : filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {paginatedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-col bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
                    >
                      {/* Image Container */}
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
                              : product.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'
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
                            onClick={() => addToCart({
                              id: product.id,
                              name: product.title,
                              price: product.price,
                              image: product.images?.[0] || 'https://via.placeholder.com/300x200',
                            })}
                            className="flex-1 bg-blue-600 text-white text-xs font-bold py-2 px-3 rounded-lg hover:bg-blue-700 transition"
                          >
                            Add to Cart
                          </button>
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

                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx + 1}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`px-3 py-2 rounded-lg font-bold transition ${currentPage === idx + 1
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-black border-2 border-gray-300 hover:border-black'
                        }`}
                    >
                      {idx + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
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
              <EmptyState
                message="No products found. Try adjusting your filters."
                onReset={() => {
                  setSelectedCategory('all');
                  setPriceRange([0, 1000]);
                  setCurrentPage(1);
                }}
              />
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
    <Suspense fallback={<LoadingState className="py-24" message="Loading products..." />}>
      <ProductPageContent />
    </Suspense>
  );
}
