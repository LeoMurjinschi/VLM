import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { InputField } from '../../components/ui/InputField';
import { AuthButton } from '../../components/ui/AuthButton';

const LoginPage = () => {
  const navigate = useNavigate();
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

    if (formData.email === 'admin@test.com') {
      navigate('/admin/dashboard');
    } else if (formData.email === 'donor@test.com') {
      navigate('/donor/dashboard');
    } else if (formData.email === 'receiver@test.com') {
      navigate('/receiver/dashboard');
    } else {
      setError('Invalid credentials (Try admin@test.com, donor@test.com)');
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
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 font-medium">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 block text-gray-700 cursor-pointer">
              Remember me
            </label>
          </div>
          <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
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
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
            Register Organization
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;