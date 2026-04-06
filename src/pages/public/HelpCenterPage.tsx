import React, { useState } from 'react';
import { Mail, MessageCircle, Phone, MapPin, ChevronDown, ChevronUp, LifeBuoy } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { AuthButton } from '../../components/ui/AuthButton';
import { InputField } from '../../components/ui/InputField';
import { FAQS } from '../../data/mockData';
import { useTheme } from '../../hooks/useTheme';

const HelpCenterPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const { theme } = useTheme();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const categories = ['All', ...Array.from(new Set(FAQS.map(faq => faq.category)))];

  const filteredFaqs = activeCategory === 'All' 
    ? FAQS 
    : FAQS.filter(faq => faq.category === activeCategory);

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSent(true);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-[#121212] text-gray-100'
    }`}>
      <Navbar />

      <main className="flex-grow">
        <section className={`py-20 text-white ${theme === 'light' ? 'bg-[#16a34a]' : 'bg-[#15803d]'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <LifeBuoy size={32} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              How can we help you?
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Search our FAQs or get in touch with our support team.
            </p>
          </div>
        </section>

        <section className={`py-20 border-b transition-colors duration-300 ${
            theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
        }`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-black mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Frequently Asked Questions</h2>
              
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                      activeCategory === category 
                        ? (theme === 'light' ? 'bg-[#16a34a] text-white shadow-md' : 'bg-[#16a34a] text-white shadow-md') 
                        : (theme === 'light' ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-[#222222] text-gray-400 hover:bg-[#2e2e2e]')
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div 
                  key={faq.id} 
                  className={`border rounded-2xl overflow-hidden transition-colors ${
                      theme === 'light' ? 'bg-white border-gray-200 hover:border-[#16a34a]' : 'bg-[#1a1a1a] border-[#2e2e2e] hover:border-green-500'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                  >
                    <span className={`font-bold pr-8 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{faq.question}</span>
                    {openFaqId === faq.id ? (
                      <ChevronUp size={20} className={theme === 'light' ? 'text-[#16a34a] flex-shrink-0' : 'text-green-400 flex-shrink-0'} />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  
                  {openFaqId === faq.id && (
                    <div className={`px-6 pb-6 leading-relaxed border-t pt-4 ${
                        theme === 'light' ? 'text-gray-600 border-gray-50' : 'text-gray-400 border-[#222222]'
                    }`}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`py-20 ${theme === 'light' ? 'bg-gray-50' : 'bg-[#121212]'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className={`text-3xl font-black ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Still need help?</h2>
              <p className={`mt-2 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Send us a message and our team will get back to you shortly.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              
              <div className="lg:col-span-1 space-y-6">
                <div className={`p-6 rounded-2xl border flex items-start gap-4 ${
                    theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
                }`}>
                  <div className={`p-3 rounded-xl ${theme === 'light' ? 'bg-[#F0FAF4] text-[#16a34a]' : 'bg-[#16a34a]/10 text-green-400'}`}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className={`font-bold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Email Us</h3>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>support@foodshare.md</p>
                  </div>
                </div>

                <div className={`p-6 rounded-2xl border flex items-start gap-4 ${
                    theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
                }`}>
                  <div className={`p-3 rounded-xl ${theme === 'light' ? 'bg-[#F0FAF4] text-[#16a34a]' : 'bg-[#16a34a]/10 text-green-400'}`}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className={`font-bold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Call Us</h3>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>+373 22 123 456<br/>Mon-Fri, 9am - 5pm</p>
                  </div>
                </div>

                <div className={`p-6 rounded-2xl border flex items-start gap-4 ${
                    theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
                }`}>
                  <div className={`p-3 rounded-xl ${theme === 'light' ? 'bg-[#F0FAF4] text-[#16a34a]' : 'bg-[#16a34a]/10 text-green-400'}`}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className={`font-bold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Visit Us</h3>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Strada Ștefan cel Mare 128,<br/>Chișinău, Moldova</p>
                  </div>
                </div>
              </div>

              <div className={`lg:col-span-2 rounded-3xl p-8 md:p-12 border shadow-sm ${
                  theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
              }`}>
                {isSent ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
                        theme === 'light' ? 'bg-[#F0FAF4]' : 'bg-[#16a34a]/10'
                    }`}>
                      <MessageCircle size={40} className={theme === 'light' ? 'text-[#16a34a]' : 'text-green-400'} />
                    </div>
                    <h3 className={`text-2xl font-black mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Message Sent!</h3>
                    <p className={`mb-8 max-w-md ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Thank you for reaching out. A member of our support team will reply to your email within 24 hours.
                    </p>
                    <AuthButton onClick={() => setIsSent(false)} variant="outline">
                      Send another message
                    </AuthButton>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="Your Name" required placeholder="John Doe" />
                      <InputField label="Email Address" type="email" required placeholder="john@example.com" />
                    </div>
                    
                    <InputField label="Subject" required placeholder="How can we help?" />
                    
                    <div>
                      <label className={`block text-xs font-bold mb-1 uppercase tracking-wide ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                        Message
                      </label>
                      <textarea
                        required
                        rows={6}
                        placeholder="Describe your issue in detail..."
                        className={`block w-full rounded-xl p-3 transition-all focus:border-[#16a34a] focus:ring-[#16a34a] sm:text-sm resize-none ${
                            theme === 'light' ? 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white placeholder:text-gray-400' : 'bg-[#222222] border-[#2e2e2e] text-white focus:bg-[#1a1a1a] placeholder:text-gray-500'
                        }`}
                      ></textarea>
                    </div>

                    <AuthButton type="submit" fullWidth isLoading={isSubmitting}>
                      Send Message
                    </AuthButton>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HelpCenterPage;