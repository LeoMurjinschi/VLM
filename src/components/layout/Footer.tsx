import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div>
            <Link to="/" className="text-2xl font-black text-white tracking-tight mb-6 block">
              FoodShare.
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed">
              We are building the largest network of food donors and receivers. 
              Join us in our mission to eliminate food waste and support local communities.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-400 hover:text-white transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:text-white transition-all">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-blue-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/careers" className="text-slate-400 hover:text-blue-400 transition-colors">Careers</Link>
              </li>
              <li>
                <Link to="/partners" className="text-slate-400 hover:text-blue-400 transition-colors">Our Partners</Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-400 hover:text-blue-400 transition-colors">News & Blog</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Legal & Support</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/terms" className="text-slate-400 hover:text-blue-400 transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-400 hover:text-blue-400 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cookies" className="text-slate-400 hover:text-blue-400 transition-colors">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-blue-400 transition-colors">Help Center</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                <span>Strada Mihai Eminescu 78,<br />Strășeni, Moldova</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Phone size={20} className="text-blue-500 flex-shrink-0" />
                <span>+373 62 121 255</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Mail size={20} className="text-blue-500 flex-shrink-0" />
                <span>contact@foodshare.md</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 FoodShare Platform. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm flex items-center gap-1">
            Made by VLM Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;