import React, { useState } from 'react';
import { PhotoIcon, XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { useTheme } from '../../hooks/useTheme';

interface ImageDragDropProps {
  value?: string | null;
  onChange: (base64String: string | null) => void;
  maxSizeMB?: number;
  label?: string;
  helperText?: string;
  variant?: 'rectangle' | 'avatar';
}

const ImageDragDrop: React.FC<ImageDragDropProps> = ({
  value,
  onChange,
  maxSizeMB = 5,
  label = 'Upload Image',
  helperText = 'Recommended: JPG or PNG.',
  variant = 'rectangle'
}) => {
  const { theme } = useTheme();
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Invalid file type. Only images are allowed.');
      return;
    }

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleRemove = () => {
    onChange(null);
  };

  return (
    <div>
      {label && (
        <label className={`block text-sm font-semibold mb-2.5 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
          {label}
        </label>
      )}

      {value ? (
        <div className={`relative overflow-hidden border group ${variant === 'avatar' ? 'rounded-full w-32 h-32 mx-auto' : 'rounded-xl h-32 w-full'} ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
          <img 
            src={value} 
            alt="Uploaded Preview" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              type="button" 
              onClick={handleRemove}
              className={`bg-white/90 text-red-600 hover:text-red-700 font-bold shadow-sm flex items-center justify-center transform transition-transform hover:scale-105 ${variant === 'avatar' ? 'p-2 rounded-full' : 'px-4 py-2 rounded-lg gap-2'}`}
            >
              <XMarkIcon className="w-5 h-5" />
              {variant !== 'avatar' && 'Remove Image'}
            </button>
          </div>
          {variant !== 'avatar' && (
            <div className="absolute top-2 left-2 px-2 py-1 bg-emerald-500/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-md flex items-center gap-1 shadow-sm">
              <CheckCircleIcon className="w-3.5 h-3.5" />
              Uploaded successfully
            </div>
          )}
        </div>
      ) : (
        <label 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center border-2 border-dashed cursor-pointer transition-all ${
            variant === 'avatar' ? 'w-32 h-32 rounded-full mx-auto' : 'w-full h-32 rounded-xl'
          } ${
            isDragging 
              ? (theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-blue-400 bg-blue-900/20')
              : (theme === 'light' ? 'border-gray-300 hover:bg-gray-50 bg-white' : 'border-gray-600 hover:bg-gray-800 bg-gray-900/50')
          }`}
        >
          <div className="flex flex-col items-center justify-center text-center px-2">
            <div className={`p-3 mb-2 rounded-full ${
              isDragging 
                ? (theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-blue-900/40 text-blue-400')
                : (theme === 'light' ? 'bg-gray-100 text-gray-500' : 'bg-gray-800 text-gray-400')
            }`}>
              <PhotoIcon className={variant === 'avatar' ? 'w-5 h-5' : 'w-6 h-6'} />
            </div>
            {variant !== 'avatar' && (
              <>
                <p className={`mb-1 text-xs font-bold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  <span className={theme === 'light' ? 'text-blue-600' : 'text-blue-400'}>Click to upload</span> or drag
                </p>
                <p className={`text-[10px] font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
                  {helperText} Max {maxSizeMB}MB
                </p>
              </>
            )}
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
        </label>
      )}
    </div>
  );
};

export default ImageDragDrop;
