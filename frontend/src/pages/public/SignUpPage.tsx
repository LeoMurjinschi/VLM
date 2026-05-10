import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Mail, Lock, Building2, MapPin, FileUp,
  User, Store, Heart, CheckCircle, XCircle, Upload, X
} from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { InputField } from '../../components/ui/InputField';
import { AuthButton } from '../../components/ui/AuthButton';
import { useTheme } from '../../hooks/useTheme';

const SignupPage = () => {
  const [searchParams] = useSearchParams();
  const { theme } = useTheme();
  const initialRole = searchParams.get('role') === 'receiver' ? 'receiver' : 'donor';
  const [role, setRole] = useState<'donor' | 'receiver'>(initialRole);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    orgName: '',
    fiscalCode: '',
    address: '',
    repName: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [document, setDocument] = useState<File | null>(null);
  const [documentError, setDocumentError] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);

  const passwordCriteria = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[^A-Za-z0-9]/.test(formData.password),
  };

  const passwordCriteriaLabels: Record<string, string> = {
    length: 'At least 8 characters',
    uppercase: 'At least one uppercase letter (A-Z)',
    lowercase: 'At least one lowercase letter (a-z)',
    number: 'At least one digit (0-9)',
    special: 'At least one special character (!@#$...)',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'fiscalCode') {
      const onlyNumbers = value.replace(/\D/g, '');
      if (onlyNumbers.length <= 13) {
        setFormData({ ...formData, [name]: onlyNumbers });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    const maxSizeMB = 5;

    if (!allowedTypes.includes(file.type)) {
      setDocumentError('Only PDF, JPG, and PNG files are allowed.');
      setDocument(null);
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setDocumentError(`File size must be under ${maxSizeMB}MB.`);
      setDocument(null);
      return;
    }

    setDocumentError('');
    setDocument(file);
  };

  const removeDocument = () => {
    setDocument(null);
    setDocumentError('');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.orgName.trim().length < 2) {
      newErrors.orgName = 'Organization name must be at least 2 characters.';
    }

    if (formData.fiscalCode.length !== 13) {
      newErrors.fiscalCode = 'IDNO must be exactly 13 digits.';
    }

    if (formData.address.trim().length < 5) {
      newErrors.address = 'Please provide a valid address.';
    }

    if (formData.repName.trim().length < 2) {
      newErrors.repName = 'Representative name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    const isPasswordValid = Object.values(passwordCriteria).every(Boolean);
    if (!isPasswordValid) {
      newErrors.password = 'Password does not meet all security requirements.';
    }

    if (!document) {
      setDocumentError('Please upload a verification document.');
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0 && !!document;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${theme === 'light' ? 'bg-gray-50' : 'bg-[#121212]'}`}>
        <div className={`p-8 rounded-2xl shadow-xl max-w-md text-center border ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-[#1a1a1a] border-[#2e2e2e]'}`}>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${theme === 'light' ? 'bg-[#F0FAF4]' : 'bg-[#16a34a]/10'}`}>
            <CheckCircle className={theme === 'light' ? 'text-[#16a34a]' : 'text-green-400'} size={32} />
          </div>
          <h2 className={`text-2xl font-black mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Application Received!</h2>
          <p className={`mb-6 leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            Thank you for registering <strong>{formData.orgName}</strong>.
            Your documents have been sent to our administration team for verification.
          </p>
          <div className={`p-4 rounded-xl text-sm mb-8 text-left border ${theme === 'light' ? 'bg-[#F0FAF4] text-green-800 border-green-100' : 'bg-[#16a34a]/10 text-green-300 border-green-900/30'}`}>
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

  return (
    <AuthLayout
      title="Join FoodShare"
      subtitle="Create an account to start helping your community."
    >
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>

        <div>
           <label className={`block text-xs font-bold mb-2 uppercase tracking-wide ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            I represent a:
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setRole('donor')}
               className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                role === 'donor'
                ? (theme === 'light' ? 'border-[#16a34a] bg-[#F0FAF4] text-[#16a34a] shadow-sm' : 'border-green-500 bg-[#16a34a]/10 text-green-400 shadow-sm')
                : (theme === 'light' ? 'border-gray-200 hover:border-green-300 text-gray-500 hover:bg-gray-50' : 'border-[#2e2e2e] hover:border-green-800 text-gray-400 hover:bg-[#222]')
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
                ? (theme === 'light' ? 'border-[#16a34a] bg-[#F0FAF4] text-[#16a34a] shadow-sm' : 'border-green-500 bg-[#16a34a]/10 text-green-400 shadow-sm')
                : (theme === 'light' ? 'border-gray-200 hover:border-green-300 text-gray-500 hover:bg-gray-50' : 'border-[#2e2e2e] hover:border-green-800 text-gray-400 hover:bg-[#222]')
                }`}
            >
              <Heart className="mb-2" size={24} />
              <span className="font-bold text-sm">NGO / Charity</span>
            </button>
          </div>
        </div>

        <div className={`border-t my-4 ${theme === 'light' ? 'border-gray-100' : 'border-[#2e2e2e]'}`}></div>

        <div className="space-y-4">
          <h3 className={`text-sm font-black uppercase tracking-wide ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Organization Details
          </h3>

          <InputField
            label="Organization Name"
            name="orgName"
            placeholder={role === 'donor' ? "e.g. Fresh Market SRL" : "e.g. Save Children NGO"}
            icon={Building2}
            value={formData.orgName}
            onChange={handleChange}
            error={errors.orgName}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Fiscal Code (IDNO)"
              name="fiscalCode"
              placeholder="10046000..."
              value={formData.fiscalCode}
              onChange={handleChange}
              error={errors.fiscalCode}
              maxLength={13}
              required
            />
            <InputField
              label="Address"
              name="address"
              placeholder="City, Street"
              icon={MapPin}
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className={`text-sm font-black uppercase tracking-wide mt-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Login Credentials
          </h3>

          <InputField
            label="Representative Name"
            name="repName"
            placeholder="John Doe"
            icon={User}
            value={formData.repName}
            onChange={handleChange}
            error={errors.repName}
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
            error={errors.email}
            required
          />

          <div>
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              error={errors.password}
              required
            />

            {(passwordFocused || formData.password.length > 0) && (
              <div className={`mt-2 p-3 rounded-xl border space-y-1.5 ${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-[#222] border-[#2e2e2e]'}`}>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                  Password requirements
                </p>
                {Object.entries(passwordCriteria).map(([key, met]) => (
                  <div key={key} className="flex items-center gap-2">
                    {met ? (
                      <CheckCircle size={14} className="text-[#16a34a] flex-shrink-0" />
                    ) : (
                      <XCircle size={14} className="text-gray-400 flex-shrink-0" />
                    )}
                    <span className={`text-xs ${met ? (theme === 'light' ? 'text-green-700 font-medium' : 'text-green-400 font-medium') : 'text-gray-500'}`}>
                      {passwordCriteriaLabels[key]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={`p-5 rounded-xl border border-dashed ${
          documentError 
            ? (theme === 'light' ? 'bg-red-50 border-red-300' : 'bg-red-900/20 border-red-900/50') 
            : (theme === 'light' ? 'bg-[#F0FAF4] border-green-200' : 'bg-[#16a34a]/5 border-green-900/30')
        }`}>
          <h3 className={`text-sm font-bold mb-1 flex items-center gap-2 ${
            documentError 
              ? (theme === 'light' ? 'text-red-900' : 'text-red-400') 
              : (theme === 'light' ? 'text-green-900' : 'text-green-400')
          }`}>
            <FileUp size={16} />
            Verification Documents
          </h3>
          <p className={`text-xs mb-3 leading-relaxed ${
            documentError 
              ? (theme === 'light' ? 'text-red-700' : 'text-red-300') 
              : (theme === 'light' ? 'text-green-700' : 'text-green-300')
          }`}>
            Upload the <strong>Certificate of Registration</strong> to prove legal existence.
          </p>

          {document ? (
             <div className={`flex items-center gap-3 border rounded-lg p-3 ${
              theme === 'light' ? 'bg-white border-green-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
            }`}>
              <Upload size={16} className={`flex-shrink-0 ${theme === 'light' ? 'text-[#16a34a]' : 'text-green-400'}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>{document.name}</p>
                <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{(document.size / 1024).toFixed(1)} KB</p>
              </div>
              <button
                type="button"
                onClick={removeDocument}
                className={`p-1 rounded-full transition-colors ${
                  theme === 'light' ? 'hover:bg-red-50 text-gray-400 hover:text-red-500' : 'hover:bg-red-900/30 text-gray-500 hover:text-red-400'
                }`}
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="relative group cursor-pointer">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className={`border rounded-lg p-3 text-center transition-colors ${
                documentError 
                  ? (theme === 'light' ? 'border-red-300 bg-white' : 'border-red-900/50 bg-[#1a1a1a]') 
                  : (theme === 'light' ? 'border-green-200 bg-white group-hover:border-[#16a34a]' : 'border-[#2e2e2e] bg-[#1a1a1a] group-hover:border-green-500')
                }`}>
                <span className={`text-sm font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Click to upload PDF / JPG / PNG (max 5MB)</span>
              </div>
            </div>
          )}

          {documentError && (
            <p className="mt-2 text-xs text-red-500 font-medium">{documentError}</p>
          )}
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
        <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
          Already verified?{' '}
          <Link to="/login" className={`font-bold transition-colors ${
            theme === 'light' ? 'text-[#16a34a] hover:text-[#15803d]' : 'text-green-400 hover:text-green-300'
          }`}>
            Log In here
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;