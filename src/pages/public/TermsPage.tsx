import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useTheme } from '../../hooks/useTheme';

const TermsPage = () => {
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
                <ShieldCheck size={32} className="text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black mb-4">Terms & Conditions</h1>
              <p className="text-green-100">Last updated: February 2026</p>
            </div>

            <div className={`p-8 md:p-12 prose max-w-none ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              
              <h2 className={`text-2xl font-bold mb-4 mt-0 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>1. Introduction</h2>
              <p className="mb-6 leading-relaxed">
                Welcome to FoodShare. These Terms & Conditions govern your use of our website and platform. By accessing or using FoodShare, you agree to be bound by these terms. If you do not agree with any part of these terms, please do not use our services.
              </p>

              <h2 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>2. Platform Role</h2>
              <p className="mb-6 leading-relaxed">
                FoodShare acts solely as an intermediary technology platform connecting food donors (Businesses) with verified receivers (NGOs and Charities). We do not own, transport, or store the food at any point in the process.
              </p>

              <h2 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>3. User Responsibilities</h2>
              
              <h3 className={`text-xl font-bold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>3.1. Donors (Businesses)</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>You agree to list only food items that are safe for human consumption.</li>
                <li>You must provide accurate descriptions regarding allergens, expiry times, and pickup instructions.</li>
                <li>You hold FoodShare harmless from any liabilities arising from the quality of the donated food.</li>
              </ul>

              <h3 className={`text-xl font-bold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>3.2. Receivers (NGOs)</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>You must maintain an active legal status as a non-profit or charitable organization.</li>
                <li>You agree to pick up reserved items within the agreed timeframe.</li>
                <li>You are responsible for safely transporting and distributing the food to the end beneficiaries.</li>
              </ul>

              <h2 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>4. Account Verification</h2>
              <p className="mb-6 leading-relaxed">
                To ensure community safety, all accounts undergo a manual verification process. FoodShare reserves the right to reject or suspend any account that fails to provide legitimate legal documentation or violates our community guidelines.
              </p>

              <h2 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>5. Limitation of Liability</h2>
              <p className="mb-6 leading-relaxed">
                To the maximum extent permitted by law, FoodShare shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the platform, the quality of the donated food, or the interactions between users.
              </p>

              <h2 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>6. Changes to Terms</h2>
              <p className="mb-6 leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any material changes via email or platform notification. Continued use of the platform constitutes acceptance of the modified terms.
              </p>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;