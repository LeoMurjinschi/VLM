import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { 
  MapPinIcon, 
  BuildingStorefrontIcon, 
  ArrowLeftIcon, 
  BellAlertIcon,
  BoltIcon,
  ClockIcon,
  InformationCircleIcon,
  CheckIcon,
  MapIcon // Am importat iconița pentru hartă
} from '@heroicons/react/24/outline';
import type { Alert } from './../_mock/alerts';

interface AlertDetailProps {
  alert: Alert | null;
  onBack: () => void;
  onMarkAsRead: (id: string) => void;
}

const AlertDetail: React.FC<AlertDetailProps> = ({ alert, onBack, onMarkAsRead }) => {
  const { theme } = useTheme();

  // Starea când nicio alertă nu este selectată
  if (!alert) {
    return (
      <div className={`flex flex-col items-center justify-center h-full w-full flex-1 text-center p-8 transition-colors ${
        theme === 'light' ? 'bg-gray-50/50' : 'bg-gray-900/20'
      }`}>
        <div className="relative mb-6">
          <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${theme === 'light' ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
          <div className={`p-5 rounded-full relative z-10 shadow-sm ${theme === 'light' ? 'bg-white text-blue-500' : 'bg-gray-800 text-blue-400'}`}>
            <BellAlertIcon className="w-12 h-12" />
          </div>
        </div>
        <h3 className={`text-2xl font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
          Your Inbox is Ready
        </h3>
        <p className={`text-base mt-2 max-w-sm leading-relaxed ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
          Select an alert from the left panel to read the full details and take action.
        </p>
      </div>
    );
  }

  // Helper pentru culori în funcție de severitate
  const getConfig = () => {
    if (alert.type === 'critical') return { color: 'text-red-600', bg: 'bg-red-50', border: 'border-t-red-500', icon: <BoltIcon className="w-8 h-8 text-red-500" />, btn: 'bg-red-600 hover:bg-red-700 shadow-red-200/50' };
    if (alert.type === 'warning') return { color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-t-orange-500', icon: <ClockIcon className="w-8 h-8 text-orange-500" />, btn: 'bg-orange-500 hover:bg-orange-600 shadow-orange-200/50' };
    return { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-t-blue-500', icon: <InformationCircleIcon className="w-8 h-8 text-blue-500" />, btn: 'bg-blue-600 hover:bg-blue-700 shadow-blue-200/50' };
  };

  const config = getConfig();

  // Generează link-ul către Google Maps
  const getMapsUrl = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  };

  return (
    <div className={`flex flex-col h-full w-full min-h-0 relative border-t-4 ${config.border}`}>
      
      {/* Header (Top Bar) */}
      <div className={`px-6 py-4 flex items-center gap-4 shrink-0 border-b ${theme === 'light' ? 'border-gray-100 bg-white' : 'border-gray-800 bg-gray-800/50'}`}>
        <button onClick={onBack} className={`md:hidden p-2 rounded-xl transition-colors ${theme === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-700 hover:bg-gray-600'}`}>
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <div className="flex-1 flex justify-between items-center">
          <span className={`px-3 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-widest ${
            alert.type === 'critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
            alert.type === 'warning' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 
            'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
          }`}>
            {alert.type}
          </span>
          <span className={`text-sm font-semibold ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
            Received: {alert.timestamp}
          </span>
        </div>
      </div>

      {/* Conținutul Principal (Scrollabil) */}
      <div className={`p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar ${theme === 'light' ? 'bg-white' : 'bg-transparent'}`}>
        
        {/* Titlu și Iconiță */}
        <div className="flex items-start gap-4 mb-6">
          <div className={`p-3 rounded-2xl shrink-0 mt-1 ${theme === 'light' ? config.bg : 'bg-gray-800'}`}>
            {config.icon}
          </div>
          <h2 className={`text-2xl md:text-3xl font-extrabold leading-tight ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
            {alert.title}
          </h2>
        </div>
        
        {/* Mesajul */}
        <div className={`text-base md:text-lg leading-relaxed mb-10 p-5 rounded-2xl border-l-4 ${theme === 'light' ? 'bg-gray-50 text-gray-700 border-l-gray-300' : 'bg-gray-800/50 text-gray-300 border-l-gray-600'}`}>
          {alert.message}
        </div>

        {/* Card Donator */}
        {alert.donor && (
          <div>
            <h4 className={`text-sm font-bold uppercase tracking-wider mb-3 ml-1 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
              Location Details
            </h4>
            <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row gap-4 items-start sm:items-center transition-all hover:shadow-md ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
              
              <div className={`w-14 h-14 shrink-0 rounded-full flex items-center justify-center ${theme === 'light' ? 'bg-blue-50 text-blue-600' : 'bg-blue-900/30 text-blue-400'}`}>
                <BuildingStorefrontIcon className="w-7 h-7" />
              </div>
              
              <div className="flex-1">
                <h3 className={`text-lg font-bold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
                  {alert.donor}
                </h3>
                {alert.address && (
                  <div className={`flex items-center text-sm font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    <MapPinIcon className="w-5 h-5 mr-1.5 shrink-0 text-gray-400" /> 
                    {alert.address}
                  </div>
                )}
              </div>

              {/* Butonul de View Map actualizat (acum e un link <a> cu iconiță) */}
              {alert.address && (
                <a 
                  href={getMapsUrl(alert.address)} // Generează link-ul automat
                  target="_blank" // Deschide în tab nou
                  rel="noopener noreferrer" // Securitate
                  className={`flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl mt-2 sm:mt-0 transition-colors ${
                    theme === 'light' 
                      ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' 
                      : 'text-blue-400 bg-blue-900/30 hover:bg-blue-900/50'
                  }`}
                >
                  <MapIcon className="w-4 h-4" /> 
                  View Map
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Footer */}
      <div className={`p-5 flex flex-col sm:flex-row gap-3 items-center justify-end shrink-0 border-t ${theme === 'light' ? 'bg-gray-50/80 backdrop-blur-md border-gray-200' : 'bg-gray-900/80 backdrop-blur-md border-gray-700'}`}>
        
        {!alert.isRead && (
          <button 
            onClick={() => onMarkAsRead(alert.id)}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold border transition-all flex items-center justify-center gap-2 ${
              theme === 'light' ? 'border-gray-300 text-gray-700 hover:bg-gray-200' : 'border-gray-600 text-gray-300 hover:bg-gray-800'
            }`}
          >
            <CheckIcon className="w-5 h-5" />
            Mark as Read
          </button>
        )}

        {alert.actionText && (
          <button className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all active:scale-[0.98] ${config.btn}`}>
            {alert.actionText}
          </button>
        )}
      </div>

    </div>
  );
};

export default AlertDetail;