import { LockKeyhole, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useTheme } from '../../hooks/useTheme';

const PrivacyPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-[#121212] text-gray-100'
    }`}>
      <Navbar />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          <button 
            onClick={() => navigate('/')}
            className={`flex items-center text-sm font-bold mb-8 transition-colors ${
                theme === 'light' ? 'text-gray-500 hover:text-[#16a34a]' : 'text-gray-400 hover:text-green-400'
            }`}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </button>

          <div className={`rounded-3xl shadow-sm border overflow-hidden ${
              theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
          }`}>
            <div className={`p-8 md:p-12 text-center text-white ${theme === 'light' ? 'bg-[#16a34a]' : 'bg-[#15803d]'}`}>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <LockKeyhole size={32} className="text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black mb-4">Privacy Policy</h1>
              <p className="text-green-100">Last updated: February 2026</p>
            </div>

            <div className={`p-8 md:p-12 prose max-w-none ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              
              <h2 className={`text-2xl font-bold mb-4 mt-0 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>1. Introduction</h2>
              <p className="mb-6 leading-relaxed">
                At FoodShare, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>

              <h2 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>2. Information We Collect</h2>
              <p className="mb-4 leading-relaxed">
                We may collect information about you in a variety of ways. The information we may collect on the Site includes:
              </p>
              
              <h3 className={`text-xl font-bold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>2.1. Personal & Organizational Data</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Personally identifiable information, such as your name, email address, and telephone number.</li>
                <li>Organizational details including business name, fiscal code (IDNO), and physical address required during the registration process.</li>
                <li>Verification documents (e.g., Certificates of Registration) uploaded for account approval.</li>
              </ul>

              <h3 className={`text-xl font-bold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>2.2. Derivative Data</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Information our servers automatically collect when you access the platform, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
              </ul>

              <h2 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>3. How We Use Your Information</h2>
              <p className="mb-4 leading-relaxed">
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Create and manage your account.</li>
                <li>Verify your organization's legal status to ensure platform safety.</li>
                <li>Facilitate the donation and reservation processes between Donors and Receivers.</li>
                <li>Email you regarding your account, donations, or reservations.</li>
                <li>Compile anonymous statistical data and analysis for use internally or with third parties to improve platform efficiency.</li>
              </ul>

              <h2 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>4. Disclosure of Your Information</h2>
              <p className="mb-6 leading-relaxed">
                We do not sell, trade, or otherwise transfer your Personally Identifiable Information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law or protect ours or others' rights, property, or safety.
              </p>

              <h2 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>5. Security of Your Information</h2>
              <p className="mb-6 leading-relaxed">
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>

              <h2 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>6. Your Rights</h2>
              <p className="mb-6 leading-relaxed">
                Depending on your location, you may have the right to access, correct, update, or delete your personal data. If you wish to exercise these rights or request the deletion of your account and associated data, please contact us at <strong className={theme === 'light' ? 'text-[#16a34a]' : 'text-green-400'}>privacy@foodshare.md</strong>.
              </p>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;