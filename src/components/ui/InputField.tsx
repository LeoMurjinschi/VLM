import React from 'react';


interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ElementType;
  error?: string;
}

export const InputField = ({ label, icon: Icon, error, className = '', ...props }: InputFieldProps) => {
  return (
    <div className={`w-full ${className}`}>
      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          {...props}
          className={`
            block w-full rounded-xl border-gray-200 bg-gray-50 p-3 text-gray-900 
            focus:border-blue-500 focus:bg-white focus:ring-blue-500 transition-all
            placeholder:text-gray-400 sm:text-sm
            ${Icon ? 'pl-10' : 'pl-3'}
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border'}
          `}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};