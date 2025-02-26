import React from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { motion } from 'framer-motion';

interface AssessmentTileProps {
  categoryId: string;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}

const AssessmentTile: React.FC<AssessmentTileProps> = ({
  categoryId,
  title,
  description,
  color,
  onClick
}) => {
  const { responses } = useAssessment();
  
  // Calculate completion for this category
  const getCompletionStatus = () => {
    const categoryResponses = Object.keys(responses).filter(
      key => key.startsWith(categoryId)
    ).length;
    
    if (categoryResponses === 0) return { status: 'not-started', text: 'Not Started' };
    if (categoryResponses < 4) return { status: 'in-progress', text: 'In Progress' };
    return { status: 'completed', text: 'Completed' };
  };
  
  const completion = getCompletionStatus();
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${color} rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden`}
      onClick={onClick}
    >
      <div className="p-5 text-white">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/80 text-sm mb-4">{description}</p>
        
        <div className={`py-1 px-3 text-xs rounded-full inline-block ${
          completion.status === 'completed' 
            ? 'bg-green-200 text-green-800' 
            : completion.status === 'in-progress'
              ? 'bg-yellow-200 text-yellow-800'
              : 'bg-white/20 text-white'
        }`}>
          {completion.text}
        </div>
      </div>
    </motion.div>
  );
};

export default AssessmentTile;
