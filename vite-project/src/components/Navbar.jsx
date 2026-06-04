import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ openCart }) => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-900">
            Radison Furnitures
          </Link>

          {/* Right Section */}
          <div className="flex items-center space-x-4">

            {/* Cart Button */}
            <button 
              onClick={openCart}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ShoppingCartIcon className="h-6 w-6" />

              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Checkout */}
            <Link 
              to="/checkout" 
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-amber-700 transition-colors"
            >
              Checkout
            </Link>

            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 font-medium hidden sm:inline">{user.name}</span>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-red-600 font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="text-gray-600 hover:text-amber-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-amber-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
