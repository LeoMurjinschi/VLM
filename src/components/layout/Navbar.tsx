import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
      theme === 'light' ? 'bg-white/80 border-gray-100 shadow-sm' : 'bg-[#1a1a1a]/80 border-[#2e2e2e] shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex-shrink-0 cursor-pointer">
            <Link to="/" className="flex items-center gap-1.5">
              <span className="text-lg">🌿</span>
              <span className={`text-2xl font-bold tracking-tight ${
                 theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
              }`}>Food<span className="text-[#16a34a]">Share</span>.</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-sm font-medium transition-colors ${
              theme === 'light' ? 'text-gray-600 hover:text-[#16a34a]' : 'text-gray-300 hover:text-green-400'
            }`}>Home</Link>
            <Link to="/about" className={`text-sm font-medium transition-colors ${
              theme === 'light' ? 'text-gray-600 hover:text-[#16a34a]' : 'text-gray-300 hover:text-green-400'
            }`}>About Us</Link>
            <Link to="/contact" className={`text-sm font-medium transition-colors ${
              theme === 'light' ? 'text-gray-600 hover:text-[#16a34a]' : 'text-gray-300 hover:text-green-400'
            }`}>Contact</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'light' ? 'text-gray-500 hover:bg-gray-100' : 'text-gray-400 hover:bg-gray-800'
              }`}
            >
              {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
            </button>
            
            <div className={`h-6 w-px ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`}></div>

            <Link to="/login" className={`text-sm font-medium transition-colors ${
              theme === 'light' ? 'text-gray-700 hover:text-[#16a34a]' : 'text-gray-300 hover:text-green-400'
            }`}>Log In</Link>

            <Link to="/signup" className="px-5 py-2.5 text-sm font-semibold text-white bg-[#16a34a] rounded-xl hover:bg-[#15803d] transition-all shadow-md shadow-green-500/20">
              Sign Up
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'light' ? 'text-gray-500 hover:bg-gray-100' : 'text-gray-400 hover:bg-gray-800'
              }`}
            >
              {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'light' ? 'text-gray-500 hover:bg-gray-100' : 'text-gray-400 hover:bg-gray-800'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={`md:hidden absolute w-full left-0 h-screen border-t ${
          theme === 'light' ? 'bg-white border-gray-100 shadow-lg' : 'bg-[#1a1a1a] border-[#2e2e2e]'
        }`}>
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link 
              to="/" 
              className={`block px-3 py-4 text-lg font-medium rounded-md ${
                theme === 'light' ? 'text-gray-700 hover:bg-[#F0FAF4] hover:text-[#16a34a]' : 'text-gray-300 hover:bg-[#16a34a]/10 hover:text-green-400'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`block px-3 py-4 text-lg font-medium rounded-md ${
                theme === 'light' ? 'text-gray-700 hover:bg-[#F0FAF4] hover:text-[#16a34a]' : 'text-gray-300 hover:bg-[#16a34a]/10 hover:text-green-400'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className={`block px-3 py-4 text-lg font-medium rounded-md ${
                theme === 'light' ? 'text-gray-700 hover:bg-[#F0FAF4] hover:text-[#16a34a]' : 'text-gray-300 hover:bg-[#16a34a]/10 hover:text-green-400'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            <div className={`my-4 border-t ${theme === 'light' ? 'border-gray-100' : 'border-gray-800'}`}></div>
            
            <div className="flex flex-col gap-4 mt-4">
                 <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className={`w-full flex justify-center items-center gap-2 px-4 py-3 border rounded-xl font-medium transition-colors ${
                      theme === 'light' 
                        ? 'border-gray-200 text-gray-700 hover:bg-gray-50' 
                        : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                    }`}>
                        <LogIn size={20} />
                        Log In
                    </button>
                 </Link>
                 <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-[#16a34a] text-white rounded-xl font-medium hover:bg-[#15803d] shadow-sm transition-colors">
                        <UserPlus size={20} />
                        Sign Up
                    </button>
                 </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;