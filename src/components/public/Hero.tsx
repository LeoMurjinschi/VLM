import { Link } from 'react-router-dom';
import {Heart, Leaf, Store, Utensils } from 'lucide-react';

const RECENT_DONORS = [
  { 
    id: 1, 
    name: 'Fresh Market Central', 
    type: 'Supermarket',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=100&q=80' 
  },
  { 
    id: 2, 
    name: 'Green Bakery', 
    type: 'Bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=100&q=80' 
  },
  { 
    id: 3, 
    name: 'Bistro 55', 
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=100&q=80' 
  },
  { 
    id: 4, 
    name: 'Organic Juice Bar', 
    type: 'Coffee Shop',
    image: 'https://images.unsplash.com/photo-1621360841013-c768371e93cf?auto=format&fit=crop&w=100&q=80' 
  },
];

const Hero = () => {
  return (
    <section className="relative bg-white overflow-hidden py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
            <div className="flex justify-center lg:justify-start mb-6">
               <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 ring-1 ring-inset ring-blue-100">
                <Leaf size={16} />
                Stop Food Waste
              </span>
            </div>

            <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-6 leading-tight">
              Share Food,<br />
              <span className="text-blue-600">Save the Community.</span>
            </h1>

            <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              We connect <span className="font-bold text-gray-700">restaurants & stores</span> directly with NGOs in need. 
              Turn surplus food into good deeds through a simple, fast, and secure platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/signup" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1">
                <Store className="mr-2" size={20} />
                Partner Registration
              </Link>
              <Link to="/about" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-700 transition-all bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-blue-600 shadow-sm hover:shadow-md">
                <Heart className="mr-2 text-red-500" size={20} />
                How it works?
              </Link>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6">
                <div className="flex -space-x-3">
                    {RECENT_DONORS.map((donor) => (
                        <div key={donor.id} className="relative group">
                            <img 
                              className="inline-block h-12 w-12 rounded-full ring-2 ring-white object-cover cursor-pointer hover:scale-110 transition-transform bg-gray-100" 
                              src={donor.image} 
                              alt={donor.name} 
                            />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {donor.name} ({donor.type})
                            </div>
                        </div>
                    ))}
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full ring-2 ring-white bg-gray-100 text-xs font-bold text-gray-600">
                        +120
                    </div>
                </div>
                <div className="text-sm text-left">
                  <p className="font-bold text-gray-900">Partner Businesses</p>
                  <p className="font-normal text-gray-500">restaurants & markets joined</p>
                </div>
            </div>
          </div>

          <div className="lg:col-span-6 mt-12 lg:mt-0 relative">
             <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-900/10 bg-gray-50">
                <img 
                    src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                    alt="Community food sharing" 
                    className="w-full h-full object-cover transform transition-transform hover:scale-105 duration-700"
                />
                
                {/* Floating Card: Statistici */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-100 hidden md:block animate-fade-in-up">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-100 p-3 rounded-xl text-green-600">
                                <Utensils size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Meals Saved</p>
                                <p className="text-xl font-bold text-gray-900">12,450+</p>
                            </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">+15% today</p>
                        </div>
                    </div>
                </div>
             </div>
             
             <div className="absolute -top-12 -right-12 -z-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
             <div className="absolute -bottom-12 -left-12 -z-10 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;