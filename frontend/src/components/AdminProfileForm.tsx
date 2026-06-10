import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { ShieldCheckIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { adminProfileService } from '../api';

const ADMIN_LEVELS = [
  { value: 1, label: 'Moderator' },
  { value: 2, label: 'Admin' },
  { value: 3, label: 'Super Admin' },
];

const PERMISSION_KEYS: { key: string; label: string }[] = [
  { key: 'canManageUsers', label: 'Manage Users' },
  { key: 'canManageDonations', label: 'Manage Donations' },
  { key: 'canManageReports', label: 'Handle Reports' },
  { key: 'canSendAnnouncements', label: 'Send Announcements' },
];

const AdminProfileForm: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [departmentName, setDepartmentName] = useState('');
  const [adminLevel, setAdminLevel] = useState(1);
  const [isActive, setIsActive] = useState(true);
  const [permissions, setPermissions] = useState<Record<string, boolean>>({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    adminProfileService.getByUser(parseInt(user.id))
      .then((profile) => {
        setDepartmentName((profile.departmentName || '').slice(0, 100));
        setAdminLevel(profile.adminLevel || 1);
        setIsActive(profile.isActive);
        setPermissions(profile.permissions || {});
      })
      .catch(() => {/* no profile yet — defaults */})
      .finally(() => setIsLoading(false));
  }, [user]);

  const togglePermission = (key: string) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const validate = (): boolean => {
    if (!departmentName.trim()) {
      setError('Department name is required');
      return false;
    }
    if (departmentName.length > 100) {
      setError('Department name cannot exceed 100 characters');
      return false;
    }
    setError('');
    return true;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!validate()) {
      toast.error('Please fix the errors below');
      return;
    }

    setIsSaving(true);
    try {
      await adminProfileService.save({
        userId: parseInt(user.id),
        departmentName: departmentName.trim(),
        adminLevel,
        isActive,
        permissions,
      });
      toast.success('Admin profile saved!');
    } catch {
      toast.error('Failed to save admin profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = (hasError: boolean) => `w-full px-4 py-3 rounded-xl border transition-all outline-none focus:ring-2 ${
    hasError
      ? 'border-red-500 focus:ring-red-500/20'
      : theme === 'light'
        ? 'bg-white border-gray-200 focus:border-[#16a34a] focus:ring-[#16a34a]/20 text-gray-900'
        : 'bg-[#222222] border-[#2e2e2e] focus:border-[#16a34a] focus:ring-[#16a34a]/20 text-gray-100'
  }`;

  if (isLoading) {
    return (
      <div className={`p-6 md:p-8 rounded-3xl border shadow-sm flex items-center justify-center h-40 ${theme === 'light' ? 'bg-white border-gray-200/60' : 'bg-[#1a1a1a] border-[#2e2e2e]'}`}>
        <div className="w-6 h-6 border-2 border-[#16a34a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`p-6 md:p-8 rounded-3xl border shadow-sm ${theme === 'light' ? 'bg-white border-gray-200/60' : 'bg-[#1a1a1a] border-[#2e2e2e]'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-[#16a34a]/10 text-[#16a34a]' : 'bg-[#16a34a]/20 text-green-400'}`}>
          <ShieldCheckIcon className="w-6 h-6" />
        </div>
        <div>
          <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-[#1a1a1a]' : 'text-gray-100'}`} style={{ fontFamily: 'var(--font-display)' }}>Admin Profile</h2>
          <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Manage your administrative role and permissions.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Department Name *</label>
            <input
              type="text"
              maxLength={100}
              value={departmentName}
              onChange={(e) => { setDepartmentName(e.target.value.slice(0, 100)); if (e.target.value.trim()) setError(''); }}
              className={inputClass(!!error)}
              placeholder="e.g., Trust & Safety"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Admin Level</label>
            <select
              value={adminLevel}
              onChange={(e) => setAdminLevel(parseInt(e.target.value))}
              className={inputClass(false)}
            >
              {ADMIN_LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-3 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Permissions</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PERMISSION_KEYS.map(({ key, label }) => (
              <label key={key} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${theme === 'light' ? 'bg-gray-50/80 border-gray-200 hover:bg-gray-100' : 'bg-[#222222] border-[#2e2e2e] hover:bg-[#2a2a2a]'}`}>
                <input
                  type="checkbox"
                  checked={!!permissions[key]}
                  onChange={() => togglePermission(key)}
                  className="w-4 h-4 accent-[#16a34a]"
                />
                <span className={`text-sm font-medium ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>{label}</span>
              </label>
            ))}
          </div>
        </div>

        <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer ${theme === 'light' ? 'bg-gray-50/80 border-gray-200' : 'bg-[#222222] border-[#2e2e2e]'}`}>
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive(prev => !prev)}
            className="w-4 h-4 accent-[#16a34a]"
          />
          <div>
            <span className={`text-sm font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Active Admin Account</span>
            <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Inactive accounts cannot perform administrative actions.</p>
          </div>
        </label>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-[#16a34a] hover:bg-green-700 text-white font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {isSaving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <CheckCircleIcon className="w-5 h-5" />}
            Save Admin Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfileForm;
