import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';



export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            login: async (credentials) => {
                const res = await axios.post('http://localhost:3000/api/login', credentials);
                set({ user: res.data.user, isAuthenticated: true });
                localStorage.setItem('token', res.data.token);
            },

            register: async (data) => {
                const res = await axios.post('http://localhost:3000/api/register', data);
                set({ user: res.data.user, isAuthenticated: true });
                localStorage.setItem('token', res.data.token);
            },

            logout: () => {
                set({ user: null, isAuthenticated: false });
                localStorage.removeItem('token');
            },

            updateUser: (fields) => {
                set((state) => ({ user: { ...state.user, ...fields } }));
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);
