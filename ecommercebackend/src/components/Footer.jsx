import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-wood-800 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
  <h3 className="text-2xl font-bold text-gold-400 mb-4">Radison Furnitures</h3>
  <p className="text-wood-100 mb-2 text-sm">
    Premium furniture for every modern home.
  </p>
  <p className="text-wood-100 mb-4 text-sm">
    Quality craftsmanship and timeless design.
  </p>
  <div className="space-y-2 text-sm text-wood-300">
    <p>123 Furniture Lane<br />Woodville, WD 12345</p>
    <p>Phone: (555) 123-4567</p>
    <p>Email: info@radisonfurnitures.com</p>
  </div>
</div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-wood-300 hover:text-gold-400 transition-colors duration-200 block">Home</Link></li>
              <li><a href="/#products" className="text-wood-300 hover:text-gold-400 transition-colors duration-200 block">Products</a></li>
              <li><Link to="/checkout" className="text-wood-300 hover:text-gold-400 transition-colors duration-200 block">Checkout</Link></li>
              <li><a href="#" className="text-wood-300 hover:text-gold-400 transition-colors duration-200 block">About Us</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Shop by Category</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-wood-300 hover:text-gold-400 transition-colors duration-200 block">Sofas</a></li>
              <li><a href="#" className="text-wood-300 hover:text-gold-400 transition-colors duration-200 block">Dining</a></li>
              <li><a href="#" className="text-wood-300 hover:text-gold-400 transition-colors duration-200 block">Office</a></li>
              <li><a href="#" className="text-wood-300 hover:text-gold-400 transition-colors duration-200 block">Shelves</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Stay Connected</h4>
            <div className="space-y-4 mb-6">
              <p className="text-sm text-wood-300">Follow us for new arrivals!</p>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-wood-700/50 hover:bg-gold-600 rounded-xl flex items-center justify-center text-white font-bold text-sm transition-all duration-200 hover:scale-105">f</a>
                <a href="#" className="w-12 h-12 bg-wood-700/50 hover:bg-gold-600 rounded-xl flex items-center justify-center text-white font-bold text-sm transition-all duration-200 hover:scale-105">X</a>
                <a href="#" className="w-12 h-12 bg-wood-700/50 hover:bg-gold-600 rounded-xl flex items-center justify-center text-white font-bold text-sm transition-all duration-200 hover:scale-105">ig</a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-wood-600/50 pt-8 text-center">
          <p className="text-xs text-wood-400">
            © 2026 Radison Furnitures. All rights reserved. | Made with <span className="text-gold-400">♥</span> for furniture lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
