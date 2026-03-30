import React from 'react';
import { useTheme } from './../hooks/useTheme';
import { BellIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

interface PreferencesFormProps {
  preferences: { theme: 'light' | 'dark'; notifications: boolean; emailUpdates: boolean };
  onToggle: (key: 'theme' | 'notifications' | 'emailUpdates') => void;
  isSaving: boolean;
}

const PreferencesForm: React.FC<PreferencesFormProps> = ({ preferences, onToggle, isSaving }) => {
  const { theme } = useTheme();

  return (
    <div className={`p-6 md:p-8 rounded-3xl border shadow-sm ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-900 border-gray-700'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-purple-50 text-purple-600' : 'bg-purple-900/30 text-purple-400'}`}>
          <BellIcon className="w-6 h-6" />
        </div>
        <h2 className={`text-xl font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Preferences</h2>
      </div>

      <div className="space-y-6">
        {/* Butonul de Temă */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className={`text-base font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>App Theme</h4>
            <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Switch between Light and Dark mode.</p>
          </div>
          <button 
            type="button"
            onClick={() => onToggle('theme')}
            disabled={isSaving}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl border transition-colors active:scale-95 ${
              theme === 'light' ? 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50' : 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600'
            }`}
          >
            {theme === 'light' ? <><MoonIcon className="w-4 h-4" /> Dark Mode</> : <><SunIcon className="w-4 h-4 text-amber-400" /> Light Mode</>}
          </button>
        </div>

        {/* Notificări Push */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div>
            <h4 className={`text-base font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Push Notifications</h4>
            <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Receive alerts when your donations are reserved.</p>
          </div>
          <button 
            type="button"
            onClick={() => onToggle('notifications')}
            disabled={isSaving}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.notifications ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.notifications ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesForm;