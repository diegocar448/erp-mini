// src/authProvider.ts
import { AuthProvider, HttpError } from 'react-admin';
const API_URL = import.meta.env.VITE_SIMPLE_REST_URL!; // ex: '/api'

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password }),
    });
    if (!res.ok) {
      const { message } = await res.json().catch(() => ({} as any));
      throw new HttpError(message || 'Login failed', res.status);
    }
    const { token, user } = await res.json();
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    // **MUITO IMPORTANTE**: retornar *algo* ou Promise.resolve()
    return Promise.resolve();
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem('token')
      ? Promise.resolve()
      : Promise.reject({ redirectTo: '/login' }),
  checkError: () => Promise.resolve(),
  getPermissions: () => Promise.resolve(undefined),
  getIdentity: () => {
    const raw = localStorage.getItem('user');
    return raw ? Promise.resolve(JSON.parse(raw)) : Promise.resolve(null);
  },
};
export default authProvider;
