import { useCart } from '../contexts/CartContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { clearCart, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('status') === 'success') {
      setSuccess(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const email = formData.get('email');
      const amount = totalPrice; // assumes your backend/gateway expects minor units or that you will set currency accordingly.

      if (!email) throw new Error('Email is required');

      // Convert to minor units if your app uses NGN with 2 decimals.
      // Paystack requires amount in kobo (minor units).
      const amountKobo = Math.round(Number(amount) * 100);

      const res = await fetch(`${API_URL}/paystack/initialize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          amount: amountKobo,
          orderId: `ORDER_${Date.now()}`,
          metadata: {
            // attach any useful info for reconciliation
          }
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to initialize Paystack payment');

      const authorizationUrl = data?.authorization_url;
      if (!authorizationUrl) throw new Error('Missing authorization_url from Paystack');

      // Clear cart now (optional). If you prefer clearing only after webhook, remove this.
      clearCart();

      window.location.href = authorizationUrl;
    } catch (err) {
      setError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
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
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            className="w-full p-4 border border-gray-200 rounded-xl focus:border-gold-400 focus:outline-none transition-colors"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-4 border border-gray-200 rounded-xl focus:border-gold-400 focus:outline-none transition-colors"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            required
            className="w-full p-4 border border-gray-200 rounded-xl focus:border-gold-400 focus:outline-none transition-colors"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            required
            className="w-full p-4 border border-gray-200 rounded-xl focus:border-gold-400 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl">
          <p className="text-gray-700">
            You’ll be redirected to Paystack to complete your payment.
          </p>
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
          disabled={loading}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-xl flex items-center justify-center disabled:opacity-50"
        >
          {loading ? 'Redirecting...' : `Pay $${totalPrice.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-wood-600 to-gold-600 p-8 text-white">
            <h1 className="text-3xl font-bold">Checkout</h1>
          </div>
          <div className="p-8">
            <Checkout />
          </div>
        </div>
      </div>
    </div>
  );
}


