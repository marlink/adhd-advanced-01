import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Menu, X } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const { progressPercentage } = useAssessment();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ADHD Insight
            </span>
          </Link>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-900">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" active={location.pathname === "/"}>
              Home
            </NavLink>
            <NavLink to="/assessment" active={location.pathname === "/assessment"}>
              Assessment
            </NavLink>
            <NavLink to="/results" active={location.pathname === "/results"}>
              Results
            </NavLink>
          </nav>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2">
            <div className="flex flex-col space-y-3">
              <MobileNavLink to="/" active={location.pathname === "/"} onClick={toggleMenu}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/assessment" active={location.pathname === "/assessment"} onClick={toggleMenu}>
                Assessment
              </MobileNavLink>
              <MobileNavLink to="/results" active={location.pathname === "/results"} onClick={toggleMenu}>
                Results
              </MobileNavLink>
            </div>
          </nav>
        )}
        
        {/* Progress bar - only show on assessment page */}
        {location.pathname === "/assessment" && (
          <div className="w-full h-1 bg-gray-200 mt-4">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
              aria-label={`Assessment progress: ${progressPercentage}%`}
            ></div>
          </div>
        )}
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => (
  <Link
    to={to}
    className={`relative text-sm font-medium transition-colors ${
      active 
        ? 'text-purple-600' 
        : 'text-gray-600 hover:text-gray-900'
    }`}
  >
    {children}
    {active && (
      <span className="absolute bottom-[-8px] left-0 w-full h-1 bg-purple-600 rounded-t-lg"></span>
    )}
  </Link>
);

const MobileNavLink: React.FC<NavLinkProps> = ({ to, active, children, onClick }) => (
  <Link
    to={to}
    className={`block py-2 px-3 text-sm rounded-md ${
      active 
        ? 'bg-purple-100 text-purple-600 font-medium' 
        : 'text-gray-600 hover:bg-gray-100'
    }`}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Header;
