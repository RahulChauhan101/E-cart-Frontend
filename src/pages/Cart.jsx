import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, addToCart } from "@/redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const items = cart?.items || [];

  const totalPrice = items.reduce(
    (total, item) => total + item.productprice * item.quantity,
    0
  );

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.productimage?.[0]}
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
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Quantity Controls */}
                  <button
                    onClick={() => dispatch(addToCart(item))}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    +
                  </button>

                  <span className="font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(removeFromCart(item._id))
                    }
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total & Clear */}
          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">
              Total: ₹{totalPrice}
            </h2>

            <button
              onClick={() => dispatch(clearCart())}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
