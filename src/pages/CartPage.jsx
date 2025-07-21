import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    calculateTotal,
    getTotalItems,
  } = useCart();
  const navigate = useNavigate();

  const calculateSubtotal = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mx-auto text-gray-400 mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            No products in your cart. Browse our store to add items!
          </p>
          <Link
            to="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
      <p className="text-gray-600 mb-8">
        You have {getTotalItems} item{getTotalItems > 1 ? "s" : ""} in your cart
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="hidden md:grid grid-cols-12 bg-gray-100 text-gray-600 font-medium py-3 px-4">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-center">Subtotal</div>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="border-b border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-12 py-6 px-4 items-center">
                  <div className="col-span-5 flex items-center mb-4 md:mb-0">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 mr-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-contain border rounded-lg"
                    />
                    <div className="ml-4">
                      <Link
                        to={`/product/${item.id}`}
                        className="font-medium text-gray-800 hover:text-indigo-600"
                      >
                        {item.title}
                      </Link>
                      <p className="text-gray-500 text-sm mt-1">
                        {item.category}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-2 mb-4 md:mb-0">
                    <div className="md:hidden text-gray-500 text-sm mb-1">
                      Price
                    </div>
                    <div className="font-medium text-gray-800">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>

                  <div className="col-span-3 mb-4 md:mb-0">
                    <div className="md:hidden text-gray-500 text-sm mb-1">
                      Quantity
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l hover:bg-gray-100 text-gray-600"
                      >
                        -
                      </button>
                      <div className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300 text-gray-800">
                        {item.quantity}
                      </div>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r hover:bg-gray-100 text-gray-600"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="md:hidden text-gray-500 text-sm mb-1">
                      Subtotal
                    </div>
                    <div className="font-bold text-gray-800 text-center">
                      ${calculateSubtotal(item)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            <Link
              to="/"
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Clear Cart
            </button>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${calculateTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">$5.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium text-green-600">-$0.00</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${(parseFloat(calculateTotal) + 5.0).toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Coupon Code</label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 border focus:border focus:ring-0 border-gray-300 focus:border-blue-500 rounded-l-lg px-4 py-2  focus:outline-none "
                />
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-r-lg transition">
                  Apply
                </button>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Proceed to Checkout
            </button>

            <div className="mt-6 text-center">
              <Link
                to="/"
                className="text-indigo-600 hover:text-indigo-800 text-sm"
              >
                or Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
