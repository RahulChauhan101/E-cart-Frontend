import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  removeFromCart,
  clearCart,
  addToCart,
  decreaseQuantity,
} from "@/redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const items = cart?.items || [];

  const totalPrice = items.reduce(
    (total, item) => total + item.productprice * item.quantity,
    0
  );

  const totalItems = items.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">🛒 Your Cart</h1>
      <p className="text-gray-500 mb-6">
        Total Items: {totalItems}
      </p>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row md:justify-between md:items-center bg-white p-4 rounded-lg shadow"
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <img
                    src={
                      Array.isArray(item.productimage)
                        ? item.productimage[0]?.url
                        : item.productimage?.url
                    }
                    alt={item.productname}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div>
                    <h2 className="font-semibold">
                      {item.productname}
                    </h2>
                    <p className="text-gray-500">
                      ₹{item.productprice}
                    </p>
                    <p className="text-sm text-gray-500">
                      Subtotal: ₹
                      {item.productprice * item.quantity}
                    </p>
                  </div>
                </div>

                {/* Quantity + Remove */}
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                  <button
                    onClick={() => {
                      dispatch(decreaseQuantity(item._id));
                      toast.info("Quantity decreased");
                    }}
                    className="px-3 py-1 bg-gray-300 rounded"
                  >
                    –
                  </button>

                  <span className="font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => {
                      dispatch(addToCart(item));
                      toast.success("Quantity increased");
                    }}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => {
                      dispatch(removeFromCart(item._id));
                      toast.error("Item removed from cart");
                    }}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-bold">
                Total: ₹{totalPrice}
              </h2>
              <p className="text-gray-500">
                Items: {totalItems}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  dispatch(clearCart());
                  toast.error("Cart cleared");
                }}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Clear Cart
              </button>

              <button
                onClick={() => navigate("/checkout")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
