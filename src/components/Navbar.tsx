import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, User, LogOut, ShieldCheck, Menu, X } from 'lucide-react';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-ayur-green" />
              <span className="text-2xl font-bold text-ayur-green tracking-tight">AyurRemedy</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-ayur-green font-medium">Home</Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="flex items-center space-x-1 text-gray-600 hover:text-ayur-green font-medium">
                <ShieldCheck className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName} 
                      className="h-8 w-8 rounded-full border-2 border-ayur-green shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-ayur-green flex items-center justify-center text-white">
                      <User className="h-5 w-5" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900 leading-tight">{user.displayName}</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">{user.role}</span>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors bg-white hover:bg-red-50 rounded-xl border border-gray-100 shadow-sm"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="bg-ayur-green text-white px-6 py-2 rounded-full font-semibold hover:bg-green-800 transition-all shadow-md active:scale-95"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-4">
          <Link to="/" className="block text-gray-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="block text-gray-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>
          )}
          {user ? (
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-3 mb-6 bg-gray-50 p-4 rounded-2xl">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName} 
                    className="h-12 w-12 rounded-full border-2 border-ayur-green"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-ayur-green flex items-center justify-center text-white">
                    <User className="h-6 w-6" />
                  </div>
                )}
                <div>
                  <div className="font-bold text-gray-900">{user.displayName}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest">{user.role}</div>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 bg-red-50 text-red-600 font-bold py-4 rounded-2xl transition-all active:scale-95"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex items-center justify-center bg-ayur-green text-white px-6 py-4 rounded-2xl font-bold shadow-lg"
            >
              Sign In with Google
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
