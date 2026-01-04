import React from "react";
import { Truck, ShieldCheck, Headphones, CreditCard } from "lucide-react";

const Features = () => {
  return (
    <section className="py-12 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-10">
          Our Services
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          
          {/* Free Shipping */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
            <Truck className="mx-auto mb-4 text-blue-600" size={36} />
            <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
            <p className="text-sm text-gray-600">
              Free delivery on all orders above ₹999
            </p>
          </div>

          {/* Secure Payment */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
            <ShieldCheck className="mx-auto mb-4 text-green-600" size={36} />
            <h3 className="font-semibold text-lg mb-2">Secure Payments</h3>
            <p className="text-sm text-gray-600">
              100% secure and trusted payment options
            </p>
          </div>

          {/* 24/7 Support */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
            <Headphones className="mx-auto mb-4 text-purple-600" size={36} />
            <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
            <p className="text-sm text-gray-600">
              Friendly support anytime you need help
            </p>
          </div>

          {/* Easy Payment */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
            <CreditCard className="mx-auto mb-4 text-pink-600" size={36} />
            <h3 className="font-semibold text-lg mb-2">Easy Payments</h3>
            <p className="text-sm text-gray-600">
              UPI, Cards, Net Banking & COD available
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;
