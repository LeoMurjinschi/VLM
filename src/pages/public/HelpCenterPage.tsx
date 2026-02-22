import React, { useState } from 'react';
import { Mail, MessageCircle, Phone, MapPin, ChevronDown, ChevronUp, LifeBuoy } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { AuthButton } from '../../components/ui/AuthButton';
import { InputField } from '../../components/ui/InputField';
import { FAQS } from '../../data/mockData';

const HelpCenterPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  
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
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Navbar />

      <main className="flex-grow">
        <section className="bg-blue-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <LifeBuoy size={32} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              How can we help you?
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Search our FAQs or get in touch with our support team.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                      activeCategory === category 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
                  className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:border-blue-200 transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                  >
                    <span className="font-bold text-gray-900 pr-8">{faq.question}</span>
                    {openFaqId === faq.id ? (
                      <ChevronUp size={20} className="text-blue-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  
                  {openFaqId === faq.id && (
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-gray-900">Still need help?</h2>
              <p className="text-gray-500 mt-2">Send us a message and our team will get back to you shortly.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                    <p className="text-gray-500 text-sm">support@foodshare.md</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 flex items-start gap-4">
                  <div className="bg-green-50 p-3 rounded-xl text-green-600">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                    <p className="text-gray-500 text-sm">+373 22 123 456<br/>Mon-Fri, 9am - 5pm</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 flex items-start gap-4">
                  <div className="bg-orange-50 p-3 rounded-xl text-orange-600">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Visit Us</h3>
                    <p className="text-gray-500 text-sm">Strada Ștefan cel Mare 128,<br/>Chișinău, Moldova</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm">
                {isSent ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <MessageCircle size={40} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-4">Message Sent!</h3>
                    <p className="text-gray-600 mb-8 max-w-md">
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
                      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">
                        Message
                      </label>
                      <textarea
                        required
                        rows={6}
                        placeholder="Describe your issue in detail..."
                        className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-blue-500 transition-all placeholder:text-gray-400 sm:text-sm resize-none"
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