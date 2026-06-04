const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const getToken = () => localStorage.getItem('token');

const headers = (auth = false) => {
  const h = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) h['Authorization'] = `Bearer ${token}`;
  }
  return h;
};

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
};

// Auth
export const register = async (name, email, password) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ name, email, password })
  });
  return handleResponse(res);
};

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, password })
  });
  return handleResponse(res);
};

// Products
export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/products`, { headers: headers() });
  return handleResponse(res);
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`, { headers: headers() });
  return handleResponse(res);
};

export const createProduct = async (productData) => {
  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: headers(true),
    body: JSON.stringify(productData)
  });
  return handleResponse(res);
};

export const updateProduct = async (id, productData) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: headers(true),
    body: JSON.stringify(productData)
  });
  return handleResponse(res);
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: headers(true)
  });
  return handleResponse(res);
};

