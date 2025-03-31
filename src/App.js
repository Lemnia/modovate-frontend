import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SubscriptionPage from './pages/SubscriptionPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ThankYouPage from './pages/ThankYouPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AccountPage from './pages/AccountPage';
import ConfirmSuccessPage from './pages/ConfirmSuccessPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="subscriptions" element={<SubscriptionPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="thank-you" element={<ThankYouPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="login" element={<LoginPage />} />
		<Route path="/register" element={<RegisterPage />} />
		<Route path="/forgot-password" element={<ForgotPasswordPage />} />
		<Route path="/reset-password" element={<ResetPasswordPage />} />
		<Route path="/account" element={<AccountPage />} />
		<Route path="/confirm-success" element={<ConfirmSuccessPage />} />
      </Route>
    </Routes>
  );
}

export default App;
