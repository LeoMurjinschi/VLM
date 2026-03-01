import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../hooks/useTheme';
import { toast } from 'react-toastify';
import { SpinnerLoader, ErrorState } from '../components/UI/StateIndicators';
import { 
  fetchCurrentUser, 
  updateUserProfile, 
  fetchUserPreferences, 
  updateUserPreferences,
  logout
} from '../services/userService';
import type { User } from '../_mock';

interface UserPreferences {
    theme: 'light' | 'dark';
    notifications: boolean;
    emailUpdates: boolean;
  }

import ProfileSummary from '../components/ProfileSummary';
import PersonalInfoForm from '../components/PersonalInfoForm';
import PreferencesForm from '../components/PreferencesForm';
import SecuritySettings from '../components/SecuritySettings';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences>({ 
    theme: 'light', 
    notifications: true, 
    emailUpdates: true 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPrefs, setIsSavingPrefs] = useState(false);

  

  const loadSettingsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
 
      const [userData, prefsData] = await Promise.all([
        fetchCurrentUser(),
        fetchUserPreferences()
      ]);
      setUser(userData);
      setPreferences(prefsData as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load settings.');
      toast.error('Could not load user data from server.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettingsData();
  }, [loadSettingsData]);

  const handleProfileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    setUser({ ...user, [e.target.name]: e.target.value });
  }, [user]);

  const handleSaveProfile = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSavingProfile(true);
    try {

      const updatedUser = await updateUserProfile(user.id, user);
      setUser(updatedUser);
      toast.success('Profile updated successfully! ');
    } catch (err) {
      toast.error('Failed to update profile. Server error.');
    } finally {
      setIsSavingProfile(false);
    }
  }, [user]);

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
      toast.error('Failed to save preferences. Server error.');
    } finally {
      setIsSavingPrefs(false);
    }
  }, [preferences, toggleTheme, user?.id]);

  const handleLogout = useCallback(async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      try {
        await logout();
        toast.info('Logged out successfully.');
      } catch (err) {
        toast.error('Logout failed.');
      }
    }
  }, []);

  if (loading) return <div className="pt-20"><SpinnerLoader /></div>;
  if (error) return <div className="pt-20"><ErrorState message={error} onRetry={loadSettingsData} /></div>;
  if (!user) return null;

  return (
    <div className={`space-y-8 max-w-4xl mx-auto min-h-screen relative pb-10 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
      

      <div className={`pb-6 border-b ${theme === 'light' ? 'border-gray-100' : 'border-gray-700'}`}>
        <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
          Account Settings
        </h1>
        <p className={`text-base font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
          Manage your profile, preferences, and account security.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="md:col-span-1">
          <ProfileSummary user={user} onLogout={handleLogout} />
        </div>


        <div className="md:col-span-2 space-y-6">
          <PersonalInfoForm 
            user={user} 
            onChange={handleProfileChange} 
            onSave={handleSaveProfile} 
            isSaving={isSavingProfile} 
          />
          <PreferencesForm 
            preferences={preferences} 
            onToggle={handleTogglePreference} 
            isSaving={isSavingPrefs} 
          />
          <SecuritySettings />
        </div>
      </div>
    </div>
  );
};

export default Settings;