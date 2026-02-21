import React from 'react';
import { MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import {type  Donation } from '../_mock/donations';

interface DonationCardProps {
  donation: Donation;
}

const DonationCard: React.FC<DonationCardProps> = ({ donation }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Reserved': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 flex flex-col h-full">
     
      <div className="relative h-52 w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors z-10" />
        <img 
          src={donation.image} 
          alt={donation.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <span className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg text-xs font-bold border ${getStatusColor(donation.status)} shadow-sm z-20 backdrop-blur-sm`}>
          {donation.status}
        </span>
      </div>

      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-bold tracking-wide text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md uppercase">
            {donation.category}
          </span>
          <span className="text-xs font-medium text-gray-400">{donation.postedAt}</span>
        </div>

        <h3 className="text-xl font-extrabold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
          {donation.title}
        </h3>
        
        <p className="text-sm text-gray-500 mb-5 line-clamp-2 leading-relaxed">
          {donation.description}
        </p>

        <div className="mt-auto space-y-3 pt-4 border-t border-gray-50">
          <div className="flex items-center text-sm text-gray-600 font-medium">
            <MapPinIcon className="w-5 h-5 mr-2.5 text-blue-400" />
            <span className="truncate">{donation.pickupLocation}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <ClockIcon className="w-5 h-5 mr-2.5 text-gray-400" />
            <span>Expires: <span className="text-red-500 font-bold">{new Date(donation.expirationDate).toLocaleDateString()}</span></span>
          </div>
        </div>

        
        <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-bold shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all active:scale-[0.98]">
          Reserve Donation
        </button>
      </div>
    </div>
  );
};

export default DonationCard;