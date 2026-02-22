import React, { useState, useEffect } from 'react';
import { Calendar, Tag, ArrowRight, CheckCircle, X } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { AuthButton } from '../../components/ui/AuthButton';
import { BLOG_POSTS } from '../../data/mockData';

type BlogPost = typeof BLOG_POSTS[number];

const BlogPage = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

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
                                    onClick={() => setSelectedPost(post)}
                                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer group"
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
                                    <div className="flex flex-col items-center justify-center">
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

            {/* Blog Post Modal */}
            {selectedPost && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
                    onClick={() => setSelectedPost(null)}
                >
                    {/* Blurred backdrop */}
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" />

                    {/* Modal content */}
                    <div
                        className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-[modalIn_0.25s_ease-out]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedPost(null)}
                            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white transition-all"
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        {/* Scrollable body */}
                        <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10">
                            <div className="flex flex-wrap items-center gap-3 mb-5">
                                <span className="inline-flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full text-xs font-bold text-blue-600 uppercase tracking-wider">
                                    <Tag size={12} /> {selectedPost.category}
                                </span>
                                <span className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                    <Calendar size={14} /> {selectedPost.date}
                                </span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
                                {selectedPost.title}
                            </h2>

                            <div className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
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