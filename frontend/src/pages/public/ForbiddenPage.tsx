import { Link } from 'react-router-dom';
import { ShieldOff } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';

const ForbiddenPage = () => {
  const { theme } = useTheme();
  const { user } = useAuth();

  const dashboardUrl = user?.role === 'donor'
    ? '/donor/dashboard'
    : user?.role === 'admin'
    ? '/admin/dashboard'
    : '/receiver/feed';

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${
      theme === 'light' ? 'bg-gray-50' : 'bg-[#121212]'
    }`}>
      <div className={`p-10 rounded-2xl shadow-xl max-w-md w-full text-center border ${
        theme === 'light' ? 'bg-white border-gray-100' : 'bg-[#1a1a1a] border-[#2e2e2e]'
      }`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
          theme === 'light' ? 'bg-red-50' : 'bg-red-900/20'
        }`}>
          <ShieldOff className={theme === 'light' ? 'text-red-500' : 'text-red-400'} size={32} />
        </div>

        <p className={`text-6xl font-black mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
          403
        </p>
        <h1 className={`text-xl font-bold mb-3 ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'}`}>
          Access Denied
        </h1>
        <p className={`text-sm leading-relaxed mb-8 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
          You don't have permission to view this page. Please contact an administrator if you believe this is a mistake.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {user ? (
            <Link
              to={dashboardUrl}
              className="px-6 py-2.5 rounded-xl bg-[#16a34a] text-white font-bold text-sm hover:bg-[#15803d] transition-colors"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2.5 rounded-xl bg-[#16a34a] text-white font-bold text-sm hover:bg-[#15803d] transition-colors"
            >
              Sign In
            </Link>
          )}
          <Link
            to="/"
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-colors border ${
              theme === 'light'
                ? 'border-gray-200 text-gray-600 hover:bg-gray-50'
                : 'border-[#2e2e2e] text-gray-400 hover:bg-[#222]'
            }`}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
