import React from 'react';
import { Loader2 } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const AuthButton = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  fullWidth = false, 
  icon,
  className = '', 
  ...props 
}: ButtonProps) => {
  const { theme } = useTheme();
  
  const baseStyles = "inline-flex items-center justify-center px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: theme === 'light' 
      ? "bg-[#16a34a] text-white hover:bg-[#15803d] shadow-md hover:shadow-lg focus:ring-green-500 shadow-green-500/20 hover:-translate-y-0.5"
      : "bg-[#16a34a] text-white hover:bg-[#15803d] shadow-md hover:shadow-lg focus:ring-green-500 shadow-green-900/20 hover:-translate-y-0.5",
    outline: theme === 'light'
      ? "border-2 border-gray-200 bg-white text-gray-700 hover:border-green-400 hover:bg-[#F0FAF4] focus:ring-gray-200"
      : "border-2 border-[#2e2e2e] bg-[#1a1a1a] text-gray-300 hover:border-green-700 hover:bg-[#16a34a]/10 focus:ring-gray-800",
    ghost: theme === 'light'
      ? "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      : "bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};