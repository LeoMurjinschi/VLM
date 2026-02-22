import { Heart, Target, Leaf } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-blue-50 py-20 lg:py-28 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              Our Mission at <span className="text-blue-600">FoodShare</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We are a passionate team dedicated to bridging the gap between food surplus and food insecurity. 
              We believe that good food belongs to people, not landfills.
            </p>
          </div>
          
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50"></div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Everything we build is guided by these fundamental principles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Community First</h3>
                <p className="text-gray-500 leading-relaxed">
                  We prioritize the needs of our local shelters, NGOs, and the vulnerable people they support every single day.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow text-center">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Leaf size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Sustainability</h3>
                <p className="text-gray-500 leading-relaxed">
                  Reducing food waste directly lowers CO2 emissions. We are building a greener, more sustainable future.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow text-center">
                <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Efficiency</h3>
                <p className="text-gray-500 leading-relaxed">
                  By using technology, we make the donation process fast, transparent, and bureaucracy-free for businesses.
                </p>
              </div>

            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-6">Built by students, <br/>for the community.</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  FoodShare started as a university project built by three software engineering students. We noticed local restaurants throwing away perfectly good food at the end of the day, while local charities struggled to find resources.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  What began as a simple idea has now evolved into a robust platform. Our goal is to scale this infrastructure nationally, making food donation the norm, not the exception.
                </p>
              </div>
              <div className="mt-10 lg:mt-0">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80" 
                    alt="Team working together" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
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