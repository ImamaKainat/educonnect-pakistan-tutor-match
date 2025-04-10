
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { AuthProvider } from './context/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import TutorsPage from './pages/student/TutorsPage';
import TutorDetailPage from './pages/student/TutorDetailPage';
import BookSessionPage from './pages/student/BookSessionPage';
import WishlistPage from './pages/student/WishlistPage';
import SessionsPage from './pages/student/SessionsPage';
import ProfilePage from './pages/ProfilePage';

// Protected route component
import ProtectedRoute from './components/common/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/tutors" element={<TutorsPage />} />
          <Route path="/tutors/:id" element={<TutorDetailPage />} />
          
          {/* Protected Routes */}
          <Route path="/book/:id" element={
            <ProtectedRoute>
              <BookSessionPage />
            </ProtectedRoute>
          } />
          <Route path="/wishlist" element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          } />
          <Route path="/sessions" element={
            <ProtectedRoute>
              <SessionsPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
