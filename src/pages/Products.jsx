import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products/get-products"
      );

      console.log("API RESPONSE 👉", res.data);

      if (res.data.sucsess) {
        setProducts(res.data.products);
        console.log("PRODUCTS ARRAY 👉", res.data.products);
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

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((item) => {
            console.log("SINGLE PRODUCT 👉", item);
            console.log("PRODUCT IMAGES 👉", item.productimage);

            return <ProductCard key={item._id} item={item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Products;
