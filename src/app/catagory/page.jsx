"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startIdx, setStartIdx] = useState(0);
  const visibleCount = 2;

  useEffect(() => {
    axios.get('https://api.escuelajs.co/api/v1/categories')
      .then(res => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load categories');
        setLoading(false);
      });
  }, []);

  const handlePrev = () => {
    setStartIdx(idx => Math.max(idx - visibleCount, 0));
  };
  const handleNext = () => {
    setStartIdx(idx => Math.min(idx + visibleCount, categories.length - visibleCount));
  };

  return (
    <section className="bg-black py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">CATEGORIES</h2>
          <div className="flex gap-2">
            <button onClick={handlePrev} disabled={startIdx === 0} className="bg-white rounded-lg p-2 text-black disabled:opacity-50">
              &#8592;
            </button>
            <button onClick={handleNext} disabled={startIdx + visibleCount >= categories.length} className="bg-white rounded-lg p-2 text-black disabled:opacity-50">
              &#8594;
            </button>
          </div>
        </div>
        {loading ? (
          <div className="text-center py-12 text-lg font-semibold text-gray-300">Loading...</div>
        ) : error ? (
          <div className="text-center py-12 text-lg font-semibold text-red-400">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.slice(startIdx, startIdx + visibleCount).map(category => (
              <Link
                key={category.id}
                href={`/product?category=${encodeURIComponent(category.name)}`}
                className="bg-gray-100 rounded-tl-[48px] rounded-tr-none rounded-bl-none rounded-br-[48px] p-8 flex flex-col justify-between min-h-96 relative transition hover:shadow-2xl hover:scale-105 duration-300 cursor-pointer"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full max-h-64 object-contain mb-6"
                />
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-extrabold text-black">
                    {category.name.toUpperCase()}<br />SHOES
                  </h3>
                  <div className="bg-black text-white rounded-lg p-3 text-xl hover:bg-blue-700 transition">
                    <span>&#8599;</span>
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
