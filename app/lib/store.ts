'use client';
import { create } from 'zustand';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

interface AuthState {
  isAuth: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  initialized: boolean;
}

export const useAuthStore = create<AuthState>(set => ({
  isAuth: false,
  token: null,
  initialized: false,

  login: token => {
    setCookie(null, 'token', token, { path: '/' });
    set({ isAuth: true, token });
  },

  logout: () => {
    destroyCookie(null, 'token', { path: '/' });
    set({ isAuth: false, token: null });
  },
}));

export const initAuth = () => {
  const cookies = parseCookies();
  const token = cookies.token || null;
  useAuthStore.setState({ isAuth: !!token, token, initialized: true });
};
