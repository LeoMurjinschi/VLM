import React from 'react';

export const SpinnerLoader: React.FC = () => (
  <div className="flex justify-center items-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
  </div>
);

export const ErrorState: React.FC<{ message?: string }> = ({ message }) => (
  <div className="p-4 text-red-500 bg-red-50 rounded text-center">
    Error: {message || 'Something went wrong'}
  </div>
);

export const EmptyState: React.FC<{ title?: string; message?: string }> = ({ title, message }) => (
  <div className="p-8 text-center text-gray-500">
    <h3 className="font-semibold text-lg">{title || 'No data found'}</h3>
    <p className="text-sm">{message || 'There is no data to display right now.'}</p>
  </div>
);

export const SkeletonTableLoader: React.FC = () => (
  <div className="animate-pulse space-y-4">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="h-10 bg-gray-200 rounded"></div>
    ))}
  </div>
);
