import React from 'react';
import { Brain, Github, Heart, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Brain className="h-6 w-6 text-purple-600 mr-2" />
            <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ADHD Insight
            </span>
          </div>
          
          <div className="text-sm text-gray-500 mb-4 md:mb-0 text-center md:text-left">
            <p>This tool is for educational purposes only and is not a diagnostic instrument.</p>
            <p>Always consult with a healthcare professional for proper diagnosis and treatment.</p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p className="flex items-center justify-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for mental health awareness
          </p>
          <p className="mt-1">© {new Date().getFullYear()} ADHD Insight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
