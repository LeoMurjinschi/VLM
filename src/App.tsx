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
import { ThemeProvider } from './context/ThemeContext';
import { InventoryProvider } from './context/InventoryContext'; 
import ToastProvider from './components/ui/ToastProvider';
import DashboardLayout from './layouts/DashboardLayout';
import DonationFeed from './pages/DonationFeed';
import DonorDashboard from './pages/DonorDashboard';
import ImpactReports from './pages/ImpactReports';
import AddStock from './pages/AddStock';
import CurrentInventory from './pages/CurrentInventory';
import Settings from './pages/Settings';

const ReceiverDashboard = () => <div className="p-10 text-2xl font-bold">Receiver Dashboard (Protected)</div>;
const AdminDashboard = () => <div className="p-10 text-2xl font-bold">Admin Dashboard (Protected)</div>;

function App() {
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
                  <Route path="*" element={<div className="p-10 text-center text-gray-500 font-bold">Page under construction 🚧</div>} />
                </Route>

                <Route
                  path="/receiver/*"
                  element={
                    <ProtectedRoute allowedRoles={['receiver']}>
                      <Routes>
                        <Route path="dashboard" element={<ReceiverDashboard />} />
                      </Routes>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <Routes>
                        <Route path="dashboard" element={<AdminDashboard />} />
                      </Routes>
                    </ProtectedRoute>
                  }
                />

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