"use client";

import React from "react";
import "../app/Css/globals.css";
import { Product } from "@/type";
import { useCart } from "@/store/CartContext";
import Image from "next/image";

const ProductCard = ({
  product,
  darkMode
}: {
  product: Product;
  darkMode: boolean;
}) => {
  const { addToCart } = useCart();

  const truncate = (input: string) =>
    input?.length > 100 ? `${input.substring(0, 60)}...` : input;

  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="group image-container relative">
        <Image
          src={product.image}
          alt={product.title}
          width={500}
          height={300}
          className="image"
        />
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-lg font-bold uppercase truncate dark:text-white">
          {product.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {truncate(product.description)}
        </p>
      </div>

      {/* Price and Category */}
      <div className="flex justify-between items-center p-4 sm:p-5 bg-gray-100 dark:bg-gray-100">
        <p className="text-xl font-bold text-emerald-700 dark:text-emerald-700">
          ${product.price.toFixed(2)}
        </p>
        <span className="bg-emerald-700 text-white text-xs px-2 py-1 rounded-lg font-thin">
          {product.category}
        </span>
      </div>
      <div className="p-4 sm:p-5">
        <button
          type="button"
          onClick={() => addToCart(product)}
          className="text-sm sm:text-base bg-gray-100 text-emerald-700 w-full px-4 py-2.5 rounded-md "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
