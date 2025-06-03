import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <CartProvider>
            <App />
          </CartProvider>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

