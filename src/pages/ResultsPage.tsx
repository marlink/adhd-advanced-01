import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart as BarChartIcon, 
  Download, 
  RefreshCcw, 
  Share2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';
import { useAssessment } from '../context/AssessmentContext';
import { assessmentData, getInterpretation } from '../data/assessmentData';

const ResultsPage: React.FC = () => {
  const { responses, calculateScores, resetResponses, progressPercentage } = useAssessment();
  const navigate = useNavigate();
  
  // Redirect if the assessment is not complete
  useEffect(() => {
    if (progressPercentage < 100 && Object.keys(responses).length === 0) {
      navigate('/assessment');
    }
  }, [progressPercentage, responses, navigate]);

  const scores = calculateScores();
  const overallScore = scores.overall || 0;
  const interpretation = getInterpretation(overallScore);

  const categoryScores = assessmentData.map(category => ({
    name: category.title,
    score: scores[category.id] || 0,
    color: category.color.replace('bg-', '#').replace('-500', ''),
  }));

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your assessment? All your responses will be cleared.')) {
      resetResponses();
      navigate('/assessment');
    }
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF or other format
    alert('This feature would download your results as a PDF in a production environment.');
  };

  const handleShare = () => {
    // In a real app, this would share results
    alert('This feature would allow sharing your results in a production environment.');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Your ADHD Assessment Results</h1>

        {/* Overall Score */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-2xl font-semibold mb-2">Overall Assessment</h2>
              <p className="text-gray-600 mb-4">
                Based on your responses, here's how your symptoms compare
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-1">{interpretation.title}</h3>
                <p className="text-gray-700">{interpretation.description}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center w-48 h-48 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 border-8 border-white shadow">
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {overallScore}
                </div>
                <div className="text-sm text-gray-500">out of 100</div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <BarChartIcon className="w-5 h-5 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold">Category Breakdown</h2>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryScores}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={70} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" name="Score" fill={(entry) => entry.color} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <BarChartIcon className="w-5 h-5 text-purple-500 mr-2" />
              <h2 className="text-xl font-semibold">Symptom Profile</h2>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={categoryScores}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">What These Results Mean</h2>
          <p className="text-gray-700 mb-4">
            This self-assessment provides insights into potential ADHD symptoms based on your responses. 
            It's important to remember that this is not a diagnostic tool, but rather a way to help you 
            understand potential patterns in your experiences.
          </p>
          <p className="text-gray-700 mb-4">
            If your results indicate significant symptoms and these symptoms are impacting your daily life, 
            consider discussing these results with a healthcare professional who specializes in ADHD 
            assessment and treatment.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-blue-800 text-sm">
              <strong>Remember:</strong> Only a qualified healthcare professional can provide a diagnosis 
              of ADHD. This assessment is a starting point for better understanding your experiences.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleReset}
            className="flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
          >
            <RefreshCcw size={18} className="mr-2" />
            Retake Assessment
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          >
            <Download size={18} className="mr-2" />
            Download Results
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg"
          >
            <Share2 size={18} className="mr-2" />
            Share Results
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultsPage;
