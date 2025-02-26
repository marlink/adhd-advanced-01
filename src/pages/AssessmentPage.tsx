import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Info } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { assessmentData } from '../data/assessmentData';

const AssessmentPage: React.FC = () => {
  const { responses, setResponse, progressPercentage, isComplete } = useAssessment();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(0);
  const [showInfo, setShowInfo] = useState<string | null>(null);

  const handleNext = () => {
    if (activeCategory < assessmentData.length - 1) {
      setActiveCategory(prev => prev + 1);
      window.scrollTo(0, 0);
    } else if (isComplete) {
      navigate('/results');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-center">ADHD Self-Assessment</h1>
        <p className="text-gray-600 mb-8 text-center">
          Answer each question based on how often you experience these symptoms
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8">
          {assessmentData.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(index)}
              className={`py-2 px-3 text-sm rounded-lg transition-colors ${
                index === activeCategory
                  ? `${category.color} text-white`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } ${getCategoryCompletionClass(category.id, responses)}`}
            >
              {category.title}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-xl font-semibold ${assessmentData[activeCategory].color.replace('bg-', 'text-')}`}>
              {assessmentData[activeCategory].title}
            </h2>
            <button
              onClick={() => setShowInfo(assessmentData[activeCategory].id)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Show category information"
            >
              <Info size={20} />
            </button>
          </div>

          {showInfo === assessmentData[activeCategory].id && (
            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">{assessmentData[activeCategory].description}</p>
              <button
                onClick={() => setShowInfo(null)}
                className="text-sm text-blue-500 mt-2 hover:underline"
              >
                Close
              </button>
            </div>
          )}

          <div className="space-y-6">
            {assessmentData[activeCategory].questions.map((question) => (
              <QuestionItem
                key={question.id}
                question={question}
                value={responses[question.id] || 0}
                onChange={(value) => setResponse(question.id, value)}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setActiveCategory(prev => Math.max(0, prev - 1))}
            className={`px-4 py-2 text-gray-600 rounded-lg ${
              activeCategory === 0 ? 'invisible' : ''
            }`}
          >
            Previous
          </button>
          
          <div className="text-center text-sm text-gray-500">
            {progressPercentage}% Complete
          </div>
          
          <button
            onClick={handleNext}
            className={`flex items-center px-6 py-2 rounded-lg ${
              isComplete
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isComplete ? 'View Results' : 'Next'}
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

interface QuestionItemProps {
  question: {
    id: string;
    text: string;
  };
  value: number;
  onChange: (value: number) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, value, onChange }) => {
  const options = [
    { value: 0, label: "Never" },
    { value: 1, label: "Rarely" },
    { value: 2, label: "Sometimes" },
    { value: 3, label: "Often" }
  ];

  return (
    <div className="border-b border-gray-100 pb-4">
      <p className="mb-3 text-gray-800">{question.text}</p>
      <div className="grid grid-cols-4 gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`py-2 px-3 rounded-md transition-colors ${
              value === option.value
                ? 'bg-blue-100 border-blue-300 border text-blue-800'
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const getCategoryCompletionClass = (categoryId: string, responses: Record<string, number>) => {
  const categoryQuestions = assessmentData
    .find(cat => cat.id === categoryId)?.questions || [];
  
  if (!categoryQuestions.length) return '';
  
  const answeredCount = categoryQuestions.filter(q => responses[q.id] !== undefined).length;
  
  if (answeredCount === 0) return '';
  if (answeredCount < categoryQuestions.length) return 'border-r-4 border-yellow-400';
  return 'border-r-4 border-green-400';
};

export default AssessmentPage;
