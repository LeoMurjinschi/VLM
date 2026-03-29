import React from 'react';
import { useTheme } from './../hooks/useTheme';
import { UserCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import ImageDragDrop from './UI/ImageDragDrop';
import type { User } from './../_mock';


interface ExtendedUser extends User {
  phone?: string;
}

interface PersonalInfoFormProps {
  user: ExtendedUser;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAvatarChange: (newAvatarBase64: string) => void;
  onSave: (e: React.FormEvent) => void;
  isSaving: boolean;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ user, onChange, onAvatarChange, onSave, isSaving }) => {
  const { theme } = useTheme();

  const inputClass = `w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium ${
    theme === 'light' ? 'bg-white border-gray-200 text-gray-900 placeholder-gray-400' : 'bg-gray-900 border-gray-600 text-gray-100 placeholder-gray-500'
  }`;

  return (
    <div className={`p-6 md:p-8 rounded-3xl border shadow-sm ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-900 border-gray-700'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-blue-50 text-blue-600' : 'bg-blue-900/30 text-blue-400'}`}>
          <UserCircleIcon className="w-6 h-6" />
        </div>
        <h2 className={`text-xl font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Personal Information</h2>
      </div>

      <form onSubmit={onSave} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Full Name</label>
            <input type="text" name="name" value={user.name} onChange={onChange} className={inputClass} required />
          </div>
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Email Address</label>
            <input type="email" name="email" value={user.email} onChange={onChange} className={inputClass} required />
          </div>
          <div className="sm:col-span-2">
            <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Phone Number (Optional)</label>
            <input type="tel" name="phone" value={user.phone || ''} onChange={onChange} className={inputClass} placeholder="+373 XXX XX XXX" />
          </div>
        </div>

        <ImageDragDrop 
          label="Profile Picture"
          value={user.avatar} 
          onChange={(val) => onAvatarChange(val || '')}
          maxSizeMB={5}
          variant="avatar"
          helperText="Max 5MB."
        />

        <div className="pt-2 flex justify-end">
          <button type="submit" disabled={isSaving} className={`flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 ${theme === 'light' ? 'shadow-blue-200/50' : 'shadow-black/50'}`}>
            {isSaving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <CheckCircleIcon className="w-5 h-5" />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;