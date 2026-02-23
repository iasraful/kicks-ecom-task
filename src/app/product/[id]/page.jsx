
"use client";
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { productsApi } from '@/lib/api';
import { useApi } from '@/hooks/useApi';
import { useCart } from '@/app/context/cartContext';
import { LoadingState, ErrorState } from '@/app/components/ApiStates';
import Link from 'next/link';

const ProductsDetails = () => {
  const { addToCart } = useCart();
  const { id } = useParams();

  const [selectedColor, setSelectedColor] = useState(0);
  const [mainImgIdx, setMainImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);

  // Example sizes, since API doesn't provide
  const sizes = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47];

  const {
    data: product,
    loading,
    error,
    execute: retry
  } = useApi(() => productsApi.getById(id), { immediate: !!id });

  if (loading) return <LoadingState className="py-24" message="Loading product details..." />;
  if (error || !product) return <ErrorState message={error || 'Product not found'} onRetry={retry} />;

  // Example color swatches (API doesn't provide real color data)
  const colorSwatches = [
    product.images?.[0] || '',
    product.images?.[1] || product.images?.[0] || '',
  ];

  return (
    <div className=" min-h-screen py-8 px-2 sm:px-8 flex flex-col items-center">
      <div className="w-full   flex flex-col md:flex-row gap-8 p-6 md:p-10">
        {/* Responsive Image Carousel Section */}
        <div className="flex-1 flex flex-col items-center gap-4">
          {/* Main Image with larger size and rounded corners */}
          <div className="w-full bg-[#f7f8fa] rounded-3xl flex items-center justify-center min-h-95 sm:min-h-110 p-4 sm:p-10 relative">
            <img
              src={product.images[mainImgIdx]}
              alt={product.title}
              className="object-contain w-full h-75 sm:h-100 md:h-120 rounded-2xl transition-all duration-200"
            />
            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {product.images.slice(0, 4).map((_, idx) => (
                <span
                  key={idx}
                  className={`w-3 h-3 rounded-full ${mainImgIdx === idx ? 'bg-blue-600' : 'bg-gray-300'} inline-block`}
                />
              ))}
            </div>
          </div>
          {/* Thumbnails Row */}
          <div className="flex gap-3 mt-2 w-full justify-center flex-wrap">
            {product.images.slice(0, 4).map((img, idx) => (
              <button
                key={idx}
                className={`rounded-2xl overflow-hidden bg-white border-2 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 transition-all duration-150 ${mainImgIdx === idx ? 'border-blue-500 shadow-lg' : 'border-transparent'}`}
                onClick={() => setMainImgIdx(idx)}
                aria-label={`Show image ${idx + 1}`}
              >
                <img src={img} alt={product.title + ' ' + idx} className="object-contain w-full h-full" />
              </button>
            ))}
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs font-bold">New Release</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-black leading-tight">{product.title}</h1>
          <span className="text-blue-600 text-xl font-bold">${product.price}</span>
          {/* Color Swatches */}
          <div>
            <div className="font-bold text-xs mb-1 uppercase text-gray-400">Color</div>
            <div className="flex gap-2 mb-2">
              {colorSwatches.map((img, idx) => (
                <button
                  key={idx}
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${selectedColor === idx ? 'border-blue-600 scale-110 shadow-sm' : 'border-gray-300 hover:border-blue-300'}`}
                  style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  onClick={() => setSelectedColor(idx)}
                  aria-label={`Color ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          {/* Sizes */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-sm uppercase text-gray-400">Size</span>
              <span className="text-sm underline cursor-pointer text-gray-500">SIZE CHART</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {sizes.map(size => (
                <button
                  key={size}
                  className={`px-4 py-2 rounded-md border font-bold text-sm transition-all ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:border-black'}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          {/* Actions */}
          <div className="flex flex-col gap-2 mt-2">
            <button
              onClick={() => {
                addToCart({
                  id: product.id,
                  name: product.title,
                  price: product.price,
                  image: product.images?.[0] || 'https://via.placeholder.com/300x200',
                });
              }}
              className="bg-black text-white font-bold py-3 rounded-lg text-base hover:bg-gray-800 transition"
            >
              ADD TO CART
            </button>
            <button className="bg-blue-600 text-white font-bold py-3 rounded-lg text-base hover:bg-blue-700 transition">BUY IT NOW</button>
          </div>
          {/* About the product */}
          <div className="mt-4">
            <h3 className="font-bold text-sm mb-1 uppercase">About the product</h3>
            <div className="text-gray-700 text-sm mb-1 leading-relaxed">{product.description}</div>
            <ul className="text-xs text-gray-500 list-disc pl-5 space-y-1">
              <li>This product is excluded from all promotional discounts and offers.</li>
              <li>Pay over time in interest-free installments with Affirm, Klarna or Afterpay.</li>
              <li>Join adiClub to get unlimited free standard shipping, returns, & exchanges.</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Related Products Section */}
      <RelatedProducts currentCategory={product.category?.name} currentId={id} />
    </div>
  );
};


// Related Products Component (Modularized logic)
const RelatedProducts = ({ currentCategory, currentId }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const {
    data: allProducts = [],
    loading,
    error
  } = useApi(productsApi.getAll);

  const related = React.useMemo(() => {
    if (!allProducts) return [];
    return allProducts.filter(p =>
      String(p.id) !== String(currentId) &&
      p.category?.name === currentCategory
    );
  }, [allProducts, currentCategory, currentId]);

  const totalPages = Math.ceil(related.length / itemsPerPage);
  const startIdx = currentPage * itemsPerPage;
  const displayedProducts = related.slice(startIdx, startIdx + itemsPerPage);

  const handlePrev = () => {
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentPage(prev => (prev + 1) % totalPages);
  };

  if (!loading && related.length === 0) return null;

  return (
    <section className="w-full mt-12 mb-8 px-2 sm:px-4">
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#232321]">You may also like</h2>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={totalPages <= 1}
              className="bg-[#232321] hover:bg-black text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg transition disabled:opacity-30"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button
              onClick={handleNext}
              disabled={totalPages <= 1}
              className="bg-[#232321] hover:bg-black text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg transition disabled:opacity-30"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </div>
        {loading ? (
          <LoadingState className="py-12" />
        ) : error ? (
          <div className="text-center py-12 text-lg font-semibold text-red-500">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {displayedProducts.map((product) => (
                <div key={product.id} className="flex flex-col group">

                  {/* Image Box */}
                  <div className="relative bg-white rounded-2xl sm:rounded-[28px] overflow-hidden p-3 sm:p-6 flex flex-col items-center justify-center">
                    <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#4a69e2] text-white text-[9px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-tl-lg rounded-br-lg sm:rounded-tl-xl sm:rounded-br-xl uppercase z-10">
                      New
                    </span>

                    <img
                      src={
                        product.images?.[0] ||
                        "https://via.placeholder.com/300"
                      }
                      alt={product.title}
                      className="w-full h-32 sm:h-48 lg:h-56 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 text-xs sm:text-sm font-bold uppercase leading-tight text-[#232321] line-clamp-2 min-h-[2.5rem]">
                    {product.title}
                  </h3>

                  {/* Button */}
                  <Link href={`/product/${product.id}`}
                    className="mt-2 sm:mt-3 bg-[#232321] hover:bg-black text-white text-[10px] sm:text-xs font-bold py-2.5 sm:py-3 rounded-lg w-full flex justify-center gap-1 sm:gap-2 tracking-wide transition"
                  >
                    VIEW PRODUCT —
                    <span className="text-[#ffa52f]">
                      ${product.price}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
            {/* Page Indicators */}
            {totalPages > 1 && (
              <div className="flex gap-2 mt-6 justify-center">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx)}
                    className={`rounded-full transition-all ${idx === currentPage ? 'bg-[#4a69e2] w-8 h-2.5' : 'bg-gray-300 w-2.5 h-2.5'}`}
                    aria-label={`Page ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProductsDetails;
