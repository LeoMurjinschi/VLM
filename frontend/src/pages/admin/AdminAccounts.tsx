import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { userService, type UserInfoDto } from '../../api';
import { toast } from 'react-toastify';
import {
  NoSymbolIcon,
  CheckCircleIcon,
  ShieldExclamationIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  UserIcon,
  ChatBubbleOvalLeftEllipsisIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/UI/Modal';

const AdminAccounts: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState<UserInfoDto[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'deactivate' | 'reactivate' | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<UserInfoDto | null>(null);
  const [actionMessage, setActionMessage] = useState('');

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [viewingProfile, setViewingProfile] = useState<UserInfoDto | null>(null);

  useEffect(() => {
    userService.getAll()
      .then(users => setAccounts(users.filter(u => u.role !== 'admin' && u.approvalStatus !== 'rejected')))
      .catch(() => toast.error('Failed to load accounts.'))
      .finally(() => setLoading(false));
  }, []);

  const handleActionClick = (acc: UserInfoDto, type: 'deactivate' | 'reactivate') => {
    setSelectedAccount(acc);
    setActionType(type);
    setActionMessage('');
    setModalOpen(true);
  };

  const confirmAction = async () => {
    if (!selectedAccount || !actionType) return;

    if (!actionMessage.trim()) {
      toast.error(
        'Explain your decision to the user so they understand why their account is being ' +
        (actionType === 'deactivate' ? 'suspended.' : 'reactivated.')
      );
      return;
    }

    try {
      const newIsActive = await userService.toggleActive(selectedAccount.id);
      setAccounts(prev =>
        prev.map(acc => acc.id === selectedAccount.id ? { ...acc, isActive: newIsActive } : acc)
      );
      toast.success(
        newIsActive
          ? `Account reactivated. ${selectedAccount.email} has been notified.`
          : `Account suspended. ${selectedAccount.email} has been notified.`
      );
    } catch {
      toast.error('Failed to update account status.');
    }

    setModalOpen(false);
    setSelectedAccount(null);
    setActionType(null);
  };

  const openMessages = (acc: UserInfoDto | null) => {
    if (acc) {
      navigate('/admin/messages', { state: { openChatWith: { id: acc.id, name: acc.name, role: acc.role } } });
    }
  };

  const handleViewProfile = (acc: UserInfoDto) => {
    setViewingProfile(acc);
    setProfileModalOpen(true);
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' });

  const approvalBadge = (status: string) => {
    if (status === 'approved') return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
    if (status === 'rejected') return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
    return 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto min-h-screen relative animate-fade-in-up">
      {/* Header */}
      <div className={`pb-6 border-b ${theme === 'light' ? 'border-gray-200/60' : 'border-[#2e2e2e]'}`}>
        <h1 className={`text-3xl font-bold tracking-tight mb-2 ${theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'}`} style={{ fontFamily: 'var(--font-display)' }}>
          Account Management
        </h1>
        <p className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'}>
          Manage existing user accounts and enforce platform rules.
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
                <th className="py-4 px-5">Approval</th>
                <th className="py-4 px-5">Joined</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#2e2e2e]">
              {loading ? (
                <tr>
                  <td colSpan={6} className={`py-10 text-center text-sm ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Loading accounts...
                  </td>
                </tr>
              ) : accounts.map((acc) => {
                const isInactive = !acc.isActive;
                return (
                  <tr key={acc.id} className={`transition-colors ${
                    isInactive
                      ? theme === 'light' ? 'bg-gray-50/50' : 'bg-gray-900/10'
                      : theme === 'light' ? 'hover:bg-gray-50/50' : 'hover:bg-gray-800/20'
                  }`}>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleViewProfile(acc)}
                          className={`relative focus:outline-none shrink-0 cursor-pointer hover:opacity-80 transition-opacity rounded-full ring-2 ring-transparent hover:ring-[#8b5cf6] overflow-hidden ${isInactive ? 'grayscale opacity-60' : ''}`}
                        >
                          {acc.avatar ? (
                            <img src={acc.avatar} alt={acc.name} className="w-10 h-10 object-cover rounded-full" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 font-bold text-sm">
                              {acc.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </button>
                        <div>
                          <button
                            onClick={() => handleViewProfile(acc)}
                            className={`font-semibold hover:underline focus:outline-none text-left ${
                              theme === 'light'
                                ? isInactive ? 'text-gray-500' : 'text-gray-900'
                                : isInactive ? 'text-gray-500' : 'text-gray-100'
                            }`}
                          >{acc.name}</button>
                          <p className="text-xs text-gray-500">{acc.email}</p>
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
                    <td className="py-4 px-5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${approvalBadge(acc.approvalStatus)}`}>
                        {acc.approvalStatus}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {formatDate(acc.createdDate)}
                      </p>
                    </td>
                    <td className="py-4 px-5 text-right w-40">
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
          {!loading && accounts.length === 0 && (
            <div className={`p-8 text-center text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              No accounts available.
            </div>
          )}
        </div>
      </div>

      {/* Confirm Action Modal */}
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
                Reason / Message to User <span className="text-red-500">*</span>
              </label>
              <textarea
                value={actionMessage}
                onChange={(e) => setActionMessage(e.target.value)}
                placeholder={actionType === 'deactivate' ? 'Explain the reason for suspension...' : 'Welcome them back and mention what was resolved...'}
                className={`w-full p-3 rounded-xl border text-sm focus:ring-2 outline-none transition-colors ${
                  actionType === 'deactivate'
                    ? 'focus:ring-orange-500/20 focus:border-orange-500'
                    : 'focus:ring-green-500/20 focus:border-green-500'
                } ${theme === 'light' ? 'bg-white border-gray-200 text-gray-900' : 'bg-[#1a1a1a] border-[#2e2e2e] text-white'}`}
                rows={4}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => setModalOpen(false)}
              className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                theme === 'light' ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={confirmAction}
              className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors text-white shadow-md ${
                actionType === 'deactivate' ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20' : 'bg-green-500 hover:bg-green-600 shadow-green-500/20'
              }`}
            >
              {actionType === 'deactivate' ? 'Suspend Account' : 'Reactivate Account'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Profile Details Modal */}
      <Modal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} title="Account Profile">
        {viewingProfile && (
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              {viewingProfile.avatar ? (
                <img src={viewingProfile.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-violet-100 dark:border-violet-900/50" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center border-4 border-violet-50 dark:border-violet-900/50 text-violet-500">
                  <UserIcon className="w-10 h-10" />
                </div>
              )}
              {!viewingProfile.isActive ? (
                <span className="absolute bottom-0 right-0 w-6 h-6 bg-red-500 border-2 border-white dark:border-gray-900 rounded-full flex items-center justify-center text-white" title="Account Suspended">
                  <ShieldExclamationIcon className="w-3.5 h-3.5" />
                </span>
              ) : (
                <span className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full flex items-center justify-center text-white" title="Active Account">
                  <CheckCircleIcon className="w-3.5 h-3.5" />
                </span>
              )}
            </div>

            <h3 className={`text-2xl font-bold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              {viewingProfile.name}
            </h3>

            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mb-6 ${
              viewingProfile.role === 'donor'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
            }`}>
              Platform {viewingProfile.role}
            </span>

            <div className="w-full space-y-3">
              <div className={`p-4 rounded-xl border grid grid-cols-1 gap-3 ${
                theme === 'light' ? 'bg-gray-50 border-gray-100' : 'bg-gray-800/20 border-gray-800'
              }`}>
                <div className="flex items-center gap-3">
                  <EnvelopeIcon className={`w-5 h-5 shrink-0 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
                  <div>
                    <p className={`text-[10px] uppercase font-bold tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Email Address</p>
                    <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>{viewingProfile.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarDaysIcon className={`w-5 h-5 shrink-0 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
                  <div>
                    <p className={`text-[10px] uppercase font-bold tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Joined Platform</p>
                    <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>{formatDate(viewingProfile.createdDate)}</p>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${
                viewingProfile.approvalStatus === 'approved'
                  ? theme === 'light' ? 'bg-green-50 border-green-200' : 'bg-green-900/10 border-green-900/30'
                  : viewingProfile.approvalStatus === 'rejected'
                  ? theme === 'light' ? 'bg-red-50 border-red-200' : 'bg-red-900/10 border-red-900/30'
                  : theme === 'light' ? 'bg-amber-50 border-amber-200' : 'bg-amber-900/10 border-amber-900/30'
              }`}>
                <div className="flex items-center gap-3">
                  {viewingProfile.approvalStatus === 'approved' ? (
                    <CheckCircleIcon className={`w-7 h-7 shrink-0 ${theme === 'light' ? 'text-green-500' : 'text-green-400'}`} />
                  ) : viewingProfile.approvalStatus === 'rejected' ? (
                    <ShieldExclamationIcon className={`w-7 h-7 shrink-0 ${theme === 'light' ? 'text-red-500' : 'text-red-400'}`} />
                  ) : (
                    <ShieldExclamationIcon className={`w-7 h-7 shrink-0 ${theme === 'light' ? 'text-amber-500' : 'text-amber-400'}`} />
                  )}
                  <div>
                    <p className={`text-sm font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Account Approval</p>
                    <p className={`text-xs capitalize mt-0.5 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      Status: <span className="font-semibold">{viewingProfile.approvalStatus}</span>
                      {viewingProfile.rejectionReason && ` — ${viewingProfile.rejectionReason}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 w-full border-t border-gray-100 dark:border-gray-800 pt-4 flex gap-3">
              <button
                onClick={() => setProfileModalOpen(false)}
                className={`flex-1 py-3 rounded-xl flex justify-center font-semibold text-sm transition-colors ${
                  theme === 'light' ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Close View
              </button>
              <button
                onClick={() => { setProfileModalOpen(false); openMessages(viewingProfile); }}
                className="flex-1 py-3 rounded-xl flex justify-center items-center gap-2 font-bold text-sm transition-colors bg-[#8b5cf6] text-white hover:bg-violet-600 shadow-md shadow-violet-500/20"
              >
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
