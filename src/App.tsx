import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RemedyDetail from './pages/RemedyDetail';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';

function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-ayur-cream">
    <div className="animate-spin h-8 w-8 border-4 border-ayur-green border-t-transparent rounded-full"></div>
  </div>;

  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;

  return <>{children}</>;
}

import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-ayur-cream">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route 
                  path="/" 
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/remedy/:id" 
                  element={
                    <ProtectedRoute>
                      <RemedyDetail />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute adminOnly>
                      <Admin />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          <footer className="bg-white border-t border-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} AyurRemedy. Traditional Indian Knowledge Systems.
              </p>
              <p className="text-gray-300 text-[10px] mt-2 max-w-md mx-auto">
                This application is for informational purposes only. Always consult a healthcare professional before trying new remedies.
              </p>
            </div>
          </footer>
          <Toaster position="bottom-right" />
        </div>
      </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}
