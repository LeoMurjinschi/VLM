import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, KeyRound, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { InputField } from '../../components/ui/InputField';
import { AuthButton } from '../../components/ui/AuthButton';
import { useTheme } from '../../hooks/useTheme';

const ForgotPasswordPage = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [isLoading, setIsLoading] = useState(false);
    
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [passwordFocused, setPasswordFocused] = useState(false);

    const passwordCriteria = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
    };

    const passwordCriteriaLabels: Record<string, string> = {
        length: 'At least 8 characters',
        uppercase: 'At least one uppercase letter (A-Z)',
        lowercase: 'At least one lowercase letter (a-z)',
        number: 'At least one digit (0-9)',
        special: 'At least one special character (!@#$...)',
    };

    // =============================================
    // STEP 1: Trimite codul de verificare pe email
    // =============================================
    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        
        if (!email) {
            setError('Please enter your email address.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/send-verification-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setStep(2);
                setSuccessMessage(`A verification code has been sent to ${email}. Check your inbox (and spam folder).`);
            } else {
                setError(data.error || 'Failed to send verification code.');
            }
        } catch (err) {
            setError('A network error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // =============================================
    // STEP 2: Verifică codul pe server
    // =============================================
    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!code) {
            setError('Please enter the verification code.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/verify-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code }),
            });

            const data = await response.json();

            if (response.ok) {
                setStep(3);
                setSuccessMessage('Code verified successfully! Now set your new password.');
            } else {
                setError(data.error || 'Invalid verification code.');
            }
        } catch (err) {
            setError('A network error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // =============================================
    // STEP 3: Resetare parolă (existent, neschimbat)
    // =============================================
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const isPasswordValid = Object.values(passwordCriteria).every(Boolean);
        if (!isPasswordValid) {
            setError('Password does not meet all security requirements.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                navigate('/login?reset=success');
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to reset password. Try again.');
                setIsLoading(false);
            }
        } catch (err) {
            setError('A network error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Reset Password"
            subtitle="Follow the instructions to regain access to your account."
        >
            <Link 
                to="/login"
                className={`flex items-center text-sm font-bold mb-6 transition-colors ${
                    theme === 'light' ? 'text-gray-500 hover:text-[#16a34a]' : 'text-gray-400 hover:text-green-400'
                }`}
            >
                <ArrowLeft size={16} className="mr-1" />
                Back to Login
            </Link>

            {error && (
                <div className={`p-4 rounded-xl text-sm font-medium mb-6 ${
                    theme === 'light' ? 'bg-red-50 text-red-600' : 'bg-red-900/20 text-red-400 border border-red-900/50'
                }`}>
                    {error}
                </div>
            )}

            {successMessage && (
                <div className={`p-4 rounded-xl text-sm font-medium mb-6 ${
                    theme === 'light' ? 'bg-green-50 text-green-700' : 'bg-green-900/20 text-green-400 border border-green-900/50'
                }`}>
                    {successMessage}
                </div>
            )}

            {step === 1 && (
                <form onSubmit={handleSendCode} className="space-y-6">
                    <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="contact@company.com"
                        icon={Mail}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <AuthButton type="submit" fullWidth isLoading={isLoading}>
                        Send Verification Code
                    </AuthButton>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleVerifyCode} className="space-y-6">
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        We've sent a 6-symbol code to <strong>{email}</strong>. Enter it below to confirm your identity.
                    </p>
                    
                    <InputField
                        label="Verification Code"
                        name="code"
                        placeholder="e.g. A1B2C3"
                        icon={KeyRound}
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        maxLength={6}
                        required
                    />
                    
                    <AuthButton type="submit" fullWidth isLoading={isLoading}>
                        Verify Code
                    </AuthButton>

                    <button 
                        type="button"
                         onClick={handleSendCode}
                        className={`text-sm font-bold w-full mt-4 transition-colors ${
                            theme === 'light' ? 'text-[#16a34a] hover:text-[#15803d]' : 'text-green-400 hover:text-green-300'
                        }`}
                    >
                        Didn't receive the code? Resend
                    </button>
                </form>
            )}

            {step === 3 && (
                <form onSubmit={handleResetPassword} className="space-y-6">
                    <div>
                        <InputField
                            label="New Password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            icon={Lock}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                            required
                        />

                        {(passwordFocused || password.length > 0) && (
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

                    <InputField
                        label="Confirm New Password"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        icon={Lock}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    
                    <AuthButton type="submit" fullWidth isLoading={isLoading}>
                        Reset Password
                    </AuthButton>
                </form>
            )}

        </AuthLayout>
    );
};

export default ForgotPasswordPage;
