import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import ForgotPasswordPage from './pages/public/ForgotPasswordPage';
import SignUpPage from './pages/public/SignUpPage';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import AboutPage from './pages/public/AboutPage';
import CareersPage from './pages/public/CareersPage';
import JobApplicationPage from './pages/public/JobApplicationPage';
import PartnersPage from './pages/public/PartnersPage';
import BlogPage from './pages/public/BlogPage';
import TermsPage from './pages/public/TermsPage';
import PrivacyPage from './pages/public/PrivacyPage';
import CookiePage from './pages/public/CookiePage';
import HelpCenterPage from './pages/public/HelpCenterPage';
import { useState } from 'react';

import ReceiverLayout from './layouts/ReceiverLayout';


// 1. Importăm librăria pentru Notificări
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 2. Contextul pentru Temă
import { ThemeProvider } from './context/ThemeContext';
import { InventoryProvider } from './context/InventoryContext'; 
import ToastProvider from './components/UI/ToastProvider';
import DashboardLayout from './layouts/DashboardLayout';
import DonationFeed from './pages/DonationFeed';
import DonorDashboard from './pages/DonorDashboard';
import ImpactReports from './pages/ImpactReports';
import AddStock from './pages/AddStock';
import CurrentInventory from './pages/CurrentInventory';
import Settings from './pages/Settings';

const ReceiverDashboard = () => <div className="p-10 text-2xl font-bold">Receiver Dashboard (Protected)</div>;
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDonationFeed from './pages/admin/AdminDonationFeed';
import AdminAccounts from './pages/admin/AdminAccounts';
import AdminSignups from './pages/admin/AdminSignups';
import AdminReviews from './pages/admin/AdminReviews';
import { useTheme } from './hooks/useTheme';

import Dashboard from './pages/Dashboard';
import MyPickups from './pages/MyPickUps';
import ReservationHistory from './pages/ReservationHistory';
import FeedbackRating from './pages/FeedbackRating';
import SafetyGuide from './pages/SafetyGuide';
import NotificationHistory from './pages/NotificationHistory';
import Messages from './pages/Messages';

// === COMPONENTĂ NOUĂ PENTRU NOTIFICĂRI PREMIUM ===

const ThemedToastContainer = () => {
  const { theme } = useTheme();

  return (
    <ToastContainer 
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={true} 
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      // Am combinat clasele aici și am șters bodyClassName
      toastClassName={`relative flex p-4 mb-4 rounded-2xl justify-between items-center overflow-hidden cursor-pointer border shadow-2xl transition-all text-sm font-bold gap-2 ${
        theme === 'light' 
          ? 'bg-white text-gray-800 border-gray-100' 
          : 'bg-gray-800 text-gray-100 border-gray-700'
      }`}
    />
  );
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <ThemeProvider>
      <AuthProvider>
        <InventoryProvider>
          <ToastProvider>
            <Router>
              <ScrollToTop />
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/careers/apply/:jobId" element={<JobApplicationPage />} />
                <Route path="/partners" element={<PartnersPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/cookies" element={<CookiePage />} />
                <Route path="/contact" element={<HelpCenterPage />} />
                <Route path="/" element={<LandingPage />} />

                <Route
                  path="/donor/*"
                  element={
                    <ProtectedRoute allowedRoles={['donor']}>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="feed" replace />} />
                  <Route path="feed" element={<DonationFeed />} />
                  <Route path="dashboard" element={<DonorDashboard />} />
                  <Route path="reports" element={<ImpactReports />} />
                  <Route path="add-stock" element={<AddStock />} />
                  <Route path="inventory" element={<CurrentInventory />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="notifications" element={<NotificationHistory />} />
                  <Route path="*" element={<div className="p-10 text-center text-gray-500 font-bold">Page under construction 🚧</div>} />
                </Route>

                {/* === RUTELE TALE RECEIVER (ONG) === */}
                <Route
                     path="/receiver"
                      element={
                    <ProtectedRoute allowedRoles={['receiver']}>
                        <ReceiverLayout />  {/* <-- Aici l-am pus! */}
                 </ProtectedRoute>
            }
>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="pickups" element={<MyPickups />} />
                  <Route path="history" element={<ReservationHistory />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="notifications" element={<NotificationHistory />} />
                  <Route path="feedback" element={<FeedbackRating />} />
                  <Route path="safety" element={<SafetyGuide />} />
                  <Route path="settings" element={<Settings />} />
                  
                  {/* 404 Fallback pentru Receiver */}
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Route>

                {/* === RUTELE ADMIN === */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="donations" element={<AdminDonationFeed />} />
                  <Route path="accounts" element={<AdminAccounts />} />
                  <Route path="signups" element={<AdminSignups />} />
                  <Route path="reviews" element={<AdminReviews />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="notifications" element={<NotificationHistory />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </ToastProvider>
        </InventoryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;