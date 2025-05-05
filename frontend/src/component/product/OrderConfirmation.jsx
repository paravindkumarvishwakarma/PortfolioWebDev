import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../Redux/Feature/cartSlice';
import { useDispatch } from 'react-redux';

const mockOrder = {
  orderId: 'ORD123456789',
  items: [
    { id: 1, name: 'T-shirt - Blue', quantity: 2, price: 499 },
    { id: 2, name: 'Sneakers - White', quantity: 1, price: 1499 },
  ],
};

const OrderConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const totalAmount = mockOrder.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-8">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md sm:max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mb-4 text-center">
          Payment Successful!
        </h2>

        <p className="text-sm sm:text-base text-gray-500 text-center mb-6">
          Thank you for your purchase. Below are your order details.
        </p>

        <div className="mb-4 text-sm sm:text-base">
          <span className="font-semibold">Order ID:</span> {mockOrder.orderId}
        </div>

        <div className="border rounded-lg overflow-hidden">
          {mockOrder.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 px-4 py-3 border-b last:border-b-0"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-gray-500 sm:text-sm">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold">₹{item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        <div className="text-right mt-4 text-lg sm:text-xl font-bold">
          Total: ₹{totalAmount}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/home')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
