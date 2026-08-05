import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { CatalogProvider } from './contexts/CatalogContext';
import { AccountGateProvider } from './components/AccountGate';
import Navbar from './components/Navbar';
import AnnouncementStrip from './components/AnnouncementStrip';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WelcomePopup from './components/WelcomePopup';
import FathersDayPopup from './components/FathersDayPopup';
import SpinWheelPopup from './components/SpinWheelPopup';
import { fathersDayState } from './utils/fathersDay';
import { shouldShowSpin, markSpinShown } from './utils/spinGate';
import HomePage from './pages/HomePage';
import HomeWelcomePage from './pages/HomeWelcomePage';
import ResultPage from './pages/ResultPage';
import AboutPage from './pages/AboutPage';
import StorePage from './pages/StorePage';
import StoriesPage from './pages/StoriesPage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import CultureHubPage from './pages/CultureHubPage';
import VillageExperiencePage from './pages/VillageExperiencePage';
import GhanaLandscapesPage from './pages/GhanaLandscapesPage';
import GhanaianFoodsPage from './pages/GhanaianFoodsPage';
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
import AfiaChatAgent from './components/AfiaChatAgent';
import SupportButton from './components/SupportButton';
import { trackEvent, bootstrapAnalyticsFromStorage } from './utils/analytics';
import { WELCOME_SEEN_KEY } from './constants/welcome';

function AppShell() {
  const { authLoading } = useAuth();
  const location = useLocation();
  const fathersDay = fathersDayState();
  const [fdClosed, setFdClosed] = useState(false);
  // Spin-the-Wheel pop-up leads on the home screen (new device, or once per 24h).
  const [spinActive, setSpinActive] = useState(false);
  useEffect(() => {
    if (location.pathname === '/' && shouldShowSpin()) {
      setSpinActive(true);
      markSpinShown();
    }
    // run once on initial load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isSpreadLayout =
    location.pathname !== '/' &&
    !location.pathname.startsWith('/store') &&
    !location.pathname.startsWith('/bundle');

  const isCultureRoute = location.pathname.startsWith('/culture');
  // Full-bleed doorway: the welcome screen carries no site chrome at all, so nothing
  // interrupts the arrival.
  const isWelcomeRoute = location.pathname === '/home-welcome';

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
      {/* Pop-up priority on the home screen: Spin wheel first, then the
          Father's Day card (in season), then the standard welcome pop-up. */}
      {!isWelcomeRoute && spinActive && <SpinWheelPopup onClose={() => setSpinActive(false)} />}
      {!isWelcomeRoute && !spinActive && fathersDay && <FathersDayPopup onClose={() => setFdClosed(true)} />}
      {!isWelcomeRoute && !spinActive && (!fathersDay || fdClosed) && <WelcomePopup />}
      {!isWelcomeRoute && <AnnouncementStrip />}
      {!isWelcomeRoute && <Navbar />}
      <ScrollToTop />
      <div className={isSpreadLayout ? 'global-spread-layout' : ''}>
        <Routes>
          <Route path="/" element={<LandingGate />} />
          <Route path="/home-welcome" element={<HomeWelcomePage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/ghana-world" element={<Navigate to="/store?tab=spotlight" replace />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/culture" element={<CultureHubPage />} />
          <Route path="/culture/village" element={<VillageExperiencePage />} />
          <Route path="/culture/landscapes" element={<GhanaLandscapesPage />} />
          <Route path="/culture/foods" element={<GhanaianFoodsPage />} />
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
      {!isWelcomeRoute && <Footer />}
      {/* Afia has her own launcher on the culture pages; everywhere else the support button
          is the way to reach her, so the two never sit on top of each other. */}
      {!isWelcomeRoute && (isCultureRoute ? <AfiaChatAgent /> : <SupportButton />)}
    </CartProvider>
  );
}

/**
 * The welcome screen is the first thing a visitor meets, then it steps aside.
 *
 * A redirect rather than a permanent route swap: once someone has been welcomed, clicking the
 * logo or "Return Home" should take them home, not make them sit through the arrival again.
 * The flag lives in sessionStorage, so a new visit is welcomed afresh while this one is not
 * interrupted. Clear it and reload to see the doorway again.
 */
function LandingGate() {
  const welcomed = (() => {
    try {
      return sessionStorage.getItem(WELCOME_SEEN_KEY) === '1';
    } catch {
      // Storage blocked: show the home page rather than trapping the visitor on the doorway.
      return true;
    }
  })();

  return welcomed ? <HomePage /> : <Navigate to="/home-welcome" replace />;
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
        <CatalogProvider>
          <AccountGateProvider>
            <AppShell />
          </AccountGateProvider>
        </CatalogProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
