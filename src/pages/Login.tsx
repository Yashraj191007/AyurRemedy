import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Leaf, Sparkles } from 'lucide-react';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await authService.signInWithGoogle();
      toast.success('Welcome to AyurRemedy!');
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ayur-cream px-4">
      <div className="max-w-md w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
        >
          <div className="bg-ayur-green p-10 text-center relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-4"
            >
              <Leaf className="h-16 w-16 text-white" />
            </motion.div>
            <h1 className="text-3xl font-black text-white tracking-tight">AyurRemedy</h1>
            <p className="text-green-100 mt-2">Traditional Wisdom for Modern Living</p>
          </div>

          <div className="p-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
              <p className="text-gray-500 mt-1">Sign in to access natural remedies</p>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-100 py-4 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 hover:border-ayur-green transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin h-5 w-5 border-2 border-ayur-green border-t-transparent rounded-full"></div>
              ) : (
                <>
                  <img 
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                    alt="Google" 
                    className="h-6 w-6"
                  />
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-center space-x-2 text-ayur-green">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium italic">Ancient Science, Modern Access</span>
            </div>
          </div>
        </motion.div>

        <p className="text-center mt-8 text-gray-400 text-xs px-4">
          By continuing, you agree to discover the power of Ayurveda and traditional Indian knowledge systems.
        </p>
      </div>
    </div>
  );
}
