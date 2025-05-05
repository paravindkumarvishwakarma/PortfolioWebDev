import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import Product from "./Product";
import CartDropdown from "./cartDropDown";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import UserProfile from "../Main/UserProfile";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("");
  const [priceOrder, setPriceOrder] = useState("");
  const [open, setOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const { items: cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://dummyjson.com/products?limit=50");
      const data = await res.json();
      setProducts(data.products);
    }
    fetchData();
  }, []);

  const filtered = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (filter === "All" ? true : p.category === filter))
    .sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (priceOrder === "lowToHigh") return a.price - b.price;
      if (priceOrder === "highToLow") return b.price - a.price;
      return 0;
    });

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
      <div 
        className={`
          ${showFilter ? "block" : "hidden"} 
          md:block 
          bg-white shadow-md md:shadow-none
          w-full md:w-64 
          p-4 
          fixed md:static 
          z-40 md:z-0 
          top-0 md:top-auto
        `}
      >
        <Filter
          setSearch={setSearch}
          setFilter={setFilter}
          setSort={setSort}
          priceOrder={priceOrder}
          setPriceOrder={setPriceOrder}
        />
      </div>


      <div className="fixed top-4 right-6 z-50 flex items-center gap-6">
        <button 
          onClick={() => setShowFilter(!showFilter)}
          className="md:hidden bg-blue-500 text-white px-3 py-2 rounded-full text-sm"
        >
          {showFilter ? "Close Filters" : "Filters"}
        </button>

        <div className="relative cursor-pointer" onClick={() => setOpen(true)}>
          <FiShoppingCart size={32} />
          {cartItems.length > 0 && (
            <div className="absolute -top-1 -right-1 bg-green-500 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.length}
            </div>
          )}
        </div>

        <UserProfile/>
      </div>

      <div className="flex-1 p-6 mt-20 md:mt-6">
        <h1 className="text-2xl font-bold mb-6">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
      
      <CartDropdown open={open} setOpen={setOpen} />
    </div>
  );
};

export default Home;
