import React from 'react';

export const SpinnerLoader: React.FC = () => (
  <div className="flex justify-center items-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
  </div>
);

export const ErrorState: React.FC<{ message?: string; onRetry?: () => void }> = ({ message, onRetry }) => (
  <div className="p-4 text-red-500 bg-red-50 rounded text-center">
    <p>Error: {message || 'Something went wrong'}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-2 px-4 py-1.5 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
      >
        Retry
      </button>
    )}
  </div>
);

export const EmptyState: React.FC<{
  title?: string;
  message?: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}> = ({ title, message, description, action }) => (
  <div className="p-8 text-center text-gray-500">
    <h3 className="font-semibold text-lg">{title || 'No data found'}</h3>
    <p className="text-sm">{description || message || 'There is no data to display right now.'}</p>
    {action && (
      <button
        onClick={action.onClick}
        className="mt-3 px-4 py-1.5 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
      >
        {action.label}
      </button>
    )}
  </div>
);

export const SkeletonTableLoader: React.FC<{ rows?: number; showHeader?: boolean }> = ({
  rows = 4,
  showHeader = false,
}) => (
  <div className="animate-pulse space-y-4">
    {showHeader && <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>}
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="h-10 bg-gray-200 rounded"></div>
    ))}
  </div>
);
