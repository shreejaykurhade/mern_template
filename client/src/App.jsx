import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { FullPageLoader } from './components/ui/Loader';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/guards/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Architecture from './pages/Architecture';
import DocsLayout from './components/layout/DocsLayout';
import DocsFrontend from './pages/docs/DocsFrontend';
import DocsBackend from './pages/docs/DocsBackend';
import DocsSecurity from './pages/docs/DocsSecurity';
import DocsDatabase from './pages/docs/DocsDatabase';
import NotFound from './pages/NotFound';

const App = () => {
  const { checkAuth, accessToken, loading } = useAuth();

  // On mount, try to load user if we have a stored token
  useEffect(() => {
    if (accessToken) {
      checkAuth();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Show full-page loader while checking auth on first load
  if (loading && accessToken) {
    return <FullPageLoader />;
  }

  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Docs Portal */}
          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<Architecture />} />
            <Route path="frontend" element={<DocsFrontend />} />
            <Route path="backend" element={<DocsBackend />} />
            <Route path="security" element={<DocsSecurity />} />
            <Route path="database" element={<DocsDatabase />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Admin-Only Routes (example) */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            {/* <Route path="/admin" element={<AdminPanel />} /> */}
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
