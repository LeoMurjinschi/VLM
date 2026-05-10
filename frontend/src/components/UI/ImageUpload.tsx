import React from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { useTheme } from '../../hooks/useTheme';

interface ImageUploadProps {
  value?: string | null;
  onChange: (base64String: string) => void;
  maxSizeMB?: number;
  label?: string;
  helperText?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  maxSizeMB = 5, 
  label = 'Upload Image',
  helperText = 'Recommended: Square JPG or PNG.'
}) => {
  const { theme } = useTheme();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      {label && (
        <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
          {label}
        </label>
      )}
      
      <div className="flex items-center gap-4">

        <div className={`w-14 h-14 rounded-full overflow-hidden border shrink-0 ${theme === 'light' ? 'border-gray-200' : 'border-gray-600'}`}>
          <img 
            src={value || 'https://ui-avatars.com/api/?name=Upload&background=0D8ABC&color=fff'} 
            alt="Preview" 
            className="w-full h-full object-cover" 
          />
        </div>


        <div className="flex-1">
          <label className={`flex items-center justify-center gap-2 px-4 py-3 border border-dashed rounded-xl cursor-pointer transition-colors active:scale-[0.99] ${
            theme === 'light' ? 'border-gray-300 hover:bg-gray-50 text-gray-700' : 'border-gray-600 hover:bg-gray-800 text-gray-300'
          }`}>
            <PhotoIcon className="w-5 h-5" />
            <span className="text-sm font-bold">Click to upload image</span>
            <input 
              type="file" 
              accept="image/png, image/jpeg, image/jpg" 
              className="hidden" 
              onChange={handleFileChange} 
            />
          </label>
          
          {helperText && (
            <p className={`text-xs mt-1.5 font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
              {helperText} Max {maxSizeMB}MB.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;