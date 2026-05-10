import { Briefcase, MapPin, Clock, ArrowRight, Heart, Zap, Globe } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { AuthButton } from '../../components/ui/AuthButton';
import { OPEN_POSITIONS } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

const CareersPage = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    return (
        <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
            theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-[#121212] text-gray-100'
        }`}>
            <Navbar />

            <main className="flex-grow">
                <section className={`py-20 border-b transition-colors duration-300 ${
                    theme === 'light' ? 'bg-white border-gray-100' : 'bg-[#1a1a1a] border-[#2e2e2e]'
                }`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className={`inline-block py-1 px-3 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase ${
                            theme === 'light' ? 'bg-[#F0FAF4] text-[#16a34a]' : 'bg-[#16a34a]/10 text-green-400'
                        }`}>
                            Join the team
                        </span>
                        <h1 className={`text-4xl md:text-5xl font-black mb-6 tracking-tight ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                            Work with purpose. <br />
                            <span className={theme === 'light' ? 'text-[#16a34a]' : 'text-green-400'}>Build the future.</span>
                        </h1>
                        <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                            We are looking for passionate people to help us eliminate food waste and support communities in need. Bring your skills and make a real impact.
                        </p>
                    </div>
                </section>

                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className={`text-3xl font-black ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Why work with us?</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className={`p-8 rounded-2xl shadow-sm border text-center transition-colors ${
                                theme === 'light' ? 'bg-white border-gray-100' : 'bg-[#1a1a1a] border-[#2e2e2e]'
                            }`}>
                                <div className="w-14 h-14 bg-red-50/10 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Heart size={28} />
                                </div>
                                <h3 className={`text-xl font-bold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Meaningful Impact</h3>
                                <p className={`leading-relaxed ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                                    Your code, strategies, and efforts directly contribute to feeding vulnerable people and saving the planet.
                                </p>
                            </div>

                            <div className={`p-8 rounded-2xl shadow-sm border text-center transition-colors ${
                                theme === 'light' ? 'bg-white border-gray-100' : 'bg-[#1a1a1a] border-[#2e2e2e]'
                            }`}>
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                                    theme === 'light' ? 'bg-[#F0FAF4] text-[#16a34a]' : 'bg-[#16a34a]/10 text-green-400'
                                }`}>
                                    <Globe size={28} />
                                </div>
                                <h3 className={`text-xl font-bold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Work from Anywhere</h3>
                                <p className={`leading-relaxed ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                                    We believe in flexibility. Work from our hub or from the comfort of your home.
                                </p>
                            </div>

                            <div className={`p-8 rounded-2xl shadow-sm border text-center transition-colors ${
                                theme === 'light' ? 'bg-white border-gray-100' : 'bg-[#1a1a1a] border-[#2e2e2e]'
                            }`}>
                                <div className="w-14 h-14 bg-yellow-50/10 text-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Zap size={28} />
                                </div>
                                <h3 className={`text-xl font-bold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Fast Growth</h3>
                                <p className={`leading-relaxed ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                                    Join an early-stage project where your ideas matter and your career can accelerate rapidly.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={`py-20 border-t transition-colors duration-300 ${
                    theme === 'light' ? 'bg-white border-gray-100' : 'bg-[#151515] border-[#2e2e2e]'
                }`}>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-12">
                            <h2 className={`text-3xl font-black mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Open Positions</h2>
                            <p className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'}>Find the perfect role for you below.</p>
                        </div>

                        <div className="space-y-4">
                            {OPEN_POSITIONS.map((job) => (
                                <div
                                    key={job.id}
                                    className={`group flex flex-col md:flex-row md:items-center justify-between p-6 border rounded-2xl transition-all cursor-pointer ${
                                        theme === 'light' ? 'bg-white border-gray-200 hover:border-[#16a34a] hover:shadow-md' : 'bg-[#1a1a1a] border-[#2e2e2e] hover:border-green-500 hover:shadow-green-900/10'
                                    }`}
                                    onClick={() => navigate(`/careers/apply/${job.id}`)}
                                >
                                    <div className="mb-4 md:mb-0">
                                        <h3 className={`text-xl font-bold transition-colors mb-2 ${
                                            theme === 'light' ? 'text-gray-900 group-hover:text-[#16a34a]' : 'text-white group-hover:text-green-400'
                                        }`}>
                                            {job.title}
                                        </h3>
                                        <div className={`flex flex-wrap items-center gap-4 text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                                            <span className={`flex items-center gap-1 px-3 py-1 rounded-full font-medium ${
                                                theme === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-[#222222] text-gray-300'
                                            }`}>
                                                <Briefcase size={14} />
                                                {job.department}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin size={16} />
                                                {job.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={16} />
                                                {job.type}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <AuthButton onClick={(e) => { e.stopPropagation(); navigate(`/careers/apply/${job.id}`); }} variant="outline" className={`w-full md:w-auto transition-colors ${
                                            theme === 'light' ? 'group-hover:bg-[#16a34a] group-hover:text-white group-hover:border-[#16a34a]' : 'group-hover:bg-[#15803d] group-hover:text-white group-hover:border-[#15803d]'
                                        }`}>
                                            <span className="flex items-center">
                                                Apply Now <ArrowRight size={16} className="ml-2" />
                                            </span>
                                        </AuthButton>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={`mt-12 p-8 rounded-2xl border text-center transition-colors ${
                            theme === 'light' ? 'bg-[#F0FAF4] border-green-100' : 'bg-[#16a34a]/5 border-green-900/30'
                        }`}>
                            <h3 className={`text-lg font-bold mb-2 ${theme === 'light' ? 'text-green-900' : 'text-green-400'}`}>Don't see a fit?</h3>
                            <p className={`mb-6 ${theme === 'light' ? 'text-green-700' : 'text-green-300'}`}>
                                We're always looking for talented people. Send your resume and let's talk!
                            </p>
                            <AuthButton variant="primary" onClick={() => navigate('/careers/apply/general')}>Submit General Application</AuthButton>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default CareersPage;