import { Link } from 'react-router-dom';
import { ArrowRight, Store, Heart } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
            Ready to make a difference?
          </h2>
          <p className="text-lg text-gray-500">
            Join the community that is changing the way we think about food waste. 
            Choose your role and get started in less than 5 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          <div className="relative group overflow-hidden rounded-3xl bg-blue-600 p-8 lg:p-12 text-white shadow-xl transition-transform hover:-translate-y-1">
            <div className="relative z-10">
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm">
                <Store size={32} className="text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">I am a Business</h3>
              <p className="text-blue-100 mb-8 leading-relaxed">
                Do you have surplus food? Don't throw it away. 
                Register your restaurant or store, list items quickly, and receive tax deductions while helping your community.
              </p>
              
              <Link 
                to="/signup?role=donor" 
                className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Start Donating
                <ArrowRight size={20} />
              </Link>
            </div>

            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative group overflow-hidden rounded-3xl bg-gray-900 p-8 lg:p-12 text-white shadow-xl transition-transform hover:-translate-y-1">
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
                className="inline-flex items-center gap-2 bg-gray-700 text-white font-bold px-6 py-3 rounded-xl hover:bg-gray-600 transition-colors border border-gray-600"
              >
                Join as Receiver
                <ArrowRight size={20} />
              </Link>
            </div>

             <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CtaSection;