import React, { useState, useEffect } from 'react';
import { useTheme } from './../hooks/useTheme';
import { BuildingStorefrontIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { donorProfileService } from '../api';
import { validateOrgName, validatePhone, validateDescription, validateAddress, validateLocation, validateOperatingHours, validateTransportType } from '../utils/validationUtils';

const BusinessProfileForm: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    companyName: '',
    description: '',
    operatingHours: '',
    phone: '',
    address: '',
    location: '',
    transportType: '',
  });

  const [visibility, setVisibility] = useState({ isPublic: true, showPhone: false, showAddress: false });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user) return;
    donorProfileService.getByUser(parseInt(user.id))
      .then((profile) => {
        setFormData({
          companyName: profile.companyName || '',
          description: profile.description || '',
          operatingHours: profile.operatingHours || '',
          phone: profile.phone || '',
          address: profile.address || '',
          location: profile.location || '',
          transportType: profile.transportType || '',
        });
        setVisibility({
          isPublic: profile.isPublic ?? true,
          showPhone: profile.showPhone ?? false,
          showAddress: profile.showAddress ?? false,
        });
      })
      .catch(() => {/* no profile yet — use defaults */})
      .finally(() => setIsLoading(false));
  }, [user]);

  const validateField = (fieldName: string, value: string) => {
    let validation;

    switch (fieldName) {
      case 'companyName':
        validation = validateOrgName(value, 3, 100);
        break;
      case 'phone':
        validation = validatePhone(value);
        break;
      case 'description':
        validation = validateDescription(value, 20, 500);
        break;
      case 'address':
        validation = validateAddress(value);
        break;
      case 'location':
        validation = validateLocation(value);
        break;
      case 'operatingHours':
        validation = validateOperatingHours(value);
        break;
      case 'transportType':
        validation = validateTransportType(value);
        break;
      default:
        return;
    }

    if (validation?.error) {
      setErrors(prev => ({ ...prev, [fieldName]: validation.error }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    validateField(fieldName, value);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const companyVal = validateOrgName(formData.companyName, 3, 100);
    if (companyVal.error) newErrors.companyName = companyVal.error;

    const phoneVal = validatePhone(formData.phone);
    if (phoneVal.error) newErrors.phone = phoneVal.error;

    const descVal = validateDescription(formData.description, 20, 500);
    if (descVal.error) newErrors.description = descVal.error;

    const addressVal = validateAddress(formData.address);
    if (addressVal.error) newErrors.address = addressVal.error;

    const locationVal = validateLocation(formData.location);
    if (locationVal.error) newErrors.location = locationVal.error;

    const hoursVal = validateOperatingHours(formData.operatingHours);
    if (hoursVal.error) newErrors.operatingHours = hoursVal.error;

    const transportVal = validateTransportType(formData.transportType);
    if (transportVal.error) newErrors.transportType = transportVal.error;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const inputClass = (fieldName?: string) => `w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-colors font-medium ${
    errors[fieldName || '']
      ? (theme === 'light'
        ? 'bg-white border-red-500 focus:ring-red-500/30 focus:border-red-500 text-gray-900'
        : 'bg-[#222222] border-red-500 focus:ring-red-500/30 focus:border-red-500 text-gray-100')
      : (theme === 'light'
        ? 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-[#16a34a]/30 focus:border-[#16a34a]'
        : 'bg-[#222222] border-[#2e2e2e] text-gray-100 placeholder-gray-500 focus:ring-[#16a34a]/30 focus:border-[#16a34a]')
  }`;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return;
    }

    setIsSaving(true);
    try {
      await donorProfileService.save({
        userId: parseInt(user.id),
        companyName: formData.companyName.trim(),
        description: formData.description.trim(),
        operatingHours: formData.operatingHours.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        location: formData.location.trim(),
        transportType: formData.transportType.trim(),
        pickupLocationsJson: '[]',
        isPublic: visibility.isPublic,
        showPhone: visibility.showPhone,
        showAddress: visibility.showAddress,
      });
      toast.success('Business profile saved!');
    } catch {
      toast.error('Failed to save business profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const isFormValid = Object.keys(errors).length === 0 && formData.companyName && formData.phone && formData.description && formData.address && formData.location && formData.operatingHours && formData.transportType;

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
            <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Company / Organization Name *</label>
            <input
              type="text"
              maxLength={100}
              value={formData.companyName}
              onChange={e => handleInputChange('companyName', e.target.value)}
              className={inputClass('companyName')}
              placeholder="e.g., Fresh Harvest Co."
            />
            {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
          </div>
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Phone Number *</label>
            <input
              type="tel"
              maxLength={15}
              value={formData.phone}
              onChange={e => handleInputChange('phone', e.target.value)}
              className={inputClass('phone')}
              placeholder="+373 XXX XX XXX"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Short Description *</label>
          <textarea
            maxLength={500}
            value={formData.description}
            onChange={e => handleInputChange('description', e.target.value)}
            className={`${inputClass('description')} resize-none`}
            rows={3}
            placeholder="Describe your business and the type of food you donate. (20-500 characters)"
          />
          <div className="flex justify-between items-center mt-1">
            <p className={`text-xs ${errors.description ? 'text-red-500' : theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              {formData.description.length}/500 characters
            </p>
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Operating Hours *</label>
            <input
              type="text"
              maxLength={100}
              value={formData.operatingHours}
              onChange={e => handleInputChange('operatingHours', e.target.value)}
              className={inputClass('operatingHours')}
              placeholder="e.g., Mon-Fri 08:00 - 20:00"
            />
            {errors.operatingHours && <p className="text-red-500 text-sm mt-1">{errors.operatingHours}</p>}
          </div>
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Transport Type *</label>
            <input
              type="text"
              maxLength={50}
              value={formData.transportType}
              onChange={e => handleInputChange('transportType', e.target.value)}
              className={inputClass('transportType')}
              placeholder="e.g., Van, Truck, Car"
            />
            {errors.transportType && <p className="text-red-500 text-sm mt-1">{errors.transportType}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Address *</label>
            <input
              type="text"
              maxLength={200}
              value={formData.address}
              onChange={e => handleInputChange('address', e.target.value)}
              className={inputClass('address')}
              placeholder="Street, city"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>City / Location *</label>
            <input
              type="text"
              maxLength={50}
              value={formData.location}
              onChange={e => handleInputChange('location', e.target.value)}
              className={inputClass('location')}
              placeholder="e.g., Cluj-Napoca"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>
        </div>

        <div className={`p-4 rounded-2xl border ${theme === 'light' ? 'bg-gray-50/80 border-gray-200' : 'bg-[#222222] border-[#2e2e2e]'}`}>
          <p className={`text-sm font-semibold mb-3 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Profile Visibility</p>
          <div className="space-y-2">
            {([
              { key: 'isPublic', label: 'Show my profile publicly' },
              { key: 'showPhone', label: 'Show phone number to others' },
              { key: 'showAddress', label: 'Show address to others' },
            ] as const).map(({ key, label }) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={visibility[key]}
                  onChange={() => setVisibility(prev => ({ ...prev, [key]: !prev[key] }))}
                  className="w-4 h-4 accent-[#16a34a]"
                />
                <span className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isSaving || !isFormValid}
            className={`flex items-center gap-2 px-6 py-3 bg-[#16a34a] hover:bg-green-700 text-white font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md`}
          >
            {isSaving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <CheckCircleIcon className="w-5 h-5" />}
            Save Business Info
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessProfileForm;
