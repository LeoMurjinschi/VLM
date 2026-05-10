import { ArrowRight } from 'lucide-react';
import { STEPS } from '../../data/mockData';
import { useTheme } from '../../hooks/useTheme';

const HowItWorks = () => {
  const { theme } = useTheme();
  return (
    <section id="how-it-works" className={`py-20 relative overflow-hidden scroll-mt-20 transition-colors duration-300 ${
      theme === 'light' ? 'bg-[#F9FAFB]' : 'bg-[#151515]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`font-semibold tracking-wide uppercase text-sm mb-3 ${
            theme === 'light' ? 'text-[#16a34a]' : 'text-green-400'
          }`}>
            Simple Process
          </h2>
          <h3 className={`text-3xl md:text-4xl font-black mb-4 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            How FoodShare Works
          </h3>
          <p className={`text-lg ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            We've eliminated the bureaucracy. Our platform creates a direct, fast, and transparent bridge between surplus and need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className={`relative group rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border ${
                theme === 'light' ? 'bg-white border-gray-100 hover:shadow-green-500/10' : 'bg-[#1a1a1a] border-[#2e2e2e] hover:shadow-green-900/20'
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg ${
                theme === 'light' ? 'bg-[#16a34a] text-white shadow-green-500/30' : 'bg-[#16a34a] text-white shadow-green-900/40' 
              }`}>
                <step.icon size={32} className="text-white" />
              </div>

              <h4 className={`text-xl font-bold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                {step.title}
              </h4>
              <p className={`leading-relaxed mb-6 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                {step.description}
              </p>

              <div className={`absolute top-6 right-6 text-6xl font-black -z-0 transition-colors select-none ${
                theme === 'light' ? 'text-gray-100 group-hover:text-gray-50' : 'text-[#2a2a2a] group-hover:text-[#222222]'
              }`}>
                0{step.id}
              </div>

              {index < STEPS.length - 1 && (
                <div className={`hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2 z-20 ${
                  theme === 'light' ? 'text-gray-300' : 'text-[#3e3e3e]'
                }`}>
                  <ArrowRight size={24} />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;