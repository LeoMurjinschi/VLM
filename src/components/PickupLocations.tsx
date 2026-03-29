import React, { useState } from 'react';
import { useTheme } from './../hooks/useTheme';
import { MapPinIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

interface Location {
  id: string;
  address: string;
  instructions: string;
}

const PickupLocations: React.FC = () => {
  const { theme } = useTheme();
  const [locations, setLocations] = useState<Location[]>([
    { id: '1', address: 'Main Warehouse, Sector 1', instructions: 'Ring the bell at the back door.' }
  ]);
  
  const [newAddress, setNewAddress] = useState('');
  const [newInstructions, setNewInstructions] = useState('');

  const inputClass = `w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium ${
    theme === 'light' ? 'bg-white border-gray-200 text-gray-900 placeholder-gray-400' : 'bg-gray-900 border-gray-600 text-gray-100 placeholder-gray-500'
  }`;

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.trim()) {
      toast.error('Address is required');
      return;
    }
    
    const newLoc: Location = {
      id: Date.now().toString(),
      address: newAddress,
      instructions: newInstructions
    };
    
    setLocations([...locations, newLoc]);
    setNewAddress('');
    setNewInstructions('');
    toast.success('Pickup location added! 📍');
  };

  const handleDelete = (id: string) => {
    setLocations(locations.filter(loc => loc.id !== id));
    toast.info('Location removed.');
  };

  return (
    <div className={`p-6 md:p-8 rounded-3xl border shadow-sm ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-900 border-gray-700'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-orange-50 text-orange-600' : 'bg-orange-900/30 text-orange-400'}`}>
          <MapPinIcon className="w-6 h-6" />
        </div>
        <div>
          <h2 className={`text-xl font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Pickup Locations</h2>
          <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Where can NGOs pick up the food?</p>
        </div>
      </div>


      <div className="space-y-3 mb-6">
        {locations.map(loc => (
          <div key={loc.id} className={`flex items-start justify-between p-4 rounded-xl border ${theme === 'light' ? 'bg-gray-50 border-gray-100' : 'bg-gray-700/30 border-gray-600'}`}>
            <div>
              <p className={`font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>{loc.address}</p>
              {loc.instructions && <p className={`text-xs mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Instructions: {loc.instructions}</p>}
            </div>
            <button onClick={() => handleDelete(loc.id)} className={`p-2 rounded-lg transition-colors ${theme === 'light' ? 'text-gray-400 hover:text-red-600 hover:bg-red-50' : 'text-gray-500 hover:text-red-400 hover:bg-red-900/30'}`}>
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>


      <form onSubmit={handleAddLocation} className={`pt-5 border-t ${theme === 'light' ? 'border-gray-100' : 'border-gray-700'}`}>
        <h4 className={`text-sm font-bold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Add New Location</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" value={newAddress} onChange={e => setNewAddress(e.target.value)} placeholder="Full Address" className={inputClass} />
          <input type="text" value={newInstructions} onChange={e => setNewInstructions(e.target.value)} placeholder="Pickup Instructions (Optional)" className={inputClass} />
        </div>
        <button type="submit" className={`flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-bold rounded-xl transition-colors ${theme === 'light' ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50'}`}>
          <PlusIcon className="w-4 h-4" /> Add Location
        </button>
      </form>
    </div>
  );
};

export default PickupLocations;