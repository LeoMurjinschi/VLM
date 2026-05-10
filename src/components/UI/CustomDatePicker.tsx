import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface CustomDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ value, onChange, hasError }) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parse existing date or default to today
  const initialDate = value ? new Date(value) : new Date();
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  // Adjust day 0 (Sunday) to 6 for standard Monday-start calendar
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const handlePrevMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 0) { setCurrentYear(y => y - 1); return 11; }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 11) { setCurrentYear(y => y + 1); return 0; }
      return prev + 1;
    });
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handleDateSelect = (day: number) => {
    // Format YYYY-MM-DD reliably avoiding TZ shift
    const date = new Date(currentYear, currentMonth, day, 12); 
    const formatted = date.toISOString().split('T')[0];
    onChange(formatted);
    setIsOpen(false);
  };

  const displayDate = value ? value : 'Select Date';

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full border text-sm rounded-xl px-4 py-3 flex justify-between items-center transition-all outline-none
          ${isOpen
            ? theme === 'light'
              ? 'border-[#16a34a] ring-2 ring-[#16a34a]/20 text-[#16a34a] bg-white'
              : 'border-[#16a34a] ring-2 ring-[#16a34a]/20 text-[#16a34a] bg-[#1a1a1a]'
            : hasError
              ? theme === 'light'
                ? 'border-red-500 bg-red-50 text-red-900 ring-1 ring-red-500'
                : 'border-red-500 bg-red-900/20 text-red-200 ring-1 ring-red-500'
              : theme === 'light'
                ? 'bg-white border-gray-200 text-gray-700 hover:border-[#16a34a]/50'
                : 'bg-[#1a1a1a] border-[#2e2e2e] text-gray-300 hover:border-[#16a34a]/50'
          }`}
      >
        <span className="font-bold truncate">{displayDate}</span>
        <CalendarIcon className={`w-5 h-5 ${
            isOpen ? 'text-[#16a34a]'
            : theme === 'light' ? 'text-gray-400' : 'text-gray-500'
        }`} />
      </button>

      {isOpen && (
        <div className={`absolute z-50 mt-2 p-4 w-72 border rounded-2xl shadow-xl overflow-hidden animate-fade-in-up ${
          theme === 'light' ? 'bg-white border-gray-100' : 'bg-[#1a1a1a] border-[#2e2e2e]'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <button type="button" onClick={handlePrevMonth} className={`p-1.5 rounded-lg transition-colors ${theme === 'light' ? 'hover:bg-gray-100 text-gray-600' : 'hover:bg-[#222222] text-gray-300'}`}>
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <div className={`font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
              {monthNames[currentMonth]} {currentYear}
            </div>
            <button type="button" onClick={handleNextMonth} className={`p-1.5 rounded-lg transition-colors ${theme === 'light' ? 'hover:bg-gray-100 text-gray-600' : 'hover:bg-[#222222] text-gray-300'}`}>
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-2 border-b pb-2 border-gray-200 dark:border-[#2e2e2e]">
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
              <div key={day} className={`text-xs font-bold ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center pt-2">
            {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = value && new Date(value).getFullYear() === currentYear && new Date(value).getMonth() === currentMonth && new Date(value).getDate() === day;
              
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDateSelect(day)}
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-semibold transition-colors
                    ${isSelected
                      ? 'bg-[#16a34a] text-white shadow-md'
                      : theme === 'light'
                        ? 'text-gray-700 hover:bg-[#16a34a]/10 hover:text-[#16a34a]'
                        : 'text-gray-300 hover:bg-[#222222] hover:text-[#16a34a]'
                    }
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
