import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import AnnouncementStrip from './components/AnnouncementStrip';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WelcomePopup from './components/WelcomePopup';
import HomePage from './pages/HomePage';
import ResultPage from './pages/ResultPage';
import AboutPage from './pages/AboutPage';
import StorePage from './pages/StorePage';
import StoriesPage from './pages/StoriesPage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import AdminRouteGate from './components/AdminRouteGate';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminStoriesPage from './pages/AdminStoriesPage';
import CultureHubPage from './pages/CultureHubPage';
import AdinkraPage from './pages/AdinkraPage';
import TwiPage from './pages/TwiPage';
import ClansPage from './pages/ClansPage';
import CalendarPage from './pages/CalendarPage';
import DiasporaPage from './pages/DiasporaPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BundleDetailPage from './pages/BundleDetailPage';
import ShippingReturnsPage from './pages/ShippingReturnsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import CookieConsentBanner from './components/CookieConsentBanner';
import { trackEvent, bootstrapAnalyticsFromStorage } from './utils/analytics';

function AppShell() {
  const { authLoading } = useAuth();
  const location = useLocation();
  const isSpreadLayout =
    location.pathname !== '/' &&
    !location.pathname.startsWith('/store') &&
    !location.pathname.startsWith('/bundle');

  useEffect(() => {
    bootstrapAnalyticsFromStorage();
  }, []);

  useEffect(() => {
    trackEvent('page_view', { page_path: location.pathname });
  }, [location.pathname]);

  if (authLoading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: '#18100A', gap: 20,
      }}>
        <div style={{
          fontFamily: "'Cinzel', serif", fontSize: 28, letterSpacing: '0.2em',
          color: '#C9A558', textShadow: '0 0 30px rgba(201,165,88,0.35)',
        }}>AFIA</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 8, height: 8, borderRadius: '50%', background: '#C9A558',
              animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
              opacity: 0.6,
            }} />
          ))}
        </div>
        <style>{`@keyframes pulse { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }`}</style>
      </div>
    );
  }

  return (
    <CartProvider>
      <CookieConsentBanner />
      <WelcomePopup />
      <AnnouncementStrip />
      <Navbar />
      <ScrollToTop />
      <div className={isSpreadLayout ? 'global-spread-layout' : ''}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/admin/stories" element={<AdminRouteGate><AdminStoriesPage /></AdminRouteGate>} />
          <Route path="/admin/users" element={<AdminRouteGate><AdminUsersPage /></AdminRouteGate>} />
          <Route path="/culture" element={<CultureHubPage />} />
          <Route path="/culture/adinkra" element={<AdinkraPage />} />
          <Route path="/culture/twi" element={<TwiPage />} />
          <Route path="/culture/clans" element={<ClansPage />} />
          <Route path="/culture/calendar" element={<CalendarPage />} />
          <Route path="/diaspora" element={<DiasporaPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/bundle/:bundleId" element={<BundleDetailPage />} />
          <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </CartProvider>
  );
}

function NotFound() {
  return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center', padding: 20 }}>
      <div>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 80, color: 'rgba(201,165,88,0.15)', lineHeight: 1 }}>404</div>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 24, color: '#C9A558', letterSpacing: '0.12em', marginBottom: 12 }}>Page Not Found</h1>
        <p style={{ color: '#7C5F48', fontStyle: 'italic', marginBottom: 28 }}>This path leads nowhere. Let the ancestor guide you back.</p>
        <a href="/" style={{ background: 'linear-gradient(135deg,#C9A558,#E8CB82)', color: '#1C0E04', padding: '12px 32px', borderRadius: 6, fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.14em', textDecoration: 'none', textTransform: 'uppercase' }}>
          Return Home
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </BrowserRouter>
  );
}
