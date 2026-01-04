import React from "react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section
      className="
        bg-gradient-to-r from-blue-500 to-purple-500
        text-white
        pt-24 md:pt-32
        pb-12 md:pb-20
      "
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center text-center md:text-left">
          
          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Latest Electronics at Best Prices
            </h1>

            <p className="text-base sm:text-lg md:text-xl mb-6 text-blue-100">
              Discover cutting-edge technology with unbeatable deals on
              smartphones, laptops, and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <Button className="bg-white text-blue-600 hover:bg-gray-200">
                Shop Now
              </Button>

              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                View Deals
              </Button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center md:justify-end mt-10 md:mt-0">
            <div className="bg-white/10  rounded-2xl">
              <img
                src="/public/apple i phone 17 pro max.webp"
                alt="Product"
                className="
                  w-full
                  max-w-[220px]
                  sm:max-w-[280px]
                  md:max-w-md
                  rounded-xl
                  shadow-2xl
                "
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
