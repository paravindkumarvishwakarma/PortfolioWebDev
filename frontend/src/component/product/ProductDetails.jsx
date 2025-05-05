import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Feature/cartSlice";
import { Link } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);

      // fetch differenet category products
      const relatedRes = await fetch(`https://dummyjson.com/products/category/${data.category}`);
      const relatedData = await relatedRes.json();
      const filteredSuggestions = relatedData.products.filter((item) => item.id !== data.id);
      setSuggestions(filteredSuggestions);
    }

    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10 mb-10">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full md:w-96 h-64 object-contain border rounded"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-600">Category: <span className="capitalize">{product.category}</span></p>
          <p className="text-xl text-green-600 font-semibold">₹{product.price}</p>
          <p className="text-yellow-500 font-medium">⭐ {product.rating}</p>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">You might also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((item) => (
          <Link to={`/product/${item.id}`} key={item.id}>
            <div className="bg-white p-4 border rounded shadow hover:shadow-md transition">
              <img src={item.thumbnail} alt={item.title} className="w-full h-40 object-contain mb-2" />
              <h3 className="text-md font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">₹{item.price}</p>
              <p className="text-sm text-yellow-500">⭐ {item.rating}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductDetails;
