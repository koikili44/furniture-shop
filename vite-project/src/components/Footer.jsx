import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      {/* Top Banner */}
      <div className="bg-amber-600 py-4 px-4 text-center">
        <p className="text-white font-semibold text-sm tracking-wide">
          🚚 Free delivery on orders over $500 — Premium furniture, delivered to your door
        </p>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold text-amber-500 mb-3">Radison Furnitures</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Premium furniture crafted for modern living. Timeless design meets exceptional quality in every piece we create.
            </p>
            <div className="space-y-1 text-sm text-gray-500">
              <p>📍 123 Furniture Lane, Woodville</p>
              <p>📞 (555) 123-4567</p>
              <p>✉️ info@radisonfurnitures.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-amber-500 transition-colors">Home</Link></li>
              <li><a href="/#products" className="text-gray-400 hover:text-amber-500 transition-colors">Products</a></li>
              <li><Link to="/checkout" className="text-gray-400 hover:text-amber-500 transition-colors">Checkout</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-amber-500 transition-colors">Login</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-amber-500 transition-colors">Register</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Categories</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">Sofas & Lounges</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">Dining Sets</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">Office Furniture</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">Shelves & Storage</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">Bedroom</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Follow Us</h4>
            <p className="text-gray-400 text-sm mb-5">Stay updated with our latest collections and offers.</p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-sm transition-all duration-200 hover:scale-110">f</a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-sm transition-all duration-200 hover:scale-110">X</a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-sm transition-all duration-200 hover:scale-110">in</a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-sm transition-all duration-200 hover:scale-110">ig</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 Radison Furnitures. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;