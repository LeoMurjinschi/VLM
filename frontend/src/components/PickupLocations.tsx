import React, { useState, useEffect } from 'react';
import { useTheme } from './../hooks/useTheme';
import { MapPinIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { donorProfileService, type PickupLocation } from '../api';

const PickupLocations: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [locations, setLocations] = useState<PickupLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [newInstructions, setNewInstructions] = useState('');

  useEffect(() => {
    if (!user) return;
    donorProfileService.getByUser(parseInt(user.id))
      .then((profile) => {
        try {
          const parsed = JSON.parse(profile.pickupLocationsJson || '[]');
          setLocations(Array.isArray(parsed) ? parsed : []);
        } catch {
          setLocations([]);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [user]);

  const persist = async (updated: PickupLocation[]) => {
    if (!user) return;
    setIsSaving(true);
    try {
      await donorProfileService.savePickupLocations(parseInt(user.id), updated);
    } catch {
      toast.error('Failed to save pickup locations.');
      throw new Error('save failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.trim()) {
      toast.error('Address is required');
      return;
    }
    const newLoc: PickupLocation = {
      id: Date.now().toString(),
      address: newAddress.trim(),
      instructions: newInstructions.trim(),
    };
    const updated = [...locations, newLoc];
    try {
      await persist(updated);
      setLocations(updated);
      setNewAddress('');
      setNewInstructions('');
      toast.success('Pickup location added!');
    } catch {
      // persist already showed error toast
    }
  };

  const handleDelete = async (id: string) => {
    const updated = locations.filter(loc => loc.id !== id);
    try {
      await persist(updated);
      setLocations(updated);
      toast.info('Location removed.');
    } catch {
      // persist already showed error toast
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] transition-colors font-medium ${
    theme === 'light' ? 'bg-white border-gray-200 text-gray-900 placeholder-gray-400' : 'bg-[#222222] border-[#2e2e2e] text-gray-100 placeholder-gray-500'
  }`;

  if (isLoading) {
    return (
      <div className={`p-6 md:p-8 rounded-3xl border shadow-sm flex items-center justify-center h-32 ${theme === 'light' ? 'bg-white border-gray-200/60' : 'bg-[#1a1a1a] border-[#2e2e2e]'}`}>
        <div className="w-6 h-6 border-2 border-[#16a34a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`p-6 md:p-8 rounded-3xl border shadow-sm ${theme === 'light' ? 'bg-white border-gray-200/60' : 'bg-[#1a1a1a] border-[#2e2e2e]'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-[#16a34a]/10 text-[#16a34a]' : 'bg-[#16a34a]/10 text-green-400'}`}>
          <MapPinIcon className="w-6 h-6" />
        </div>
        <div>
          <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-[#1a1a1a]' : 'text-gray-100'}`} style={{ fontFamily: 'var(--font-display)' }}>Pickup Locations</h2>
          <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Where can NGOs pick up the food?</p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {locations.length === 0 && (
          <p className={`text-sm text-center py-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>No pickup locations added yet.</p>
        )}
        {locations.map(loc => (
          <div key={loc.id} className={`flex items-start justify-between p-4 rounded-xl border ${theme === 'light' ? 'bg-gray-50 border-gray-100' : 'bg-[#222222] border-[#2e2e2e]'}`}>
            <div>
              <p className={`font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>{loc.address}</p>
              {loc.instructions && <p className={`text-xs mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Instructions: {loc.instructions}</p>}
            </div>
            <button
              onClick={() => handleDelete(loc.id)}
              disabled={isSaving}
              className={`p-2 rounded-lg transition-colors ${theme === 'light' ? 'text-gray-400 hover:text-red-600 hover:bg-red-50' : 'text-gray-500 hover:text-red-400 hover:bg-red-900/30'} disabled:opacity-50`}
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleAddLocation} className={`pt-5 border-t ${theme === 'light' ? 'border-gray-100' : 'border-[#2e2e2e]'}`}>
        <h4 className={`text-sm font-bold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Add New Location</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" value={newAddress} onChange={e => setNewAddress(e.target.value)} placeholder="Full Address" className={inputClass} />
          <input type="text" value={newInstructions} onChange={e => setNewInstructions(e.target.value)} placeholder="Pickup Instructions (Optional)" className={inputClass} />
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className={`flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-bold rounded-xl transition-colors ${theme === 'light' ? 'bg-[#16a34a]/10 text-[#16a34a] hover:bg-[#16a34a]/20' : 'bg-[#16a34a]/10 text-green-400 hover:bg-[#16a34a]/20'} disabled:opacity-60`}
        >
          {isSaving
            ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            : <PlusIcon className="w-4 h-4" />}
          {isSaving ? 'Saving…' : 'Add Location'}
        </button>
      </form>
    </div>
  );
};

export default PickupLocations;
