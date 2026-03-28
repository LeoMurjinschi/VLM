import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { BoltIcon, ClockIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import type { Alert } from './../_mock/alerts'; // Ajustează calea

interface AlertItemProps {
  alert: Alert;
  isSelected: boolean;
  onClick: () => void;
}

const AlertItem: React.FC<AlertItemProps> = ({ alert, isSelected, onClick }) => {
  const { theme } = useTheme();

  const getIcon = () => {
    if (alert.type === 'critical') return <BoltIcon className="w-5 h-5 text-red-500" />;
    if (alert.type === 'warning') return <ClockIcon className="w-5 h-5 text-orange-500" />;
    return <InformationCircleIcon className="w-5 h-5 text-blue-500" />;
  };

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 border-b last:border-b-0 transition-all flex items-start gap-3 ${
        isSelected 
          ? theme === 'light' ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'bg-blue-900/20 border-l-4 border-l-blue-500'
          : theme === 'light' ? 'bg-white hover:bg-gray-50 border-l-4 border-l-transparent' : 'bg-gray-800 hover:bg-gray-750 border-l-4 border-l-transparent border-gray-700'
      }`}
    >
      <div className="shrink-0 mt-0.5">{getIcon()}</div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h4 className={`text-sm font-bold truncate pr-2 ${
            alert.isRead 
              ? theme === 'light' ? 'text-gray-600' : 'text-gray-400' 
              : theme === 'light' ? 'text-gray-900' : 'text-gray-100'
          }`}>
            {alert.title}
          </h4>
          <span className={`text-xs whitespace-nowrap ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
            {alert.timestamp}
          </span>
        </div>
        
        <p className={`text-xs truncate ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
          {alert.donor || alert.message}
        </p>
      </div>

      {/* Punct albastru dacă e necitit */}
      {!alert.isRead && (
        <div className="shrink-0 w-2 h-2 mt-1.5 rounded-full bg-blue-500"></div>
      )}
    </button>
  );
};

export default AlertItem;