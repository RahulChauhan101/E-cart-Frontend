import { ShoppingCart } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  const navigate = useNavigate();

  // temporary user (replace later with auth context)
  const user = true;
  const cartCount = 2;

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear auth
    navigate("/login"); // redirect
  };

  return (
    <header className="bg-purple-50 fixed w-full z-20 border-b border-purple-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <img
            className="w-[90px] drop-shadow-md"
            src="/6320340.png"
            alt="E-Cart Logo"
          />
          <h2 className="-mt-3 text-lg font-bold tracking-wide text-purple-700">
            E-Cart
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex gap-10 items-center">
          <ul className="flex gap-7 items-center text-lg font-semibold">
            <li>
              <Link to="/" className="hover:text-purple-600">
                Home
              </Link>
            </li>

            <li>
              <Link to="/products" className="hover:text-purple-600">
                Products
              </Link>
            </li>

            {user && (
              <li>
                <Link to="/profile" className="hover:text-purple-600">
                  Hello User
                </Link>
              </li>
            )}
          </ul>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Login / Logout */}
          {user ? (
            <Button
              onClick={handleLogout}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white"
            >
              Logout
            </Button>
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
