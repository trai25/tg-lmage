import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';

// Pages
import HomePage from '@/pages/Home';
import DashboardPage from '@/pages/Dashboard';
import FavoritesPage from '@/pages/Favorites';
import TagsPage from '@/pages/Tags';
import LoginPage from '@/pages/Login';
import RegisterPage from '@/pages/Register';
import ProfilePage from '@/pages/Profile';
import SettingsPage from '@/pages/Settings';
import HelpPage from '@/pages/Help';
import NotFoundPage from '@/pages/NotFound';

// Hooks
import { useAuthStore } from '@/store/authStore';

// Components
import ProtectedRoute from '@/components/ProtectedRoute';
import ScrollToTop from '@/components/ScrollToTop';

function App() {
  const { initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <>
      <ScrollToTop />
      
      <Routes>
        {/* Main Notebook Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/help" element={<HelpPage />} />
          
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
          <Route path="/tags" element={<ProtectedRoute><TagsPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        </Route>

        {/* Sticky Note Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
}

export default App;
