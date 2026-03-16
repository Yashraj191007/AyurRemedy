import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Activity, ChevronRight } from 'lucide-react';
import { Remedy } from '../types';
import { motion } from 'motion/react';

interface RemedyCardProps {
  remedy: Remedy;
}

export default function RemedyCard({ remedy }: RemedyCardProps) {
  const difficultyColor = {
    Easy: 'bg-green-100 text-green-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Hard: 'bg-red-100 text-red-700'
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full"
    >
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <span className="px-3 py-1 bg-saffron/10 text-saffron text-xs font-bold rounded-full uppercase tracking-wider">
            {remedy.category}
          </span>
          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${difficultyColor[remedy.difficulty]}`}>
            {remedy.difficulty}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
          {remedy.remedyName}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {remedy.benefits}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {remedy.symptoms.slice(0, 3).map((symptom, idx) => (
            <span key={idx} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded">
              #{symptom}
            </span>
          ))}
          {remedy.symptoms.length > 3 && (
            <span className="text-[10px] text-gray-400 px-2 py-1">+{remedy.symptoms.length - 3} more</span>
          )}
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-3 text-gray-500 text-xs">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{remedy.timeToTake}</span>
          </div>
        </div>
        <Link 
          to={`/remedy/${remedy.id}`}
          className="text-ayur-green font-bold text-sm flex items-center hover:underline"
        >
          View Details
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </motion.div>
  );
}
