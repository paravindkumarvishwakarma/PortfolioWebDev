import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  updateQuantity,
  removeFromCart,
  addToCart,
  clearCart,
} from "../../Redux/Feature/cartSlice";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);

  const handleIncrement = (item) => {
    dispatch(addToCart(item));
  };


  const handleDecrement = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleEmptyCart = () => {
    dispatch(clearCart());
  };

  
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return acc + price * quantity;
    }, 0);
    setTotalPrice(total);
  }, [cartItems]);

  useEffect(() => {
    const quantity = cartItems.reduce((acc, item) => {
      const qty = item.quantity || 0;
      return acc + qty;
    }, 0);
    setTotalQuantity(quantity);
  }, [cartItems]);


  const makePayment = async()=>{
    const stripe = await loadStripe("pk_test_51R1T3lFPYHVofb34iWSc3hrrWtSjmASXukeXfU7XS0DwuD96OOzPjUb6Ca7WRG5WxXTHuAe0oOHKNmZOU9Ou6k2300BTEtxzYG");

    const body = {
      products : cartItems
    }

    const headers = {
      "Content-Type":"application/json"
    }

    const response = await fetch("http://localhost:7000/api/create-checkout-session",{
      method:"POST",
      headers:headers,
      body:JSON.stringify(body)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Server Error:", errorText);
    return;
}

  const session = await response.json();

  const result = stripe.redirectToCheckout({
      sessionId:session.id
  });
  
  if(result.error){
      console.log(result.error);
  }
}  

  return (
    <div className="flex flex-col items-center px-4 py-8 bg-gray-100 min-h-screen">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
            Cart ({cartItems.length})
          </h1>
          {cartItems.length > 0 && (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm sm:text-base"
              onClick={handleEmptyCart}
            >
              Empty Cart
            </button>
          )}
        </div>

        <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center text-center py-16">
              <i className="fa fa-shopping-cart text-6xl text-gray-400 mb-4"></i>
              <p className="text-gray-500 text-lg">Your Cart Is Empty</p>
            </div>
          ) : (
            <table className="min-w-full table-auto text-left border-collapse">
              <thead>
                <tr className="bg-gray-200 text-xs sm:text-sm md:text-base">
                  <th className="p-2 sm:p-3">Action</th>
                  <th className="p-2 sm:p-3">Product</th>
                  <th className="p-2 sm:p-3">Name</th>
                  <th className="p-2 sm:p-3">Price</th>
                  <th className="p-2 sm:p-3">Qty</th>
                  <th className="p-2 sm:p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index} className="border-t text-xs sm:text-sm md:text-base">
                    <td className="p-2 sm:p-3">
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDecrement(item.id)}
                      >
                        <MdDeleteForever size={20} />
                      </button>
                    </td>
                    <td className="p-2 sm:p-3">
                      <div className="w-12 h-12 sm:w-16 sm:h-16">
                        <img
                          src={item.thumbnail}
                          alt={item.category}
                          className="object-cover w-full h-full rounded"
                        />
                      </div>
                    </td>
                    <td className="p-2 sm:p-3">{item.category}</td>
                    <td className="p-2 sm:p-3">₹{Math.floor(item.price)}</td>
                    <td className="p-2 sm:p-3">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(updateQuantity({
                            id: item.id,
                            quantity: Number(e.target.value),
                          }))
                        }
                        className="border rounded px-2 py-1 text-xs sm:text-sm"
                      >
                        {[...Array(10).keys()].map((num) => (
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2 sm:p-3 text-right">₹{Math.floor(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 border-t text-xs sm:text-sm md:text-base">
                  <th className="p-2 sm:p-3" colSpan={4}>
                    Items In Cart:
                  </th>
                  <th className="p-2 sm:p-3">{totalQuantity}</th>
                  <th className="p-2 sm:p-3 text-right">
                    Total: ₹{Math.floor(totalPrice)}
                  </th>
                </tr>
              </tfoot>
            </table>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="flex justify-center sm:justify-end mt-6">
            <button
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition text-sm sm:text-base"
              onClick={makePayment}
            >
              Proceed To Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
