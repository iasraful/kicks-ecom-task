"use client";
import React from "react";
import Link from "next/link";
import { productsApi } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import { LoadingState, ErrorState } from "./ApiStates";

const NewDrop = () => {
  const {
    data: products = [],
    loading,
    error,
    execute: retry
  } = useApi(() => productsApi.getAll({ limit: 4 }));

  return (
    <section className="py-12 px-4 md:px-8 mb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
        <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight uppercase">
          DON’T MISS OUT <br className="hidden md:block" />
          NEW DROPS
        </h2>

        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-bold px-5 py-3 rounded-lg w-fit">
          SHOP NEW DROPS
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <LoadingState className="text-gray-500" />
      ) : error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="flex flex-col group min-w-0 overflow-hidden">

              {/* Image Box */}
              <div className="relative bg-white rounded-2xl sm:rounded-[28px] overflow-hidden p-2 sm:p-6 aspect-square flex items-center justify-center">
                <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#4a69e2] text-white text-[8px] sm:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-tl-lg rounded-br-lg sm:rounded-tl-xl sm:rounded-br-xl uppercase z-10">
                  New
                </span>

                <img
                  src={
                    product.images?.[0] ||
                    "https://via.placeholder.com/300"
                  }
                  alt={product.title}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Title */}
              <h3 className="mt-2 sm:mt-3 text-[11px] sm:text-sm lg:text-base font-bold uppercase leading-tight text-[#232321]">
                <span className="sm:hidden">
                  {product.title.length > 24 ? product.title.slice(0, 24) + '...' : product.title}
                </span>
                <span className="hidden sm:inline">{product.title}</span>
              </h3>

              {/* Button */}
              <Link href={`/product/${product.id}`}
                className="mt-2 sm:mt-3 bg-[#232321] hover:bg-black text-white text-[9px] sm:text-xs font-bold py-2 sm:py-3 rounded-md sm:rounded-lg w-full flex justify-center items-center gap-1 sm:gap-2 tracking-wide transition"
              >
                VIEW PRODUCT —
                <span className="text-[#ffa52f]">
                  ${product.price}
                </span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default NewDrop;
