import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface AccordionItemProps {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, icon, content, isOpen, onClick }) => {
  const { theme } = useTheme();

  return (
    <div className={`mb-3 rounded-2xl border overflow-hidden transition-colors ${
      theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
    }`}>
      {/* Header-ul Acordeonului (Butonul) */}
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none`}
      >
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-xl ${theme === 'light' ? 'bg-blue-50 text-blue-600' : 'bg-blue-900/30 text-blue-400'}`}>
            {icon}
          </div>
          <span className={`text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
            {title}
          </span>
        </div>
        <ChevronDownIcon 
          className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} 
        />
      </button>

      {/* Conținutul (Animație Smooth) */}
      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className={`p-5 pt-0 border-t ${theme === 'light' ? 'border-gray-100 text-gray-600' : 'border-gray-700 text-gray-300'}`}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;