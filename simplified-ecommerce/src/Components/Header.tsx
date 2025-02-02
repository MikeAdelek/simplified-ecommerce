"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Checkout from "@/Components/Checkout";
import { CartItem } from "@/app/type";
import { Modal, Button, Result } from "antd";
import { useCart } from "@/store/CartContext";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  MoonOutlined,
  SunOutlined,
  MenuOutlined,
  CloseOutlined
} from "@ant-design/icons";

interface HeaderProps {
  cart: CartItem[];
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header = ({
  cart,
  darkMode,
  setDarkMode,
  searchQuery,
  setSearchQuery
}: HeaderProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { setCart } = useCart();

  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const OrderConfirmation = () => (
    <Modal
      open={showConfirmation}
      onCancel={() => setShowConfirmation(false)}
      footer={[
        <Button
          key="continue"
          type="primary"
          onClick={() => {
            setShowConfirmation(false);
            setCart([]); // Clear cart
          }}
          className="w-full sm:w-auto"
        >
          Continue Shopping
        </Button>
      ]}
      centered
      maskClosable={false}
    >
      <Result
        status="success"
        title="Order Confirmed!"
        subTitle={
          <span className="text-gray-600">
            Thank you for your purchase. You will receive a confirmation email
            shortly.
          </span>
        }
      />
    </Modal>
  );

  return (
    <section>
      <nav
        className={`fixed top-0 w-full ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-md z-50`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex-shrink-0">
              <h1
                className={`text-xl sm:text-2xl font-bold ${
                  darkMode ? "text-white" : "text-emerald-700"
                }`}
              >
                Simplified Commerce
              </h1>
            </Link>

            {/* Mobile Menu Toggle */}
            {isMobile ? (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={darkMode ? "text-gray-300" : "text-emerald-700"}
              >
                {mobileMenuOpen ? (
                  <CloseOutlined
                    size={24}
                    className="text-emerald-700 dark:text-white"
                  />
                ) : (
                  <MenuOutlined
                    size={24}
                    className="text-emerald-700 dark:text-white"
                  />
                )}
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                {/* Search & Dark Mode Toggle */}
                <div className="relative flex-grow max-w-md mx-4">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full p-2 pl-10 rounded-lg border border-emerald-700 ${
                      darkMode
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-white"
                    }`}
                  />
                  <SearchOutlined
                    className={`absolute left-3 top-2.5 ${
                      darkMode ? "text-gray-300" : "text-emerald-700"
                    }`}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-lg text-white ${
                    darkMode ? "bg-gray-700" : "bg-emerald-700"
                  }`}
                >
                  {darkMode ? <MoonOutlined /> : <SunOutlined />}
                </button>

                <button
                  type="button"
                  onClick={() => setShowCheckout(true)}
                  className="relative p-2"
                >
                  <ShoppingCartOutlined
                    className={`text-2xl ${
                      darkMode ? "text-gray-300" : "text-emerald-700"
                    }`}
                  />
                  {cart.length > 0 && (
                    <span
                      className="absolute -top-2 -right-2 bg-red-500 text-white 
                                 rounded-full px-2 py-1 text-xs"
                    >
                      {cart.length}
                    </span>
                  )}
                </button>
              </div>
            )}
            {/* Mobile Menu DropDown */}
            {isMobile && mobileMenuOpen && (
              <div
                className={`absolute top-full left-0 right-0 ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow-md`}
              >
                <div className="p-4 space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Products...."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full p-2 pl-10 rounded-lg border border-emerald-700 ${
                        darkMode
                          ? "bg-gray-700 text-white border-gray-600"
                          : "bg-white"
                      }`}
                    />
                    <SearchOutlined className="absolute left-3 top-2.5 text-gray-400" />
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setDarkMode(!darkMode)}
                      className={`flex items-center space-x-2 ${
                        darkMode ? "text-gray-300" : "text-emerald-700"
                      }`}
                    >
                      {darkMode ? <MoonOutlined /> : <SunOutlined />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowCheckout(true)}
                      className="relative flex items-center space-x-2"
                    >
                      <ShoppingCartOutlined
                        className={
                          darkMode ? "text-gray-300" : "text-emerald-700"
                        }
                      />
                      <span
                        className={
                          darkMode ? "text-gray-300" : "text-emerald-700"
                        }
                      >
                        Cart ({cart.length})
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Checkout component */}
      {showCheckout && (
        <Checkout
          darkMode={darkMode}
          onClose={() => setShowCheckout(false)}
          setShowConfirmation={setShowConfirmation}
        />
      )}
      <OrderConfirmation />
    </section>
  );
};

export default Header;
