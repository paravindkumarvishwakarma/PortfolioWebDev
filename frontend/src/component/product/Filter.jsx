import React from "react";

const Filter = ({ setSearch, setFilter, setSort, priceOrder, setPriceOrder }) => {
  return (
    <div className="w-64 fixed top-0 left-0 h-screen bg-white shadow-lg p-4 overflow-y-auto z-40">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => setSearch(e.target.value)}
      />
      <label className="block font-semibold mb-1">Category</label>
      <select
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => setFilter(e.target.value)}
      >
        <option>All</option>
        <option>beauty</option>
        <option>fragrances</option>
        <option>furniture</option>
        <option>groceries</option>
      </select>

      <label className="block font-semibold mb-1">Sort By</label>
      <select
        className="w-full p-2 border rounded"
        onChange={(e) => setSort(e.target.value)}
      >
        <option>Sort</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>

      <div className="mb-4 mt-4">
        <label className="block font-semibold mb-2">Price Order</label>
        <div className="flex items-center gap-4">
          <label>
            <input
              type="radio"
              value="lowToHigh"
              checked={priceOrder === "lowToHigh"}
              onChange={() => setPriceOrder("lowToHigh")}
              className="mr-2"
            />
            Low to High
          </label>
          <label>
            <input
              type="radio"
              value="highToLow"
              checked={priceOrder === "highToLow"}
              onChange={() => setPriceOrder("highToLow")}
              className="mr-2"
            />
            High to Low
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
