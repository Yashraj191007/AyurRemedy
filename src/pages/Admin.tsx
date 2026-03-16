import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Database,
  LayoutDashboard,
  Search
} from 'lucide-react';
import { remedyService } from '../services/remedyService';
import { Remedy, CATEGORIES, Category } from '../types';
import { toast } from 'react-hot-toast';

export default function Admin() {
  const [remedies, setRemedies] = useState<Remedy[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRemedy, setCurrentRemedy] = useState<Partial<Remedy>>({
    remedyName: '',
    symptoms: [],
    ingredients: [],
    preparationSteps: '',
    benefits: '',
    precautions: '',
    category: CATEGORIES[0],
    difficulty: 'Easy',
    timeToTake: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRemedies();
  }, []);

  const fetchRemedies = async () => {
    setLoading(true);
    try {
      const data = await remedyService.getAllRemedies();
      setRemedies(data);
    } catch (error) {
      toast.error('Failed to load remedies');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!currentRemedy.remedyName || !currentRemedy.category) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      if (currentRemedy.id) {
        await remedyService.updateRemedy(currentRemedy.id, currentRemedy);
        toast.success('Remedy updated successfully');
      } else {
        await remedyService.addRemedy(currentRemedy as Omit<Remedy, 'id' | 'createdAt'>);
        toast.success('Remedy added successfully');
      }
      setIsEditing(false);
      fetchRemedies();
    } catch (error) {
      toast.error('Failed to save remedy');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this remedy?')) return;
    try {
      await remedyService.deleteRemedy(id);
      toast.success('Remedy deleted');
      fetchRemedies();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleEdit = (remedy: Remedy) => {
    setCurrentRemedy(remedy);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentRemedy({
      remedyName: '',
      symptoms: [],
      ingredients: [],
      preparationSteps: '',
      benefits: '',
      precautions: '',
      category: CATEGORIES[0],
      difficulty: 'Easy',
      timeToTake: ''
    });
    setIsEditing(true);
  };

  const filteredRemedies = remedies.filter(r => 
    r.remedyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black text-gray-900 flex items-center">
            <LayoutDashboard className="h-8 w-8 mr-3 text-ayur-green" />
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1">Manage the ancient Indian home remedies database.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="flex items-center space-x-2 bg-ayur-green text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-green-800 transition-all active:scale-95"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Remedy</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Remedy List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search remedies to edit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-ayur-green/20 outline-none"
            />
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Remedy Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan={3} className="px-6 py-12 text-center text-gray-400">Loading remedies...</td></tr>
                ) : filteredRemedies.length === 0 ? (
                  <tr><td colSpan={3} className="px-6 py-12 text-center text-gray-400">No remedies found.</td></tr>
                ) : filteredRemedies.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900">{r.remedyName}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase">
                        {r.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => handleEdit(r)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => r.id && handleDelete(r.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Editor Panel */}
        <div className="lg:col-span-1">
          {isEditing ? (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-ayur-green/10 sticky top-24">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900">
                  {currentRemedy.id ? 'Edit Remedy' : 'New Remedy'}
                </h2>
                <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Remedy Name</label>
                  <input 
                    type="text" 
                    value={currentRemedy.remedyName}
                    onChange={(e) => setCurrentRemedy({...currentRemedy, remedyName: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-ayur-green/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Category</label>
                  <select 
                    value={currentRemedy.category}
                    onChange={(e) => setCurrentRemedy({...currentRemedy, category: e.target.value as Category})}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-ayur-green/20 outline-none"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Symptoms (comma separated)</label>
                  <input 
                    type="text" 
                    value={currentRemedy.symptoms?.join(', ')}
                    onChange={(e) => setCurrentRemedy({...currentRemedy, symptoms: e.target.value.split(',').map(s => s.trim())})}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-ayur-green/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Ingredients (comma separated)</label>
                  <textarea 
                    value={currentRemedy.ingredients?.join(', ')}
                    onChange={(e) => setCurrentRemedy({...currentRemedy, ingredients: e.target.value.split(',').map(s => s.trim())})}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-ayur-green/20 outline-none h-24"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Preparation Steps</label>
                  <textarea 
                    value={currentRemedy.preparationSteps}
                    onChange={(e) => setCurrentRemedy({...currentRemedy, preparationSteps: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-ayur-green/20 outline-none h-32"
                  />
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={handleSave}
                    className="flex-grow flex items-center justify-center space-x-2 bg-ayur-green text-white py-3 rounded-2xl font-bold shadow-lg hover:bg-green-800 transition-all"
                  >
                    <Save className="h-5 w-5" />
                    <span>Save Remedy</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-12 rounded-3xl border border-dashed border-gray-200 text-center">
              <Database className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400 font-medium">Select a remedy to edit or create a new one.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
