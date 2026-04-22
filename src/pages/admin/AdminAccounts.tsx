import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { MOCK_ADMIN_ACCOUNTS, type AdminAccount } from '../../_mock/adminMockData';
import { toast } from 'react-toastify';
import { 
  NoSymbolIcon, 
  CheckCircleIcon, 
  ShieldExclamationIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
  ChatBubbleOvalLeftEllipsisIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/ui/Modal';

const AdminAccounts: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<AdminAccount[]>(MOCK_ADMIN_ACCOUNTS);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'deactivate' | 'reactivate' | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<AdminAccount | null>(null);
  const [actionMessage, setActionMessage] = useState('');

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [viewingProfileData, setViewingProfileData] = useState<AdminAccount | null>(null);

  const handleActionClick = (acc: AdminAccount, type: 'deactivate' | 'reactivate') => {
    setSelectedAccount(acc);
    setActionType(type);
    setActionMessage('');
    setModalOpen(true);
  };

  const confirmAction = () => {
    if (!selectedAccount || !actionType) return;

    if (!actionMessage.trim()) {
      toast.error('Please provide a message outlining the reason to the user.');
      return;
    }

    const newStatus = actionType === 'deactivate' ? 'inactive' : 'active';
    setAccounts(prev => prev.map(acc => 
      acc.id === selectedAccount.id ? { ...acc, status: newStatus as 'active' | 'inactive' } : acc
    ));
    toast.success(`Account ${newStatus === 'active' ? 'reactivated' : 'suspended'}. Email notice sent to ${selectedAccount.email}.`);

    setModalOpen(false);
    setSelectedAccount(null);
    setActionType(null);
  };

  const openMessages = (acc: AdminAccount | null) => {
    if (acc) {
      navigate('/admin/messages', { state: { openChatWith: { name: acc.name, role: acc.role } } });
    }
  };

  const handleViewProfile = (acc: AdminAccount) => {
    setViewingProfileData(acc);
    setProfileModalOpen(true);
  };

  const totalViolations = (acc: AdminAccount) => acc.violations + acc.deletedDonations + acc.deletedReviews;

  return (
    <div className="space-y-6 max-w-7xl mx-auto min-h-screen relative animate-fade-in-up">
      {/* Header */}
      <div className={`pb-6 border-b ${theme === 'light' ? 'border-gray-200/60' : 'border-[#2e2e2e]'}`}>
        <h1 className={`text-3xl font-bold tracking-tight mb-2 ${theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'}`} style={{ fontFamily: 'var(--font-display)' }}>
          Account Management
        </h1>
        <p className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'}>
          Manage existing user accounts, monitor violations, and enforce platform rules.
        </p>
      </div>

      {/* Accounts Table */}
      <div className={`rounded-xl border overflow-hidden shadow-sm ${
        theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className={`text-xs uppercase tracking-wider font-semibold border-b ${
              theme === 'light' ? 'bg-gray-50 text-gray-500 border-gray-200' : 'bg-[#222222] text-gray-400 border-[#2e2e2e]'
            }`}>
              <tr>
                <th className="py-4 px-5">User</th>
                <th className="py-4 px-5">Role</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-center">Violations</th>
                <th className="py-4 px-5">Joined</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#2e2e2e]">
              {accounts.map((acc) => {
                const infractions = totalViolations(acc);
                const hasWarning = infractions > 0;
                const isInactive = acc.status === 'inactive';

                return (
                  <tr key={acc.id} className={`transition-colors ${
                    isInactive 
                      ? theme === 'light' ? 'bg-gray-50/50' : 'bg-gray-900/10'
                      : theme === 'light' ? 'hover:bg-gray-50/50' : 'hover:bg-gray-800/20'
                  }`}>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <button onClick={() => handleViewProfile(acc)} className={`relative focus:outline-none shrink-0 cursor-pointer hover:opacity-80 transition-opacity rounded-full ring-2 ring-transparent hover:ring-[#8b5cf6] overflow-hidden group ${isInactive ? 'grayscale opacity-60' : ''}`}>
                          <img src={acc.avatar} alt={acc.name} className="w-10 h-10 object-cover" />
                        </button>
                        <div>
                          <button onClick={() => handleViewProfile(acc)} className={`font-semibold hover:underline focus:outline-none text-left ${
                            theme === 'light' 
                              ? isInactive ? 'text-gray-500' : 'text-gray-900' 
                              : isInactive ? 'text-gray-500' : 'text-gray-100'
                          }`}>{acc.name}</button>
                          <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>{acc.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                        acc.role === 'donor' 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' 
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                      }`}>
                        {acc.role}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${isInactive ? 'bg-red-500' : 'bg-green-500'}`}></div>
                        <span className={`font-medium ${
                          theme === 'light' 
                            ? isInactive ? 'text-red-700' : 'text-gray-700'
                            : isInactive ? 'text-red-400' : 'text-gray-300'
                        }`}>
                          {isInactive ? 'Suspended' : 'Active'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-center">
                      {hasWarning ? (
                        <div className={`inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${
                          infractions >= 3 
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
                        }`}>
                          <ShieldExclamationIcon className="w-3.5 h-3.5" />
                          {infractions} marks
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 dark:text-gray-600 font-medium">Clean record</span>
                      )}
                    </td>
                    <td className="py-4 px-5">
                      <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>{acc.joinDate}</p>
                      <p className={`text-[10px] text-gray-400 dark:text-gray-500 mt-0.5`}>Active: {acc.lastActive}</p>
                    </td>
                    <td className="py-4 px-5 text-right w-48">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openMessages(acc)}
                          className={`p-1.5 rounded transition-colors ${
                             theme === 'light' ? 'text-violet-600 hover:bg-violet-50' : 'text-violet-500 hover:bg-violet-900/20'
                          }`}
                          title="Message User"
                        >
                          <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />
                        </button>

                        {isInactive ? (
                          <button
                            onClick={() => handleActionClick(acc, 'reactivate')}
                            className={`p-1.5 rounded transition-colors ${
                              theme === 'light' ? 'text-green-600 hover:bg-green-50' : 'text-green-500 hover:bg-green-900/20'
                            }`}
                            title="Reactivate Account"
                          >
                            <CheckCircleIcon className="w-5 h-5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleActionClick(acc, 'deactivate')}
                            className={`p-1.5 rounded transition-colors ${
                              theme === 'light' ? 'text-orange-500 hover:bg-orange-50' : 'text-orange-400 hover:bg-orange-900/20'
                            }`}
                            title="Suspend Account"
                          >
                            <NoSymbolIcon className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {accounts.length === 0 && (
            <div className={`p-8 text-center text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              No accounts available.
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Confirm Action">
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-4 mb-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
              actionType === 'deactivate' ? 'bg-orange-100 dark:bg-orange-900/20' : 'bg-green-100 dark:bg-green-900/20'
            }`}>
              {actionType === 'deactivate' && <NoSymbolIcon className="h-6 w-6 text-orange-600 dark:text-orange-500" />}
              {actionType === 'reactivate' && <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-500" />}
            </div>
            <div>
               <h4 className={`text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {actionType === 'deactivate' ? 'Suspend Account' : 'Reactivate Account'}
               </h4>
               <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                  Confirm modifying access for <strong>{selectedAccount?.name}</strong>.
               </p>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                Message Sent to User (Email) <span className="text-red-500">*</span>
              </label>
              <textarea 
                value={actionMessage}
                onChange={(e) => setActionMessage(e.target.value)}
                placeholder={actionType === 'deactivate' ? 'Explain the reason for suspension based on your moderation limits...' : 'Welcome them back and mention what was resolved...'}
                className={`w-full p-3 rounded-xl border text-sm focus:ring-2 outline-none transition-colors ${
                  actionType === 'deactivate'
                   ? 'focus:ring-orange-500/20 focus:border-orange-500'
                   : 'focus:ring-green-500/20 focus:border-green-500'
                } ${
                  theme === 'light' ? 'bg-white border-gray-200 text-gray-900' : 'bg-[#1a1a1a] border-[#2e2e2e] text-white'
                }`}
                rows={4}
              />
              <p className={`text-[10px] mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
                This text will be attached to an automated email sent to <strong>{selectedAccount?.email}</strong>.
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => setModalOpen(false)}
              className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                theme === 'light' 
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={confirmAction}
              className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors text-white shadow-md ${
                actionType === 'deactivate' ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20' : 
                'bg-green-500 hover:bg-green-600 shadow-green-500/20'
              }`}
            >
              {actionType === 'deactivate' ? 'Suspend & Send Message' : 'Reactivate & Send Message'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Profile Details Modal (reused similarly from Reviews) */}
      <Modal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} title="Account Profile">
        {viewingProfileData && (
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              {viewingProfileData.avatar ? (
                <img src={viewingProfileData.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-violet-100 dark:border-violet-900/50" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center border-4 border-violet-50 dark:border-violet-900/50 text-violet-500">
                  <UserIcon className="w-10 h-10" />
                </div>
              )}
              {viewingProfileData.status === 'inactive' && (
                <span className="absolute bottom-0 right-0 w-6 h-6 bg-red-500 border-2 border-white dark:border-gray-900 rounded-full flex items-center justify-center text-white" title="Account Suspended">
                   <ShieldExclamationIcon className="w-3.5 h-3.5" />
                </span>
              )}
              {viewingProfileData.status === 'active' && (
                <span className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full flex items-center justify-center text-white" title="Active Account">
                   <CheckCircleIcon className="w-3.5 h-3.5" />
                </span>
              )}
            </div>
            
            <h3 className={`text-2xl font-bold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              {viewingProfileData.name}
            </h3>
            
            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mb-6 ${
              viewingProfileData.role === 'donor' 
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' 
                : viewingProfileData.role === 'receiver'
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                : theme === 'light' ? 'bg-gray-100 text-gray-600' : 'bg-gray-800 text-gray-400'
            }`}>
              Platform {viewingProfileData.role}
            </span>

            {/* Application Data Grid */}
            <div className="w-full space-y-4">
                
                <div className={`p-4 rounded-xl border grid grid-cols-1 gap-3 ${
                  theme === 'light' ? 'bg-gray-50 border-gray-100' : 'bg-gray-800/20 border-gray-800'
                }`}>
                   <div className="flex items-center gap-3">
                     <EnvelopeIcon className={`w-5 h-5 shrink-0 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
                     <div>
                       <p className={`text-[10px] uppercase font-bold tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Email Address</p>
                       <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>{viewingProfileData.email}</p>
                     </div>
                   </div>

                   <div className="flex items-center gap-3">
                     <CalendarDaysIcon className={`w-5 h-5 shrink-0 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
                     <div>
                       <p className={`text-[10px] uppercase font-bold tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Joined Platform</p>
                       <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>{viewingProfileData.joinDate}</p>
                     </div>
                   </div>

                   <div className="flex items-center gap-3">
                     <ClockIcon className={`w-5 h-5 shrink-0 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
                     <div>
                       <p className={`text-[10px] uppercase font-bold tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Last Active</p>
                       <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>{viewingProfileData.lastActive}</p>
                     </div>
                   </div>
                </div>

                {/* Moderation Standing explicitly mapped from account info */}
                {(() => {
                  const acc = viewingProfileData;
                  const totalInfractions = acc.violations + acc.deletedDonations + acc.deletedReviews;
                  const isClean = totalInfractions === 0;

                  return (
                    <div className={`p-4 rounded-xl border flex flex-col gap-3 ${
                      isClean 
                        ? theme === 'light' ? 'bg-green-50 border-green-200' : 'bg-green-900/10 border-green-900/30'
                        : theme === 'light' ? 'bg-amber-50 border-amber-200' : 'bg-amber-900/10 border-amber-900/30'
                    }`}>
                      <div className="flex items-center gap-3">
                        {isClean ? (
                          <CheckCircleIcon className={`w-8 h-8 shrink-0 ${theme === 'light' ? 'text-green-500' : 'text-green-400'}`} />
                        ) : (
                          <ShieldExclamationIcon className={`w-8 h-8 shrink-0 ${theme === 'light' ? 'text-amber-500' : 'text-amber-400'}`} />
                        )}
                        <div>
                          <p className={`text-sm font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Moderation Standing</p>
                          <p className={`text-xs mt-0.5 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                            {isClean 
                              ? 'User has a pristine moderation record.'
                              : `User has ${totalInfractions} total infractions recorded.`
                            }
                          </p>
                        </div>
                      </div>

                      {!isClean && (
                        <div className={`grid grid-cols-3 gap-2 mt-2 pt-3 border-t ${theme === 'light' ? 'border-amber-200' : 'border-amber-900/30'}`}>
                           <div className="text-center">
                             <p className={`text-lg font-bold ${theme === 'light' ? 'text-amber-700' : 'text-amber-400'}`}>{acc.violations}</p>
                             <p className={`text-[9px] uppercase font-bold tracking-widest ${theme === 'light' ? 'text-amber-600' : 'text-amber-500'}`}>Direct Viol</p>
                           </div>
                           <div className="text-center">
                             <p className={`text-lg font-bold ${theme === 'light' ? 'text-amber-700' : 'text-amber-400'}`}>{acc.deletedDonations}</p>
                             <p className={`text-[9px] uppercase font-bold tracking-widest ${theme === 'light' ? 'text-amber-600' : 'text-amber-500'}`}>Del Feed</p>
                           </div>
                           <div className="text-center">
                             <p className={`text-lg font-bold ${theme === 'light' ? 'text-amber-700' : 'text-amber-400'}`}>{acc.deletedReviews}</p>
                             <p className={`text-[9px] uppercase font-bold tracking-widest ${theme === 'light' ? 'text-amber-600' : 'text-amber-500'}`}>Del Revw</p>
                           </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

            </div>

            <div className="mt-8 w-full border-t border-gray-100 dark:border-gray-800 pt-4 flex gap-3">
              <button onClick={() => setProfileModalOpen(false)} className={`flex-1 py-3 rounded-xl flex justify-center font-semibold text-sm transition-colors ${
                theme === 'light' ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}>
                 Close View
              </button>
              <button onClick={() => { setProfileModalOpen(false); openMessages(viewingProfileData); }} className="flex-1 py-3 rounded-xl flex justify-center items-center gap-2 font-bold text-sm transition-colors bg-[#8b5cf6] text-white hover:bg-violet-600 shadow-md shadow-violet-500/20">
                 <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" /> Message User
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default AdminAccounts;
