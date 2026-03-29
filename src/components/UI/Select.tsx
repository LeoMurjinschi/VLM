import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../hooks/useTheme';

export interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange, hasError }) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full border text-sm rounded-xl px-4 py-3 flex justify-between items-center transition-all outline-none
          ${isOpen
            ? theme === 'light'
              ? 'border-blue-500 ring-2 ring-blue-100 text-blue-700 bg-white'
              : 'border-blue-500 ring-2 ring-blue-900 text-blue-400 bg-gray-700'
            : hasError 
              ? theme === 'light'
                ? 'border-red-500 bg-red-50 text-red-900 ring-1 ring-red-500'
                : 'border-red-500 bg-red-900/20 text-red-200 ring-1 ring-red-500'
              : theme === 'light'
                ? 'bg-white border-gray-200 text-gray-700 hover:border-blue-400'
                : 'bg-gray-700 border-gray-600 text-gray-300 hover:border-blue-500'
          }`}
      >
        <span className="font-bold truncate">
          {selectedOption ? selectedOption.label : 'Select...'}
        </span>
        <ChevronDownIcon 
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen
              ? `rotate-180 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`
              : hasError
                ? 'text-red-500'
                : theme === 'light' ? 'text-gray-400' : 'text-gray-500'
          }`} 
        />
      </button>

      {isOpen && (
        <div className={`absolute z-50 w-full mt-2 border rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden animate-fade-in-up p-1 ${
          theme === 'light'
            ? 'bg-white border-gray-100'
            : 'bg-gray-700 border-gray-600'
        }`}>
          <ul className="py-1 max-h-60 overflow-y-auto custom-scrollbar">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <li
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2.5 text-sm cursor-pointer transition-all rounded-xl flex items-center justify-between mb-1 last:mb-0
                    ${isSelected
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : theme === 'light'
                      ? 'text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium'
                      : 'text-gray-300 hover:bg-gray-600 hover:text-blue-400 font-medium'
                    }
                  `}
                >
                  <span>{option.label}</span>
 
                  {isSelected && <CheckIcon className="w-5 h-5 text-white" />} 
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;