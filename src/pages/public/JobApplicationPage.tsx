import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Briefcase, ArrowLeft, FileUp, CheckCircle, User, Mail, Phone, Link as LinkIcon, Upload, X } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { InputField } from '../../components/ui/InputField';
import { AuthButton } from '../../components/ui/AuthButton';
import { OPEN_POSITIONS } from '../../data/mockData';
import { useTheme } from '../../hooks/useTheme';

const JobApplicationPage = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();

    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        linkedin: '',
        coverLetter: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [cvError, setCvError] = useState('');

    const isGeneral = jobId === 'general';

    const selectedJob = !isGeneral
        ? OPEN_POSITIONS.find(job => job.id === Number(jobId))
        : null;

    useEffect(() => {
        if (isSubmitted) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isSubmitted, navigate]);

    if (!isGeneral && !selectedJob) {
        return (
            <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${theme === 'light' ? 'bg-gray-50' : 'bg-[#121212]'}`}>
                <h2 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Job not found</h2>
                <AuthButton onClick={() => navigate('/careers')}>Back to Careers</AuthButton>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const cleaned = value.replace(/[^\d+\-\s()]/g, '');
            setFormData({ ...formData, [name]: cleaned });
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

        if (file.type !== 'application/pdf') {
            setCvError('Only PDF files are allowed.');
            setCvFile(null);
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setCvError('File size must be under 5MB.');
            setCvFile(null);
            return;
        }

        setCvError('');
        setCvFile(file);
    };

    const removeCv = () => {
        setCvFile(null);
        setCvError('');
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (formData.fullName.trim().length < 2) {
            newErrors.fullName = 'Full name must be at least 2 characters.';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please provide a valid email address.';
        }

        const phoneDigits = formData.phone.replace(/\D/g, '');
        if (phoneDigits.length < 8) {
            newErrors.phone = 'Please provide a valid phone number (at least 8 digits).';
        }

        if (formData.linkedin && !/^https?:\/\/.+/.test(formData.linkedin)) {
            newErrors.linkedin = 'Please provide a valid URL starting with http:// or https://';
        }

        if (!cvFile) {
            setCvError('Please upload your CV in PDF format.');
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0 && !!cvFile;
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
            <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
                theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-[#121212] text-gray-100'
            }`}>
                <Navbar />
                <main className="flex-grow flex items-center justify-center py-20 px-4">
                    <div className={`p-8 rounded-2xl shadow-xl border max-w-md text-center ${
                        theme === 'light' ? 'bg-white border-gray-100' : 'bg-[#1a1a1a] border-[#2e2e2e]'
                    }`}>
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
                            theme === 'light' ? 'bg-[#F0FAF4]' : 'bg-[#16a34a]/10'
                        }`}>
                            <CheckCircle className={theme === 'light' ? 'text-[#16a34a]' : 'text-green-400'} size={32} />
                        </div>
                        <h2 className={`text-2xl font-black mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Application Submitted!</h2>
                        <p className={`mb-6 leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                            You will get a response in 24–48 hours.
                        </p>
                        <p className={`text-sm ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>Redirecting to home page...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
            theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-[#121212] text-gray-100'
        }`}>
            <Navbar />

            <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">

                    <button
                        onClick={() => navigate('/careers')}
                        className={`flex items-center text-sm font-bold mb-8 transition-colors ${
                            theme === 'light' ? 'text-[#16a34a] hover:text-[#15803d]' : 'text-green-400 hover:text-green-300'
                        }`}
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Open Positions
                    </button>

                    <div className={`rounded-2xl shadow-sm border overflow-hidden ${
                        theme === 'light' ? 'bg-white border-gray-100' : 'bg-[#1a1a1a] border-[#2e2e2e]'
                    }`}>
                        <div className={`p-8 text-white ${theme === 'light' ? 'bg-[#16a34a]' : 'bg-[#15803d]'}`}>
                            <span className="inline-block py-1 px-3 rounded-full bg-black/20 text-white text-xs font-bold mb-4 tracking-wide uppercase">
                                {isGeneral ? 'General Application' : 'Job Application'}
                            </span>
                            <h1 className="text-3xl font-black mb-2">
                                {isGeneral ? "Let's work together" : `Apply for ${selectedJob?.title}`}
                            </h1>
                            {!isGeneral && selectedJob && (
                                <div className="flex items-center gap-2 text-green-50 text-sm">
                                    <Briefcase size={16} />
                                    <span>{selectedJob.department}</span>
                                    <span className="mx-2">•</span>
                                    <span>{selectedJob.location}</span>
                                </div>
                            )}
                        </div>

                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6" noValidate>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField
                                        label="Full Name"
                                        name="fullName"
                                        placeholder="John Doe"
                                        icon={User}
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        error={errors.fullName}
                                        required
                                    />
                                    <InputField
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        icon={Mail}
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField
                                        label="Phone Number"
                                        name="phone"
                                        type="tel"
                                        placeholder="+373 69 000 000"
                                        icon={Phone}
                                        value={formData.phone}
                                        onChange={handleChange}
                                        error={errors.phone}
                                        required
                                    />
                                    <InputField
                                        label="LinkedIn Profile (Optional)"
                                        name="linkedin"
                                        type="url"
                                        placeholder="https://linkedin.com/in/..."
                                        icon={LinkIcon}
                                        value={formData.linkedin}
                                        onChange={handleChange}
                                        error={errors.linkedin}
                                    />
                                </div>

                                <div className={`p-5 rounded-xl border border-dashed ${
                                    cvError 
                                    ? (theme === 'light' ? 'bg-red-50 border-red-300' : 'bg-red-900/10 border-red-900/30') 
                                    : (theme === 'light' ? 'bg-[#F0FAF4] border-green-200' : 'bg-[#16a34a]/5 border-green-900/30')
                                }`}>
                                    <h3 className={`text-sm font-bold mb-1 flex items-center gap-2 ${
                                        cvError 
                                        ? (theme === 'light' ? 'text-red-900' : 'text-red-400') 
                                        : (theme === 'light' ? 'text-green-900' : 'text-green-400')
                                    }`}>
                                        <FileUp size={16} className={cvError ? 'text-red-500' : (theme === 'light' ? 'text-[#16a34a]' : 'text-green-400')} /> Upload CV / Resume
                                    </h3>
                                    <p className={`text-xs mb-3 ${
                                        cvError 
                                        ? (theme === 'light' ? 'text-red-700' : 'text-red-300') 
                                        : (theme === 'light' ? 'text-green-700' : 'text-green-300')
                                    }`}>
                                        Please upload your CV in PDF format (Max 5MB).
                                    </p>

                                    {cvFile ? (
                                        <div className={`flex items-center gap-3 border rounded-lg p-3 ${
                                            theme === 'light' ? 'bg-white border-green-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
                                        }`}>
                                            <Upload size={16} className={theme === 'light' ? 'text-[#16a34a] flex-shrink-0' : 'text-green-400 flex-shrink-0'} />
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-medium truncate ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>{cvFile.name}</p>
                                                <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{(cvFile.size / 1024).toFixed(1)} KB</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={removeCv}
                                                className={`p-1 rounded-full text-gray-400 transition-colors ${
                                                    theme === 'light' ? 'hover:bg-red-50 hover:text-red-500' : 'hover:bg-red-900/20 hover:text-red-400'
                                                }`}
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="relative group cursor-pointer">
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={handleFileChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div className={`border rounded-lg p-3 text-center transition-colors ${
                                                cvError 
                                                ? (theme === 'light' ? 'bg-white border-red-300' : 'bg-[#1a1a1a] border-red-900/30') 
                                                : (theme === 'light' ? 'bg-white border-green-200 group-hover:border-[#16a34a]' : 'bg-[#1a1a1a] border-[#2e2e2e] group-hover:border-green-500')
                                            }`}>
                                                <span className={`text-sm font-bold ${
                                                    cvError ? 'text-red-500' : (theme === 'light' ? 'text-[#16a34a]' : 'text-green-400')
                                                }`}>Choose a file</span>
                                                <span className={`text-sm ml-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>or drag it here</span>
                                            </div>
                                        </div>
                                    )}

                                    {cvError && (
                                        <p className="mt-2 text-xs text-red-500 font-medium">{cvError}</p>
                                    )}
                                </div>

                                <div>
                                    <label className={`block text-xs font-bold mb-1 uppercase tracking-wide ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                                        Cover Letter (Optional)
                                    </label>
                                    <textarea
                                        name="coverLetter"
                                        rows={5}
                                        placeholder="Tell us why you'd be a great fit for this role..."
                                        value={formData.coverLetter}
                                        onChange={handleChange}
                                        className={`block w-full rounded-xl p-3 transition-all focus:border-[#16a34a] focus:ring-[#16a34a] sm:text-sm resize-none ${
                                            theme === 'light' ? 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white placeholder:text-gray-400' : 'bg-[#222222] border-[#2e2e2e] text-white focus:bg-[#1a1a1a] placeholder:text-gray-500'
                                        }`}
                                    ></textarea>
                                </div>

                                <div className={`pt-4 border-t ${theme === 'light' ? 'border-gray-100' : 'border-[#2e2e2e]'}`}>
                                    <AuthButton type="submit" fullWidth isLoading={isLoading}>
                                        Submit Application
                                    </AuthButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default JobApplicationPage;