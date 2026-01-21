import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/redux/cartSlice";
import { toast } from "react-toastify";
import { Loader2, Wallet, CreditCard, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const totalPrice = items.reduce(
    (total, item) => total + item.productprice * item.quantity,
    0
  );

  // ✅ FIXED COUNTS
  const totalProducts = items.length;

  const totalItems = items.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setLoading(true);

    try {
      const delay = paymentMethod === "COD" ? 1500 : 2000;

      if (paymentMethod !== "COD") {
        toast.info("Redirecting to payment gateway...");
      }

      setTimeout(() => {
        const methodLabel =
          paymentMethod === "COD"
            ? "Cash on Delivery"
            : paymentMethod === "UPI"
            ? "UPI Payment"
            : "Card Payment";

        toast.success(`${methodLabel} successful!`);

        dispatch(clearCart());
        setLoading(false);

        navigate("/order-success");
      }, delay);
    } catch (err) {
      toast.error("Payment failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="pt-44 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Order Summary */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-3">
          Order Summary
        </h2>

        {items.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between gap-4 mb-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={
                  Array.isArray(item.productimage)
                    ? item.productimage[0]?.url
                    : item.productimage?.url
                }
                alt={item.productname}
                className="w-14 h-14 object-cover rounded border"
                onError={(e) => {
                  e.target.src = "/placeholder.png";
                }}
              />

              <div>
                <p className="text-sm font-medium">
                  {item.productname}
                </p>
                <p className="text-xs text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>
            </div>

            <p className="text-sm font-semibold">
              ₹{item.productprice * item.quantity}
            </p>
          </div>
        ))}

        <hr className="my-3" />

        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>

        <div className="flex justify-between font-bold">
          <span>Products</span>
          <span>{totalProducts}</span>
        </div>

        <div className="flex justify-between font-bold">
          <span>Total Items</span>
          <span>{totalItems}</span>
        </div>
      </div>

      {/* Payment Options */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">
          Payment Method
        </h2>

        {/* Cash */}
        <label
          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition mb-3
            ${
              paymentMethod === "COD"
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-purple-400"
            }`}
        >
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
            className="hidden"
          />

          <Wallet
            className={`h-6 w-6 ${
              paymentMethod === "COD"
                ? "text-green-600"
                : "text-gray-500"
            }`}
          />

          <div>
            <p className="font-medium">Cash on Delivery</p>
            <p className="text-sm text-gray-500">
              Pay when product arrives
            </p>
          </div>
        </label>

        {/* UPI */}
        <label
          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition mb-3
            ${
              paymentMethod === "UPI"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-purple-400"
            }`}
        >
          <input
            type="radio"
            name="payment"
            value="UPI"
            checked={paymentMethod === "UPI"}
            onChange={() => setPaymentMethod("UPI")}
            className="hidden"
          />

          <Smartphone
            className={`h-6 w-6 ${
              paymentMethod === "UPI"
                ? "text-blue-600"
                : "text-gray-500"
            }`}
          />

          <div>
            <p className="font-medium">UPI</p>
            <p className="text-sm text-gray-500">
              Google Pay, PhonePe, Paytm
            </p>
          </div>
        </label>

        {/* Card */}
        <label
          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition
            ${
              paymentMethod === "CARD"
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 hover:border-purple-400"
            }`}
        >
          <input
            type="radio"
            name="payment"
            value="CARD"
            checked={paymentMethod === "CARD"}
            onChange={() => setPaymentMethod("CARD")}
            className="hidden"
          />

          <CreditCard
            className={`h-6 w-6 ${
              paymentMethod === "CARD"
                ? "text-purple-600"
                : "text-gray-500"
            }`}
          />

          <div>
            <p className="font-medium">Debit / Credit Card</p>
            <p className="text-sm text-gray-500">
              Visa, MasterCard, RuPay
            </p>
          </div>
        </label>
      </div>

      {/* Place Order Button */}
      <button
        disabled={loading}
        onClick={handlePlaceOrder}
        className={`relative w-full py-3 rounded-lg text-white text-lg 
          flex items-center justify-center gap-2 transition-all duration-300
          ${
            loading
              ? "bg-gray-600 cursor-not-allowed shadow-[0_0_25px_rgba(34,197,94,0.8)]"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
      >
        {loading && (
          <span className="absolute inset-0 rounded-lg bg-green-500 opacity-20 blur-lg"></span>
        )}

        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin text-green-400 z-10" />
            <span className="z-10">Processing...</span>
          </>
        ) : (
          "Place Order"
        )}
      </button>
    </div>
  );
};

export default Checkout;
