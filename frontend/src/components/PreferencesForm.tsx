import React from 'react';
import { useTheme } from './../hooks/useTheme';
import { BellIcon, SunIcon, MoonIcon, EnvelopeIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import type { UserSettingsDto } from '../api/settingsService';

type SettingsKey = 'theme' | 'notifyPush' | 'notifySms' | 'notifyEmail' | 'emailUpdates';

interface PreferencesFormProps {
  settings: UserSettingsDto;
  onToggle: (key: SettingsKey) => void;
  isSaving: boolean;
}

const Toggle = ({ enabled, onChange, disabled }: { enabled: boolean; onChange: () => void; disabled?: boolean }) => {
  const { theme } = useTheme();
  return (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-50 ${enabled ? 'bg-[#16a34a]' : (theme === 'light' ? 'bg-gray-300' : 'bg-[#333333]')}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
};

const PreferencesForm: React.FC<PreferencesFormProps> = ({ settings, onToggle, isSaving }) => {
  const { theme } = useTheme();

  const rowClass = `flex items-center justify-between pt-4 border-t ${theme === 'light' ? 'border-gray-100' : 'border-[#2e2e2e]'}`;

  return (
    <div className={`p-6 md:p-8 rounded-3xl border shadow-sm ${theme === 'light' ? 'bg-white border-gray-200/60' : 'bg-[#1a1a1a] border-[#2e2e2e]'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-[#16a34a]/10 text-[#16a34a]' : 'bg-[#16a34a]/20 text-[#16a34a]'}`}>
          <BellIcon className="w-6 h-6" />
        </div>
        <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-[#1a1a1a]' : 'text-gray-100'}`} style={{ fontFamily: 'var(--font-display)' }}>Preferences</h2>
      </div>

      <div className="space-y-0">
        {/* Theme Toggle */}
        <div className="flex items-center justify-between pb-4">
          <div>
            <h4 className={`text-base font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>App Theme</h4>
            <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Switch between Light and Dark mode.</p>
          </div>
          <button
            type="button"
            onClick={() => onToggle('theme')}
            disabled={isSaving}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl border transition-colors active:scale-95 disabled:opacity-50 ${
              theme === 'light' ? 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50' : 'bg-[#222222] border-[#2e2e2e] text-gray-200 hover:bg-[#333333]'
            }`}
          >
            {theme === 'light' ? <><MoonIcon className="w-4 h-4" /> Dark Mode</> : <><SunIcon className="w-4 h-4 text-amber-400" /> Light Mode</>}
          </button>
        </div>

        {/* Push Notifications */}
        <div className={rowClass}>
          <div>
            <h4 className={`text-base font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Push Notifications</h4>
            <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Receive alerts when donations are reserved or confirmed.</p>
          </div>
          <Toggle enabled={settings.notifyPush} onChange={() => onToggle('notifyPush')} disabled={isSaving} />
        </div>

        {/* SMS Alerts */}
        <div className={rowClass}>
          <div className="flex items-center gap-2">
            <DevicePhoneMobileIcon className={`w-5 h-5 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
            <div>
              <h4 className={`text-base font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>SMS Alerts</h4>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Text messages for critical pickup reminders.</p>
            </div>
          </div>
          <Toggle enabled={settings.notifySms} onChange={() => onToggle('notifySms')} disabled={isSaving} />
        </div>

        {/* Email Notifications */}
        <div className={rowClass}>
          <div className="flex items-center gap-2">
            <EnvelopeIcon className={`w-5 h-5 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
            <div>
              <h4 className={`text-base font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Email Notifications</h4>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Emails for reservation status updates.</p>
            </div>
          </div>
          <Toggle enabled={settings.notifyEmail} onChange={() => onToggle('notifyEmail')} disabled={isSaving} />
        </div>

        {/* Email Updates / Newsletter */}
        <div className={rowClass}>
          <div>
            <h4 className={`text-base font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Weekly Digest</h4>
            <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Weekly summary of impact and available donations.</p>
          </div>
          <Toggle enabled={settings.emailUpdates} onChange={() => onToggle('emailUpdates')} disabled={isSaving} />
        </div>
      </div>
    </div>
  );
};

export default PreferencesForm;
