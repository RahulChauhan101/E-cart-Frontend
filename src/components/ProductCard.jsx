import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const validImages = item.productimage?.filter(
    (img) => img?.url && img.url.startsWith("https")
  );

  const [activeImage, setActiveImage] = useState(
    validImages?.[0]?.url || null
  );

  const [zoomStyle, setZoomStyle] = useState({
    backgroundPosition: "center",
    backgroundSize: "cover",
  });

  const getHDImage = (url) =>
    url.replace(
      "/image/upload/",
      "/image/upload/q_auto:best,f_auto,w_1200/"
    );

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "250%",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      backgroundPosition: "center",
      backgroundSize: "cover",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
      {/* 🔍 HD ZOOM IMAGE */}
      {activeImage ? (
        <div
          className="w-full h-48 rounded-md mb-3 cursor-zoom-in overflow-hidden border"
          style={{
            backgroundImage: `url(${getHDImage(activeImage)})`,
            backgroundRepeat: "no-repeat",
            ...zoomStyle,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md mb-3 text-gray-500">
          Image not available
        </div>
      )}

      {/* THUMBNAILS */}
      {validImages?.length > 1 && (
        <div className="grid grid-cols-4 gap-2 mb-3">
          {validImages.map((img) => (
            <img
              key={img._id}
              src={img.url}
              alt={item.productname}
              onClick={() => setActiveImage(img.url)}
              className={`h-16 w-full object-cover rounded cursor-pointer border
                ${
                  activeImage === img.url
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
              loading="lazy"
            />
          ))}
        </div>
      )}

      {/* CONTENT */}
      <h2 className="text-lg font-semibold">
        {item.productname}
      </h2>

      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
        {item.productdescription}
      </p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-green-600 font-bold">
          ₹{item.productprice}
        </span>
        <span className="text-xs text-gray-500">
          {item.brand}
        </span>
      </div>

      {/* 🛒 ADD TO CART BUTTON */}
      <button
        onClick={() => {
          dispatch(addToCart(item));
          toast.success(`"${item.productname}" added to cart`);
          console.log("Added to cart:", item);
        }}
        className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
