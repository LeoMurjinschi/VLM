import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { MOCK_ADMIN_ACCOUNTS, type AdminAccount } from '../../_mock/adminMockData';
import { toast } from 'react-toastify';
import { 
  NoSymbolIcon, 
  CheckCircleIcon, 
  TrashIcon,
  ShieldExclamationIcon
} from '@heroicons/react/24/outline';
import Modal from '../../components/ui/Modal';

const AdminAccounts: React.FC = () => {
  const { theme } = useTheme();
  const [accounts, setAccounts] = useState<AdminAccount[]>(MOCK_ADMIN_ACCOUNTS);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'deactivate' | 'reactivate' | 'delete' | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<AdminAccount | null>(null);

  const handleActionClick = (acc: AdminAccount, type: 'deactivate' | 'reactivate' | 'delete') => {
    setSelectedAccount(acc);
    setActionType(type);
    setModalOpen(true);
  };

  const confirmAction = () => {
    if (!selectedAccount || !actionType) return;

    if (actionType === 'delete') {
      setAccounts(prev => prev.filter(acc => acc.id !== selectedAccount.id));
      toast.success(`Account ${selectedAccount.name} deleted successfully`);
    } else {
      const newStatus = actionType === 'deactivate' ? 'inactive' : 'active';
      setAccounts(prev => prev.map(acc => 
        acc.id === selectedAccount.id ? { ...acc, status: newStatus as 'active' | 'inactive' } : acc
      ));
      toast.success(`Account ${selectedAccount.name} is now ${newStatus}`);
    }

    setModalOpen(false);
    setSelectedAccount(null);
    setActionType(null);
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
                        <img src={acc.avatar} alt={acc.name} className={`w-9 h-9 rounded-full object-cover ${isInactive ? 'grayscale opacity-60' : ''}`} />
                        <div>
                          <p className={`font-semibold ${
                            theme === 'light' 
                              ? isInactive ? 'text-gray-500' : 'text-gray-900' 
                              : isInactive ? 'text-gray-500' : 'text-gray-100'
                          }`}>{acc.name}</p>
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
                        <div className={`w-px h-5 ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`}></div>
                        <button
                          onClick={() => handleActionClick(acc, 'delete')}
                          className={`p-1.5 rounded transition-colors ${
                            theme === 'light' ? 'text-red-600 hover:bg-red-50' : 'text-red-500 hover:bg-red-900/20'
                          }`}
                          title="Delete Account Permanently"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
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
        <div className="text-center">
          <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full mb-4 ${
            actionType === 'delete' ? 'bg-red-100 dark:bg-red-900/20' : 
            actionType === 'deactivate' ? 'bg-orange-100 dark:bg-orange-900/20' : 
            'bg-green-100 dark:bg-green-900/20'
          }`}>
            {actionType === 'delete' && <TrashIcon className="h-8 w-8 text-red-600 dark:text-red-500" />}
            {actionType === 'deactivate' && <NoSymbolIcon className="h-8 w-8 text-orange-600 dark:text-orange-500" />}
            {actionType === 'reactivate' && <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-500" />}
          </div>
          
          <p className={`text-sm mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            {actionType === 'delete' && <>Are you sure you want to permanently delete <strong>{selectedAccount?.name}</strong>? All their data will be lost.</>}
            {actionType === 'deactivate' && <>Are you sure you want to suspend <strong>{selectedAccount?.name}</strong>? They will not be able to log in.</>}
            {actionType === 'reactivate' && <>Are you sure you want to reactivate <strong>{selectedAccount?.name}</strong>? They will regain full access.</>}
          </p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setModalOpen(false)}
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                theme === 'light' 
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={confirmAction}
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors text-white shadow-md ${
                actionType === 'delete' ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 
                actionType === 'deactivate' ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20' : 
                'bg-green-500 hover:bg-green-600 shadow-green-500/20'
              }`}
            >
              {actionType === 'delete' ? 'Delete Account' : 
               actionType === 'deactivate' ? 'Suspend Account' : 'Reactivate'}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default AdminAccounts;
