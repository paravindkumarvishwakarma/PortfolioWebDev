import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Feature/cartSlice";
import { Link } from "react-router-dom";

const Product= ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-40 w-full object-contain mb-4"
      />
      <div className="flex flex-col items-center">
        <Link to={`/product/${product.id}`}>
          <h2 className="text-lg font-semibold text-center hover:underline">
            {product.title}
          </h2>
        </Link>
        <p className="text-black-700 text-center">
          Category: {product.category}
        </p>
        <p className="text-gray-600 text-center">Price: ₹{Math.floor(product.price)}</p>
        <p className="text-yellow-500 text-center">Rating: {product.rating}</p>
        <button
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
