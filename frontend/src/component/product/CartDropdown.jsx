import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../Redux/Feature/cartSlice";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const CartDropdown = ({ open , setOpen }) => {
  const { items: cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cartItems.length === 0) {
      setOpen(false);
    }
  }, [cartItems, setOpen]); 

  if (!open) return null;

  return (
    <div className="absolute top-16 right-6 w-80 bg-white shadow-lg border rounded-lg p-4 z-50">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Cart Items</h2>

      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 mb-4 border-b pb-3">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-14 h-14 object-cover rounded"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{item.category}</p>
              <p className="text-sm text-gray-600">₹{Math.floor(item.price)}</p>
            </div>
            <MdDelete
              className="text-xl text-red-500 hover:text-red-700 cursor-pointer"
              onClick={() => dispatch(removeFromCart(item.id))}
            />
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm text-center">Your cart is empty</p>
      )}

      <Link to="/cart">
        <button className="w-full mt-4 bg-blue-600 text-white text-sm font-semibold py-2 rounded hover:bg-blue-700 transition">
          Go to Cart
        </button>
      </Link>
    </div>
  );
};

export default CartDropdown;
