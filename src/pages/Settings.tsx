import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { SpinnerLoader, ErrorState } from '../components/UI/StateIndicators';
import { 
  UserIcon, 
  BriefcaseIcon, 
  Cog6ToothIcon, 
  ShieldCheckIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { updateUserProfile, fetchUserPreferences, updateUserPreferences } from '../services/userService';


import ProfileSummary from '../components/ProfileSummary';
import PersonalInfoForm from '../components/PersonalInfoForm';
import PreferencesForm from '../components/PreferencesForm';
import SecuritySettings from '../components/SecuritySettings';
import BusinessProfileForm from '../components/BusinessProfileForm';
import PickupLocations from '../components/PickupLocations';
import DocumentManager from '../components/DocumentManager';
import NgoProfileForm from '../components/NgoProfileForm';
import NgoDocumentManager from '../components/NgoDocumentManager';
import ReportProblemForm from '../components/ReportProblemForm';

interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  emailUpdates: boolean;
}

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, updateUser } = useAuth(); 
  const location = useLocation();
  
  const [formData, setFormData] = useState(user);
  const [preferences, setPreferences] = useState<UserPreferences>({ theme: 'light', notifications: true, emailUpdates: true });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPrefs, setIsSavingPrefs] = useState(false);

  type TabId = 'profile' | 'business' | 'ngo' | 'preferences' | 'security' | 'support';
  const [activeTab, setActiveTab] = useState<TabId>('profile');

  const tabs = [
    { id: 'profile' as TabId, label: 'Profile Settings', icon: UserIcon },
    ...(user?.role?.toLowerCase() === 'donator' ? [{ id: 'business' as TabId, label: 'Business Details', icon: BriefcaseIcon }] : []),
    ...(user?.role?.toLowerCase() === 'receiver' || user?.role?.toLowerCase() === 'ngo' ? [{ id: 'ngo' as TabId, label: 'Organization Details', icon: BriefcaseIcon }] : []),
    { id: 'preferences' as TabId, label: 'Preferences', icon: Cog6ToothIcon },
    { id: 'security' as TabId, label: 'Security', icon: ShieldCheckIcon },
    { id: 'support' as TabId, label: 'Report a Problem', icon: ExclamationCircleIcon },
  ];

  useEffect(() => {
    if (location.state && (location.state as any).activeTab) {
      setActiveTab((location.state as any).activeTab);
    }
  }, [location.state]);

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
      await updateUserProfile(user.id, formData as any);
      updateUser(formData as any);
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


  const handlePasswordChange = async (oldPw: string, _newPw: string) => {
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


  if (loading) return <div className="pt-20"><SpinnerLoader /></div>;
  if (error) return <div className="pt-20"><ErrorState message={error} onRetry={() => window.location.reload()} /></div>;
  if (!formData || !user) return null;

  return (
    <div className="space-y-8 max-w-7xl mx-auto min-h-screen relative pb-10 bg-transparent">
      

      <div className={`pb-6 border-b ${theme === 'light' ? 'border-gray-100' : 'border-gray-700'}`}>
        <h1 className={`text-3xl md:text-4xl font-bold tracking-tight mb-2 ${theme === 'light' ? 'text-[#1a1a1a]' : 'text-gray-100'}`} style={{ fontFamily: 'var(--font-display)' }}>
          Account Settings
        </h1>
        <p className={`text-base font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
          Manage your profile, preferences, and account security.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors text-left ${
                    isActive
                      ? 'bg-[#16a34a] text-white shadow-md'
                      : theme === 'light'
                      ? 'text-gray-600 hover:bg-[#16a34a]/10 hover:text-[#16a34a] border border-transparent'
                      : 'text-gray-400 hover:bg-[#222222] hover:text-[#16a34a] border border-transparent'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {activeTab === 'profile' && (
              <div className="animate-fade-in-up space-y-8">
                <div className="w-full max-w-md">
                  <ProfileSummary user={formData as any} />
                </div>
                <PersonalInfoForm 
                  user={formData as any} 
                  onChange={handleProfileChange} 
                  onAvatarChange={handleAvatarChange} 
                  onSave={handleSaveProfile} 
                  isSaving={isSavingProfile} 
                />
              </div>
            )}
            
            {activeTab === 'business' && (user.role ?? '').toLowerCase() === 'donator' && (
              <div className="space-y-6 animate-fade-in-up">
                <BusinessProfileForm />
                <PickupLocations />
                <DocumentManager />
              </div>
            )}

            {activeTab === 'ngo' && ((user.role ?? '').toLowerCase() === 'receiver' || (user.role ?? '').toLowerCase() === 'ngo') && (
              <div className="space-y-6 animate-fade-in-up">
                <NgoProfileForm />
                <NgoDocumentManager />
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="animate-fade-in-up">
                <PreferencesForm 
                  preferences={preferences} 
                  onToggle={handleTogglePreference} 
                  isSaving={isSavingPrefs} 
                />
              </div>
            )}
            
            {activeTab === 'security' && (
              <div className="animate-fade-in-up">
                <SecuritySettings 
                  onUpdatePassword={handlePasswordChange} 
                />
              </div>
            )}

            {activeTab === 'support' && (
              <div className="animate-fade-in-up">
                <ReportProblemForm />
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
};

export default Settings;