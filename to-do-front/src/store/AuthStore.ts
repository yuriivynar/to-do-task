import { create } from 'zustand';
import axios from 'axios';
import type { User } from '../types/index';
import type { AuthResponse } from '../types/index';

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  register: async (name: string, email: string, password: string) => {
    const response = await axios.post<AuthResponse>('http://localhost:5000/api/auth/register', {
      name,
      email,
      password,
    });
    set({ user: response.data.user, token: response.data.token });
    localStorage.setItem('token', response.data.token);
  },
  login: async (email: string, password: string) => {
    const response = await axios.post<AuthResponse>('http://localhost:5000/api/auth/login', {
      email,
      password,
    });
    set({ user: response.data.user, token: response.data.token });
    localStorage.setItem('token', response.data.token);
  },
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem('token');
  },
}));