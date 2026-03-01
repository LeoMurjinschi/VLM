import React, { useState } from 'react';
import { useTheme } from './../hooks/useTheme';
import { ShieldCheckIcon, KeyIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

interface SecuritySettingsProps {
  onUpdatePassword: (oldPw: string, newPw: string) => Promise<void>;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ onUpdatePassword }) => {
  const { theme } = useTheme();
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  

  const [newPasswordTouched, setNewPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);


  const inputClass = `w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-colors font-medium ${
    theme === 'light' ? 'bg-white text-gray-900 placeholder-gray-400' : 'bg-gray-800 text-gray-100 placeholder-gray-500'
  }`;


  const defaultBorderClass = theme === 'light' ? 'border-gray-200 focus:ring-blue-500' : 'border-gray-600 focus:ring-blue-500';
  const errorBorderClass = 'border-red-500 focus:border-red-500 focus:ring-red-500';

  const validatePassword = (pw: string) => {

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
    return regex.test(pw);
  };
  const isPasswordValid = validatePassword(newPassword);
  const showPasswordError = newPasswordTouched && newPassword.length > 0 && !isPasswordValid;
  const isPasswordMatch = confirmPassword.length > 0 && newPassword === confirmPassword;
  const showConfirmError = confirmPasswordTouched && confirmPassword.length > 0 && !isPasswordMatch;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields.');
      return;
    }

    if (!isPasswordMatch) {
      toast.error('New passwords do not match!');
      return;
    }

    if (!isPasswordValid) {
      toast.error('Password does not meet the security requirements.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onUpdatePassword(oldPassword, newPassword);
      toast.success('Password updated successfully! 🔒');
    
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setNewPasswordTouched(false);
      setConfirmPasswordTouched(false);
      setIsFormOpen(false);
    } catch (err) {
      toast.error('Incorrect old password or server error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`p-6 md:p-8 rounded-3xl border shadow-sm ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-emerald-50 text-emerald-600' : 'bg-emerald-900/30 text-emerald-400'}`}>
          <ShieldCheckIcon className="w-6 h-6" />
        </div>
        <h2 className={`text-xl font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Security</h2>
      </div>
      
      {!isFormOpen ? (
        <div className="flex items-center justify-between">
          <div>
            <h4 className={`text-base font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Password</h4>
            <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Last changed 3 months ago.</p>
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            className={`px-4 py-2 font-bold rounded-xl border transition-colors ${theme === 'light' ? 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50' : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'}`}
          >
            Update
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in-up">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Old Password</label>
            <input 
              type="password" 
              value={oldPassword} 
              onChange={(e) => setOldPassword(e.target.value)} 
              className={`${inputClass} ${defaultBorderClass}`} 
              placeholder="••••••••" 
            />
          </div>
          
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>New Password</label>
            <input 
              type="password" 
              value={newPassword} 
              onChange={(e) => {
                setNewPassword(e.target.value);
                setNewPasswordTouched(true);
              }} 
              className={`${inputClass} ${showPasswordError ? errorBorderClass : defaultBorderClass}`} 
              placeholder="••••••••" 
            />
            <p className={`text-xs mt-1.5 transition-colors duration-200 ${
              showPasswordError 
                ? 'text-red-500 font-semibold' 
                : newPasswordTouched && isPasswordValid 
                  ? 'text-emerald-500 font-semibold' 
                  : 'text-gray-500'
            }`}>
              {newPasswordTouched && isPasswordValid ? '✓ Password meets all requirements.' : 'Min. 8 characters, 1 uppercase, 1 lowercase, 1 number.'}
            </p>
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Confirm New Password</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordTouched(true);
              }} 
              className={`${inputClass} ${showConfirmError ? errorBorderClass : defaultBorderClass}`} 
              placeholder="••••••••" 
            />

            {confirmPasswordTouched && (
              <p className={`text-xs mt-1.5 transition-colors duration-200 ${
                showConfirmError 
                  ? 'text-red-500 font-semibold' 
                  : isPasswordMatch 
                    ? 'text-emerald-500 font-semibold' 
                    : 'text-gray-500'
              }`}>
                {isPasswordMatch ? '✓ Passwords match.' : 'Passwords do not match.'}
              </p>
            )}
          </div>
          
          <div className="flex justify-end gap-3 pt-3">
            <button 
              type="button" 
              onClick={() => {
                setIsFormOpen(false);
                setNewPasswordTouched(false);
                setConfirmPasswordTouched(false);
              }}
              className={`px-4 py-2 font-bold rounded-xl transition-colors ${theme === 'light' ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all disabled:opacity-70`}
            >
              {isSubmitting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <KeyIcon className="w-4 h-4" />}
              Update Password
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SecuritySettings;