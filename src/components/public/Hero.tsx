import { Link } from 'react-router-dom';
import { Heart, Leaf, Store, Utensils } from 'lucide-react';
import { RECENT_DONORS } from '../../data/mockData';
import { useTheme } from '../../hooks/useTheme';

const Hero = () => {
  const { theme } = useTheme();
  return (
    <section className={`relative overflow-hidden py-16 lg:py-24 transition-colors duration-300 ${
      theme === 'light' ? 'bg-white' : 'bg-[#1a1a1a]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

          <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
            <div className="flex justify-center lg:justify-start mb-6">
              <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-inset ${
                theme === 'light' ? 'bg-green-50 text-[#16a34a] ring-green-100' : 'bg-[#16a34a]/10 text-green-400 ring-green-900/30'
              }`}>
                <Leaf size={16} />
                Stop Food Waste
              </span>
            </div>

            <h1 className={`text-4xl font-black tracking-tight sm:text-5xl md:text-6xl mb-6 leading-tight ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Share Food,<br />
              <span className={theme === 'light' ? 'text-[#16a34a]' : 'text-green-400'}>Save the Community.</span>
            </h1>

            <p className={`text-lg mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              We connect <span className={`font-bold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>restaurants & stores</span> directly with NGOs in need.
              Turn surplus food into good deeds through a simple, fast, and secure platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/signup" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all bg-[#16a34a] rounded-xl hover:bg-[#15803d] shadow-lg shadow-green-500/20 hover:-translate-y-1">
                <Store className="mr-2" size={20} />
                Partner Registration
              </Link>
              <a href="#how-it-works" className={`inline-flex items-center justify-center px-8 py-4 text-base font-bold transition-all rounded-xl shadow-sm hover:shadow-md ${
                theme === 'light' 
                  ? 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-[#16a34a]' 
                  : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-green-400'
              }`}>
                <Heart className={`mr-2 ${theme === 'light' ? 'text-red-500' : 'text-red-400'}`} size={20} />
                How it works?
              </a>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6">
              <div className="flex -space-x-3">
                {RECENT_DONORS.map((donor) => (
                  <div key={donor.id} className="relative group">
                    <img
                      className={`inline-block h-12 w-12 rounded-full ring-2 object-cover cursor-pointer hover:scale-110 transition-transform ${
                        theme === 'light' ? 'ring-white bg-gray-100' : 'ring-[#1a1a1a] bg-gray-800'
                      }`}
                      src={donor.image}
                      alt={donor.name}
                    />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {donor.name} ({donor.type})
                    </div>
                  </div>
                ))}
                <div className={`inline-flex items-center justify-center h-12 w-12 rounded-full ring-2 text-xs font-bold ${
                  theme === 'light' ? 'ring-white bg-gray-100 text-gray-600' : 'ring-[#1a1a1a] bg-gray-800 text-gray-400'
                }`}>
                  +120
                </div>
              </div>
              <div className="text-sm text-left">
                <p className={`font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Partner Businesses</p>
                <p className={`font-normal ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>restaurants & markets joined</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 mt-12 lg:mt-0 relative">
            <div className={`relative rounded-3xl overflow-hidden shadow-2xl ring-1 ${
              theme === 'light' ? 'ring-gray-900/10 bg-gray-50' : 'ring-white/10 bg-gray-800'
            }`}>
              <img
                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Community food sharing"
                className="w-full h-full object-cover transform transition-transform hover:scale-105 duration-700 opacity-90"
              />

              <div className={`absolute bottom-6 left-6 right-6 backdrop-blur-md rounded-2xl p-4 shadow-lg border hidden md:block animate-fade-in-up ${
                theme === 'light' ? 'bg-white/95 border-gray-100' : 'bg-[#1a1a1a]/95 border-[#2e2e2e]'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${
                      theme === 'light' ? 'bg-[#F0FAF4] text-[#16a34a]' : 'bg-[#16a34a]/20 text-green-400'
                    }`}>
                      <Utensils size={24} />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Meals Saved</p>
                      <p className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>12,450+</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold px-2 py-1 rounded-md ${
                      theme === 'light' ? 'text-[#16a34a] bg-[#F0FAF4]' : 'text-green-400 bg-[#16a34a]/20'
                    }`}>+15% today</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-12 -right-12 -z-10 w-64 h-64 bg-[#16a34a]/20 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
            <div className="absolute -bottom-12 -left-12 -z-10 w-64 h-64 bg-green-200/20 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;