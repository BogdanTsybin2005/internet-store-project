import { Routes, Route } from 'react-router-dom';

import MainPage from './pages/main-page';
import ProductDetails from './pages/product-details/ProductDetails';
import CartPage from './pages/cart-page/CartPage';
import CheckoutPage from './pages/checkout-page/CheckoutPage';
import UserProfile from './pages/user-profile/UserProfile';
import NotFound from './pages/404-not-found/NotFound';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';



function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
