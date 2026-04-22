import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { BuildingOffice2Icon, HeartIcon, TruckIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import Select from './ui/Select';

export const DONATION_CATEGORIES = ['Fresh Produce', 'Baked Goods', 'Prepared Hot Meals', 'Packaged Goods', 'Dairy & Refrigerated'];

const NgoProfileForm: React.FC = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    organizationName: 'City Food Bank',
    missionStatement: 'Providing daily hot meals to homeless individuals in Sector 1',
    operatingRadius: 25,
    acceptedCategories: ['Fresh Produce', 'Baked Goods', 'Prepared Hot Meals'],
    transportType: 'refrigerated',
    hasIndustrialStorage: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      acceptedCategories: prev.acceptedCategories.includes(category)
        ? prev.acceptedCategories.filter(c => c !== category)
        : [...prev.acceptedCategories, category]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Organization details saved successfully!');
    }, 800);
  };

  const inputClasses = `w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none focus:ring-2 ${
    theme === 'light'
      ? 'bg-white border-gray-200 focus:border-[#16a34a] focus:ring-[#16a34a]/20 text-gray-900'
      : 'bg-[#222222] border-[#2e2e2e] focus:border-[#16a34a] focus:ring-[#16a34a]/20 text-gray-100 placeholder-gray-500'
  }`;

  return (
    <div className={`p-6 md:p-8 rounded-3xl border shadow-sm ${theme === 'light' ? 'bg-white border-gray-200/60' : 'bg-[#1a1a1a] border-[#2e2e2e]'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-[#16a34a]/10 text-[#16a34a]' : 'bg-[#16a34a]/20 text-green-400'}`}>
          <BuildingOffice2Icon className="w-6 h-6" />
        </div>
        <div>
          <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-[#1a1a1a]' : 'text-gray-100'}`} style={{ fontFamily: 'var(--font-display)' }}>Organizational Profile</h2>
          <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Public details about your NGO and its operational capacity.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className={`block text-sm font-bold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Organization Name</label>
            <input
              type="text"
              required
              value={formData.organizationName}
              onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
              className={inputClasses}
              placeholder="e.g., City Food Bank or Crucea Roșie"
            />
          </div>

          <div>
            <label className={`block text-sm font-bold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Mission Statement</label>
            <textarea
              required
              rows={3}
              value={formData.missionStatement}
              onChange={(e) => setFormData({ ...formData, missionStatement: e.target.value })}
              className={`${inputClasses} resize-none`}
              placeholder="A short description of who you help"
            />
          </div>
        </div>

        {/* Operational Flow */}
        <div className={`p-5 rounded-2xl border ${theme === 'light' ? 'bg-gray-50 border-gray-200/60' : 'bg-[#222222] border-[#2e2e2e]'}`}>
          <div className="flex items-center gap-2 mb-4">
            <HeartIcon className={`w-5 h-5 ${theme === 'light' ? 'text-[#16a34a]' : 'text-green-400'}`} />
            <h3 className={`font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Donation Preferences</h3>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className={`block text-sm font-bold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Operating Radius</label>
                <span className={`text-sm font-medium ${theme === 'light' ? 'text-[#16a34a]' : 'text-green-400'}`}>{formData.operatingRadius} km</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={formData.operatingRadius}
                onChange={(e) => setFormData({ ...formData, operatingRadius: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-[#16a34a]"
              />
              <div className="flex justify-between text-xs mt-1 text-gray-500">
                <span>5 km</span>
                <span>50 km</span>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-bold mb-3 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Accepted Food Categories</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DONATION_CATEGORIES.map(category => (
                  <label key={category} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    formData.acceptedCategories.includes(category)
                      ? (theme === 'light' ? 'border-[#16a34a] bg-[#16a34a]/5' : 'border-[#16a34a]/50 bg-[#16a34a]/10')
                      : (theme === 'light' ? 'border-gray-200 hover:bg-white' : 'border-[#333333] hover:bg-[#2a2a2a]')
                  }`}>
                    <input
                      type="checkbox"
                      checked={formData.acceptedCategories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="w-4 h-4 text-[#16a34a] rounded border-gray-300 focus:ring-[#16a34a]"
                    />
                    <span className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{category}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Logistics */}
        <div className={`p-5 rounded-2xl border ${theme === 'light' ? 'bg-gray-50 border-gray-200/60' : 'bg-[#222222] border-[#2e2e2e]'}`}>
          <div className="flex items-center gap-2 mb-4">
            <TruckIcon className={`w-5 h-5 ${theme === 'light' ? 'text-[#16a34a]' : 'text-green-400'}`} />
            <h3 className={`font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Logistics & Capacity</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-bold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Transport Type</label>
              <Select
                options={[
                  { value: 'car', label: 'Regular Car' },
                  { value: 'van', label: 'Transport Van' },
                  { value: 'refrigerated', label: 'Refrigerated Truck' }
                ]}
                value={formData.transportType}
                onChange={(value) => setFormData({ ...formData, transportType: value })}
              />
            </div>

            <div>
              <label className={`block text-sm font-bold mb-3 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Storage Capabilities</label>
              <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    formData.hasIndustrialStorage
                      ? (theme === 'light' ? 'border-[#16a34a] bg-[#16a34a]/5' : 'border-[#16a34a]/50 bg-[#16a34a]/10')
                      : (theme === 'light' ? 'border-gray-200 hover:bg-white' : 'border-[#333333] hover:bg-[#2a2a2a]')
                  }`}>
                <input
                  type="checkbox"
                  checked={formData.hasIndustrialStorage}
                  onChange={(e) => setFormData({ ...formData, hasIndustrialStorage: e.target.checked })}
                  className="w-4 h-4 text-[#16a34a] rounded border-gray-300 focus:ring-[#16a34a]"
                />
                <span className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Has Industrial Freezers/Fridges</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className={`flex items-center gap-2 px-6 py-3 bg-[#16a34a] hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-sm shadow-[#16a34a]/20 ${
              isSaving ? 'opacity-75 cursor-not-allowed' : 'hover:-translate-y-0.5'
            }`}
          >
            {isSaving ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <CheckBadgeIcon className="w-5 h-5" />
            )}
            Save Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default NgoProfileForm;
