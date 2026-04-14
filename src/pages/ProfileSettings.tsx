import React, { useState, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';
import PageLayout from '../components/PageLayout';
import { toast } from 'react-toastify';
import { 
  UserCircleIcon, 
  BellAlertIcon,
  ShieldCheckIcon,
  LifebuoyIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PencilSquareIcon,
  XMarkIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';

const INITIAL_PROFILE = {
  fullName: "Vasile Rodideal",
  ngoName: "Asociația O Masă Caldă",
  email: "contact@omasacalda.ro",
  phone: "+40 722 123 456",
  address: "Strada Speranței nr. 12, București",
  avatarUrl: null as string | null
};

// Componenta Buton Toggle
const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean, onChange: () => void }) => {
  const { theme } = useTheme();
  return (
    <button onClick={onChange} type="button" className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500  ${enabled ? 'bg-blue-600' : (theme === 'light' ? 'bg-gray-200' : 'bg-gray-700')}`}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
};

const ProfileSettings: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('general');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE-URI TAB 1: PROFIL ---
  const [profileData, setProfileData] = useState(INITIAL_PROFILE);
  const [tempProfileData, setTempProfileData] = useState(INITIAL_PROFILE);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // --- STATE-URI TAB 2: NOTIFICĂRI ---
  const [notifyPush, setNotifyPush] = useState(true);
  const [notifySms, setNotifySms] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(false);

  // --- STATE-URI TAB 3 & 4: SECURITATE & SUPORT ---
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  // --- LOGICĂ AVATAR ---
  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file (jpg, png).');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, avatarUrl: reader.result as string }));
        toast.success('Profile photo updated visually! Click Save to confirm.');
      };
      reader.readAsDataURL(file);
    }
  };

  // --- LOGICĂ EDITARE PROFIL ---
  const startEditing = () => {
    setTempProfileData(profileData);
    setIsEditingProfile(true);
  };

  const cancelEditing = () => setIsEditingProfile(false);

  const saveProfileChanges = () => {
    setProfileData(tempProfileData);
    setIsEditingProfile(false);
    toast.success('Profile details saved successfully! 💾');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempProfileData(prev => ({ ...prev, [name]: value }));
  };

  // --- LOGICĂ SIMULARE: UPDATE PASSWORD ---
  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword) {
      toast.error('Please fill in both password fields.');
      return;
    }
    if (newPassword.length < 6) {
      toast.warning('New password must be at least 6 characters long.');
      return;
    }
    // Simulare de succes
    toast.success('Security update: Password changed successfully! 🔒');
    setCurrentPassword('');
    setNewPassword('');
  };

  // --- LOGICĂ SIMULARE: SUBMIT TICKET ---
  const handleSubmitTicket = () => {
    if (!ticketMessage.trim()) {
      toast.error('Please describe your issue before submitting.');
      return;
    }
    // Simulare de succes
    toast.success('Ticket submitted! Our support team will contact you shortly. 📨');
    setTicketMessage('');
  };

  // Helper Notificări
  const handleSaveToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>, currentValue: boolean) => {
    setter(!currentValue);
    toast.success('Preferences updated successfully!');
  };

  const TABS = [
    { id: 'general', label: 'General Profile', icon: UserCircleIcon },
    { id: 'notifications', label: 'Notifications', icon: BellAlertIcon },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon },
    { id: 'support', label: 'Help & Support', icon: LifebuoyIcon },
  ];

  return (
    <PageLayout>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

      <div className={`w-full max-w-5xl mx-auto min-h-screen pb-12 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
        
        <div className="mb-8">
          <h1 className={`text-3xl font-extrabold tracking-tight mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Settings</h1>
          <p className={`text-base ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Manage your account settings and preferences.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Meniul Lateral */}
          <div className="w-full md:w-64 shrink-0 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
            <nav className="flex md:flex-col gap-2 min-w-max md:min-w-0">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap w-full ${isActive ? (theme === 'light' ? 'bg-blue-50 text-blue-700' : 'bg-blue-900/40 text-blue-400') : (theme === 'light' ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-400 hover:bg-gray-800')}`}>
                    <Icon className={`w-5 h-5 ${isActive ? (theme === 'light' ? 'text-blue-600' : 'text-blue-400') : 'text-gray-400'}`} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Zona de Conținut */}
          <div className={`flex-1 rounded-3xl border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
            
            {/* === TAB 1: GENERAL === */}
            {activeTab === 'general' && (
              <div className="p-6 md:p-8 animate-fade-in">
                <div className="flex items-center justify-between mb-8 gap-4">
                  <h2 className={`text-xl font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>General Profile</h2>
                  
                  {!isEditingProfile ? (
                    <button onClick={startEditing} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm border transition-colors ${theme === 'light' ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50' : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'}`}>
                      <PencilSquareIcon className="w-4 h-4 text-gray-400" />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button onClick={cancelEditing} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-sm ${theme === 'light' ? 'text-gray-500 hover:bg-gray-100' : 'text-gray-400 hover:bg-gray-700'}`}>
                        <XMarkIcon className="w-4 h-4" />
                        Cancel
                      </button>
                      <button onClick={saveProfileChanges} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md active:scale-95">
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 mb-10 items-start sm:items-center">
                  <div 
                    onClick={handleAvatarClick}
                    className={`relative w-28 h-28 rounded-full flex items-center justify-center border-4 shrink-0 cursor-pointer group overflow-hidden ${theme === 'light' ? 'bg-blue-100 text-blue-600 border-white shadow-md' : 'bg-blue-900/50 text-blue-400 border-gray-800'}`}
                  >
                    {profileData.avatarUrl ? (
                      <img src={profileData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl font-black tracking-tighter">VR</span>
                    )}
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white gap-1">
                      <CloudArrowUpIcon className="w-7 h-7" />
                      <span className="text-[10px] font-bold uppercase">Change photo</span>
                    </div>
                  </div>
                  <div>
                    <p className={`text-sm font-bold mb-1 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                      {profileData.ngoName}
                    </p>
                    <p className={`text-xs mb-3 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      Reprezentant: {profileData.fullName}
                    </p>
                    <button onClick={handleAvatarClick} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-xs border transition-colors ${theme === 'light' ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50' : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'}`}>
                      <CloudArrowUpIcon className="w-4 h-4 text-gray-400" />
                      Change Photo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-6 max-w-3xl">
                  {[
                    { label: 'Full Name', name: 'fullName', icon: UserCircleIcon, type: 'text' },
                    { label: 'NGO Name', name: 'ngoName', icon: BuildingOfficeIcon, type: 'text' },
                    { label: 'Email Address', name: 'email', icon: EnvelopeIcon, type: 'email' },
                    { label: 'Phone Number', name: 'phone', icon: PhoneIcon, type: 'text' },
                  ].map(field => {
                    const Icon = field.icon;
                    return (
                      <div key={field.name}>
                        <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wide ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{field.label}</label>
                        <div className={`flex items-center px-4 py-2.5 rounded-xl border transition-colors ${!isEditingProfile ? (theme === 'light' ? 'bg-gray-100 border-gray-200' : 'bg-gray-900/30 border-gray-700') : (theme === 'light' ? 'bg-gray-50 border-gray-300 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400' : 'bg-gray-900/80 border-gray-600 focus-within:border-blue-500')}`}>
                          <Icon className={`w-5 h-5 mr-3 shrink-0 ${!isEditingProfile ? 'text-gray-400' : 'text-blue-500'}`} />
                          <input 
                            type={field.type} 
                            name={field.name}
                            value={isEditingProfile ? tempProfileData[field.name as keyof typeof INITIAL_PROFILE] || '' : profileData[field.name as keyof typeof INITIAL_PROFILE] || ''}
                            onChange={handleInputChange}
                            disabled={!isEditingProfile}
                            className={`bg-transparent w-full outline-none text-sm font-medium ${!isEditingProfile ? (theme === 'light' ? 'text-gray-600' : 'text-gray-400') : 'text-gray-900 dark:text-white'}`} 
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mb-8 max-w-3xl">
                  <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wide ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Headquarters Address</label>
                  <div className={`flex items-center px-4 py-2.5 rounded-xl border transition-colors ${!isEditingProfile ? (theme === 'light' ? 'bg-gray-100 border-gray-200' : 'bg-gray-900/30 border-gray-700') : (theme === 'light' ? 'bg-gray-50 border-gray-300 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400' : 'bg-gray-900/80 border-gray-600 focus-within:border-blue-500')}`}>
                    <MapPinIcon className={`w-5 h-5 mr-3 shrink-0 ${!isEditingProfile ? 'text-gray-400' : 'text-blue-500'}`} />
                    <input 
                      type="text" 
                      name="address"
                      value={isEditingProfile ? tempProfileData.address : profileData.address}
                      onChange={handleInputChange}
                      disabled={!isEditingProfile}
                      className={`bg-transparent w-full outline-none text-sm font-medium ${!isEditingProfile ? (theme === 'light' ? 'text-gray-600' : 'text-gray-400') : 'text-gray-900 dark:text-white'}`} 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* === TAB 2: NOTIFICATIONS (Reparat) === */}
            {activeTab === 'notifications' && (
              <div className="p-6 md:p-8 animate-fade-in">
                <h2 className={`text-xl font-extrabold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Alert Preferences</h2>
                <p className={`text-sm mb-10 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Choose how you want to be notified about rescued food.</p>
                <div className="space-y-4 max-w-2xl">
                  
                  {/* Push Row */}
                  <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border ${theme === 'light' ? 'bg-gray-50/80 border-gray-200' : 'bg-gray-800/50 border-gray-700'}`}>
                    <div>
                      <h4 className={`text-sm font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Push Notifications</h4>
                      <p className={`text-xs mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Instant browser alerts for urgent food.</p>
                    </div>
                    <ToggleSwitch enabled={notifyPush} onChange={() => handleSaveToggle(setNotifyPush, notifyPush)} />
                  </div>

                  {/* SMS Row */}
                  <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border ${theme === 'light' ? 'bg-gray-50/80 border-gray-200' : 'bg-gray-800/50 border-gray-700'}`}>
                    <div>
                      <h4 className={`text-sm font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>SMS Alerts</h4>
                      <p className={`text-xs mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Text messages for critical donations.</p>
                    </div>
                    <ToggleSwitch enabled={notifySms} onChange={() => handleSaveToggle(setNotifySms, notifySms)} />
                  </div>

                  {/* Email Row */}
                  <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border ${theme === 'light' ? 'bg-gray-50/80 border-gray-200' : 'bg-gray-800/50 border-gray-700'}`}>
                    <div>
                      <h4 className={`text-sm font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Email Digest</h4>
                      <p className={`text-xs mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Daily summary of completed pickups.</p>
                    </div>
                    <ToggleSwitch enabled={notifyEmail} onChange={() => handleSaveToggle(setNotifyEmail, notifyEmail)} />
                  </div>

                </div>
              </div>
            )}

            {/* === TAB 3: SECURITY (Adăugat funcționalitate) === */}
            {activeTab === 'security' && (
              <div className="p-6 md:p-8 animate-fade-in">
                <h2 className={`text-xl font-extrabold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Security Settings</h2>
                <div className="mb-10 max-w-md">
                  <h3 className={`text-sm font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>Change Password</h3>
                  <div className="space-y-4">
                    <input 
                      type="password" 
                      placeholder="Current Password" 
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border outline-none text-sm transition-colors ${theme === 'light' ? 'bg-gray-50 border-gray-200 focus:border-blue-400 focus:bg-white' : 'bg-gray-900/50 border-gray-700 focus:border-blue-500 focus:bg-gray-900'}`} 
                    />
                    <input 
                      type="password" 
                      placeholder="New Password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border outline-none text-sm transition-colors ${theme === 'light' ? 'bg-gray-50 border-gray-200 focus:border-blue-400 focus:bg-white' : 'bg-gray-900/50 border-gray-700 focus:border-blue-500 focus:bg-gray-900'}`} 
                    />
                    <button 
                      onClick={handleUpdatePassword}
                      className="px-6 py-2.5 bg-gray-900 hover:bg-black dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-bold rounded-xl transition-all text-sm shadow active:scale-95"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-extrabold mb-2 text-red-600 dark:text-red-400">Danger Zone</h3>
                  <p className={`text-sm mb-5 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Permanently delete your NGO account and all associated rescue data. This action cannot be undone.</p>
                  <button className={`px-6 py-2.5 font-bold rounded-xl transition-all border ${theme === 'light' ? 'border-red-200 text-red-600 hover:bg-red-50' : 'border-red-900/50 text-red-400 hover:bg-red-900/20'}`}>Delete Account</button>
                </div>
              </div>
            )}

            {/* === TAB 4: SUPPORT (Adăugat funcționalitate) === */}
            {activeTab === 'support' && (
              <div className="p-6 md:p-8 animate-fade-in">
                <div className="flex items-center gap-4 mb-10 p-5 rounded-2xl border dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
                  <div className={`p-3 rounded-2xl ${theme === 'light' ? 'bg-blue-50 text-blue-600' : 'bg-blue-900/30 text-blue-400'}`}>
                    <LifebuoyIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className={`text-xl font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Help & Support</h2>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Need assistance? Send us a message and we'll get back to you.</p>
                  </div>
                </div>

                <div className="max-w-2xl">
                  <h3 className={`text-base font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>Send us a message</h3>
                  <textarea 
                    placeholder="Describe your issue or question in detail. Mention donation IDs if applicable..." 
                    rows={6}
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    className={`w-full px-4 py-3 rounded-2xl border outline-none text-sm resize-none mb-4 transition-colors ${theme === 'light' ? 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-400 focus:bg-white' : 'bg-gray-900/50 border-gray-700 text-white focus:border-blue-500 focus:bg-gray-900'}`} 
                  />
                  <button 
                    onClick={handleSubmitTicket}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md active:scale-95 w-full sm:w-auto"
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