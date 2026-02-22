import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Briefcase, ArrowLeft, FileUp, CheckCircle, User, Mail, Phone, Link as LinkIcon, Upload, X } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { InputField } from '../../components/ui/InputField';
import { AuthButton } from '../../components/ui/AuthButton';
import { OPEN_POSITIONS } from '../../data/mockData';

const JobApplicationPage = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();

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
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Job not found</h2>
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
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
                <Navbar />
                <main className="flex-grow flex items-center justify-center py-20 px-4">
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="text-green-600" size={32} />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-2">Application Submitted!</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            You will get a response in 24–48 hours.
                        </p>
                        <p className="text-sm text-gray-400">Redirecting to home page...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            <Navbar />

            <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">

                    <button
                        onClick={() => navigate('/careers')}
                        className="flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 mb-8 transition-colors"
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Open Positions
                    </button>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-blue-600 p-8 text-white">
                            <span className="inline-block py-1 px-3 rounded-full bg-blue-500 text-white text-xs font-bold mb-4 tracking-wide uppercase">
                                {isGeneral ? 'General Application' : 'Job Application'}
                            </span>
                            <h1 className="text-3xl font-black mb-2">
                                {isGeneral ? "Let's work together" : `Apply for ${selectedJob?.title}`}
                            </h1>
                            {!isGeneral && selectedJob && (
                                <div className="flex items-center gap-2 text-blue-100 text-sm">
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

                                <div className={`p-5 rounded-xl border border-dashed ${cvError ? 'bg-red-50 border-red-300' : 'bg-gray-50 border-gray-200'}`}>
                                    <h3 className={`text-sm font-bold mb-1 flex items-center gap-2 ${cvError ? 'text-red-900' : 'text-gray-900'}`}>
                                        <FileUp size={16} className={cvError ? 'text-red-500' : 'text-blue-600'} /> Upload CV / Resume
                                    </h3>
                                    <p className={`text-xs mb-3 ${cvError ? 'text-red-700' : 'text-gray-500'}`}>
                                        Please upload your CV in PDF format (Max 5MB).
                                    </p>

                                    {cvFile ? (
                                        <div className="flex items-center gap-3 bg-white border border-blue-200 rounded-lg p-3">
                                            <Upload size={16} className="text-blue-500 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-800 truncate">{cvFile.name}</p>
                                                <p className="text-xs text-gray-500">{(cvFile.size / 1024).toFixed(1)} KB</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={removeCv}
                                                className="p-1 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
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
                                            <div className={`bg-white border rounded-lg p-3 text-center transition-colors group-hover:border-blue-400 ${cvError ? 'border-red-300' : 'border-gray-200'}`}>
                                                <span className="text-sm text-blue-600 font-bold">Choose a file</span>
                                                <span className="text-sm text-gray-500 ml-1">or drag it here</span>
                                            </div>
                                        </div>
                                    )}

                                    {cvError && (
                                        <p className="mt-2 text-xs text-red-500 font-medium">{cvError}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">
                                        Cover Letter (Optional)
                                    </label>
                                    <textarea
                                        name="coverLetter"
                                        rows={5}
                                        placeholder="Tell us why you'd be a great fit for this role..."
                                        value={formData.coverLetter}
                                        onChange={handleChange}
                                        className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-blue-500 transition-all placeholder:text-gray-400 sm:text-sm resize-none"
                                    ></textarea>
                                </div>

                                <div className="pt-4 border-t border-gray-100">
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