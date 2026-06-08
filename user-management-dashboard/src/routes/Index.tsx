import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserListPage from '../pages/UserListPage';

const UserDetailPage = lazy(() => import('../pages/UserDetailPage'));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">

        <Header />

        <Routes>

          <Route path="/" element={<UserListPage />} />

          <Route
            path="/users/:id"
            element={
              <Suspense fallback={
                <div className="flex items-center justify-center py-20">
                  <p className="text-gray-400">Loading...</p>
                </div>
              }>
                <UserDetailPage />
              </Suspense>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

        <Footer />

      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;