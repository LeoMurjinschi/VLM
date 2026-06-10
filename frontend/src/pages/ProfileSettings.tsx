import React, { useState, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';
import PageLayout from '../components/PageLayout';
import { toast } from 'react-toastify';
import {
  UserCircleIcon,
  BellAlertIcon,
  ShieldCheckIcon,
  LifebuoyIcon,
  CloudArrowUpIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { validateEmail, validatePassword } from '../utils/validationUtils';

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => {
  const { theme } = useTheme();
  return (
    <button
      onClick={onChange}
      type="button"
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#16a34a]/50 ${
        enabled ? 'bg-[#16a34a]' : theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

const ProfileSettings: React.FC = () => {
  const { theme } = useTheme();
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // === GENERAL TAB STATE ===
  const [fullName, setFullName] = useState((user?.name || '').slice(0, 100));
  const [email, setEmail] = useState((user?.email || '').slice(0, 255));
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || (null as string | null));
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // === SECURITY TAB STATE ===
  const [currentPassword, setCurrentPassword] = useState(''.slice(0, 128));
  const [newPassword, setNewPassword] = useState(''.slice(0, 128));
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});

  // === SUPPORT TAB STATE ===
  const [ticketMessage, setTicketMessage] = useState(''.slice(0, 2000));
  const [ticketError, setTicketError] = useState('');

  // === NOTIFICATIONS TAB STATE ===
  const [notifyPush, setNotifyPush] = useState(true);
  const [notifySms, setNotifySms] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(false);

  // === AVATAR HANDLING ===
  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Upload an image (JPG or PNG)');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarUrl(reader.result as string);
      toast.success('Avatar preview updated. Click Save to apply.');
    };
    reader.readAsDataURL(file);
  };

  // === GENERAL TAB VALIDATION ===
  const validateProfileField = (fieldName: string, value: string) => {
    let error = '';

    switch (fieldName) {
      case 'fullName':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.length < 3) {
          error = 'Name must be at least 3 characters';
        } else if (value.length > 100) {
          error = 'Name cannot exceed 100 characters';
        }
        break;

      case 'email':
        const emailVal = validateEmail(value);
        if (emailVal.error) error = emailVal.error;
        break;
    }

    if (error) {
      setProfileErrors((prev) => ({ ...prev, [fieldName]: error }));
    } else {
      setProfileErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const validateProfileForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.length < 3 || fullName.length > 100) {
      newErrors.fullName = 'Name must be 3-100 characters';
    }

    const emailVal = validateEmail(email);
    if (emailVal.error) newErrors.email = emailVal.error;

    setProfileErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveProfile = async () => {
    if (!validateProfileForm()) {
      toast.error('Please fix errors below');
      return;
    }

    setIsSavingProfile(true);
    try {
      updateUser({
        name: fullName.trim(),
        email: email.trim(),
        ...(avatarUrl ? { avatar: avatarUrl } : {}),
      });
      toast.success('Profile saved successfully!');
    } catch {
      toast.error('Failed to save profile');
    } finally {
      setIsSavingProfile(false);
    }
  };

  // === SECURITY TAB VALIDATION ===
  const validatePasswordField = (fieldName: string, value: string) => {
    let error = '';

    if (fieldName === 'currentPassword') {
      if (!value) error = 'Current password is required';
    } else if (fieldName === 'newPassword') {
      const passVal = validatePassword(value);
      if (passVal.error) error = passVal.error;
    }

    if (error) {
      setPasswordErrors((prev) => ({ ...prev, [fieldName]: error }));
    } else {
      setPasswordErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const validatePasswordForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    const passVal = validatePassword(newPassword);
    if (passVal.error) newErrors.newPassword = passVal.error;

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdatePassword = () => {
    if (!validatePasswordForm()) {
      toast.error('Please fix errors below');
      return;
    }

    toast.success('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setPasswordErrors({});
  };

  // === SUPPORT TAB VALIDATION ===
  const validateTicket = (): boolean => {
    const msg = ticketMessage.trim();
    if (!msg || msg.length < 10 || msg.length > 2000) {
      setTicketError('Message must be 10-2000 characters');
      return false;
    }
    setTicketError('');
    return true;
  };

  const handleSubmitTicket = () => {
    if (!validateTicket()) return;

    toast.success('Your issue submitted. Our team will help you soon.');
    setTicketMessage('');
  };

  // === NOTIFICATIONS TAB ===
  const handleSaveToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>, currentValue: boolean) => {
    setter(!currentValue);
    toast.success('Preference updated.');
  };

  // === FORM VALIDITY ===
  const isProfileFormValid =
    Object.keys(profileErrors).length === 0 && fullName.trim() && email.trim();
  const isPasswordFormValid =
    Object.keys(passwordErrors).length === 0 && currentPassword && newPassword;

  // === INPUT STYLING ===
  const inputClass = (hasError: boolean = false) =>
    `w-full px-4 py-3 rounded-xl border transition-all outline-none focus:ring-2 ${
      hasError
        ? theme === 'light'
          ? 'bg-white border-red-500 focus:ring-red-500/30 focus:border-red-500 text-gray-900'
          : 'bg-[#222222] border-red-500 focus:ring-red-500/30 focus:border-red-500 text-gray-100'
        : theme === 'light'
        ? 'bg-white border-gray-200 focus:border-[#16a34a] focus:ring-[#16a34a]/30 text-gray-900 placeholder-gray-400'
        : 'bg-[#222222] border-[#2e2e2e] focus:border-[#16a34a] focus:ring-[#16a34a]/30 text-gray-100 placeholder-gray-500'
    }`;

  const TABS = [
    { id: 'general', label: 'General Profile', icon: UserCircleIcon },
    { id: 'notifications', label: 'Notifications', icon: BellAlertIcon },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon },
    { id: 'support', label: 'Help & Support', icon: LifebuoyIcon },
  ];

  return (
    <PageLayout>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png"
        className="hidden"
      />

      <div className={`w-full max-w-5xl mx-auto min-h-screen pb-12 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
        <div className="mb-8">
          <h1 className={`text-3xl font-extrabold tracking-tight mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
            Settings
          </h1>
          <p className={`text-base ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* TAB NAVIGATION */}
          <div className="w-full md:w-64 shrink-0 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            <nav className="flex md:flex-col gap-2 min-w-max md:min-w-0">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                      isActive
                        ? theme === 'light'
                          ? 'bg-[#16a34a]/10 text-[#16a34a]'
                          : 'bg-green-900/30 text-green-400'
                        : theme === 'light'
                        ? 'text-gray-600 hover:bg-gray-100'
                        : 'text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* TAB CONTENT */}
          <div className={`flex-1 rounded-3xl border shadow-sm ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>

            {/* === TAB 1: GENERAL === */}
            {activeTab === 'general' && (
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-[#16a34a]/10' : 'bg-[#16a34a]/20'}`}>
                    <UserCircleIcon className={`w-6 h-6 ${theme === 'light' ? 'text-[#16a34a]' : 'text-green-400'}`} />
                  </div>
                  <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
                    General Profile
                  </h2>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 mb-10 items-start sm:items-center">
                  <div
                    onClick={handleAvatarClick}
                    className={`relative w-28 h-28 rounded-full flex items-center justify-center border-4 shrink-0 cursor-pointer group overflow-hidden ${
                      theme === 'light'
                        ? 'bg-[#16a34a]/10 text-[#16a34a] border-white shadow-md'
                        : 'bg-green-900/40 text-green-400 border-gray-800'
                    }`}
                  >
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl font-black tracking-tighter">
                        {getInitials(fullName || 'U')}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white gap-1">
                      <CloudArrowUpIcon className="w-7 h-7" />
                      <span className="text-[10px] font-bold uppercase">Change photo</span>
                    </div>
                  </div>
                  <div>
                    <p className={`text-sm font-bold mb-1 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                      {fullName || user?.name}
                    </p>
                    <p className={`text-xs mb-3 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      {user?.role === 'donor'
                        ? 'Donor'
                        : user?.role === 'receiver'
                        ? 'Receiver'
                        : 'Admin'}{' '}
                      · {email || user?.email}
                    </p>
                    <button
                      onClick={handleAvatarClick}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-xs border transition-colors ${
                        theme === 'light'
                          ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <CloudArrowUpIcon className="w-4 h-4 text-gray-400" />
                      Change Photo
                    </button>
                  </div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); saveProfile(); }} className="space-y-5 max-w-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        maxLength={100}
                        value={fullName}
                        onChange={(e) => {
                          const val = e.target.value.slice(0, 100);
                          setFullName(val);
                          validateProfileField('fullName', val);
                        }}
                        className={inputClass(!!profileErrors.fullName)}
                        placeholder="e.g., John Doe"
                      />
                      {profileErrors.fullName && (
                        <p className="text-red-500 text-sm mt-1">{profileErrors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        maxLength={255}
                        value={email}
                        onChange={(e) => {
                          const val = e.target.value.slice(0, 255);
                          setEmail(val);
                          validateProfileField('email', val);
                        }}
                        className={inputClass(!!profileErrors.email)}
                        placeholder="your.email@example.com"
                      />
                      {profileErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{profileErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSavingProfile || !isProfileFormValid}
                      className={`flex items-center gap-2 px-6 py-3 bg-[#16a34a] hover:bg-green-700 text-white font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md`}
                    >
                      {isSavingProfile ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <CheckCircleIcon className="w-5 h-5" />
                      )}
                      Save Profile
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* === TAB 2: NOTIFICATIONS === */}
            {activeTab === 'notifications' && (
              <div className="p-6 md:p-8">
                <h2 className={`text-xl font-extrabold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
                  Alert Preferences
                </h2>
                <div className="space-y-4 max-w-2xl">
                  {[
                    {
                      label: 'Push Notifications',
                      desc: 'Instant browser alerts for urgent food',
                      state: notifyPush,
                      setter: setNotifyPush,
                    },
                    {
                      label: 'SMS Alerts',
                      desc: 'Text messages for critical donations',
                      state: notifySms,
                      setter: setNotifySms,
                    },
                    {
                      label: 'Email Digest',
                      desc: 'Daily summary of completed pickups',
                      state: notifyEmail,
                      setter: setNotifyEmail,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border ${
                        theme === 'light'
                          ? 'bg-gray-50/80 border-gray-200'
                          : 'bg-gray-800/50 border-gray-700'
                      }`}
                    >
                      <div>
                        <h4 className={`text-sm font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
                          {item.label}
                        </h4>
                        <p className={`text-xs mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                          {item.desc}
                        </p>
                      </div>
                      <ToggleSwitch
                        enabled={item.state}
                        onChange={() => handleSaveToggle(item.setter, item.state)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* === TAB 3: SECURITY === */}
            {activeTab === 'security' && (
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-[#16a34a]/10' : 'bg-[#16a34a]/20'}`}>
                    <ShieldCheckIcon className={`w-6 h-6 ${theme === 'light' ? 'text-[#16a34a]' : 'text-green-400'}`} />
                  </div>
                  <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
                    Security Settings
                  </h2>
                </div>

                <div className="mb-10 max-w-md">
                  <h3 className={`text-sm font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                    Change Password *
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <input
                        type="password"
                        maxLength={128}
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => {
                          const val = e.target.value.slice(0, 128);
                          setCurrentPassword(val);
                          validatePasswordField('currentPassword', val);
                        }}
                        className={inputClass(!!passwordErrors.currentPassword)}
                      />
                      {passwordErrors.currentPassword && (
                        <p className="text-red-500 text-sm mt-1">{passwordErrors.currentPassword}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="password"
                        maxLength={128}
                        placeholder="New Password (8+ chars, uppercase, number, special)"
                        value={newPassword}
                        onChange={(e) => {
                          const val = e.target.value.slice(0, 128);
                          setNewPassword(val);
                          validatePasswordField('newPassword', val);
                        }}
                        className={inputClass(!!passwordErrors.newPassword)}
                      />
                      {passwordErrors.newPassword && (
                        <p className="text-red-500 text-sm mt-1">{passwordErrors.newPassword}</p>
                      )}
                      {newPassword && !passwordErrors.newPassword && (
                        <p className="text-green-600 text-sm mt-1">✓ Strong password</p>
                      )}
                    </div>

                    <button
                      onClick={handleUpdatePassword}
                      disabled={!isPasswordFormValid}
                      className={`px-6 py-2.5 bg-[#16a34a] hover:bg-green-700 text-white font-bold rounded-xl transition-all text-sm shadow active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                <div className={`pt-8 border-t ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
                  <h3 className="text-lg font-extrabold mb-2 text-red-600 dark:text-red-400">
                    Danger Zone
                  </h3>
                  <p className={`text-sm mb-5 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <button
                    className={`px-6 py-2.5 font-bold rounded-xl transition-all border ${
                      theme === 'light'
                        ? 'border-red-200 text-red-600 hover:bg-red-50'
                        : 'border-red-900/50 text-red-400 hover:bg-red-900/20'
                    }`}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* === TAB 4: SUPPORT === */}
            {activeTab === 'support' && (
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-10 p-5 rounded-2xl border dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
                  <div className={`p-3 rounded-2xl ${theme === 'light' ? 'bg-[#16a34a]/10' : 'bg-green-900/30'}`}>
                    <LifebuoyIcon className={`w-8 h-8 ${theme === 'light' ? 'text-[#16a34a]' : 'text-green-400'}`} />
                  </div>
                  <div>
                    <h2 className={`text-xl font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
                      Help & Support
                    </h2>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Need assistance? Send us a message and we'll get back to you.
                    </p>
                  </div>
                </div>

                <div className="max-w-2xl">
                  <h3 className={`text-base font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                    Send us a message *
                  </h3>
                  <textarea
                    maxLength={2000}
                    placeholder="Describe your issue or question in detail (10-2000 characters)..."
                    rows={6}
                    value={ticketMessage}
                    onChange={(e) => {
                      const val = e.target.value.slice(0, 2000);
                      setTicketMessage(val);
                      if (val.trim()) setTicketError('');
                    }}
                    className={`w-full px-4 py-3 rounded-2xl border outline-none text-sm resize-none mb-2 transition-colors ${
                      ticketError
                        ? theme === 'light'
                          ? 'bg-white border-red-500 text-gray-900 focus:border-red-500'
                          : 'bg-[#222222] border-red-500 text-white focus:border-red-500'
                        : theme === 'light'
                        ? 'bg-white border-gray-200 text-gray-900 focus:border-[#16a34a]'
                        : 'bg-[#222222] border-[#2e2e2e] text-white focus:border-green-500'
                    }`}
                  />
                  <div className="flex justify-between items-center mb-4">
                    <p className={`text-xs ${ticketError ? 'text-red-500' : theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      {ticketMessage.length}/2000 characters
                    </p>
                    {ticketError && <p className="text-red-500 text-sm">{ticketError}</p>}
                  </div>
                  <button
                    onClick={handleSubmitTicket}
                    className={`px-8 py-3 bg-[#16a34a] hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-md active:scale-95`}
                  >
                    Submit Ticket
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProfileSettings;
