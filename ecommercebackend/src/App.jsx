import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
  // import TodoList from './components/TodoList';
  import Hero from './components/Hero';
  import Footer from './components/Footer';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div className="App">
          
          {/* Pass open function to Navbar */}
          <Navbar openCart={() => setIsCartOpen(true)} />
          
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Products />
              </>
            } />
            <Route path="/checkout" element={<Checkout />} />
            {/* <Route path="/goals" element={<TodoList />} /> */}         </Routes>          <Footer />         {/*  Show Cart only when open */}
          {isCartOpen && (
            <Cart closeCart={() => setIsCartOpen(false)} />
          )}

        </div>
      </Router>
    </CartProvider>
  );
}

export default App;