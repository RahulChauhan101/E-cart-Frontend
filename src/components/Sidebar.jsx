import React from "react";

const Sidebar = ({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  resetFilters,
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm w-full md:w-64">
      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />

      {/* Category */}
      <h3 className="font-semibold mb-2">Category</h3>
      <div className="space-y-1 mb-4">
        {["All", "Mobile", "Headphone", "Laptop"].map((cat) => (
          <label key={cat} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="category"
              value={cat}
              checked={category === cat}
              onChange={() => setCategory(cat)}
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Brand */}
      <h3 className="font-semibold mb-2">Brand</h3>
      <select
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="w-full border rounded-md px-3 py-2 mb-4"
      >
        <option value="ALL">ALL</option>
        <option value="Apple">Apple</option>
        <option value="boAt">boAt</option>
        <option value="ASUS">ASUS</option>
        <option value="Samsung">Samsung</option>
      </select>

      {/* Price Range */}
      <h3 className="font-semibold mb-2">Price Range</h3>
      <p className="text-sm mb-2">
        ₹{minPrice} - ₹{maxPrice}
      </p>

      <div className="flex gap-2 mb-2">
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className="w-1/2 border rounded-md px-2 py-1"
        />
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-1/2 border rounded-md px-2 py-1"
        />
      </div>

      <input
        type="range"
        min="0"
        max="999999"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        className="w-full mb-4"
      />

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Sidebar;
