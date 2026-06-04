require('dotenv').config();

const crypto = require('crypto');

const initializePaystack = async (req, res) => {
  try {
    const {
      email,
      amount,
      orderId,
      metadata = {}
    } = req.body || {};

    if (!email) return res.status(400).json({ message: 'Email is required' });
    if (!amount || Number(amount) <= 0) return res.status(400).json({ message: 'Valid amount is required' });

    // Paystack expects amount in the smallest currency unit (kobo/cent), depending on your currency setup.
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecret) {
      return res.status(500).json({ message: 'PAYSTACK_SECRET_KEY is not configured' });
    }

    const baseUrl = process.env.PAYSTACK_BASE_URL || 'https://api.paystack.co';

    const body = {
      email,
      amount: Math.round(Number(amount)),
      reference: orderId || `ORDER_${Date.now()}`,
      metadata,
      callback_url: process.env.PAYSTACK_CALLBACK_URL || 'http://localhost:5173/checkout?status=success'
    };

    const r = await fetch(`${baseUrl}/transaction/initialize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${paystackSecret}`
      },
      body: JSON.stringify(body)
    });

    const data = await r.json();
    if (!r.ok) {
      return res.status(r.status).json({ message: data?.message || 'Failed to initialize payment' });
    }

    return res.json({ authorization_url: data?.data?.authorization_url, reference: data?.data?.reference });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};

const verifyPaystackWebhook = (rawBody, signatureHeader) => {
  const secret = process.env.PAYSTACK_WEBHOOK_SECRET;
  if (!secret) return false;
  if (!signatureHeader) return false;

  // Paystack uses HMAC SHA512
  const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');
  return hash === signatureHeader;
};

// Webhook notes:
// - We'll accept raw body bytes via middleware (we will configure in server.js)
// - We verify signature if PAYSTACK_WEBHOOK_SECRET is present
const paystackWebhook = async (req, res) => {
  try {
    const signature = req.headers['x-paystack-signature'];

    const rawBody = req.rawBody;
    if (!rawBody) {
      return res.status(400).json({ message: 'Missing raw body for signature verification' });
    }

    const shouldVerify = !!process.env.PAYSTACK_WEBHOOK_SECRET;
    if (shouldVerify) {
      const ok = verifyPaystackWebhook(rawBody, signature);
      if (!ok) return res.status(401).json({ message: 'Invalid webhook signature' });
    }

    const event = req.body;
    // Minimal handling: acknowledge event
    // You can extend later to persist orders.

    if (!event) return res.status(400).json({ message: 'Missing webhook body' });

    return res.status(200).json({ received: true });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};

module.exports = {
  initializePaystack,
  paystackWebhook
};

