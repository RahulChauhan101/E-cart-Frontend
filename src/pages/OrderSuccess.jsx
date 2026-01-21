import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);

  const [secondsLeft, setSecondsLeft] = useState(5);

  const totalPrice = items.reduce(
    (total, item) => total + item.productprice * item.quantity,
    0
  );

  // 🔹 Countdown + Auto redirect
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className="pt-32 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 text-center bg-gray-50">
      {/* Success Icon */}
      <CheckCircle className="h-20 w-20 sm:h-24 sm:w-24 text-green-500 animate-bounce mb-4" />

      <h1 className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
        Order Placed Successfully!
      </h1>

      <p className="text-gray-600 mb-6 text-sm sm:text-base">
        Thank you for your purchase. Your order has been confirmed.
      </p>

      {/* Order Summary */}
      {items.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow mb-6 text-left w-full max-w-md">
          <h2 className="text-lg font-semibold mb-3">
            Order Summary
          </h2>

          {items.map((item) => (
            <div
              key={item._id}
              className="flex justify-between text-sm mb-2"
            >
              <span>
                {item.productname} × {item.quantity}
              </span>
              <span>
                ₹{item.productprice * item.quantity}
              </span>
            </div>
          ))}

          <hr className="my-3" />

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>
      )}

      {/* Countdown */}
      <p className="text-sm text-gray-500 mb-4">
        Redirecting to home in{" "}
        <span className="font-bold text-purple-600">
          {secondsLeft}
        </span>{" "}
        seconds...
      </p>

      {/* Manual button */}
      <button
        onClick={() => navigate("/")}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSuccess;
