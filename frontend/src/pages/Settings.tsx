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
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { profileService, settingsService, userService } from '../api';
import type { UserProfileDto } from '../api/profileService';
import type { UserSettingsDto } from '../api/settingsService';

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

type SettingsKey = 'theme' | 'notifyPush' | 'notifySms' | 'notifyEmail' | 'emailUpdates';

const defaultSettings: UserSettingsDto = {
  userId: 0,
  theme: 'light',
  notifyPush: true,
  notifySms: false,
  notifyEmail: true,
  emailUpdates: true,
};

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, updateUser } = useAuth();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    phone: '',
  });
  const [profileData, setProfileData] = useState<UserProfileDto | null>(null);
  const [settingsData, setSettingsData] = useState<UserSettingsDto>(defaultSettings);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPrefs, setIsSavingPrefs] = useState(false);

  type TabId = 'profile' | 'business' | 'ngo' | 'preferences' | 'security' | 'support';
  const [activeTab, setActiveTab] = useState<TabId>('profile');

  const tabs = [
    { id: 'profile' as TabId, label: 'Profile Settings', icon: UserIcon },
    ...(user?.role === 'donor' ? [{ id: 'business' as TabId, label: 'Business Details', icon: BriefcaseIcon }] : []),
    ...(user?.role === 'receiver' ? [{ id: 'ngo' as TabId, label: 'Organization Details', icon: BriefcaseIcon }] : []),
    { id: 'preferences' as TabId, label: 'Preferences', icon: Cog6ToothIcon },
    { id: 'security' as TabId, label: 'Security', icon: ShieldCheckIcon },
    { id: 'support' as TabId, label: 'Report a Problem', icon: ExclamationCircleIcon },
  ];

  useEffect(() => {
    if (location.state && (location.state as Record<string, unknown>).activeTab) {
      setActiveTab((location.state as Record<string, string>).activeTab as TabId);
    }
  }, [location.state]);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    const userId = parseInt(user.id);
    Promise.all([
      profileService.getByUser(userId).catch(() => null),
      settingsService.getByUser(userId).catch(() => null),
    ]).then(([profile, settings]) => {
      if (profile) {
        setProfileData(profile);
        setFormData(prev => ({ ...prev, phone: profile.phone || '' }));
      }
      if (settings) {
        setSettingsData(settings);
      }
    }).catch(() => {
      setError('Failed to load account settings.');
    }).finally(() => setLoading(false));
  }, [user]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
        avatar: user.avatar || '',
      }));
    }
  }, [user]);

  const handleProfileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleAvatarChange = useCallback((newAvatarBase64: string) => {
    setFormData(prev => ({ ...prev, avatar: newAvatarBase64 }));
  }, []);

  const handleSaveProfile = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSavingProfile(true);
    const userId = parseInt(user.id);
    try {
      await Promise.all([
        userService.updateInfo(userId, {
          name: formData.name,
          email: formData.email,
          avatar: formData.avatar || undefined,
        }),
        profileService.save({
          ...(profileData ?? { operatingRadius: 10, hasIndustrialStorage: false, verified: false }),
          userId,
          phone: formData.phone,
        }),
      ]);
      updateUser({ name: formData.name, email: formData.email, avatar: formData.avatar || undefined });
      toast.success('Profile updated successfully!');
    } catch {
      toast.error('Failed to update profile.');
    } finally {
      setIsSavingProfile(false);
    }
  }, [formData, user, updateUser]);

  const handleTogglePreference = useCallback(async (key: SettingsKey) => {
    const prev = settingsData;
    const next: UserSettingsDto = { ...prev };
    if (key === 'theme') {
      next.theme = prev.theme === 'light' ? 'dark' : 'light';
      toggleTheme();
    } else {
      (next as unknown as Record<string, unknown>)[key] = !prev[key as keyof UserSettingsDto];
    }
    setSettingsData(next);
    setIsSavingPrefs(true);
    try {
      await settingsService.save(next);
      toast.success('Preferences saved!');
    } catch {
      setSettingsData(prev);
      if (key === 'theme') toggleTheme();
      toast.error('Failed to save preferences.');
    } finally {
      setIsSavingPrefs(false);
    }
  }, [settingsData, toggleTheme]);

  const handlePasswordChange = async (oldPw: string, newPw: string) => {
    if (!user) throw new Error('Not authenticated');
    await userService.changePassword(parseInt(user.id), oldPw, newPw);
  };

  if (loading) return <div className="pt-20"><SpinnerLoader /></div>;
  if (error) return <div className="pt-20"><ErrorState message={error} onRetry={() => window.location.reload()} /></div>;
  if (!user) return null;

  const profileUser = { ...user, phone: formData.phone, name: formData.name, email: formData.email, avatar: formData.avatar };

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
                  <ProfileSummary user={profileUser as any} />
                </div>
                <PersonalInfoForm
                  user={profileUser as any}
                  onChange={handleProfileChange}
                  onAvatarChange={handleAvatarChange}
                  onSave={handleSaveProfile}
                  isSaving={isSavingProfile}
                />
              </div>
            )}

            {activeTab === 'business' && user.role === 'donor' && (
              <div className="space-y-6 animate-fade-in-up">
                <BusinessProfileForm />
                <PickupLocations />
                <DocumentManager />
              </div>
            )}

            {activeTab === 'ngo' && user.role === 'receiver' && (
              <div className="space-y-6 animate-fade-in-up">
                <NgoProfileForm />
                <NgoDocumentManager />
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="animate-fade-in-up">
                <PreferencesForm
                  settings={settingsData}
                  onToggle={handleTogglePreference}
                  isSaving={isSavingPrefs}
                />
              </div>
            )}

            {activeTab === 'security' && (
              <div className="animate-fade-in-up">
                <SecuritySettings onUpdatePassword={handlePasswordChange} />
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
