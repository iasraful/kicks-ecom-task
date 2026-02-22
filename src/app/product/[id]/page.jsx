
"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { useCart } from '@/app/context/cartContext';

const ProductsDetails = () => {
      const { addToCart } = useCart();

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [mainImgIdx, setMainImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  // Example sizes, since API doesn't provide
  const sizes = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47];

  useEffect(() => {
    setLoading(true);
    axios.get(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-12 text-lg font-semibold text-gray-500">Loading...</div>;
  if (error || !product) return <div className="text-center py-12 text-lg font-semibold text-red-500">{error || 'Product not found'}</div>;


  // Example color swatches (API doesn't provide real color data)
  const colorSwatches = [
    product.images[0] || '',
    product.images[1] || product.images[0] || '',
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
            <div className="font-bold text-xs mb-1">COLOR</div>
            <div className="flex gap-2 mb-2">
              {colorSwatches.map((img, idx) => (
                <button
                  key={idx}
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${selectedColor === idx ? 'border-blue-600' : 'border-gray-300'}`}
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
              <span className="font-bold text-sm">SIZE</span>
              <span className="text-sm underline cursor-pointer text-gray-500">SIZE CHART</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {sizes.map(size => (
                <button
                  key={size}
                  className={`px-4 py-2 rounded-md border font-bold text-sm ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:border-black'}`}
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
                                quantity: 1
                              });
                              setAlertMessage(`✓ ${product.title} added to cart!`);
                              setTimeout(() => setAlertMessage(''), 3000);
                            }}
            className="bg-black text-white font-bold py-3 rounded-lg text-base hover:bg-blue-900 transition">ADD TO CART</button>
            <button className="bg-blue-600 text-white font-bold py-3 rounded-lg text-base hover:bg-blue-700 transition">BUY IT NOW</button>
          </div>
          {/* About the product */}
          <div className="mt-4">
            <h3 className="font-bold text-sm mb-1">ABOUT THE PRODUCT</h3>
            <div className="text-gray-700 text-sm mb-1">{product.description}</div>
            <ul className="text-xs text-gray-500 list-disc pl-5">
              <li>This product is excluded from all promotional discounts and offers.</li>
              <li>Pay over time in interest-free installments with Affirm, Klarna or Afterpay.</li>
              <li>Join adiClub to get unlimited free standard shipping, returns, & exchanges.</li>
            </ul>
          </div>
        </div>
      </div>
    {/* Related Products Section */}
    <RelatedProducts currentId={id} />
    </div>
  );
};


// Related Products Component
const RelatedProducts = ({ currentId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    setLoading(true);
    axios.get('https://api.escuelajs.co/api/v1/products')
      .then(res => {
        // Find current product's category name
        let currentCategory = null;
        const currentProduct = res.data.find(p => String(p.id) === String(currentId));
        if (currentProduct && currentProduct.category && currentProduct.category.name) {
          currentCategory = currentProduct.category.name;
        }
        // Filter by same category and exclude current product
        const filtered = res.data.filter(p =>
          String(p.id) !== String(currentId) &&
          p.category && p.category.name === currentCategory
        );
        setProducts(filtered);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load related products');
        setLoading(false);
      });
  }, [currentId]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIdx = currentPage * itemsPerPage;
  const displayedProducts = products.slice(startIdx, startIdx + itemsPerPage);

  const handlePrev = () => {
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentPage(prev => (prev + 1) % totalPages);
  };

  return (
    <section className="w-full mx-auto mt-12 mb-8 px-2 sm:px-4">
      <div className=" ">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-black">You may also like</h2>
          <div className="flex gap-2">
            <button onClick={handlePrev} className="bg-gray-400 hover:bg-gray-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg transition">
              &#8249;
            </button>
            <button onClick={handleNext} className="bg-gray-400 hover:bg-gray-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg transition">
              &#8250;
            </button>
          </div>
        </div>
        {loading ? (
          <div className="text-center py-12 text-lg font-semibold text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center py-12 text-lg font-semibold text-red-500">{error}</div>
        ) : displayedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <div key={product.id} className="flex flex-col">
              
              {/* Image Box */}
              <div className="relative bg-[#e7e7e7] rounded-3xl p-5">
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full">
                  New
                </span>

                <img
                  src={
                    product.images?.[0] ||
                    "https://via.placeholder.com/300"
                  }
                  alt={product.title}
                  className="w-full h-32 md:h-72 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="mt-4 text-xs md:text-sm font-extrabold uppercase leading-tight">
                {product.title}
              </h3>

              {/* Button */}
              <Link href={`/product/${product.id}`}
                className="mt-3 bg-black hover:bg-gray-800 text-white text-xs font-bold py-3 rounded-lg w-full flex justify-center gap-2"
              >
                VIEW PRODUCT -
                <span className="text-yellow-400">
                  ${product.price}
                </span>
              </Link>
            </div>
          ))}
        </div>
        ) : (
          <div className="text-center py-12 text-lg font-semibold text-gray-500">No related products found</div>
        )}
      </div>
    </section>
  );
};

export default ProductsDetails;