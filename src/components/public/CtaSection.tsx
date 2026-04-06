import { Link } from 'react-router-dom';
import { ArrowRight, Store, Heart } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const CtaSection = () => {
  const { theme } = useTheme();
  return (
    <section className={`py-24 transition-colors duration-300 ${
      theme === 'light' ? 'bg-white' : 'bg-[#1a1a1a]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-3xl md:text-4xl font-black mb-6 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Ready to make a difference?
          </h2>
          <p className={`text-lg ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            Join the community that is changing the way we think about food waste. 
            Choose your role and get started in less than 5 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          <div className={`relative group overflow-hidden rounded-3xl p-8 lg:p-12 text-white shadow-xl transition-transform hover:-translate-y-1 ${
            theme === 'light' ? 'bg-[#16a34a]' : 'bg-[#15803d]'
          }`}>
            <div className="relative z-10">
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm">
                <Store size={32} className="text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">I am a Business</h3>
              <p className={`mb-8 leading-relaxed ${theme === 'light' ? 'text-green-100' : 'text-green-50'}`}>
                Do you have surplus food? Don't throw it away. 
                Register your restaurant or store, list items quickly, and receive tax deductions while helping your community.
              </p>
              
              <Link 
                to="/signup?role=donor" 
                className={`inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-colors ${
                  theme === 'light' ? 'bg-white text-[#16a34a] hover:bg-green-50' : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                Start Donating
                <ArrowRight size={20} />
              </Link>
            </div>

            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <div className={`relative group overflow-hidden rounded-3xl p-8 lg:p-12 text-white shadow-xl transition-transform hover:-translate-y-1 ${
            theme === 'light' ? 'bg-gray-900' : 'bg-[#222222]'
          }`}>
            <div className="relative z-10">
              <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm">
                <Heart size={32} className="text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">I represent an NGO</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                 Are you looking for food resources for your shelter or canteen? 
                 Access our real-time map, reserve donations instantly, and focus your budget on other critical needs.
              </p>
              
              <Link 
                to="/signup?role=receiver" 
                className={`inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-colors border ${
                  theme === 'light' ? 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700' : 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700'
                }`}
              >
                Join as Receiver
                <ArrowRight size={20} />
              </Link>
            </div>

             <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-[#16a34a]/20 rounded-full blur-3xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CtaSection;