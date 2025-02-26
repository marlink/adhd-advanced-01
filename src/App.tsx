import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AssessmentPage from './pages/AssessmentPage';
import ResultsPage from './pages/ResultsPage';
import { AssessmentProvider } from './context/AssessmentContext';

function App() {
  return (
    <AssessmentProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/assessment" element={<AssessmentPage />} />
              <Route path="/results" element={<ResultsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AssessmentProvider>
  );
}

export default App;
