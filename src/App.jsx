import { Routes, Route } from 'react-router-dom';

import MainPage from './pages/main-page';
import ProductDetails from './pages/product-details/ProductDetails';
import CartPage from './pages/cart-page/CartPage';
import CheckoutPage from './pages/checkout-page/CheckoutPage';
import UserProfile from './pages/user-profile/UserProfile';
import NotFound from './pages/not-found/NotFound';



function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
