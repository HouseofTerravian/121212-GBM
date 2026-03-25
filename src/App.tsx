import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import AccountLayout from '@/components/account/AccountLayout';
import AccountOrdersPage from '@/pages/account/AccountOrdersPage';
import AccountOrderDetailPage from '@/pages/account/AccountOrderDetailPage';
import PublicLayout from '@/components/layout/PublicLayout';
import VendorRoute from '@/components/VendorRoute';
import HomePage from '@/pages/HomePage';
import ShopPage from '@/pages/ShopPage';
import VendorsPage from '@/pages/VendorsPage';
import SellPage from '@/pages/SellPage';
import AboutPage from '@/pages/AboutPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import VendorStorefrontPage from '@/pages/VendorStorefrontPage';
import CartPage from '@/pages/CartPage';
import OrderConfirmationPage from '@/pages/OrderConfirmationPage';
import NotFoundPage from '@/pages/NotFoundPage';
import TermsPage from '@/pages/legal/TermsPage';
import PrivacyPage from '@/pages/legal/PrivacyPage';
import SellerAgreementPage from '@/pages/legal/SellerAgreementPage';
import AccessibilityPage from '@/pages/legal/AccessibilityPage';
import DisclaimerPage from '@/pages/legal/DisclaimerPage';
import NondiscriminationPage from '@/pages/legal/NondiscriminationPage';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardOverviewPage from '@/pages/dashboard/DashboardOverviewPage';
import DashboardProductsPage from '@/pages/dashboard/DashboardProductsPage';
import DashboardProductEditPage from '@/pages/dashboard/DashboardProductEditPage';
import DashboardOrdersPage from '@/pages/dashboard/DashboardOrdersPage';
import DashboardOrderDetailPage from '@/pages/dashboard/DashboardOrderDetailPage';
import DashboardProfilePage from '@/pages/dashboard/DashboardProfilePage';
import DashboardAnalyticsPage from '@/pages/dashboard/DashboardAnalyticsPage';
import DashboardSettingsPage from '@/pages/dashboard/DashboardSettingsPage';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <Routes>
        {/* Public pages */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/vendors" element={<VendorsPage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/seller-agreement" element={<SellerAgreementPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/nondiscrimination" element={<NondiscriminationPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/vendor/:slug" element={<VendorStorefrontPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Buyer account */}
        <Route path="/account" element={<ProtectedRoute><AccountLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="orders" replace />} />
          <Route path="orders" element={<AccountOrdersPage />} />
          <Route path="orders/:id" element={<AccountOrderDetailPage />} />
        </Route>

        {/* Vendor dashboard */}
        <Route path="/dashboard" element={<VendorRoute><DashboardLayout /></VendorRoute>}>
          <Route index element={<DashboardOverviewPage />} />
          <Route path="products" element={<DashboardProductsPage />} />
          <Route path="products/new" element={<DashboardProductEditPage />} />
          <Route path="products/:id/edit" element={<DashboardProductEditPage />} />
          <Route path="orders" element={<DashboardOrdersPage />} />
          <Route path="orders/:id" element={<DashboardOrderDetailPage />} />
          <Route path="profile" element={<DashboardProfilePage />} />
          <Route path="analytics" element={<DashboardAnalyticsPage />} />
          <Route path="settings" element={<DashboardSettingsPage />} />
        </Route>
      </Routes>
      </CartProvider>
    </AuthProvider>
  );
}
