import React from 'react';
import { useTheme } from '../../hooks/useTheme';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ElementType;
  error?: string;
}

export const InputField = ({ label, icon: Icon, error, className = '', ...props }: InputFieldProps) => {
  const { theme } = useTheme();
  return (
    <div className={`w-full ${className}`}>
      <label className={`block text-xs font-bold mb-1 uppercase tracking-wide ${
        theme === 'light' ? 'text-gray-500' : 'text-gray-400'
      }`}>
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className={`h-5 w-5 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
        )}
        <input
          {...props}
          className={`
            block w-full rounded-xl p-3 transition-all
            focus:border-[#16a34a] focus:ring-[#16a34a]
            sm:text-sm
            ${Icon ? 'pl-10' : 'pl-3'}
            ${theme === 'light' 
              ? 'border-gray-200 bg-gray-50 text-gray-900 focus:bg-white placeholder:text-gray-400' 
              : 'border-[#2e2e2e] bg-[#222222] text-white focus:bg-[#1a1a1a] placeholder:text-gray-500'
            }
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border'}
          `}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};