"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { productsApi } from '@/lib/api';
import { useApi } from '@/hooks/useApi';
import { LoadingState, ErrorState } from '@/app/components/ApiStates';

const CategoryPage = () => {
  const [startIdx, setStartIdx] = useState(0);
  const visibleCount = 2;

  const {
    data: categoriesData,
    loading,
    error,
    execute: retry
  } = useApi(productsApi.getCategories);

  const categories = categoriesData || [];

  const handlePrev = () => {
    setStartIdx(idx => Math.max(idx - visibleCount, 0));
  };
  const handleNext = () => {
    setStartIdx(idx => Math.min(idx + visibleCount, categories.length - visibleCount));
  };

  return (
    <section className="py-12 sm:py-20 bg-[#232321]">
      <div className="mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white uppercase tracking-tight">CATEGORIES</h2>
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              disabled={startIdx === 0}
              className="bg-white hover:bg-gray-200 rounded-xl p-3 text-black disabled:opacity-30 transition cursor-pointer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button
              onClick={handleNext}
              disabled={startIdx + visibleCount >= categories.length}
              className="bg-white hover:bg-gray-200 rounded-xl p-3 text-black disabled:opacity-30 transition cursor-pointer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </div>
        {loading ? (
          <LoadingState className="text-gray-400" />
        ) : error ? (
          <ErrorState message={error} onRetry={retry} className="text-red-400" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {categories.slice(startIdx, startIdx + visibleCount).map(category => (
              <Link
                key={category.id}
                href={`/product?category=${encodeURIComponent(category.name)}`}
                className="bg-white rounded-[32px] sm:rounded-[48px] p-6 sm:p-10 flex flex-col justify-between min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] relative transition-all hover:shadow-xl group"
              >
                <div className="relative z-10">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#232321] leading-none mb-4 uppercase">
                    {category.name}<br />SHOES
                  </h3>
                </div>

                <div className="flex-1 flex items-center justify-center relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-auto max-h-[300px] sm:max-h-[400px] object-contain transition-transform duration-500 group-hover:scale-110 z-0"
                  />
                </div>

                <div className="flex justify-end mt-4">
                  <div className="bg-[#232321] text-white rounded-xl p-4 transition-colors group-hover:bg-[#4a69e2]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryPage;
