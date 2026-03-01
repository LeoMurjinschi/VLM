import React, { useState } from 'react';
import { TrashIcon, PencilIcon, MinusIcon, PlusIcon, CheckIcon } from '@heroicons/react/24/outline';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Low Stock':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Expired':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-600';
    }
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

 
  const handleDecrement = () => {
    const current = Number(draftQuantity) || 0;
    if (current > 0) setDraftQuantity(current - 1);
  };

  const handleIncrement = () => {
    const current = Number(draftQuantity) || 0;
    setDraftQuantity(current + 1);
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
    <div
      className={`group rounded-2xl border overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 flex flex-col h-full relative z-0 ${
        theme === 'light'
          ? 'bg-white border-gray-100'
          : 'bg-gray-800 border-gray-700'
      }`}
    >
    
      <div className="relative h-48 w-full overflow-hidden">
        <div
          className={`absolute inset-0 group-hover:bg-black/0 transition-colors z-10 ${
            theme === 'light' ? 'bg-black/5' : 'bg-black/20'
          }`}
        />
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <span
          className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg text-xs font-bold border ${getStatusColor(
            item.status
          )} shadow-sm z-20 backdrop-blur-sm`}
        >
          {item.status}
        </span>
      </div>


      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-bold tracking-wide text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md uppercase">
            {item.category}
          </span>
          <span
            className={`text-xs font-medium ${
              theme === 'light' ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {item.addedAt}
          </span>
        </div>

        <h3
          className={`text-xl font-extrabold mb-2 leading-tight group-hover:text-blue-600 transition-colors ${
            theme === 'light' ? 'text-gray-900' : 'text-gray-100'
          }`}
        >
          {item.title}
        </h3>

        <p
          className={`text-sm mb-4 line-clamp-2 leading-relaxed ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}
        >
          {item.description}
        </p>

        <div
          className={`mt-auto pt-4 border-t ${
            theme === 'light' ? 'border-gray-50' : 'border-gray-700'
          }`}
        />


        <div className="space-y-2.5 my-4">
          <div
            className={`flex items-center justify-between text-sm font-medium ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}
          >
            <span>Current Stock:</span>
            <span className="text-lg font-bold text-blue-600">
              {item.quantity} {item.unit}
            </span>
          </div>

          <div
            className={`flex items-center justify-between text-sm font-medium ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}
          >
            <span>Location:</span>
            <span className="font-semibold text-right">
              {item.pickupLocation}
            </span>
          </div>

          {expirationWarning && (
            <div
              className={`flex items-center justify-between text-sm font-medium ${
                expirationWarning === 'Expired'
                  ? 'text-red-600'
                  : 'text-amber-600'
              }`}
            >
              <span>Expires:</span>
              <span className="font-semibold">{expirationWarning}</span>
            </div>
          )}
        </div>


        <div
          className={`flex items-center gap-2 mb-4 p-3 rounded-xl ${
            theme === 'light'
              ? 'bg-gray-50 border border-gray-100'
              : 'bg-gray-700 border border-gray-600'
          }`}
        >
          <button
            onClick={handleDecrement}
            title="Decrease quantity"
            className={`flex-shrink-0 p-2 rounded-lg transition-all duration-200 ${
              theme === 'light'
                ? 'bg-white border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50'
                : 'bg-gray-600 border border-gray-500 text-gray-300 hover:text-red-400 hover:border-red-500 hover:bg-red-900/30'
            }`}
          >
            <MinusIcon className="w-5 h-5" />
          </button>

 
          <div className="flex-1 flex items-center justify-center gap-1.5">
            <input
              type="number"
              value={draftQuantity}
              onChange={(e) => setDraftQuantity(e.target.value)}
              min="0"
              className={`w-14 text-center font-extrabold text-sm bg-transparent border-b-2 focus:outline-none focus:border-blue-500 transition-colors hide-arrows ${
                theme === 'light' 
                  ? 'text-gray-900 border-gray-300' 
                  : 'text-gray-100 border-gray-500'
              }`}
            />
            <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
              {item.unit}
            </span>
          </div>

          <button
            onClick={handleIncrement}
            title="Increase quantity"
            className={`flex-shrink-0 p-2 rounded-lg transition-all duration-200 ${
              theme === 'light'
                ? 'bg-white border border-gray-200 text-gray-600 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50'
                : 'bg-gray-600 border border-gray-500 text-gray-300 hover:text-emerald-400 hover:border-emerald-500 hover:bg-emerald-900/30'
            }`}
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>

  
        <div className="flex gap-2">

          <button
            onClick={() => {
              if (hasChanges) {
                handleSaveQuantity();
              } else {
                onEdit(item);
              }
            }}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 font-bold rounded-lg transition-all duration-200 active:scale-[0.98] ${
              hasChanges
                ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-200/50'
                : theme === 'light'
                  ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200'
                  : 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50 border border-blue-800'
            }`}
          >
            {hasChanges ? <CheckIcon className="w-4 h-4" /> : <PencilIcon className="w-4 h-4" />}
            <span className="text-xs uppercase tracking-wider">{hasChanges ? 'Save' : 'Edit'}</span>
          </button>

          <button
            onClick={handleDelete}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 font-bold rounded-lg transition-all duration-200 active:scale-[0.98] ${
              theme === 'light'
                ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                : 'bg-red-900/30 text-red-400 hover:bg-red-900/50 border border-red-800'
            }`}
          >
            <TrashIcon className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;