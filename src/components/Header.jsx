import { Github } from "lucide-react";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleAuth = async () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/');
      setTimeout(() => {
        document.querySelector('[aria-label="Get started for free"]')?.click();
      }, 100);
    }
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    if (isHomePage) {
      document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/${sectionId === '#features' ? '' : ''}`);
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-gray-900 bg-opacity-75 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Icon */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/platform-icon.svg" 
              alt="Climb AI Logo" 
              className="h-8 w-8"
            />
            <h1 className="text-white text-3xl font-bold">Climb AI</h1>
          </Link>

          {/* Navigation */}
          <nav className="flex space-x-8" aria-label="Main navigation">
            <Link
              to="/roadmaps"
              className="text-white hover:text-cyan-400 font-medium transition-colors"
              aria-label="Roadmaps"
            >
              Roadmaps
            </Link>
            {isHomePage ? (
              <>
                <a
                  href="#features"
                  className="text-white hover:text-cyan-400 font-medium transition-colors"
                  aria-label="Features"
                  onClick={(e) => handleNavClick(e, '#features')}
                >
                  Features
                </a>
                <a
                  href="#tools"
                  className="text-white hover:text-cyan-400 font-medium transition-colors"
                  aria-label="Tools"
                  onClick={(e) => handleNavClick(e, '#tools')}
                >
                  Tools
                </a>
                <a
                  href="#contributors"
                  className="text-white hover:text-cyan-400 font-medium transition-colors"
                  aria-label="Contribute"
                  onClick={(e) => handleNavClick(e, '#contributors')}
                >
                  Contribute
                </a>
              </>
            ) : (
              <Link
                to="/"
                className="text-white hover:text-cyan-400 font-medium transition-colors"
                aria-label="Home"
              >
                Home
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleAuth}
              className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition-colors"
            >
              {user ? 'Profile' : 'Get Started for Free'}
            </button>
            
            {/* GitHub Link */}
            <a
              href="https://github.com/climbai/user_platform"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our GitHub"
              className="text-white hover:text-cyan-400 transition-colors"
            >
              <Github className="h-8 w-8" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 