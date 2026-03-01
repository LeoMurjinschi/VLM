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
    <div className={`p-6 rounded-3xl border shadow-sm ${
      theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700'
    }`}>
      <div className="space-y-4">
        {showHeader && (
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-1/3 mb-6"></div>
        )}
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SpinnerLoader: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative w-12 h-12">
        <div
          className={`absolute inset-0 rounded-full border-4 border-transparent ${
            theme === 'light' ? 'border-t-blue-500' : 'border-t-blue-400'
          } animate-spin`}
        ></div>
      </div>
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
    <div
      className={`py-12 rounded-3xl border flex flex-col items-center justify-center ${
        theme === 'light'
          ? 'bg-gray-50/50 border-gray-100'
          : 'bg-gray-800/50 border-gray-700'
      }`}
    >
      {icon && <div className="mb-4 text-gray-400">{icon}</div>}
      <h3
        className={`text-lg font-bold mb-2 ${
          theme === 'light' ? 'text-gray-900' : 'text-gray-100'
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-sm mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
      >
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
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
    <div
      className={`p-6 rounded-3xl border flex items-start gap-4 ${
        theme === 'light'
          ? 'bg-red-50/50 border-red-200 text-red-800'
          : 'bg-red-900/10 border-red-900/50 text-red-300'
      }`}
    >
      <div className="flex-shrink-0 mt-0.5">
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
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
