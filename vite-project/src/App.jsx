import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Register from './components/Register';
import Hero from './components/Hero';
import Footer from './components/Footer';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar openCart={() => setIsCartOpen(true)} />

            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <Products />
                </>
              } />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>

            <Footer />

            {isCartOpen && (
              <Cart closeCart={() => setIsCartOpen(false)} />
            )}
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
