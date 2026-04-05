import React, { useState, useEffect } from 'react';
import { Calendar, Tag, ArrowRight, CheckCircle, X } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { AuthButton } from '../../components/ui/AuthButton';
import { BLOG_POSTS } from '../../data/mockData';
import { useTheme } from '../../hooks/useTheme';

type BlogPost = typeof BLOG_POSTS[number];

const BlogPage = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const { theme } = useTheme();

    useEffect(() => {
        if (selectedPost) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [selectedPost]);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail('');
        }
    };

    return (
        <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
            theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-[#121212] text-gray-100'
        }`}>
            <Navbar />

            <main className="flex-grow">
                <section className={`py-16 border-b transition-colors duration-300 ${
                    theme === 'light' ? 'bg-white border-gray-100' : 'bg-[#1a1a1a] border-[#2e2e2e]'
                }`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className={`text-4xl font-black mb-4 tracking-tight ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                            News & <span className={theme === 'light' ? 'text-[#16a34a]' : 'text-green-400'}>Blog</span>
                        </h1>
                        <p className={`text-lg max-w-2xl mx-auto ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
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
                                    onClick={() => setSelectedPost(post)}
                                    className={`rounded-2xl border overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer group ${
                                        theme === 'light' ? 'bg-white border-gray-200 hover:shadow-green-500/10' : 'bg-[#1a1a1a] border-[#2e2e2e] hover:shadow-green-900/20'
                                    }`}
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
                                        <div className="absolute top-4 left-4">
                                            <span className={`inline-flex items-center gap-1 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                                                theme === 'light' ? 'bg-white/90 text-[#16a34a]' : 'bg-[#1a1a1a]/90 text-green-400'
                                            }`}>
                                                <Tag size={12} /> {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className={`flex items-center gap-2 text-sm mb-3 font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                                            <Calendar size={14} /> {post.date}
                                        </div>
                                        <h2 className={`text-xl font-bold mb-3 leading-snug transition-colors ${
                                            theme === 'light' ? 'text-gray-900 group-hover:text-[#16a34a]' : 'text-white group-hover:text-green-400'
                                        }`}>
                                            {post.title}
                                        </h2>
                                        <p className={`text-sm leading-relaxed mb-6 flex-grow ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                            {post.excerpt}
                                        </p>
                                        <div className={`pt-4 border-t mt-auto ${theme === 'light' ? 'border-gray-100' : 'border-[#2e2e2e]'}`}>
                                            <span className={`inline-flex items-center text-sm font-bold transition-colors ${
                                                theme === 'light' ? 'text-[#16a34a] group-hover:text-[#15803d]' : 'text-green-400 group-hover:text-green-300'
                                            }`}>
                                                Read full article <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className={`mt-20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-lg ${
                            theme === 'light' ? 'bg-[#16a34a] text-white' : 'bg-[#15803d] text-gray-100'
                        }`}>
                            <div className="relative z-10 max-w-2xl mx-auto">
                                {isSubscribed ? (
                                    <div className="flex flex-col items-center justify-center">
                                        <CheckCircle size={48} className="text-white mb-4" />
                                        <h3 className="text-2xl font-black mb-2">Thank you for subscribing!</h3>
                                        <p className="text-green-100">You will now receive our latest updates directly to your inbox.</p>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="text-2xl font-black mb-4">Never miss an update</h3>
                                        <p className={`mb-8 ${theme === 'light' ? 'text-green-100' : 'text-green-50'}`}>
                                            Join our newsletter to receive the latest impact stories and tips directly in your inbox. No spam, just good deeds.
                                        </p>
                                        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleSubscribe}>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email address"
                                                className={`flex-grow px-4 py-3 rounded-xl placeholder-gray-500 border-2 border-transparent focus:outline-none focus:ring-4 shadow-inner transition-all ${
                                                    theme === 'light' ? 'bg-white text-gray-900 focus:border-green-300 focus:ring-green-400/50' : 'bg-[#1a1a1a] text-white focus:border-green-500 focus:ring-green-500/50'
                                                }`}
                                                required
                                            />
                                            <AuthButton type="submit" className={theme === 'light' ? "bg-gray-900 text-white hover:bg-gray-800 border-none whitespace-nowrap" : "bg-[#222222] text-white hover:bg-gray-800 border-none whitespace-nowrap"}>
                                                Subscribe
                                            </AuthButton>
                                        </form>
                                    </>
                                )}
                            </div>
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-black/20 rounded-full blur-3xl"></div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            {/* Blog Post Modal */}
            {selectedPost && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
                    onClick={() => setSelectedPost(null)}
                >
                    {/* Blurred backdrop */}
                    <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" />

                    {/* Modal content */}
                    <div
                        className={`relative z-10 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-[modalIn_0.25s_ease-out] ${
                            theme === 'light' ? 'bg-white' : 'bg-[#1a1a1a]'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedPost(null)}
                            className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full backdrop-blur-sm shadow-md flex items-center justify-center transition-all ${
                                theme === 'light' ? 'bg-white/90 text-gray-600 hover:text-gray-900 hover:bg-white' : 'bg-[#1a1a1a]/90 text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                            }`}
                        >
                            <X size={20} />
                        </button>

                        {/* Hero image */}
                        <div className="relative h-56 sm:h-72 flex-shrink-0 overflow-hidden">
                            <img
                                src={selectedPost.image}
                                alt={selectedPost.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>

                        {/* Scrollable body */}
                        <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10">
                            <div className="flex flex-wrap items-center gap-3 mb-5">
                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                    theme === 'light' ? 'bg-[#F0FAF4] text-[#16a34a]' : 'bg-[#16a34a]/10 text-green-400'
                                }`}>
                                    <Tag size={12} /> {selectedPost.category}
                                </span>
                                <span className={`flex items-center gap-2 text-sm font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                                    <Calendar size={14} /> {selectedPost.date}
                                </span>
                            </div>

                            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black mb-6 leading-tight ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                {selectedPost.title}
                            </h2>

                            <div className={`text-base leading-relaxed whitespace-pre-line ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                                {selectedPost.content}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
        </div>
    );
};

export default BlogPage;