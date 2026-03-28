import React, { useState, useCallback } from 'react';
import { PlusCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import Select from '../components/UI/Select';
import { useTheme } from '../hooks/useTheme';
import { addInventoryItem } from '../services/inventoryService';
import { useInventory } from '../context/InventoryContext';
import type { InventoryItem } from '../_mock';

interface FormState {
  title: string;
  description: string;
  category: string;
  quantity: string;
  unit: string;
  pickupLocation: string;
  expirationDate: string;
  image: string;
}

const CATEGORIES = [
  { value: 'Vegetables', label: 'Vegetables' },
  { value: 'Fruits', label: 'Fruits' },
  { value: 'Bakery', label: 'Bakery' },
  { value: 'Cooked Food', label: 'Cooked Food' },
  { value: 'Dairy', label: 'Dairy' },
];

const UNITS = [
  { value: 'kg', label: 'kg' },
  { value: 'pieces', label: 'pieces' },
  { value: 'portions', label: 'portions' },
  { value: 'plates', label: 'plates' },
  { value: 'boxes', label: 'boxes' },
];

const AddStock: React.FC = () => {
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const { addStock } = useInventory();
  const [formState, setFormState] = useState<FormState>({
    title: '',
    description: '',
    category: '',
    quantity: '',
    unit: '',
    pickupLocation: '',
    expirationDate: '',
    image: '',
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormState((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleSelectChange = useCallback((field: keyof FormState, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

 
  const hasError = useCallback((field: keyof FormState): boolean => {
    if (!hasAttemptedSubmit) return false;
    if (field === 'image') return false; 
    if (typeof formState[field] === 'string') {
      return !formState[field].toString().trim();
    }
    return !formState[field];
  }, [hasAttemptedSubmit, formState]);


  const getInputClass = useCallback((field: keyof FormState) => {
    const isError = hasError(field);
    const baseClass = "w-full px-4 py-3.5 border rounded-xl transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-opacity-100";
    
    if (isError) {
      return `${baseClass} border-red-500 ring-1 ring-red-500 ${
        theme === 'light' 
          ? 'bg-red-50 text-red-900 placeholder-red-300' 
          : 'bg-red-900/20 text-red-200 placeholder-red-400'
      }`;
    }
    
    return `${baseClass} ${
      theme === 'light' 
        ? 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 hover:border-gray-300' 
        : 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500 hover:border-gray-500'
    }`;
  }, [theme, hasError]);

  const resetForm = useCallback(() => {
    setFormState({
      title: '',
      description: '',
      category: '',
      quantity: '',
      unit: '',
      pickupLocation: '',
      expirationDate: '',
      image: '',
    });
    setHasAttemptedSubmit(false);
  }, []);

  

const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    if (
      !formState.title.trim() ||
      !formState.category ||
      !formState.quantity ||
      !formState.unit ||
      !formState.pickupLocation.trim() ||
      !formState.expirationDate ||
      !formState.description.trim()
    ) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (parseFloat(formState.quantity) <= 0) {
      toast.error('Quantity must be greater than 0');
      return;
    }

    setIsSubmitting(true);

    try {

      const newStock = await addInventoryItem({
        title: formState.title,
        description: formState.description,
        category: formState.category,
        quantity: parseFloat(formState.quantity),
        unit: formState.unit,
        pickupLocation: formState.pickupLocation,
        expirationDate: new Date(formState.expirationDate).toISOString(),
        image: formState.image || 'https://images.unsplash.com/photo-1488459716781-6f3ee109e5e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        addedAt: 'Just now',
      });


      addStock(newStock);

      toast.success('Stock added successfully! 🎉');
      resetForm();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to add stock. Please try again.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }, [formState, addStock, resetForm]);

  return (
    <div className={`min-h-screen py-8 md:py-12 px-4 md:px-6 ${
      theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
    }`}>
      <div className="max-w-3xl mx-auto animate-fade-in-up">

        <div className="mb-8 md:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-xl ${
              theme === 'light' ? 'bg-blue-100' : 'bg-blue-900/40'
            }`}>
              <PlusCircleIcon className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
            </div>
            <h1 className={`text-3xl md:text-4xl font-extrabold ${
              theme === 'light' ? 'text-gray-900' : 'text-gray-100'
            }`}>
              Add New Stock
            </h1>
          </div>
          <p className={`ml-12 md:ml-12.5 text-base md:text-lg leading-relaxed ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            Enter the details of the surplus food you want to donate.
          </p>
        </div>

        <div className={`rounded-2xl border shadow-sm overflow-hidden transition-all ${
          theme === 'light'
            ? 'bg-white border-gray-100'
            : 'bg-gray-900 border-gray-700'
        }`}>
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  
              <div className="md:col-span-2">
                <label htmlFor="title" className={`block text-sm font-semibold mb-2.5 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                  Item Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formState.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Fresh Tomatoes, Artisan Bread Loaves"
                  className={getInputClass('title')}
                />
              </div>

              <div>
                <label htmlFor="category" className={`block text-sm font-semibold mb-2.5 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="relative z-20">
                  <Select
                    options={CATEGORIES}
                    value={formState.category}
                    onChange={(value) => handleSelectChange('category', value)}
                    hasError={hasError('category')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="quantity" className={`block text-sm font-semibold mb-2.5 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formState.quantity}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  step="0.1"
                  className={getInputClass('quantity')}
                />
              </div>

              <div>
                <label htmlFor="unit" className={`block text-sm font-semibold mb-2.5 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                  Unit <span className="text-red-500">*</span>
                </label>
                <div className="relative z-10">
                  <Select
                    options={UNITS}
                    value={formState.unit}
                    onChange={(value) => handleSelectChange('unit', value)}
                    hasError={hasError('unit')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="pickupLocation" className={`block text-sm font-semibold mb-2.5 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                  Pickup Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="pickupLocation"
                  name="pickupLocation"
                  value={formState.pickupLocation}
                  onChange={handleInputChange}
                  placeholder="e.g., Main Warehouse, Sector 1"
                  className={getInputClass('pickupLocation')}
                />
              </div>

              <div>
                <label htmlFor="expirationDate" className={`block text-sm font-semibold mb-2.5 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                  Expiration Date & Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  id="expirationDate"
                  name="expirationDate"
                  value={formState.expirationDate}
                  onChange={handleInputChange}
                  className={getInputClass('expirationDate')}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="image" className={`block text-sm font-semibold mb-2.5 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                  Image URL <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formState.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className={getInputClass('image')}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className={`block text-sm font-semibold mb-2.5 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formState.description}
                  onChange={handleInputChange}
                  placeholder="Describe the food item, storage conditions, handling instructions, or any special notes..."
                  rows={5}
                  className={`${getInputClass('description')} resize-none`}
                />
              </div>
            </div>

            <div className={`flex gap-3 justify-end pt-6 border-t ${
              theme === 'light' ? 'border-gray-100' : 'border-gray-700'
            }`}>
              <button
                type="button"
                onClick={resetForm}
                disabled={isSubmitting}
                className={`px-6 py-3 border font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
                  theme === 'light'
                    ? 'border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    : 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
                }`}
              >
                Clear
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-2.5 px-6 py-3 text-white font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md ${
                  theme === 'light'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2.5 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="w-5 h-5" />
                    <span>Add Stock</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};



export default AddStock;