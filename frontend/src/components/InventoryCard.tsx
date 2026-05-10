import React, { useState } from 'react';
import { TrashIcon, PencilIcon, MinusIcon, PlusIcon, CheckIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';
import type { InventoryItem } from '../_mock';
import { toast } from 'react-toastify';

interface InventoryCardProps {
  item: InventoryItem;
  onDelete: (id: string) => void;
  onEdit: (item: InventoryItem) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const InventoryCard: React.FC<InventoryCardProps> = ({
  item,
  onDelete,
  onEdit,
  onUpdateQuantity,
}) => {
  const { theme } = useTheme();
  const [draftQuantity, setDraftQuantity] = useState<number | string>(item.quantity);
  const hasChanges = Number(draftQuantity) !== item.quantity;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-500/80 text-white';
      case 'Low Stock': return 'bg-amber-500/80 text-white';
      case 'Expired': return 'bg-red-500/80 text-white';
      default: return 'bg-gray-500/80 text-white';
    }
  };

  const getCategoryColor = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes('fruit')) return 'bg-orange-500/80 text-white';
    if (lower.includes('baker')) return 'bg-amber-500/80 text-white';
    if (lower.includes('veg')) return 'bg-green-600/80 text-white';
    if (lower.includes('dairy')) return 'bg-blue-500/80 text-white';
    if (lower.includes('cook')) return 'bg-red-500/80 text-white';
    return 'bg-gray-500/80 text-white';
  };

  const getExpirationWarning = () => {
    const now = new Date().getTime();
    const expiration = new Date(item.expirationDate).getTime();
    const daysLeft = Math.ceil((expiration - now) / (1000 * 60 * 60 * 24));
    if (daysLeft < 0) return 'Expired';
    if (daysLeft <= 3) return `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`;
    return null;
  };

  const handleDelete = () => {
    const ConfirmDelete = ({ closeToast }: { closeToast?: () => void }) => (
      <div className="flex flex-col">
        <p className="text-sm font-semibold mb-3 text-gray-800">
          Are you sure you want to delete <br />
          <span className="font-bold text-red-500">"{item.title}"</span>?
        </p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={closeToast}
            className="px-3 py-1.5 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onDelete(item.id);
              if (closeToast) closeToast(); 
              toast.success(`"${item.title}" removed from inventory!`);
            }}
            className="px-3 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    );

    toast.warn(<ConfirmDelete />, {
      position: "top-center", 
      autoClose: false,      
      closeOnClick: false,    
      draggable: false,       
      theme: "light",         
    });
  };

  const isKg = item.unit.toLowerCase() === 'kg';
  const stepSize = isKg ? 0.1 : 1;

  const handleDecrement = () => {
    const current = Number(draftQuantity) || 0;
    const next = Math.round((current - stepSize) * 10) / 10;
    if (next >= 0) setDraftQuantity(next);
  };

  const handleIncrement = () => {
    const current = Number(draftQuantity) || 0;
    const next = Math.round((current + stepSize) * 10) / 10;
    setDraftQuantity(next);
  };

  const handleSaveQuantity = () => {
    const newQuantity = Number(draftQuantity);
    if (newQuantity < 0 || isNaN(newQuantity)) {
      toast.error('Quantity must be a valid number (minimum 0)');
      setDraftQuantity(item.quantity);
      return;
    }
    onUpdateQuantity(item.id, newQuantity);
    toast.success(`Stock updated: ${newQuantity} ${item.unit}`);
  };

  const expirationWarning = getExpirationWarning();

  return (
    <div className={`group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl ${
      theme === 'light'
        ? 'bg-white border border-gray-200/80 shadow-sm hover:shadow-gray-200/60'
        : 'bg-[#1a1a1a] border border-[#2e2e2e] shadow-sm hover:shadow-black/30'
    } ${
      expirationWarning ? 'ring-2 ring-amber-400/40' : ''
    }`}>
      
      {/* Image section — fixed 200px */}
      <div className="relative h-[200px] overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Category badge — top left */}
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wide shadow-sm ${getCategoryColor(item.category)}`}>
          {item.category}
        </span>

        {/* Status badge — top right */}
        <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-sm ${getStatusStyle(item.status)}`}>
          {item.status}
        </span>

        {/* Expiry warning badge */}
        {expirationWarning && (
          <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-amber-500 text-white text-[10px] font-bold">
            ⚠ {expirationWarning}
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-grow p-4 pt-3.5">
        {/* Title */}
        <h3 className={`text-lg font-bold leading-snug mb-1.5 ${
          theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
        }`} style={{ fontSize: '18px' }}>
          {item.title}
        </h3>

        {/* Description */}
        <p className={`text-[13px] mb-3 line-clamp-2 leading-relaxed ${
          theme === 'light' ? 'text-gray-500' : 'text-gray-400'
        }`}>
          {item.description}
        </p>

        {/* Info rows */}
        <div className={`space-y-2 pt-3 border-t mb-4 ${
          theme === 'light' ? 'border-gray-100' : 'border-[#2e2e2e]'
        }`}>
          <div className={`flex items-center text-[13px] ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            <MapPinIcon className="w-4 h-4 mr-2 text-[#16a34a] flex-shrink-0" />
            <span className="truncate">{item.pickupLocation}</span>
          </div>
          <div className={`flex items-center text-[13px] ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            <ClockIcon className={`w-4 h-4 mr-2 flex-shrink-0 ${expirationWarning ? 'text-amber-500' : 'text-gray-400'}`} />
            <span>
              Expires: <span className={expirationWarning ? 'text-amber-500 font-semibold' : ''}>
                {new Date(item.expirationDate).toLocaleDateString()}
              </span>
            </span>
          </div>
          <div className={`flex items-center justify-between text-sm font-semibold ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}>
            <span>Stock:</span>
            <span className="text-[#16a34a] font-bold">
              {item.quantity} <span className="text-xs uppercase">{item.unit}</span>
            </span>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-2 mt-auto">
          {/* Quantity stepper pill */}
          <div className={`flex-1 flex items-center justify-center gap-1 p-1.5 rounded-xl border ${
            theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-[#262626] border-[#2e2e2e]'
          }`}>
            <button
              onClick={handleDecrement}
              className={`p-1.5 rounded-lg transition-all ${
                theme === 'light' ? 'hover:bg-red-50 hover:text-red-600 text-gray-500' : 'hover:bg-red-900/30 hover:text-red-400 text-gray-400'
              }`}
            >
              <MinusIcon className="w-4 h-4" />
            </button>
            <input
              type="number"
              value={draftQuantity}
              onChange={(e) => setDraftQuantity(e.target.value)}
              className={`w-10 text-center font-bold text-sm bg-transparent focus:outline-none ${
                theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
              }`}
            />
            <button
              onClick={handleIncrement}
              className={`p-1.5 rounded-lg transition-all ${
                theme === 'light' ? 'hover:bg-green-50 hover:text-green-600 text-gray-500' : 'hover:bg-green-900/30 hover:text-green-400 text-gray-400'
              }`}
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => hasChanges ? handleSaveQuantity() : onEdit(item)}
            className={`flex items-center justify-center p-2.5 rounded-xl transition-all active:scale-95 ${
              hasChanges 
                ? 'bg-[#16a34a] text-white shadow-md shadow-green-500/20' 
                : theme === 'light' 
                  ? 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-500' 
                  : 'bg-[#262626] border border-[#2e2e2e] hover:bg-gray-800 text-gray-400'
            }`}
          >
            {hasChanges ? <CheckIcon className="w-4.5 h-4.5" /> : <PencilIcon className="w-4.5 h-4.5" />}
          </button>

          <button
            onClick={handleDelete}
            className={`flex items-center justify-center p-2.5 rounded-xl transition-all active:scale-95 ${
              theme === 'light' 
                ? 'bg-white border border-gray-200 hover:bg-red-50 hover:text-red-600 text-gray-500' 
                : 'bg-[#262626] border border-[#2e2e2e] hover:bg-red-900/30 hover:text-red-400 text-gray-400'
            }`}
          >
            <TrashIcon className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;