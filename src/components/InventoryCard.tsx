import React, { useState } from 'react';
import { TrashIcon, PencilIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';
import type { InventoryItem } from '../_mock/inventory';
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
  const [isAdjusting, setIsAdjusting] = useState(false);

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
    if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      onDelete(item.id);
      toast.success(`${item.title} removed from inventory`);
    }
  };

  const handleAdjustQuantity = (delta: number) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity < 0) {
      toast.error('Quantity cannot be negative');
      return;
    }
    onUpdateQuantity(item.id, newQuantity);
    toast.success(
      `Stock updated: ${newQuantity} ${item.unit}`
    );
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
      {/* Image Section */}
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

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Header */}
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

        {/* Title */}
        <h3
          className={`text-xl font-extrabold mb-2 leading-tight group-hover:text-blue-600 transition-colors ${
            theme === 'light' ? 'text-gray-900' : 'text-gray-100'
          }`}
        >
          {item.title}
        </h3>

        {/* Description */}
        <p
          className={`text-sm mb-4 line-clamp-2 leading-relaxed ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}
        >
          {item.description}
        </p>

        {/* Divider */}
        <div
          className={`mt-auto pt-4 border-t ${
            theme === 'light' ? 'border-gray-50' : 'border-gray-700'
          }`}
        />

        {/* Metadata */}
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

        {/* Quantity Adjustment */}
        <div
          className={`flex items-center gap-2 mb-4 p-3 rounded-xl ${
            theme === 'light'
              ? 'bg-gray-50 border border-gray-100'
              : 'bg-gray-700 border border-gray-600'
          }`}
        >
          <button
            onClick={() => handleAdjustQuantity(-1)}
            disabled={isAdjusting || item.quantity <= 0}
            title="Decrease quantity"
            className={`flex-shrink-0 p-2 rounded-lg transition-all duration-200 ${
              isAdjusting || item.quantity <= 0
                ? 'opacity-50 cursor-not-allowed'
                : theme === 'light'
                  ? 'bg-white border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50'
                  : 'bg-gray-600 border border-gray-500 text-gray-300 hover:text-red-400 hover:border-red-500 hover:bg-red-900/30'
            }`}
          >
            <MinusIcon className="w-5 h-5" />
          </button>

          <span
            className={`flex-1 text-center font-bold text-sm ${
              theme === 'light' ? 'text-gray-900' : 'text-gray-100'
            }`}
          >
            {item.quantity} {item.unit}
          </span>

          <button
            onClick={() => handleAdjustQuantity(1)}
            disabled={isAdjusting}
            title="Increase quantity"
            className={`flex-shrink-0 p-2 rounded-lg transition-all duration-200 ${
              isAdjusting
                ? 'opacity-50 cursor-not-allowed'
                : theme === 'light'
                  ? 'bg-white border border-gray-200 text-gray-600 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50'
                  : 'bg-gray-600 border border-gray-500 text-gray-300 hover:text-emerald-400 hover:border-emerald-500 hover:bg-emerald-900/30'
            }`}
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(item)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 font-semibold rounded-lg transition-all duration-200 active:scale-[0.98] ${
              theme === 'light'
                ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200'
                : 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50 border border-blue-800'
            }`}
          >
            <PencilIcon className="w-4 h-4" />
            <span className="text-xs">Edit</span>
          </button>

          <button
            onClick={handleDelete}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 font-semibold rounded-lg transition-all duration-200 active:scale-[0.98] ${
              theme === 'light'
                ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                : 'bg-red-900/30 text-red-400 hover:bg-red-900/50 border border-red-800'
            }`}
          >
            <TrashIcon className="w-4 h-4" />
            <span className="text-xs">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;
