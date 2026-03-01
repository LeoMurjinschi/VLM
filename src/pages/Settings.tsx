import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext'; // <-- Importăm Contextul global
import { toast } from 'react-toastify';
import { SpinnerLoader, ErrorState } from '../components/UI/StateIndicators';
import { updateUserProfile, fetchUserPreferences, updateUserPreferences } from '../services/userService';

import ProfileSummary from '../components/ProfileSummary';
import PersonalInfoForm from '../components/PersonalInfoForm';
import PreferencesForm from '../components/PreferencesForm';
import SecuritySettings from '../components/SecuritySettings';

interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  emailUpdates: boolean;
}

const handlePasswordChange = async (oldPw: string, newPw: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (oldPw === 'parolagresita') {
          reject(new Error('Wrong password'));
        } else {
          resolve();
        }
      }, 1000);
    });
  };

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, updateUser, logout } = useAuth();
  
 
  const [formData, setFormData] = useState(user);
  const [preferences, setPreferences] = useState<UserPreferences>({ theme: 'light', notifications: true, emailUpdates: true });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPrefs, setIsSavingPrefs] = useState(false);


  useEffect(() => {
    const loadPrefs = async () => {
      setLoading(true);
      try {
        const prefsData = await fetchUserPreferences();
        setPreferences(prefsData as UserPreferences);
      } catch (err) {
        setError('Failed to load preferences.');
      } finally {
        setLoading(false);
      }
    };
    loadPrefs();
  }, []);

 
  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleProfileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }, [formData]);

  const handleAvatarChange = useCallback((newAvatarBase64: string) => {
    if (!formData) return;
    setFormData({ ...formData, avatar: newAvatarBase64 });
  }, [formData]);

  const handleSaveProfile = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !user) return;

    setIsSavingProfile(true);
    try {

      const updatedUser = await updateUserProfile(user.id, formData);

      updateUser(updatedUser);
      toast.success('Profile updated successfully! ✅');
    } catch (err) {
      toast.error('Failed to update profile. Server error.');
    } finally {
      setIsSavingProfile(false);
    }
  }, [formData, user, updateUser]);

  const handleTogglePreference = useCallback(async (key: keyof UserPreferences) => {
    const newPrefs = { ...preferences };
    if (key === 'theme') {
      newPrefs.theme = preferences.theme === 'light' ? 'dark' : 'light';
      toggleTheme(); 
    } else {
      newPrefs[key] = !preferences[key];
    }
    
    setPreferences(newPrefs);
    setIsSavingPrefs(true);

    try {
      await updateUserPreferences(user?.id || '1', newPrefs);
      toast.success('Preferences saved!');
    } catch (err) {
      setPreferences(preferences); 
      if (key === 'theme') toggleTheme(); 
      toast.error('Failed to save preferences.');
    } finally {
      setIsSavingPrefs(false);
    }
  }, [preferences, toggleTheme, user?.id]);

  const handleLogout = useCallback(() => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      toast.info('Logged out successfully.');
    }
  }, [logout]);

  if (loading) return <div className="pt-20"><SpinnerLoader /></div>;
  if (error) return <div className="pt-20"><ErrorState message={error} onRetry={() => window.location.reload()} /></div>;
  if (!formData) return null;

  return (
    <div className={`space-y-8 max-w-4xl mx-auto min-h-screen relative pb-10 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <div className={`pb-6 border-b ${theme === 'light' ? 'border-gray-100' : 'border-gray-700'}`}>
        <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Account Settings</h1>
        <p className={`text-base font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Manage your profile, preferences, and account security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <ProfileSummary user={formData} onLogout={handleLogout} />
        </div>
        <div className="md:col-span-2 space-y-6">
            <PersonalInfoForm user={formData} onChange={handleProfileChange} onAvatarChange={handleAvatarChange} onSave={handleSaveProfile} isSaving={isSavingProfile} />
            <PreferencesForm preferences={preferences} onToggle={handleTogglePreference} isSaving={isSavingPrefs} />
            <SecuritySettings onUpdatePassword={handlePasswordChange} /> 
          </div>
      </div>
    </div>
  );
};

export default Settings;