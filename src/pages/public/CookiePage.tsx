import { Cookie, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const CookiePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Navbar />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-sm font-bold text-gray-500 hover:text-blue-600 mb-8 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </button>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-blue-600 p-8 md:p-12 text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <Cookie size={32} className="text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black mb-4">Cookie Policy</h1>
              <p className="text-blue-100">Last updated: February 2026</p>
            </div>

            <div className="p-8 md:p-12 prose prose-blue max-w-none text-gray-600">
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-0">1. What are Cookies?</h2>
              <p className="mb-6 leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you browse websites. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site. At FoodShare, we use cookies to ensure you get the best experience on our platform.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Cookies</h2>
              <p className="mb-4 leading-relaxed">
                We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Authentication:</strong> To identify you when you visit our platform and as you navigate it.</li>
                <li><strong>Status:</strong> To help us determine if you are logged into our secure dashboard.</li>
                <li><strong>Security:</strong> As an element of the security measures used to protect user accounts, including preventing fraudulent use of login credentials.</li>
                <li><strong>Preferences:</strong> To store information about your preferences and to personalize the platform for you.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">3.1. Essential Cookies</h3>
              <p className="mb-4 leading-relaxed">
                These cookies are strictly necessary to provide you with services available through our platform and to use some of its features, such as access to secure areas. Without these cookies, the services that you have asked for cannot be provided.
              </p>

              <h3 className="text-xl font-bold text-gray-800 mb-2">3.2. Performance & Analytics Cookies</h3>
              <p className="mb-6 leading-relaxed">
                These cookies collect information that is used either in aggregate form to help us understand how our platform is being used or how effective our campaigns are, or to help us customize our platform for you to enhance your experience.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Disabling Cookies</h2>
              <p className="mb-6 leading-relaxed">
                You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the FoodShare platform. Therefore, it is recommended that you do not disable cookies.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact Us</h2>
              <p className="mb-6 leading-relaxed">
                If you have any questions about our Cookie Policy, please contact us at <strong>privacy@foodshare.md</strong>.
              </p>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePage;