"use client";

import { useState, useEffect, useMemo } from "react";
import { Product } from "@/type";
import { useCart } from "@/store/CartContext";
import Header from "@/Components/Header";
import ProductCard from "@/Components/ProductCard";

//fetch product
const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error("HTTP error! status: ${response.status");
        }

        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return { products, loading, error };
};

const EcommerceApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { products, loading, error } = useProducts();
  const { cart } = useCart();

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <Header
          cart={cart}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <main className="container mx-auto pt-24 pb-8 px-4">
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700 dark:border-white"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  darkMode={darkMode}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EcommerceApp;
