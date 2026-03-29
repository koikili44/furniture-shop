import { ShoppingCartIcon } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { XMarkIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end lg:items-center justify-center p-4 lg:p-8">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white p-8 border-b border-gray-200 rounded-t-3xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-gray-900">Shopping Cart</h2>
            <Link to="/" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <XMarkIcon className="h-6 w-6 text-gray-600" />
            </Link>
          </div>
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <ShoppingCartIcon className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-xl text-gray-500 font-medium">Your cart is empty</p>
              <Link
                to="/shop"
                className="mt-6 inline-block bg-gradient-to-r from-wood-600 to-gold-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-wood-700 hover:to-gold-500 transition-all"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">{item.name}</h4>
                      <p className="text-lg font-bold text-wood-800">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-semibold text-lg">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 hover:bg-red-50 rounded-xl transition-colors ml-2"
                      title="Remove item"
                    >
                      <TrashIcon className="h-5 w-5 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-2xl font-bold text-gray-900">Total:</span>
                  <span className="text-3xl font-bold text-wood-800">${totalPrice.toFixed(2)}</span>
                </div>
                <Link
                  to="/checkout"
                  className="w-full bg-gradient-to-r from-wood-600 to-gold-600 text-white py-4 px-8 rounded-2xl text-lg font-bold text-center block hover:from-wood-700 hover:to-gold-500 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

