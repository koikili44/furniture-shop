import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51ABC123...your_publishable_key_here...'); // Replace with your Stripe test key

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, clearCart, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    // Simulate backend payment intent creation
    // In real app, call your /create-payment-intent API
    const { error: backendError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
    });

    if (backendError) {
      setError(backendError.message);
    } else {
      setSuccess(true);
      clearCart();
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-3xl p-12 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-3xl mx-auto mb-8 flex items-center justify-center">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-green-900 mb-4">Payment Successful!</h2>
        <p className="text-lg text-green-800 mb-8">Thank you for your purchase.</p>
        <Link to="/" className="bg-gradient-to-r from-wood-600 to-gold-600 text-white px-8 py-3 rounded-xl font-bold hover:from-wood-700">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Full Name" required className="w-full p-4 border border-gray-200 rounded-xl focus:border-gold-400 focus:outline-none transition-colors" />
          <input type="email" placeholder="Email" required className="w-full p-4 border border-gray-200 rounded-xl focus:border-gold-400 focus:outline-none transition-colors" />
          <input type="text" placeholder="Address" required className="w-full p-4 border border-gray-200 rounded-xl focus:border-gold-400 focus:outline-none transition-colors" />
          <input type="text" placeholder="City" required className="w-full p-4 border border-gray-200 rounded-xl focus:border-gold-400 focus:outline-none transition-colors" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl">
          <CardElement className="bg-white p-4 rounded-xl" options={{ style: { base: { fontSize: '16px' } } }} />
        </div>
        {error && <div className="text-red-600 bg-red-50 p-4 rounded-xl mt-2">{error}</div>}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
        <Link
          to="/cart"
          className="flex-1 bg-white border border-gray-200 text-gray-700 px-6 py-4 rounded-xl text-center font-semibold hover:bg-gray-50 transition-all"
        >
          Back to Cart
        </Link>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 bg-gradient-to-r from-wood-600 to-gold-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-wood-700 hover:to-gold-500 transition-all shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
};

const Checkout = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-wood-600 to-gold-600 p-8 text-white">
            <h1 className="text-3xl font-bold">Checkout</h1>
          </div>
          <div className="p-8">
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

