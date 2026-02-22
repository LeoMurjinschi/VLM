import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
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

const DonorDashboard = () => <div className="p-10 text-2xl font-bold">Donor Dashboard (Protected)</div>;
const ReceiverDashboard = () => <div className="p-10 text-2xl font-bold">Receiver Dashboard (Protected)</div>;
const AdminDashboard = () => <div className="p-10 text-2xl font-bold">Admin Dashboard (Protected)</div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/apply/:jobId" element={<JobApplicationPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/cookies" element={<CookiePage />} />
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/donor/*"
            element={
              <ProtectedRoute allowedRoles={['donor']}>
                <Routes>
                  <Route path="dashboard" element={<DonorDashboard />} />
                </Routes>
              </ProtectedRoute>
            }
          />

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
    </AuthProvider>
  );
}

export default App;