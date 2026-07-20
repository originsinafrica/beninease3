import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from './lib/query-client';
import { AuthProvider } from './lib/AuthContext';
import { LangProvider } from './lib/LangContext';
import { Toaster } from './components/ui/toaster';

// Import Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import SeriesDetail from './pages/SeriesDetail';
import ProviderDetail from './pages/ProviderDetail';
import EpisodeDetail from './pages/EpisodeDetail';
import Profile from './pages/Profile';
import PageNotFound from './lib/PageNotFound';

// Import Protected Route Wrapper
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <LangProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/series/:name" element={<SeriesDetail />} />
              <Route path="/provider/:id" element={<ProviderDetail />} />
              <Route path="/provider/:providerId/episode/:episodeIndex" element={<EpisodeDetail />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Fallback 404 */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Toaster />
          </Router>
        </AuthProvider>
      </LangProvider>
    </QueryClientProvider>
  );
}
