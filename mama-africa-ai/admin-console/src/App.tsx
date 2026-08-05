import { Navigate, Route, Routes } from 'react-router';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { AppLayout } from './components/AppLayout';
import { Spinner } from './components/ui';
import { LoginPage } from './pages/LoginPage';
import { ModulesPage } from './pages/ModulesPage';
import { DashboardPage } from './pages/DashboardPage';
import { KnowledgePage } from './pages/KnowledgePage';
import { ConversationsPage } from './pages/ConversationsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { UsersPage } from './pages/UsersPage';
import { ProfilePage } from './pages/ProfilePage';
import { MarketOverviewPage } from './pages/market/MarketOverviewPage';
import { ProductsPage } from './pages/market/ProductsPage';
import { BundlesPage } from './pages/market/BundlesPage';
import { PromotionsPage } from './pages/market/PromotionsPage';
import { PoliciesPage } from './pages/market/PoliciesPage';
import { CultureOverviewPage } from './pages/culture/CultureOverviewPage';
import { CultureStoriesPage } from './pages/culture/StoriesPage';
import { SubmissionsPage } from './pages/culture/SubmissionsPage';
import { SubscribersPage } from './pages/culture/SubscribersPage';
import { SupportInboxPage } from './pages/culture/SupportInboxPage';
import { AccountsPage } from './pages/culture/AccountsPage';

/** Gate + sidebar chrome for the pages inside a module. */
function ProtectedRoutes() {
  const { user, loading } = useAuth();

  if (loading) return <Spinner label="Loading" />;
  if (!user) return <Navigate to="/login" replace />;
  return <AppLayout />;
}

/** The launcher brings its own chrome, so it is gated but sits outside the layout. */
function ProtectedLauncher() {
  const { user, loading } = useAuth();

  if (loading) return <Spinner label="Loading" />;
  if (!user) return <Navigate to="/login" replace />;
  return <ModulesPage />;
}

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route index element={<ProtectedLauncher />} />

        <Route element={<ProtectedRoutes />}>
          {/* Mama Africa AI — the original console, now under its own prefix. */}
          <Route path="ai">
            <Route index element={<DashboardPage />} />
            <Route path="knowledge" element={<KnowledgePage />} />
            <Route path="conversations" element={<ConversationsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Mama Africa Market */}
          <Route path="market">
            <Route index element={<MarketOverviewPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="bundles" element={<BundlesPage />} />
            <Route path="promotions" element={<PromotionsPage />} />
            <Route path="policies" element={<PoliciesPage />} />
          </Route>

          {/* Mama Africa Culture */}
          <Route path="culture">
            <Route index element={<CultureOverviewPage />} />
            <Route path="stories" element={<CultureStoriesPage />} />
            <Route path="submissions" element={<SubmissionsPage />} />
            <Route path="subscribers" element={<SubscribersPage />} />
            <Route path="support" element={<SupportInboxPage />} />
            <Route path="accounts" element={<AccountsPage />} />
          </Route>

          {/* Console-wide, not owned by any module. */}
          <Route path="users" element={<UsersPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Links saved before the module split pointed straight at the AI pages. */}
        <Route path="/knowledge" element={<Navigate to="/ai/knowledge" replace />} />
        <Route path="/conversations" element={<Navigate to="/ai/conversations" replace />} />
        <Route path="/analytics" element={<Navigate to="/ai/analytics" replace />} />
        <Route path="/settings" element={<Navigate to="/ai/settings" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
