import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Settings, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex-shrink-0 cursor-pointer">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-black text-blue-600 tracking-tight">FoodShare.</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
              <Settings size={20} />
            </button>
            
            <div className="h-6 w-px bg-gray-200"></div>

            <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Log In
            </Link>

            <Link to="/signup" className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
              Sign Up
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-blue-600 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg h-screen">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link 
              to="/" 
              className="block px-3 py-4 text-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-4 text-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-4 text-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="border-t border-gray-100 my-4"></div>
            <div className="flex flex-col gap-4 mt-4">
                 <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full flex justify-center items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                        <LogIn size={20} />
                        Log In
                    </button>
                 </Link>
                 <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-sm transition-colors">
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