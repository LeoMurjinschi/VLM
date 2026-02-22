import {ArrowRight } from 'lucide-react';
import {STEPS} from '../../data/mockData';

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">
            Simple Process
          </h2>
          <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            How FoodShare Works
          </h3>
          <p className="text-lg text-gray-500">
            We've eliminated the bureaucracy. Our platform creates a direct, fast, and transparent bridge between surplus and need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {STEPS.map((step, index) => (
            <div 
              key={step.id} 
              className="relative group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300 ${step.color} shadow-lg ${step.shadow}`}>
                <step.icon size={32} className="text-white"/>
              </div>

              <h4 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h4>
              <p className="text-gray-500 leading-relaxed mb-6">
                {step.description}
              </p>

              <div className="absolute top-6 right-6 text-6xl font-black text-gray-100 -z-0 group-hover:text-gray-50 transition-colors select-none">
                0{step.id}
              </div>

              {index < STEPS.length - 1 && (
                <div className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2 z-20 text-gray-300">
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