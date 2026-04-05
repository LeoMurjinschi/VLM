import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { InputField } from '../../components/ui/InputField';
import { AuthButton } from '../../components/ui/AuthButton';
import { useAuth} from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import type { Role } from '../../context/AuthContext';
import usersMock from '../../_mock/users.json';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = usersMock.find(u => u.email === formData.email && u.password === formData.password);

    if (user) {
      login({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as Role,
        avatar: user.avatar
      });

      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'donor') {
        navigate('/donor/dashboard');
      } else if (user.role === 'receiver') {
        navigate('/receiver/dashboard');
      }
    } else {
      setError('Date de autentificare incorecte (Verifică users.json pentru email/parolă)');
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Please sign in to access your account."
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        
        <InputField
          label="Email Address"
          name="email"
          type="email"
          placeholder="name@company.com"
          icon={Mail}
          value={formData.email}
          onChange={handleChange}
          required
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={formData.password}
          onChange={handleChange}
          required
        />

        {error && (
          <div className={`text-sm p-3 rounded-lg border font-medium ${
            theme === 'light' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-red-900/20 text-red-400 border-red-900/30'
          }`}>
            {error}
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className={`h-4 w-4 rounded cursor-pointer focus:ring-[#16a34a] text-[#16a34a] ${
                theme === 'light' ? 'border-gray-300' : 'border-[#2e2e2e] bg-[#222222]'
              }`}
            />
            <label htmlFor="remember-me" className={`ml-2 block cursor-pointer ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
              Remember me
            </label>
          </div>
          <a href="#" className={`font-semibold hover:underline ${
            theme === 'light' ? 'text-[#16a34a]' : 'text-green-500'
          }`}>
            Forgot password?
          </a>
        </div>

        <AuthButton 
          type="submit" 
          fullWidth 
          isLoading={isLoading} 
          icon={<LogIn size={18} />}
        >
          Sign In
        </AuthButton>

      </form>

      <div className="mt-6 text-center text-sm">
        <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
          Don't have an account?{' '}
          <Link to="/signup" className={`font-bold transition-colors ${
            theme === 'light' ? 'text-[#16a34a] hover:text-[#15803d]' : 'text-green-400 hover:text-green-300'
          }`}>
            Register Organization
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;