import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Utensils, 
  Info,
  Share2,
  Bookmark,
  Activity
} from 'lucide-react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { remedyService } from '../services/remedyService';
import { Remedy } from '../types';

export default function RemedyDetail() {
  const { id } = useParams<{ id: string }>();
  const [remedy, setRemedy] = useState<Remedy | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRemedy = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await remedyService.getRemedyById(id);
        if (data) {
          setRemedy(data);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Failed to fetch remedy', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRemedy();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin h-10 w-10 border-4 border-ayur-green border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-500 font-medium">Loading ancient wisdom...</p>
      </div>
    );
  }

  if (!remedy) return null;

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-ayur-green mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Remedies
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <span className="px-3 py-1 bg-saffron/10 text-saffron text-xs font-bold rounded-full uppercase tracking-wider">
                  {remedy.category}
                </span>
                <span className="text-gray-400 text-xs">•</span>
                <span className="text-gray-500 text-xs font-medium flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {remedy.timeToTake}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
                {remedy.remedyName}
              </h1>
            </div>
            
            <div className="flex space-x-3">
              <button className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-all">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-all">
                <Bookmark className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* Ingredients */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Utensils className="h-6 w-6 mr-3 text-saffron" />
                Ingredients
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {remedy.ingredients.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-ayur-green flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Preparation */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Activity className="h-6 w-6 mr-3 text-ayur-green" />
                Preparation Steps
              </h2>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 markdown-body">
                <ReactMarkdown>{remedy.preparationSteps}</ReactMarkdown>
              </div>
            </section>

            {/* Ayurvedic Benefits */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Info className="h-6 w-6 mr-3 text-blue-500" />
                Ayurvedic Benefits
              </h2>
              <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 text-blue-900 leading-relaxed">
                {remedy.benefits}
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            {/* Precautions */}
            <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
              <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Precautions
              </h3>
              <p className="text-red-800 text-sm leading-relaxed">
                {remedy.precautions}
              </p>
            </div>

            {/* Quick Info */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Difficulty</span>
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                    remedy.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 
                    remedy.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {remedy.difficulty}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Best Time</span>
                  <span className="text-gray-700 font-medium">{remedy.timeToTake}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Symptoms Treated</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {remedy.symptoms.map((s, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] font-medium">#{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-6 rounded-3xl border border-gray-200 text-gray-400 text-[10px] leading-relaxed italic">
              Disclaimer: These home remedies are based on traditional Ayurvedic knowledge. They are not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
