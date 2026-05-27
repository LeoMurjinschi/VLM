import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';
import { DONATION_CATEGORIES, type InventoryItem } from '../_mock';
import ImageDragDrop from './UI/ImageDragDrop';

export interface StockEditPayload {
  title: string;
  description: string;
  category: string;
  expirationDate: string;
  image: string;
  pickupLocation: string;
}

interface StockEditModalProps {
  isOpen: boolean;
  item: InventoryItem | null;
  onClose: () => void;
  onSave: (payload: StockEditPayload) => void;
}

const StockEditModal: React.FC<StockEditModalProps> = ({ isOpen, item, onClose, onSave }) => {
  const { theme } = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(DONATION_CATEGORIES[0]);
  const [expirationDate, setExpirationDate] = useState('');
  const [image, setImage] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');

  useEffect(() => {
    if (item && isOpen) {
      setTitle(item.title);
      setDescription(item.description);
      setCategory(item.category);
      setExpirationDate(item.expirationDate.slice(0, 10));
      setImage(item.image || '');
      setPickupLocation(item.pickupLocation || '');
    }
  }, [item, isOpen]);

  if (!isOpen || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      description: description.trim(),
      category,
      expirationDate: new Date(expirationDate).toISOString(),
      image: image.trim(),
      pickupLocation: pickupLocation.trim(),
    });
  };

  const inputClass = `w-full px-3 py-2 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] ${
    theme === 'light'
      ? 'bg-white border-gray-200 text-gray-900'
      : 'bg-[#1a1a1a] border-[#2e2e2e] text-white'
  }`;

  const labelClass = `block text-xs font-bold uppercase tracking-wider mb-1.5 ${
    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
  }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-lg rounded-2xl border shadow-2xl max-h-[90vh] flex flex-col ${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
        }`}
      >
        <div
          className={`flex items-center justify-between px-6 py-4 border-b flex-shrink-0 ${
            theme === 'light' ? 'border-gray-100' : 'border-[#2e2e2e]'
          }`}
        >
          <h3
            className={`font-bold text-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
          >
            Edit Stock
          </h3>
          <button
            type="button"
            onClick={onClose}
            className={`p-1.5 rounded-lg ${
              theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-[#262626]'
            }`}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4 overflow-y-auto">
          <div>
            <label className={labelClass}>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
              >
                {DONATION_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Expiration date</label>
              <input
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className={inputClass}
                required
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Pickup Location</label>
            <input
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              placeholder="e.g. 123 Main St"
              className={inputClass}
            />
          </div>
          <div>
            <ImageDragDrop
              value={image || null}
              onChange={(base64) => setImage(base64 ?? '')}
              label="Image"
              helperText="JPG or PNG, max 5MB"
            />
          </div>
        </div>

        <div
          className={`flex justify-end gap-2 px-6 py-4 border-t flex-shrink-0 ${
            theme === 'light' ? 'border-gray-100' : 'border-[#2e2e2e]'
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-sm font-semibold ${
              theme === 'light'
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                : 'bg-[#262626] hover:bg-[#333] text-gray-200'
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#16a34a] hover:bg-[#15803d] text-white shadow-md shadow-green-500/20"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default StockEditModal;
