import React from 'react';
import { useTheme } from '../../hooks/useTheme';

interface SkeletonLoaderProps {
  rows?: number;
  showHeader?: boolean;
}

export const SkeletonTableLoader: React.FC<SkeletonLoaderProps> = ({
  rows = 5,
  showHeader = true,
}) => {
  const { theme } = useTheme();

  return (
    <div className={`p-6 rounded-2xl border ${
      theme === 'light' ? 'bg-white border-gray-200/80' : 'bg-[#1a1a1a] border-[#2e2e2e]'
    }`}>
      <div className="space-y-4">
        {showHeader && (
          <div className={`h-6 rounded animate-pulse w-1/3 mb-6 ${
            theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
          }`}></div>
        )}
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} className="space-y-2">
            <div className={`h-4 rounded animate-pulse ${
              theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'
            }`}></div>
            <div className={`h-4 rounded animate-pulse w-5/6 ${
              theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'
            }`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SpinnerLoader: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12 w-full">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div 
          key={idx} 
          className={`rounded-2xl overflow-hidden relative animate-pulse ${
            theme === 'light' ? 'bg-white border border-gray-200/80' : 'bg-[#1a1a1a] border border-[#2e2e2e]'
          }`}
        >
          {/* Mock image area — matches 200px card image */}
          <div className={`h-[200px] w-full ${
            theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'
          }`}></div>
          <div className="p-4 space-y-3">
            <div className={`h-4 w-16 rounded-md ${
              theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'
            }`}></div>
            <div className={`h-5 w-3/4 rounded-md ${
              theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
            }`}></div>
            <div className={`h-4 w-full rounded-md ${
              theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'
            }`}></div>
            <div className={`h-4 w-5/6 rounded-md ${
              theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'
            }`}></div>
            <div className={`h-9 w-full rounded-xl mt-4 ${
              theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'
            }`}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
}) => {
  const { theme } = useTheme();

  return (
    <div className={`py-12 rounded-2xl border flex flex-col items-center justify-center ${
      theme === 'light'
        ? 'bg-white border-gray-200/80'
        : 'bg-[#1a1a1a] border-[#2e2e2e]'
    }`}>
      {icon && <div className="mb-4 text-gray-400">{icon}</div>}
      <h3 className={`text-lg font-bold mb-2 ${
        theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
      }`}>
        {title}
      </h3>
      <p className={`text-sm mb-6 ${
        theme === 'light' ? 'text-gray-500' : 'text-gray-400'
      }`}>
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-[#16a34a] text-white rounded-lg hover:bg-[#15803d] transition-colors font-medium text-sm"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
}) => {
  const { theme } = useTheme();

  return (
    <div className={`p-5 rounded-2xl border flex items-start gap-4 ${
      theme === 'light'
        ? 'bg-red-50 border-red-200 text-red-800'
        : 'bg-red-900/10 border-red-900/30 text-red-300'
    }`}>
      <div className="flex-shrink-0 mt-0.5">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="flex-1">
        <h3 className="font-bold mb-1">{title}</h3>
        <p className="text-sm mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className={`text-sm font-semibold transition-colors ${
              theme === 'light'
                ? 'text-red-600 hover:text-red-700'
                : 'text-red-400 hover:text-red-300'
            }`}
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
};
