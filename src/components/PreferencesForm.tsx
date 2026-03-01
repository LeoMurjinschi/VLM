import React from 'react';
import { useTheme } from './../hooks/useTheme';
import { BellIcon } from '@heroicons/react/24/outline';

interface PreferencesFormProps {
  preferences: { theme: 'light' | 'dark'; notifications: boolean; emailUpdates: boolean };
  onToggle: (key: 'theme' | 'notifications' | 'emailUpdates') => void;
  isSaving: boolean;
}

const PreferencesForm: React.FC<PreferencesFormProps> = ({ preferences, onToggle, isSaving }) => {
  const { theme } = useTheme();

  return (
    <div className={`p-6 md:p-8 rounded-3xl border shadow-sm ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-purple-50 text-purple-600' : 'bg-purple-900/30 text-purple-400'}`}>
          <BellIcon className="w-6 h-6" />
        </div>
        <h2 className={`text-xl font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Preferences</h2>
      </div>

      <div className="space-y-6">

        <div className="flex items-center justify-between">
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


        <div className="flex items-center justify-between">
          <div>
            <h4 className={`text-base font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Email Updates</h4>
            <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Weekly summaries and platform news.</p>
          </div>
          <button 
            type="button"
            onClick={() => onToggle('emailUpdates')}
            disabled={isSaving}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.emailUpdates ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.emailUpdates ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesForm;