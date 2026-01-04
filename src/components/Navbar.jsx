import React from "react";
import { ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔥 get full user slice
  const userState = useSelector((state) => state.user);

  // ✅ 2️⃣ YAHIN console.log karo
  console.log("Navbar Redux userState 👉", userState);

  // optional: safe user parse
  let user = userState.user;
  if (typeof user === "string") {
    try {
      user = JSON.parse(user);
    } catch {
      user = null;
    }
  }

  const cartCount = 0;

  const logoutHandler = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (err) {
      console.log("Logout error:", err.response?.data || err.message);
    } finally {
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/login");
    }
  };

  return (
    <header className="bg-purple-50 fixed w-full z-20 border-b border-purple-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4">
        
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-2xl px-4 py-1 cursor-pointer"
        >
          <img src="/6320340.png" className="w-[40px]" alt="logo" />
          <h2 className="text-lg font-bold">E-Cart</h2>
        </div>

        {/* Navigation */}
        <nav className="flex gap-6 items-center">
          <Link to="/" className="font-semibold hover:text-purple-600">
            Home
          </Link>

          <Link to="/products" className="font-semibold hover:text-purple-600">
            Products
          </Link>  

          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth Section */}
          {user ? (
            <>
              <span onClick={() => navigate("/profile")} className="text-purple-700 font-semibold cursor-pointer hover:bg-pink-200 p-2 rounded-tl-3xl rounded-br-2xl">
                Hello {user.FirstName} {user.LastName}
              </span>
              <Button
                onClick={logoutHandler}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
            >
              Login
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
