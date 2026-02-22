import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail, Lock, Building2, MapPin, FileUp,
  User, Store, Heart, CheckCircle, XCircle, Upload, X
} from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { InputField } from '../../components/ui/InputField';
import { AuthButton } from '../../components/ui/AuthButton';

const SignupPage = () => {
  const [role, setRole] = useState<'donor' | 'receiver'>('donor');
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

  return (
    <AuthLayout
      title="Join FoodShare"
      subtitle="Create an account to start helping your community."
    >
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
            I represent a:
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setRole('donor')}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${role === 'donor'
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
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${role === 'receiver'
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
              <div className="mt-2 p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1.5">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                  Password requirements
                </p>
                {Object.entries(passwordCriteria).map(([key, met]) => (
                  <div key={key} className="flex items-center gap-2">
                    {met ? (
                      <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle size={14} className="text-gray-300 flex-shrink-0" />
                    )}
                    <span className={`text-xs ${met ? 'text-green-700 font-medium' : 'text-gray-500'}`}>
                      {passwordCriteriaLabels[key]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={`p-5 rounded-xl border border-dashed ${documentError ? 'bg-red-50 border-red-300' : 'bg-blue-50 border-blue-100'}`}>
          <h3 className={`text-sm font-bold mb-1 flex items-center gap-2 ${documentError ? 'text-red-900' : 'text-blue-900'}`}>
            <FileUp size={16} />
            Verification Documents
          </h3>
          <p className={`text-xs mb-3 leading-relaxed ${documentError ? 'text-red-700' : 'text-blue-700'}`}>
            Upload the <strong>Certificate of Registration</strong> to prove legal existence.
          </p>

          {document ? (
            <div className="flex items-center gap-3 bg-white border border-blue-200 rounded-lg p-3">
              <Upload size={16} className="text-blue-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{document.name}</p>
                <p className="text-xs text-gray-500">{(document.size / 1024).toFixed(1)} KB</p>
              </div>
              <button
                type="button"
                onClick={removeDocument}
                className="p-1 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
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
              <div className={`bg-white border rounded-lg p-3 text-center transition-colors group-hover:border-blue-400 ${documentError ? 'border-red-300' : 'border-blue-200'
                }`}>
                <span className="text-sm text-gray-600 font-medium">Click to upload PDF / JPG / PNG (max 5MB)</span>
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