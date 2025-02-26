import React, { createContext, useContext, useState, ReactNode } from 'react';
import { assessmentData } from '../data/assessmentData';

type AssessmentContextType = {
  responses: Record<string, number>;
  setResponse: (questionId: string, value: number) => void;
  resetResponses: () => void;
  isComplete: boolean;
  calculateScores: () => Record<string, number>;
  progressPercentage: number;
};

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};

export const AssessmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [responses, setResponses] = useState<Record<string, number>>({});

  // Count all questions across all categories
  const totalQuestions = assessmentData.reduce(
    (total, category) => total + category.questions.length,
    0
  );

  const progressPercentage = 
    Object.keys(responses).length > 0
      ? Math.round((Object.keys(responses).length / totalQuestions) * 100)
      : 0;

  const isComplete = progressPercentage === 100;

  const setResponse = (questionId: string, value: number) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const resetResponses = () => {
    setResponses({});
  };

  const calculateScores = () => {
    const scores: Record<string, number> = {};
    
    assessmentData.forEach(category => {
      let categoryScore = 0;
      let answeredQuestions = 0;
      
      category.questions.forEach(question => {
        if (responses[question.id] !== undefined) {
          categoryScore += responses[question.id];
          answeredQuestions++;
        }
      });
      
      if (answeredQuestions > 0) {
        // Normalize to a 0-100 scale
        scores[category.id] = Math.round((categoryScore / (answeredQuestions * 3)) * 100);
      } else {
        scores[category.id] = 0;
      }
    });
    
    // Calculate overall score
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    scores.overall = Math.round(totalScore / assessmentData.length);
    
    return scores;
  };

  return (
    <AssessmentContext.Provider
      value={{
        responses,
        setResponse,
        resetResponses,
        isComplete,
        calculateScores,
        progressPercentage
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};
