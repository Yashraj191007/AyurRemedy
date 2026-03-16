import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Filter, X } from 'lucide-react';
import { motion } from 'motion/react';
import { remedyService } from '../services/remedyService';
import { Remedy, CATEGORIES, Category } from '../types';
import RemedyCard from '../components/RemedyCard';
import VoiceSearch from '../components/VoiceSearch';
import { SAMPLE_REMEDIES } from '../sampleData';
import { useAuth } from '../context/AuthContext';

const QUICK_SYMPTOMS = ['Cold', 'Cough', 'Acidity', 'Stomach Pain', 'Stress', 'Headache'];
const ADMIN_EMAIL = 'yashrajjagtap1910@gmail.com';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [remedies, setRemedies] = useState<Remedy[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const { user } = useAuth();

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        if (user) {
          await remedyService.seedData(SAMPLE_REMEDIES);
        }
        const data = await remedyService.getAllRemedies();
        setRemedies(data);
      } catch (error) {
        console.error('Failed to fetch remedies', error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [user]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      const all = await remedyService.getAllRemedies();
      setRemedies(all);
      return;
    }
    const results = await remedyService.searchRemedies(query);
    setRemedies(results);
    setSelectedCategory('All');
  };

  const handleCategoryClick = async (category: Category | 'All') => {
    setSelectedCategory(category);
    setLoading(true);
    if (category === 'All') {
      const all = await remedyService.getAllRemedies();
      setRemedies(all);
    } else {
      const filtered = await remedyService.getByCategory(category);
      setRemedies(filtered);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative bg-ayur-green py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-saffron rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight"
          >
            Traditional Indian Wisdom <br />
            <span className="text-saffron">for Everyday Health</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-green-50 text-lg mb-10 max-w-2xl mx-auto"
          >
            Find safe, natural, and time-tested Ayurvedic home remedies for common ailments.
          </motion.p>

          {/* Search Box */}
          <div className="flex flex-col md:flex-row items-center gap-4 max-w-2xl mx-auto">
            <div className="relative flex-grow w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search symptoms (e.g., cold, acidity, stress)..."
                className="block w-full pl-12 pr-4 py-4 bg-white border-none rounded-2xl shadow-xl focus:ring-4 focus:ring-saffron/20 text-lg transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => handleSearch('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            <VoiceSearch onResult={handleSearch} />
          </div>

          {/* Quick Symptoms */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <span className="text-green-100 text-sm font-medium mr-2 self-center">Try:</span>
            {QUICK_SYMPTOMS.map((s) => (
              <button
                key={s}
                onClick={() => handleSearch(s)}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-all backdrop-blur-sm border border-white/10"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Categories */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Filter className="h-6 w-6 mr-2 text-ayur-green" />
              Browse by Category
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleCategoryClick('All')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                selectedCategory === 'All' 
                  ? 'bg-ayur-green text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
              }`}
            >
              All Remedies
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-6 py-2 rounded-full font-bold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-ayur-green text-white shadow-lg' 
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory === 'All' ? 'Recommended Remedies' : selectedCategory}
          </h2>
          <span className="text-gray-500 text-sm font-medium">{remedies.length} remedies found</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-gray-100"></div>
            ))}
          </div>
        ) : remedies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {remedies.map((remedy) => (
              <RemedyCard key={remedy.id} remedy={remedy} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <Sparkles className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No remedies found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchQuery || selectedCategory !== 'All' 
                ? "Try searching for different symptoms or browse categories."
                : "The database is currently empty. If you are the administrator, please Sign In to initialize the remedy library."}
            </p>
            {(!searchQuery && selectedCategory === 'All' && remedies.length === 0 && user?.email === ADMIN_EMAIL) && (
              <button 
                onClick={async () => {
                  setLoading(true);
                  await remedyService.seedData(SAMPLE_REMEDIES);
                  const data = await remedyService.getAllRemedies();
                  setRemedies(data);
                  setLoading(false);
                }}
                className="mt-6 bg-saffron text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-orange-600 transition-all"
              >
                Initialize Database
              </button>
            )}
            {(searchQuery || selectedCategory !== 'All') && (
              <button 
                onClick={() => handleCategoryClick('All')}
                className="mt-6 text-ayur-green font-bold hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
