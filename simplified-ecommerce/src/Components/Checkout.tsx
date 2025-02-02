"use client";

import { useCart } from "@/store/CartContext";
import React, { useState } from "react";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { useFormValidation } from "@/utils/FormValidation";
import Image from "next/image";

interface CheckoutProps {
  darkMode: boolean;
  onClose: () => void;
  setShowConfirmation: (show: boolean) => void;
}

const Checkout = ({
  darkMode,
  onClose,
  // onConfirm,
  setShowConfirmation
}: CheckoutProps) => {
  // Access cart context
  const { cart, total, removeFromCart } = useCart();
  const { formData, setFormData, errors, validateForm } = useFormValidation({
    name: "",
    address: "",
    phone: "",
    email: ""
  });

  // Add loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handle submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setIsSubmitting(true);
        // Fake API call
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1s
        onClose();
        setShowConfirmation(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const truncate = (input: string) =>
    input?.length < 100 ? `${input.substring(0, 20)}...` : input;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="p-6">
          <h2
            className={`text-2xl font-bold mb-4 ${
              darkMode ? "text-white" : ""
            }`}
          >
            Checkout
          </h2>

          {cart.length > 0 ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 mb-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="max-w-md mx-auto px-4 sm:px-6 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800"
                  >
                    <div className="flex items-center justify-center space-x-4 p-4">
                      <div className="group p-4">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={500}
                          height={300}
                          className="image-container object-contain w-full"
                        />
                        <h3 className="text-sm font-bold uppercase truncate dark:text-white mb-1">
                          {truncate(item.title)}
                        </h3>
                        <p className="text-sm font-bold text-emerald-700 dark:text-emerald-700 mb-2">
                          Qty:{item.quantity} * ${item.price.toFixed(2)}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm sm:text-base bg-gray-100 text-emerald-700 w-full px-4 py-2.5 rounded-md"
                        >
                          Remove from cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  className={`text-xl font-bold mt-4 ${
                    darkMode ? "text-white" : ""
                  }`}
                >
                  Total: ${total.toFixed(2)}
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    id="Full Name"
                    type="text"
                    name="Full Name"
                    placeholder="janesmith"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full pl-10 mr-4 p-2  border rounded-lg ${
                      darkMode ? "bg-gray-700" : "text-black"
                    } ${errors.name ? "border-red-500" : "border-emerald-700"}`}
                  />
                  <UserOutlined className="absolute left-3 top-2.5 items-center" />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <textarea
                    id="shipping address"
                    name="shipping address"
                    placeholder="Shipping Address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className={`w-full p-2 border rounded-lg ${
                      darkMode ? "bg-gray-700" : "text-black"
                    } ${
                      errors.address ? "border-red-500" : "border-emerald-700"
                    }`}
                    rows={4}
                  >
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address}
                      </p>
                    )}
                  </textarea>
                </div>

                <div className="relative">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="234 xxx xx x"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className={`w-full pl-10 mr-4 p-2 border rounded-lg ${
                      darkMode ? "bg-gray-700" : "text-black"
                    } ${
                      errors.phone ? "border-red-500" : "border-emerald-700"
                    }`}
                  />
                  <PhoneOutlined className="absolute left-3 top-2.5 items-center" />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full pl-10 mr-4 p-2 border rounded-lg ${
                      darkMode ? "bg-gray-700 text-white" : "text-black"
                    } ${
                      errors.email ? "border-red-500" : "border-emerald-700"
                    }`}
                  />
                  <MailOutlined className="absolute left-3 top-2.5 items-center" />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="button rounded-md "
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="button rounded-md"
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Your cart is empty
              </p>
              <button
                type="submit"
                onClick={onClose}
                className="button rounded-md py-1 px-2 hover:bg-emerald-800"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
