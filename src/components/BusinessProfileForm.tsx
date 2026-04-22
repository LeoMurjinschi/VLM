import React, { useState } from 'react';
import { useTheme } from './../hooks/useTheme';
import { BuildingStorefrontIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const BusinessProfileForm: React.FC = () => {
  const { theme } = useTheme();
  const [isSaving, setIsSaving] = useState(false);
  

  const [businessData, setBusinessData] = useState({
    companyName: 'Supermarket Fresh Local',
    description: 'We are committed to reducing food waste by donating our daily surplus of fresh bakery and produce items.',
    operatingHours: 'Mon-Fri: 08:00 - 22:00, Sat-Sun: 09:00 - 20:00'
  });

  const inputClass = `w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] transition-colors font-medium ${
    theme === 'light' ? 'bg-white border-gray-200 text-gray-900 placeholder-gray-400' : 'bg-[#222222] border-[#2e2e2e] text-gray-100 placeholder-gray-500'
  }`;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      toast.success('Business profile updated! 🏢');
    }, 800);
  };

  return (
    <div className={`p-6 md:p-8 rounded-3xl border shadow-sm ${theme === 'light' ? 'bg-white border-gray-200/60' : 'bg-[#1a1a1a] border-[#2e2e2e]'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-[#16a34a]/10 text-[#16a34a]' : 'bg-[#16a34a]/20 text-[#16a34a]'}`}>
          <BuildingStorefrontIcon className="w-6 h-6" />
        </div>
        <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-[#1a1a1a]' : 'text-gray-100'}`} style={{ fontFamily: 'var(--font-display)' }}>Business Profile</h2>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Company Name</label>
          <input type="text" value={businessData.companyName} onChange={e => setBusinessData({...businessData, companyName: e.target.value})} className={inputClass} required />
        </div>
        
        <div>
          <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Short Description</label>
          <textarea value={businessData.description} onChange={e => setBusinessData({...businessData, description: e.target.value})} className={`${inputClass} resize-none`} rows={3} required />
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Operating Hours</label>
          <input type="text" value={businessData.operatingHours} onChange={e => setBusinessData({...businessData, operatingHours: e.target.value})} className={inputClass} placeholder="e.g., Mon-Fri 08:00 - 20:00" required />
        </div>

        <div className="pt-2 flex justify-end">
          <button type="submit" disabled={isSaving} className={`flex items-center gap-2 px-6 py-3 bg-[#16a34a] hover:bg-green-700 text-white font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 ${theme === 'light' ? 'shadow-[#16a34a]/20' : 'shadow-black/50'}`}>
            {isSaving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <CheckCircleIcon className="w-5 h-5" />}
            Save Business Info
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessProfileForm;