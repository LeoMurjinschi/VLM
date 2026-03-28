import React, { useState } from 'react';
import { 
  DocumentArrowUpIcon, 
  DocumentTextIcon, 
  XMarkIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { useTheme } from '../../hooks/useTheme';


export interface UploadedDocument {
  name: string;
  size: number;
  data: string; 
}

interface DocumentUploadProps {
  value?: UploadedDocument | null;
  onChange: (doc: UploadedDocument | null) => void;
  maxSizeMB?: number;
  label?: string;
  helperText?: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  value,
  onChange,
  maxSizeMB = 10,
  label = 'Upload Document',
  helperText = 'Accepted formats: PDF, DOC, DOCX.'
}) => {
  const { theme } = useTheme();
  const [isDragging, setIsDragging] = useState(false);


  const acceptedTypes = [
    'application/pdf', 
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const processFile = (file: File) => {
   
    if (!acceptedTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      toast.error('Invalid file type. Only PDF and Word documents are allowed.');
      return;
    }


    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      return;
    }


    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onChange({
          name: file.name,
          size: file.size,
          data: reader.result
        });
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


  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      {label && (
        <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
          {label}
        </label>
      )}


      {value ? (
        <div className={`flex items-center justify-between p-4 rounded-xl border ${
          theme === 'light' ? 'bg-emerald-50/50 border-emerald-200' : 'bg-emerald-900/10 border-emerald-800'
        }`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-emerald-100 text-emerald-600' : 'bg-emerald-900/40 text-emerald-400'}`}>
              <DocumentTextIcon className="w-6 h-6" />
            </div>
            <div className="truncate">
              <p className={`text-sm font-bold truncate ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
                {value.name}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <CheckCircleIcon className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-emerald-500' : 'text-emerald-400'}`} />
                <span className={`text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                  {formatSize(value.size)} • Uploaded
                </span>
              </div>
            </div>
          </div>
          
          <button 
            type="button" 
            onClick={handleRemove}
            className={`p-2 ml-2 rounded-lg transition-colors ${
              theme === 'light' ? 'text-gray-400 hover:text-red-500 hover:bg-red-50' : 'text-gray-500 hover:text-red-400 hover:bg-red-900/30'
            }`}
            title="Remove document"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      ) : (

        <label 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
            isDragging 
              ? (theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-blue-400 bg-blue-900/20')
              : (theme === 'light' ? 'border-gray-300 hover:bg-gray-50 bg-white' : 'border-gray-600 hover:bg-gray-800 bg-gray-900/50')
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-2 pb-3">
            <div className={`p-3 mb-3 rounded-full ${
              isDragging 
                ? (theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-blue-900/40 text-blue-400')
                : (theme === 'light' ? 'bg-gray-100 text-gray-500' : 'bg-gray-700 text-gray-400')
            }`}>
              <DocumentArrowUpIcon className="w-6 h-6" />
            </div>
            <p className={`mb-1 text-sm font-bold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
              <span className={theme === 'light' ? 'text-blue-600' : 'text-blue-400'}>Click to upload</span> or drag and drop
            </p>
            <p className={`text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              {helperText} (Max {maxSizeMB}MB)
            </p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
            onChange={handleFileChange} 
          />
        </label>
      )}
    </div>
  );
};

export default DocumentUpload;