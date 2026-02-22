import { Briefcase, MapPin, Clock, ArrowRight, Heart, Zap, Globe } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { AuthButton } from '../../components/ui/AuthButton';
import { OPEN_POSITIONS } from '../../data/mockData';

const CareersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-white py-20 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4 tracking-wide uppercase">
              Join the team
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              Work with purpose. <br />
              <span className="text-blue-600">Build the future.</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              We are looking for passionate people to help us eliminate food waste and support communities in need. Bring your skills and make a real impact.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-gray-900">Why work with us?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Meaningful Impact</h3>
                <p className="text-gray-500 leading-relaxed">
                  Your code, strategies, and efforts directly contribute to feeding vulnerable people and saving the planet.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Work from Anywhere</h3>
                <p className="text-gray-500 leading-relaxed">
                  We believe in flexibility. Work from our hub or from the comfort of your home.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Fast Growth</h3>
                <p className="text-gray-500 leading-relaxed">
                  Join an early-stage project where your ideas matter and your career can accelerate rapidly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-4">Open Positions</h2>
              <p className="text-gray-500">Find the perfect role for you below.</p>
            </div>

            <div className="space-y-4">
              {OPEN_POSITIONS.map((job) => (
                <div 
                  key={job.id} 
                  className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-gray-700 font-medium">
                        <Briefcase size={14} />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={16} />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <AuthButton variant="outline" className="w-full md:w-auto group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
                      <span className="flex items-center">
                        Apply Now <ArrowRight size={16} className="ml-2" />
                      </span>
                    </AuthButton>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-blue-50 rounded-2xl border border-blue-100 text-center">
              <h3 className="text-lg font-bold text-blue-900 mb-2">Don't see a fit?</h3>
              <p className="text-blue-700 mb-6">
                We're always looking for talented people. Send your resume and let's talk!
              </p>
              <AuthButton variant="primary">Submit General Application</AuthButton>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CareersPage;