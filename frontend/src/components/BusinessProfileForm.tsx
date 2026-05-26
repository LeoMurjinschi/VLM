import React, { useState, useEffect } from 'react';
import { useTheme } from './../hooks/useTheme';
import { BuildingStorefrontIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { profileService } from '../api';
import type { UserProfileDto } from '../api';

const BusinessProfileForm: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    orgName: '',
    description: '',
    operatingHours: '',
    phone: '',
    address: '',
    location: '',
    transportType: '',
  });

  useEffect(() => {
    if (!user) return;
    profileService.getByUser(parseInt(user.id))
      .then((profile) => {
        setFormData({
          orgName: profile.orgName || '',
          description: profile.description || '',
          operatingHours: profile.operatingHours || '',
          phone: profile.phone || '',
          address: profile.address || '',
          location: profile.location || '',
          transportType: profile.transportType || '',
        });
      })
      .catch(() => {
        // No profile yet — keep defaults
      })
      .finally(() => setIsLoading(false));
  }, [user]);

  const inputClass = `w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] transition-colors font-medium ${
    theme === 'light' ? 'bg-white border-gray-200 text-gray-900 placeholder-gray-400' : 'bg-[#222222] border-[#2e2e2e] text-gray-100 placeholder-gray-500'
  }`;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    try {
      const dto: UserProfileDto = {
        userId: parseInt(user.id),
        phone: formData.phone,
        address: formData.address,
        orgName: formData.orgName,
        description: formData.description,
        operatingHours: formData.operatingHours,
        location: formData.location,
        transportType: formData.transportType,
        operatingRadius: 10,
        acceptedCategories: '',
        hasIndustrialStorage: false,
        missionStatement: '',
        verified: false,
      };
      await profileService.save(dto);
      toast.success('Business profile saved!');
    } catch {
      toast.error('Failed to save business profile.');
    } finally {
      setIsSaving(false);
    }
  };

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
        <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-[#16a34a]/10 text-[#16a34a]' : 'bg-[#16a34a]/20 text-[#16a34a]'}`}>
          <BuildingStorefrontIcon className="w-6 h-6" />
        </div>
        <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-[#1a1a1a]' : 'text-gray-100'}`} style={{ fontFamily: 'var(--font-display)' }}>Business Profile</h2>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Company / Organization Name</label>
            <input type="text" value={formData.orgName} onChange={e => setFormData({ ...formData, orgName: e.target.value })} className={inputClass} placeholder="e.g., Fresh Harvest Co." />
          </div>
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Phone Number</label>
            <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className={inputClass} placeholder="+373 XXX XX XXX" />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Short Description</label>
          <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className={`${inputClass} resize-none`} rows={3} placeholder="Describe your business and the type of food you donate." />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Operating Hours</label>
            <input type="text" value={formData.operatingHours} onChange={e => setFormData({ ...formData, operatingHours: e.target.value })} className={inputClass} placeholder="e.g., Mon-Fri 08:00 - 20:00" />
          </div>
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Transport Type</label>
            <input type="text" value={formData.transportType} onChange={e => setFormData({ ...formData, transportType: e.target.value })} className={inputClass} placeholder="e.g., Van, Truck, Car" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Address</label>
            <input type="text" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className={inputClass} placeholder="Street, city" />
          </div>
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>City / Location</label>
            <input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className={inputClass} placeholder="e.g., Cluj-Napoca" />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button type="submit" disabled={isSaving} className={`flex items-center gap-2 px-6 py-3 bg-[#16a34a] hover:bg-green-700 text-white font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 shadow-md`}>
            {isSaving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <CheckCircleIcon className="w-5 h-5" />}
            Save Business Info
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessProfileForm;
