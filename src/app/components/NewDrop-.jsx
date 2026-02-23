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
    <section className=" py-12 px-4 md:px-12  mb-10 ">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
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
      )}
    </section>
  );
};

export default NewDrop;
