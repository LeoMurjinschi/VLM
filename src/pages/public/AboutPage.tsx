import { Heart, Target, Leaf } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useTheme } from '../../hooks/useTheme';

const AboutPage = () => {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      theme === 'light' ? 'bg-white text-gray-900' : 'bg-[#121212] text-gray-100'
    }`}>
      <Navbar />
      
      <main className="flex-grow">
        <section className={`py-20 lg:py-28 relative overflow-hidden transition-colors duration-300 ${
          theme === 'light' ? 'bg-[#F9FAFB]' : 'bg-[#1a1a1a]'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Our Mission at <span className={theme === 'light' ? 'text-[#16a34a]' : 'text-green-400'}>FoodShare</span>
            </h1>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              We are a passionate team dedicated to bridging the gap between food surplus and food insecurity. 
              We believe that good food belongs to people, not landfills.
            </p>
          </div>
          
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#16a34a]/10 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-green-200/10 rounded-full blur-3xl opacity-50"></div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className={`text-3xl font-black mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Our Core Values</h2>
              <p className={`max-w-2xl mx-auto ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                Everything we build is guided by these fundamental principles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              
              <div className={`p-8 rounded-2xl border shadow-sm hover:shadow-xl transition-shadow text-center ${
                theme === 'light' ? 'bg-white border-gray-100 hover:shadow-green-500/10' : 'bg-[#1a1a1a] border-[#2e2e2e] hover:shadow-green-900/20'
              }`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                  theme === 'light' ? 'bg-[#F0FAF4] text-[#16a34a]' : 'bg-[#16a34a]/10 text-green-400'
                }`}>
                  <Heart size={32} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Community First</h3>
                <p className={`leading-relaxed ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                  We prioritize the needs of our local shelters, NGOs, and the vulnerable people they support every single day.
                </p>
              </div>

              <div className={`p-8 rounded-2xl border shadow-sm hover:shadow-xl transition-shadow text-center ${
                theme === 'light' ? 'bg-white border-gray-100 hover:shadow-green-500/10' : 'bg-[#1a1a1a] border-[#2e2e2e] hover:shadow-green-900/20'
              }`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                  theme === 'light' ? 'bg-[#F0FAF4] text-[#16a34a]' : 'bg-[#16a34a]/10 text-green-400'
                }`}>
                  <Leaf size={32} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Sustainability</h3>
                <p className={`leading-relaxed ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                  Reducing food waste directly lowers CO2 emissions. We are building a greener, more sustainable future.
                </p>
              </div>

              <div className={`p-8 rounded-2xl border shadow-sm hover:shadow-xl transition-shadow text-center ${
                theme === 'light' ? 'bg-white border-gray-100 hover:shadow-green-500/10' : 'bg-[#1a1a1a] border-[#2e2e2e] hover:shadow-green-900/20'
              }`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                  theme === 'light' ? 'bg-[#F0FAF4] text-[#16a34a]' : 'bg-[#16a34a]/10 text-green-400'
                }`}>
                  <Target size={32} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Efficiency</h3>
                <p className={`leading-relaxed ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                  By using technology, we make the donation process fast, transparent, and bureaucracy-free for businesses.
                </p>
              </div>

            </div>
          </div>
        </section>

        <section className={`py-20 border-t ${
          theme === 'light' ? 'bg-gray-50 border-gray-100' : 'bg-[#151515] border-[#2e2e2e]'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className={`text-3xl font-black mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Built by students, <br/>for the community.</h2>
                <p className={`mb-6 leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  FoodShare started as a university project built by three software engineering students. We noticed local restaurants throwing away perfectly good food at the end of the day, while local charities struggled to find resources.
                </p>
                <p className={`leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  What began as a simple idea has now evolved into a robust platform. Our goal is to scale this infrastructure nationally, making food donation the norm, not the exception.
                </p>
              </div>
              <div className="mt-10 lg:mt-0">
                <div className={`relative rounded-2xl overflow-hidden shadow-2xl ring-1 ${theme === 'light' ? 'ring-gray-900/10' : 'ring-white/10'}`}>
                  <img 
                    src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80" 
                    alt="Team working together" 
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-[#16a34a]/10 mix-blend-multiply"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;