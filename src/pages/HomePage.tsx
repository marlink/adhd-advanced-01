import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, CheckCircle, Clock, FileText, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-12 md:py-16 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Understand Your ADHD Symptoms
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Our interactive self-assessment helps you identify and understand patterns
            related to attention, focus, and executive functioning.
          </p>
          <Link
            to="/assessment"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Start Assessment
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white rounded-2xl shadow-sm my-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 px-4">
            <FeatureCard
              icon={<FileText className="w-10 h-10 text-blue-500" />}
              title="Quick Assessment"
              description="Answer simple questions about your experiences with attention, focus, and organization."
              delay={0.1}
            />
            <FeatureCard
              icon={<CheckCircle className="w-10 h-10 text-purple-500" />}
              title="Personalized Insights"
              description="Receive immediate feedback on your responses with visual representations of your symptom patterns."
              delay={0.2}
            />
            <FeatureCard
              icon={<ShieldCheck className="w-10 h-10 text-green-500" />}
              title="Private & Secure"
              description="Your data never leaves your device—we prioritize your privacy and security."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-12 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
              <Brain className="w-28 h-28 text-purple-500" />
            </div>
            <div className="md:w-2/3 md:pl-8">
              <h2 className="text-2xl font-bold mb-4">About ADHD</h2>
              <p className="text-gray-700 mb-4">
                Attention Deficit Hyperactivity Disorder (ADHD) is a neurodevelopmental condition that affects how people think, process emotions, and respond to their environment.
              </p>
              <p className="text-gray-700 mb-4">
                While this self-assessment can help you understand your symptoms better, remember that only a qualified healthcare professional can provide a diagnosis.
              </p>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-sm text-gray-600">
                    The assessment takes approximately 5-7 minutes to complete and provides immediate results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to gain insights?</h2>
        <Link
          to="/assessment"
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          Begin Self-Assessment
        </Link>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 rounded-full bg-white p-3 shadow-sm">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
);

export default HomePage;
