import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import TodoList from './components/TodoList';
import Hero from './components/Hero';

function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar setShowCart={setShowCart} />
          
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Products />
              </>
            } />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/goals" element={<TodoList />} />
          </Routes>
          
          <Cart 
            isOpen={showCart} 
            onClose={() => setShowCart(false)} 
          />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;