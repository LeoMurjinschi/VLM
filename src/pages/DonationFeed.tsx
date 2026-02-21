import React, { useState } from 'react';
import DonationCard from '../components/UI/DonationCard';
import { MOCK_DONATIONS } from '../components/_mock/donations';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

const DonationFeed: React.FC = () => {
  const [filter, setFilter] = useState('');

  const filteredDonations = MOCK_DONATIONS.filter(donation => 
    donation.title.toLowerCase().includes(filter.toLowerCase()) ||
    donation.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto min-h-screen"> 
      

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Available Donations
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Turn surplus food into good deeds. Reserve items directly from local partners.
          </p>
        </div>
        
     
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:w-80">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search items, categories..."
              className="pl-12 pr-4 py-3.5 w-full bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all shadow-sm text-gray-700 font-medium"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          
          
          <button className="px-4 py-3.5 bg-blue-600 hover:bg-blue-700 border border-transparent rounded-xl text-white shadow-md shadow-blue-200 transition-colors">
            <FunnelIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      
      {filteredDonations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-10">
          {filteredDonations.map((donation) => (
            <DonationCard key={donation.id} donation={donation} />
          ))}
        </div>
      ) : (
        
        <div className="flex flex-col items-center justify-center min-h-[50vh] bg-white rounded-3xl border border-dashed border-gray-300">
          <div className="bg-blue-50 p-4 rounded-full mb-4">
            <MagnifyingGlassIcon className="h-10 w-10 text-blue-500" />
          </div>
          <p className="text-gray-900 font-bold text-xl">No donations found.</p>
          <p className="text-gray-500 mt-2">Try adjusting your search terms or filters.</p>
          <button 
            onClick={() => setFilter('')}
            className="mt-6 px-6 py-2 bg-blue-100 text-white-700 font-bold rounded-lg hover:bg-blue-200 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default DonationFeed;