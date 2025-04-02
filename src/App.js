import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollRestorationFix from './components/ScrollRestorationFix';
import ScrollManager from './components/ScrollManager'; // ✅ NOVO
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
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <ScrollRestorationFix />
      <ScrollManager /> {/* ✅ RADI PRI PROMENI RUTE */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="subscriptions" element={<SubscriptionPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="thank-you" element={<ProtectedRoute><ThankYouPage /></ProtectedRoute>} />
          <Route path="about" element={<AboutPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
          <Route path="confirm-success" element={<ProtectedRoute><ConfirmSuccessPage /></ProtectedRoute>} />
		</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
