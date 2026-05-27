import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import {
  CheckIcon,
  XMarkIcon,
  DocumentTextIcon,
  PhoneIcon,
  MapPinIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import Modal from '../../components/UI/Modal';
import { userService, type UserInfoDto } from '../../api/userService';
import { profileService, type UserProfileDto } from '../../api/profileService';
import { adminService } from '../../api/adminService';

const AdminSignups: React.FC = () => {
  const { theme } = useTheme();
  const { user: authUser } = useAuth();

  const [allUsers, setAllUsers] = useState<UserInfoDto[]>([]);
  const [profileCache, setProfileCache] = useState<Record<number, UserProfileDto>>({});
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'pending' | 'history'>('pending');

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserInfoDto | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<UserProfileDto | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const [declineModalOpen, setDeclineModalOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      const users = await userService.getAll();
      const nonAdmins = users.filter(u => u.role !== 'admin');
      nonAdmins.sort((a, b) => {
        if (a.approvalStatus === 'pending' && b.approvalStatus !== 'pending') return -1;
        if (a.approvalStatus !== 'pending' && b.approvalStatus === 'pending') return 1;
        return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
      });
      setAllUsers(nonAdmins);
    } catch {
      toast.error('Failed to load signup requests.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const displayUsers = allUsers.filter(u =>
    viewMode === 'pending' ? u.approvalStatus === 'pending' : u.approvalStatus !== 'pending'
  );

  const pendingCount = allUsers.filter(u => u.approvalStatus === 'pending').length;

  const viewDetails = async (user: UserInfoDto) => {
    setSelectedUser(user);
    setSelectedProfile(profileCache[user.id] ?? null);
    setModalOpen(true);

    if (!profileCache[user.id]) {
      setProfileLoading(true);
      try {
        const profile = await profileService.getByUser(user.id);
        setProfileCache(prev => ({ ...prev, [user.id]: profile }));
        setSelectedProfile(profile);
      } catch {
        // Profile might not exist for every user
      } finally {
        setProfileLoading(false);
      }
    }
  };

  const adminId = authUser ? parseInt(authUser.id) : 0;

  const handleApprove = async () => {
    if (!selectedUser) return;
    setActionLoading(true);
    try {
      await adminService.approveUser(selectedUser.id, { adminId });
      toast.success(`${selectedUser.name} has been approved! They can now log in.`);
      setModalOpen(false);
      setAllUsers(prev => prev.map(u =>
        u.id === selectedUser.id ? { ...u, approvalStatus: 'approved' } : u
      ));
    } catch {
      toast.error('Failed to approve user.');
    } finally {
      setActionLoading(false);
    }
  };

  const confirmDecline = async () => {
    if (!selectedUser) return;
    if (!declineReason.trim()) {
      toast.error('Add a reason for declining this application so the organization understands your decision.');
      return;
    }
    setActionLoading(true);
    try {
      await adminService.rejectUser(selectedUser.id, { adminId, reason: declineReason });
      toast.success(`Application declined. Notification sent to ${selectedUser.email}.`);
      setDeclineModalOpen(false);
      setModalOpen(false);
      setAllUsers(prev => prev.map(u =>
        u.id === selectedUser.id ? { ...u, approvalStatus: 'rejected' } : u
      ));
    } catch {
      toast.error('Failed to reject user.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto min-h-screen relative animate-fade-in-up">
      {/* Header */}
      <div className={`pb-6 border-b ${theme === 'light' ? 'border-gray-200/60' : 'border-[#2e2e2e]'}`}>
        <h1 className={`text-3xl font-bold tracking-tight mb-2 ${theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'}`} style={{ fontFamily: 'var(--font-display)' }}>
          Sign-Up Requests
        </h1>
        <p className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'}>
          Review and approve or reject organization applications to join FoodShare.
        </p>
      </div>

      {/* View Mode Tabs */}
      <div className="flex gap-2 p-1 bg-gray-100 dark:bg-[#1a1a1a] rounded-xl w-fit border border-gray-200 dark:border-[#2e2e2e]">
        <button
          onClick={() => setViewMode('pending')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            viewMode === 'pending'
              ? 'bg-white dark:bg-[#2e2e2e] shadow-sm text-gray-900 dark:text-white'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          Pending Requests
          {pendingCount > 0 && (
            <span className="ml-2 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 py-0.5 px-2 rounded-full text-[10px]">
              {pendingCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setViewMode('history')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            viewMode === 'history'
              ? 'bg-white dark:bg-[#2e2e2e] shadow-sm text-gray-900 dark:text-white'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          History Log
        </button>
      </div>

      {/* Requests Table */}
      <div className={`rounded-xl border overflow-hidden shadow-sm ${
        theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className={`text-xs uppercase tracking-wider font-semibold border-b ${
              theme === 'light' ? 'bg-gray-50 text-gray-500 border-gray-200' : 'bg-[#222222] text-gray-400 border-[#2e2e2e]'
            }`}>
              <tr>
                <th className="py-4 px-5">Name / Email</th>
                <th className="py-4 px-5">Role</th>
                <th className="py-4 px-5">Submitted On</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right flex-shrink-0">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#2e2e2e]">
              {loading ? (
                <tr>
                  <td colSpan={5} className={`p-8 text-center text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Loading...
                  </td>
                </tr>
              ) : displayUsers.map((u) => (
                <tr key={u.id} className={`transition-colors ${
                  u.approvalStatus === 'pending'
                    ? theme === 'light' ? 'bg-violet-50/30' : 'bg-violet-900/10'
                    : ''
                } ${
                  theme === 'light' ? 'hover:bg-gray-50/50' : 'hover:bg-gray-800/20'
                }`}>
                  <td className="py-4 px-5">
                    <p className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
                      {u.name}
                    </p>
                    <p className={`text-xs mt-0.5 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      {u.email}
                    </p>
                  </td>
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                        u.role === 'donor'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                      }`}>
                        {u.role}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-gray-500 dark:text-gray-400">
                    {new Date(u.createdDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-5">
                    {u.approvalStatus === 'pending' && (
                      <span className="inline-flex items-center gap-1.5 text-violet-600 dark:text-violet-400 font-semibold bg-violet-100 dark:bg-violet-900/20 px-2.5 py-1 rounded-md text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                        Review Needed
                      </span>
                    )}
                    {u.approvalStatus === 'approved' && (
                      <span className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-500 font-semibold text-xs">
                        <CheckIcon className="w-4 h-4" /> Approved
                      </span>
                    )}
                    {u.approvalStatus === 'rejected' && (
                      <span className="inline-flex items-center gap-1.5 text-red-600 dark:text-red-500 font-semibold text-xs">
                        <XMarkIcon className="w-4 h-4" /> Rejected
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => viewDetails(u)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        u.approvalStatus === 'pending'
                          ? 'bg-[#8b5cf6] text-white border-transparent hover:bg-violet-600 shadow-sm'
                          : theme === 'light'
                            ? 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                            : 'bg-[#1a1a1a] text-gray-300 border-[#2e2e2e] hover:bg-gray-800'
                      }`}
                    >
                      {u.approvalStatus === 'pending' ? 'Review Application' : 'View Details'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && displayUsers.length === 0 && (
            <div className={`p-8 text-center ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              <p className="text-sm font-medium mb-1">
                {viewMode === 'pending' ? 'All caught up! No pending reviews.' : 'No history records found.'}
              </p>
              {viewMode === 'pending' && (
                <p className="text-xs">Check back soon for new organization applications.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Application Details">
        {selectedUser && (
          <div className="space-y-6">

            {/* User Info */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  theme === 'light' ? 'bg-gray-100 text-gray-500' : 'bg-gray-800 text-gray-400'
                }`}>
                  <BuildingOfficeIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {selectedProfile?.orgName ?? selectedUser.name}
                  </h3>
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    {selectedUser.email}
                  </p>
                </div>
              </div>
            </div>

            {profileLoading ? (
              <p className={`text-sm text-center py-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
                Loading profile details...
              </p>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-3 rounded-lg border ${theme === 'light' ? 'bg-gray-50 border-gray-100' : 'bg-gray-800/50 border-gray-700'}`}>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Contact Person</p>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-gray-100">
                      <span className="truncate">{selectedUser.name}</span>
                    </div>
                  </div>
                  {selectedProfile?.phone && (
                    <div className={`p-3 rounded-lg border ${theme === 'light' ? 'bg-gray-50 border-gray-100' : 'bg-gray-800/50 border-gray-700'}`}>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Phone Number</p>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-gray-100">
                        <PhoneIcon className="w-4 h-4 text-gray-400" />
                        <span className="truncate">{selectedProfile.phone}</span>
                      </div>
                    </div>
                  )}
                </div>

                {selectedProfile?.address && (
                  <div className={`p-3 rounded-lg border ${theme === 'light' ? 'bg-gray-50 border-gray-100' : 'bg-gray-800/50 border-gray-700'}`}>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Address</p>
                    <div className="flex items-start gap-1.5 text-sm font-medium text-gray-900 dark:text-gray-100">
                      <MapPinIcon className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                      <span>{selectedProfile.address}</span>
                    </div>
                  </div>
                )}

                {(selectedProfile?.description || selectedUser.bio) && (
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-wider mt-4 mb-2 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      Organization Description
                    </p>
                    <p className={`text-sm leading-relaxed ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                      {selectedProfile?.description ?? selectedUser.bio}
                    </p>
                  </div>
                )}

                {selectedUser.rejectionReason && selectedUser.approvalStatus === 'rejected' && (
                  <div className={`p-3 rounded-lg border ${theme === 'light' ? 'bg-red-50 border-red-100' : 'bg-red-900/10 border-red-900/30'}`}>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-1">Rejection Reason</p>
                    <p className={`text-sm ${theme === 'light' ? 'text-red-700' : 'text-red-400'}`}>
                      {selectedUser.rejectionReason}
                    </p>
                  </div>
                )}

                <div>
                  <p className={`text-xs font-bold uppercase tracking-wider mt-2 mb-2 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Attached Documents
                  </p>
                  {selectedProfile?.verificationDocument ? (
                    selectedProfile.verificationDocument.startsWith('data:image/') ? (
                      <img
                        src={selectedProfile.verificationDocument}
                        alt="Verification document"
                        className="w-full rounded-lg border object-contain max-h-72"
                        style={{ borderColor: theme === 'light' ? '#e5e7eb' : '#374151' }}
                      />
                    ) : (
                      <a
                        href={selectedProfile.verificationDocument}
                        download="verification_document"
                        className="flex items-center gap-2.5 p-3 rounded-lg border transition-colors hover:bg-violet-50 dark:hover:bg-violet-900/10"
                        style={{ borderColor: theme === 'light' ? '#e5e7eb' : '#374151' }}
                      >
                        <DocumentTextIcon className="w-5 h-5 text-violet-500" />
                        <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
                          Download uploaded document
                        </span>
                      </a>
                    )
                  ) : (
                    <div className={`flex items-center gap-2.5 p-3 rounded-lg border ${
                      theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-gray-700'
                    }`}>
                      <DocumentTextIcon className={`w-5 h-5 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                        No documents uploaded via platform.
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Action Buttons */}
            {selectedUser.approvalStatus === 'pending' ? (
              <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  disabled={actionLoading}
                  onClick={() => { setDeclineReason(''); setDeclineModalOpen(true); }}
                  className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-colors disabled:opacity-50 ${
                    theme === 'light'
                      ? 'bg-red-50 text-red-600 hover:bg-red-100'
                      : 'bg-red-900/20 text-red-400 hover:bg-red-900/40'
                  }`}
                >
                  Decline
                </button>
                <button
                  disabled={actionLoading}
                  onClick={handleApprove}
                  className="flex-1 py-2.5 rounded-lg font-semibold text-sm transition-colors bg-[#16a34a] hover:bg-[#15803d] text-white shadow-md shadow-green-500/20 disabled:opacity-50"
                >
                  {actionLoading ? 'Processing...' : 'Approve Application'}
                </button>
              </div>
            ) : (
               <div className={`p-4 rounded-lg flex items-center justify-center gap-2 font-bold ${
                 selectedUser.approvalStatus === 'approved'
                  ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
               }`}>
                 {selectedUser.approvalStatus === 'approved' ? (
                   <> <CheckIcon className="w-5 h-5" /> This application was approved. </>
                 ) : (
                   <> <XMarkIcon className="w-5 h-5" /> This application was rejected. </>
                 )}
               </div>
            )}
          </div>
        )}
      </Modal>

      {/* Decline Reason Modal */}
      <Modal isOpen={declineModalOpen} onClose={() => setDeclineModalOpen(false)} title="Decline Application">
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <XMarkIcon className="h-6 w-6 text-red-600 dark:text-red-500" aria-hidden="true" />
            </div>
            <div>
              <h4 className={`text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Reject {selectedUser?.name}
              </h4>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                Provide a reason for rejection.
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                Reason for Rejection <span className="text-red-500">*</span>
              </label>
              <textarea
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                placeholder="Explain why this application was rejected (e.g. missing food safety certificates)..."
                className={`w-full p-3 rounded-xl border text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-colors ${
                  theme === 'light' ? 'bg-white border-gray-200 text-gray-900' : 'bg-[#1a1a1a] border-[#2e2e2e] text-white'
                }`}
                rows={4}
              />
              <p className={`text-[10px] mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
                This reason will be sent directly via email to <strong>{selectedUser?.email}</strong>.
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => setDeclineModalOpen(false)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                theme === 'light'
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Cancel
            </button>
            <button
              disabled={actionLoading}
              onClick={confirmDecline}
              className="px-4 py-2 rounded-lg font-semibold text-sm transition-colors bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20 disabled:opacity-50"
            >
              {actionLoading ? 'Processing...' : 'Reject & Send Email'}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default AdminSignups;
