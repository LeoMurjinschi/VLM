import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`pt-16 pb-8 border-t transition-colors duration-300 ${
      theme === 'light' ? 'bg-[#F9FAFB] border-gray-200 text-gray-900' : 'bg-[#1a1a1a] border-[#2e2e2e] text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div>
            <Link to="/" className="flex items-center gap-1.5 mb-6">
              <span className="text-lg">🌿</span>
              <span className={`text-2xl font-bold tracking-tight ${
                 theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
              }`}>Food<span className="text-[#16a34a]">Share</span>.</span>
            </Link>
            <p className={`mb-6 leading-relaxed ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              We are building the largest network of food donors and receivers. 
              Join us in our mission to eliminate food waste and support local communities.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/foodshare.md" 
                target="_blank" 
                rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  theme === 'light' ? 'bg-gray-200 text-gray-600 hover:bg-[#16a34a] hover:text-white' : 'bg-gray-800 text-gray-400 hover:bg-[#16a34a] hover:text-white'
                }`}>
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com/foodshare_md" 
                target="_blank" 
                rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  theme === 'light' ? 'bg-gray-200 text-gray-600 hover:bg-[#16a34a] hover:text-white' : 'bg-gray-800 text-gray-400 hover:bg-[#16a34a] hover:text-white'
                }`}>
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com/foodshare.md" 
                target="_blank" 
                rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  theme === 'light' ? 'bg-gray-200 text-gray-600 hover:bg-[#16a34a] hover:text-white' : 'bg-gray-800 text-gray-400 hover:bg-[#16a34a] hover:text-white'
                }`}>
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com/company/foodshare-md" 
                target="_blank" 
                rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  theme === 'light' ? 'bg-gray-200 text-gray-600 hover:bg-[#16a34a] hover:text-white' : 'bg-gray-800 text-gray-400 hover:bg-[#16a34a] hover:text-white'
                }`}>
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className={`text-lg font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Company</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className={`transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-[#16a34a]' : 'text-gray-400 hover:text-green-400'}`}>About Us</Link>
              </li>
              <li>
                <Link to="/careers" className={`transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-[#16a34a]' : 'text-gray-400 hover:text-green-400'}`}>Careers</Link>
              </li>
              <li>
                <Link to="/partners" className={`transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-[#16a34a]' : 'text-gray-400 hover:text-green-400'}`}>Our Partners</Link>
              </li>
              <li>
                <Link to="/blog" className={`transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-[#16a34a]' : 'text-gray-400 hover:text-green-400'}`}>News & Blog</Link>
              </li>
            </ul>
          </div>

          <div>
             <h4 className={`text-lg font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Legal & Support</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/terms" className={`transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-[#16a34a]' : 'text-gray-400 hover:text-green-400'}`}>Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className={`transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-[#16a34a]' : 'text-gray-400 hover:text-green-400'}`}>Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cookies" className={`transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-[#16a34a]' : 'text-gray-400 hover:text-green-400'}`}>Cookie Policy</Link>
              </li>
              <li>
                <Link to="/contact" className={`transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-[#16a34a]' : 'text-gray-400 hover:text-green-400'}`}>Help Center</Link>
              </li>
            </ul>
          </div>

          <div>
             <h4 className={`text-lg font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Contact Us</h4>
            <ul className="space-y-4">
              <li className={`flex items-start gap-3 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                <MapPin size={20} className="text-[#16a34a] mt-1 flex-shrink-0" />
                <span>Strada Mihai Eminescu 78,<br />Strășeni, Moldova</span>
              </li>
              <li className={`flex items-center gap-3 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                <Phone size={20} className="text-[#16a34a] flex-shrink-0" />
                <span>+373 62 121 255</span>
              </li>
              <li className={`flex items-center gap-3 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                <Mail size={20} className="text-[#16a34a] flex-shrink-0" />
                <span>contact@foodshare.md</span>
              </li>
            </ul>
          </div>

        </div>

        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${
          theme === 'light' ? 'border-gray-200' : 'border-[#2e2e2e]'
        }`}>
          <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
            © 2026 FoodShare Platform. All rights reserved.
          </p>
          <p className={`text-sm flex items-center gap-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
            Made by VLM Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;