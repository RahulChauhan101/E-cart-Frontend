import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Sidebar states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("ALL");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999999);

  const getProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products/get-products"
      );

      if (res.data.success) {
        setProducts(res.data.products);
        setFiltered(res.data.products);
      } else {
        setProducts([]);
        setFiltered([]);
      }
    } catch (err) {
      console.error("FETCH ERROR 👉", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // 🔹 Apply filters
  useEffect(() => {
    let temp = [...products];

    if (search) {
      temp = temp.filter((p) =>
        p.productname.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      temp = temp.filter(
        (p) => p.productcategory?.toLowerCase() === category.toLowerCase()
      );
    }

    if (brand !== "ALL") {
      temp = temp.filter(
        (p) => p.brand?.toLowerCase() === brand.toLowerCase()
      );
    }

    temp = temp.filter(
      (p) => p.productprice >= minPrice && p.productprice <= maxPrice
    );

    setFiltered(temp);
  }, [search, category, brand, minPrice, maxPrice, products]);

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setBrand("ALL");
    setMinPrice(0);
    setMaxPrice(999999);
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-8 text-center">Products</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <Sidebar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          brand={brand}
          setBrand={setBrand}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          resetFilters={resetFilters}
        />

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <p className="text-center w-full">No products found</p>
        ) : (
          <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filtered.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
