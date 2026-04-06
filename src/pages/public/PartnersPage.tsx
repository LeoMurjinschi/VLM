import { useNavigate } from 'react-router-dom';
import { Handshake, Building, Users, Store, Globe } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { PARTNERS } from '../../data/mockData';
import { useTheme } from '../../hooks/useTheme';

const categoryStylesLight: Record<string, string> = {
    'Business Donor': 'bg-[#F0FAF4] text-[#16a34a]',
    'NGO Partner': 'bg-purple-50 text-purple-700',
    'Logistics Partner': 'bg-amber-50 text-amber-700',
    'Sponsor': 'bg-blue-50 text-blue-700',
};

const categoryStylesDark: Record<string, string> = {
    'Business Donor': 'bg-[#16a34a]/20 text-green-400',
    'NGO Partner': 'bg-purple-900/30 text-purple-400',
    'Logistics Partner': 'bg-amber-900/30 text-amber-400',
    'Sponsor': 'bg-blue-900/30 text-blue-400',
};

const PartnersPage = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
            theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-[#121212] text-gray-100'
        }`}>
            <Navbar />

            <main className="flex-grow">
                {/* Hero */}
                <section className={`py-20 border-b transition-colors duration-300 ${
                    theme === 'light' ? 'bg-gradient-to-b from-[#F0FAF4] to-white border-gray-100' : 'bg-gradient-to-b from-[#16a34a]/10 to-[#121212] border-[#2e2e2e]'
                }`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className={`inline-flex items-center gap-2 py-1 px-3 rounded-full text-sm font-semibold mb-6 tracking-wide uppercase ${
                            theme === 'light' ? 'bg-green-50 text-[#16a34a]' : 'bg-[#16a34a]/20 text-green-400'
                        }`}>
                            <Handshake size={16} />
                            Better Together
                        </span>
                        <h1 className={`text-4xl md:text-5xl font-black mb-6 tracking-tight ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                            Meet Our <span className={theme === 'light' ? 'text-[#16a34a]' : 'text-green-400'}>Network</span>
                        </h1>
                        <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                            FoodShare wouldn't be possible without the dedication of our business donors, NGO receivers, and amazing sponsors. Together, we are building a zero-waste community.
                        </p>
                    </div>
                </section>

                {/* Stats */}
                <section className={`py-12 border-b transition-colors duration-300 ${
                    theme === 'light' ? 'bg-white border-gray-100' : 'bg-[#1a1a1a] border-[#2e2e2e]'
                }`}>
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                            <div>
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 ${
                                    theme === 'light' ? 'bg-[#F0FAF4] text-[#16a34a]' : 'bg-[#16a34a]/20 text-green-400'
                                }`}>
                                    <Store size={24} />
                                </div>
                                <p className={`text-3xl font-black ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>12+</p>
                                <p className={`text-sm mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Business Donors</p>
                            </div>
                            <div>
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 ${
                                    theme === 'light' ? 'bg-[#F0FAF4] text-[#16a34a]' : 'bg-[#16a34a]/20 text-green-400'
                                }`}>
                                    <Users size={24} />
                                </div>
                                <p className={`text-3xl font-black ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>8+</p>
                                <p className={`text-sm mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>NGO Partners</p>
                            </div>
                            <div>
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 ${
                                    theme === 'light' ? 'bg-[#F0FAF4] text-[#16a34a]' : 'bg-[#16a34a]/20 text-green-400'
                                }`}>
                                    <Globe size={24} />
                                </div>
                                <p className={`text-3xl font-black ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>3</p>
                                <p className={`text-sm mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Regions Covered</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Partner Grid */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <h2 className={`text-3xl font-black mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Our Partners</h2>
                            <p className={`max-w-xl mx-auto ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>From local bakeries to international NGOs, each partner plays a vital role in our food-sharing ecosystem.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {PARTNERS.map((partner) => {
                                const badgeStyleLight = categoryStylesLight[partner.category] || 'bg-gray-100 text-gray-600';
                                const badgeStyleDark = categoryStylesDark[partner.category] || 'bg-gray-800 text-gray-400';
                                return (
                                    <div
                                        key={partner.id}
                                        className={`rounded-2xl p-6 border shadow-sm transition-all duration-300 group flex flex-col ${
                                            theme === 'light' ? 'bg-white border-gray-100 hover:shadow-xl hover:border-[#16a34a]' : 'bg-[#1a1a1a] border-[#2e2e2e] hover:shadow-green-900/20 hover:border-[#16a34a]'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4 mb-5">
                                            <img
                                                src={partner.logo}
                                                alt={partner.name}
                                                className={`w-16 h-16 rounded-xl object-cover border transition-colors ${
                                                    theme === 'light' ? 'bg-gray-100 border-gray-200 group-hover:border-[#16a34a]' : 'bg-gray-800 border-gray-700 group-hover:border-green-500'
                                                }`}
                                            />
                                            <div>
                                                <h3 className={`text-lg font-bold transition-colors ${
                                                    theme === 'light' ? 'text-gray-900 group-hover:text-[#16a34a]' : 'text-white group-hover:text-green-400'
                                                }`}>
                                                    {partner.name}
                                                </h3>
                                                <span className={`inline-block mt-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                                                    theme === 'light' ? badgeStyleLight : badgeStyleDark
                                                }`}>
                                                    {partner.category}
                                                </span>
                                            </div>
                                        </div>
                                        <p className={`text-sm leading-relaxed flex-grow ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                                            {partner.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className={`py-24 text-center px-4 transition-colors duration-300 ${
                    theme === 'light' ? 'bg-[#16a34a] text-white' : 'bg-[#15803d] text-gray-100'
                }`}>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-black mb-4">Want to become a partner?</h2>
                        <p className={`mb-10 text-lg leading-relaxed ${theme === 'light' ? 'text-green-100' : 'text-green-50'}`}>
                            Whether you have surplus food to donate or you are an NGO looking to feed the vulnerable, our platform is ready for you.
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={() => navigate('/signup')}
                                className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-95 hover:-translate-y-0.5 ${
                                    theme === 'light' ? 'bg-white text-[#16a34a] hover:bg-green-50' : 'bg-gray-900 text-white hover:bg-gray-800 shadow-xl'
                                }`}
                            >
                                <Building size={18} />
                                Register Organization
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default PartnersPage;