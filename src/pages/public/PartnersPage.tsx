import { useNavigate } from 'react-router-dom';
import { Handshake, Building, Users, Store, Globe } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { PARTNERS } from '../../data/mockData';

const categoryStyles: Record<string, string> = {
    'Business Donor': 'bg-emerald-50 text-emerald-700',
    'NGO Partner': 'bg-purple-50 text-purple-700',
    'Logistics Partner': 'bg-amber-50 text-amber-700',
    'Sponsor': 'bg-blue-50 text-blue-700',
};

const PartnersPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            <Navbar />

            <main className="flex-grow">
                {/* Hero */}
                <section className="bg-gradient-to-b from-blue-50 to-white py-20 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6 tracking-wide uppercase">
                            <Handshake size={16} />
                            Better Together
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                            Meet Our <span className="text-blue-600">Network</span>
                        </h1>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            FoodShare wouldn't be possible without the dedication of our business donors, NGO receivers, and amazing sponsors. Together, we are building a zero-waste community.
                        </p>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-12 bg-white border-b border-gray-100">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                                    <Store size={24} />
                                </div>
                                <p className="text-3xl font-black text-gray-900">12+</p>
                                <p className="text-sm text-gray-500 mt-1">Business Donors</p>
                            </div>
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-3">
                                    <Users size={24} />
                                </div>
                                <p className="text-3xl font-black text-gray-900">8+</p>
                                <p className="text-sm text-gray-500 mt-1">NGO Partners</p>
                            </div>
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                                    <Globe size={24} />
                                </div>
                                <p className="text-3xl font-black text-gray-900">3</p>
                                <p className="text-sm text-gray-500 mt-1">Regions Covered</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Partner Grid */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <h2 className="text-3xl font-black text-gray-900 mb-3">Our Partners</h2>
                            <p className="text-gray-500 max-w-xl mx-auto">From local bakeries to international NGOs, each partner plays a vital role in our food-sharing ecosystem.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {PARTNERS.map((partner) => {
                                const badgeStyle = categoryStyles[partner.category] || 'bg-gray-100 text-gray-600';
                                return (
                                    <div
                                        key={partner.id}
                                        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 group flex flex-col"
                                    >
                                        <div className="flex items-center gap-4 mb-5">
                                            <img
                                                src={partner.logo}
                                                alt={partner.name}
                                                className="w-16 h-16 rounded-xl object-cover bg-gray-100 border border-gray-200 group-hover:border-blue-300 transition-colors"
                                            />
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                    {partner.name}
                                                </h3>
                                                <span className={`inline-block mt-1 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeStyle}`}>
                                                    {partner.category}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-gray-500 text-sm leading-relaxed flex-grow">
                                            {partner.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 bg-blue-600 text-white text-center px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-black mb-4">Want to become a partner?</h2>
                        <p className="text-blue-100 mb-10 text-lg leading-relaxed">
                            Whether you have surplus food to donate or you are an NGO looking to feed the vulnerable, our platform is ready for you.
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={() => navigate('/signup')}
                                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold rounded-xl bg-white text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-95 hover:-translate-y-0.5"
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