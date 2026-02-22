import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Tag, ArrowRight, CheckCircle } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { AuthButton } from '../../components/ui/AuthButton';
import { BLOG_POSTS } from '../../data/mockData';

const BlogPage = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Navbar />

      <main className="flex-grow">
        <section className="bg-white py-16 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
              News & <span className="text-blue-600">Blog</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Stay updated with the latest stories, impact reports, and tips on how to reduce food waste in your community.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {BLOG_POSTS.map((post) => (
                <article 
                  key={post.id} 
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 uppercase tracking-wider shadow-sm">
                        <Tag size={12} /> {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 font-medium">
                      <Calendar size={14} /> {post.date}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="pt-4 border-t border-gray-100 mt-auto">
                      <span className="inline-flex items-center text-sm font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                        Read full article <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-20 bg-blue-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-lg">
              <div className="relative z-10 max-w-2xl mx-auto">
                {isSubscribed ? (
                  <div className="flex flex-col items-center justify-center animate-fade-in-up">
                    <CheckCircle size={48} className="text-green-400 mb-4" />
                    <h3 className="text-2xl font-black mb-2">Thank you for subscribing!</h3>
                    <p className="text-blue-100">You will now receive our latest updates directly to your inbox.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-black mb-4">Never miss an update</h3>
                    <p className="text-blue-100 mb-8">
                      Join our newsletter to receive the latest impact stories and tips directly in your inbox. No spam, just good deeds.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleSubscribe}>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address" 
                        className="flex-grow px-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-500 border-2 border-transparent focus:outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-400/50 shadow-inner transition-all"
                        required
                      />
                      <AuthButton type="submit" className="bg-gray-900 text-white hover:bg-gray-800 border-none whitespace-nowrap">
                        Subscribe
                      </AuthButton>
                    </form>
                  </>
                )}
              </div>
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500/50 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;