import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Lock, Building2, MapPin, FileUp, 
  User, Store, Heart, CheckCircle 
} from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { InputField } from '../../components/ui/InputField';
import { AuthButton } from '../../components/ui/AuthButton';

const SignupPage = () => {
  // State for Role Selection: 'donor' (Business) or 'receiver' (NGO)
  const [role, setRole] = useState<'donor' | 'receiver'>('donor');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    orgName: '',
    fiscalCode: '',
    address: '',
    repName: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API Call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  // SUCCESS STATE (After submission)
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center border border-gray-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
             <CheckCircle className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Application Received!</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Thank you for registering <strong>{formData.orgName}</strong>. 
            Your documents have been sent to our administration team for verification.
          </p>
          <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-800 mb-8 text-left border border-blue-100">
            <strong className="block mb-1">What happens next?</strong>
            Verification usually takes 24-48 hours. You will receive an email confirmation once your account is active.
          </div>
          <Link to="/">
            <AuthButton fullWidth>Back to Home</AuthButton>
          </Link>
        </div>
      </div>
    );
  }

  // REGISTRATION FORM
  return (
    <AuthLayout 
      title="Join FoodShare" 
      subtitle="Create an account to start helping your community."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* 1. ROLE SELECTION TOGGLE */}
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
            I represent a:
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setRole('donor')}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                role === 'donor' 
                  ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' 
                  : 'border-gray-200 hover:border-blue-300 text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Store className="mb-2" size={24} />
              <span className="font-bold text-sm">Business / Donor</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('receiver')}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                role === 'receiver' 
                  ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' 
                  : 'border-gray-200 hover:border-blue-300 text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Heart className="mb-2" size={24} />
              <span className="font-bold text-sm">NGO / Charity</span>
            </button>
          </div>
        </div>

        <div className="border-t border-gray-100 my-4"></div>

        {/* 2. ORGANIZATION DETAILS */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide">
            Organization Details
          </h3>
          
          <InputField
            label="Organization Name"
            name="orgName"
            placeholder={role === 'donor' ? "e.g. Fresh Market SRL" : "e.g. Save Children NGO"}
            icon={Building2}
            value={formData.orgName}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Fiscal Code (IDNO)"
              name="fiscalCode"
              placeholder="10046000..."
              value={formData.fiscalCode}
              onChange={handleChange}
              required
            />
            <InputField
              label="Address"
              name="address"
              placeholder="City, Street"
              icon={MapPin}
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* 3. REPRESENTATIVE DETAILS */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide mt-2">
            Login Credentials
          </h3>
          
          <InputField
            label="Representative Name"
            name="repName"
            placeholder="John Doe"
            icon={User}
            value={formData.repName}
            onChange={handleChange}
            required
          />

          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="contact@company.com"
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
        </div>

        {/* 4. VERIFICATION UPLOAD AREA */}
        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 border-dashed">
          <h3 className="text-sm font-bold text-blue-900 mb-1 flex items-center gap-2">
              <FileUp size={16} />
              Verification Documents
          </h3>
          <p className="text-xs text-blue-700 mb-3 leading-relaxed">
              Upload the <strong>Certificate of Registration</strong> to prove legal existence.
          </p>
          
          <div className="relative group cursor-pointer">
            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            <div className="bg-white border border-blue-200 rounded-lg p-3 text-center transition-colors group-hover:border-blue-400">
                <span className="text-sm text-gray-600 font-medium">Click to upload PDF/JPG</span>
            </div>
          </div>
        </div>

        <AuthButton 
          type="submit" 
          fullWidth 
          isLoading={isLoading}
          className="mt-2"
        >
          Submit Application
        </AuthButton>

      </form>

      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          Already verified?{' '}
          <Link to="/login" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
            Log In here
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;