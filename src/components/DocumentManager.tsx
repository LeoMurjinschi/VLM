import React, { useState } from 'react';
import { useTheme } from './../hooks/useTheme';
import { DocumentCheckIcon } from '@heroicons/react/24/outline';
import DocumentUpload, { type UploadedDocument } from './ui/DocumentUpload';

const DocumentManager: React.FC = () => {
  const { theme } = useTheme();
  
  const [registrationDoc, setRegistrationDoc] = useState<UploadedDocument | null>(null);
  const [hygieneDoc, setHygieneDoc] = useState<UploadedDocument | null>(null);

  return (
    <div className={`p-6 md:p-8 rounded-3xl border shadow-sm ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-900 border-gray-700'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-indigo-50 text-indigo-600' : 'bg-indigo-900/30 text-indigo-400'}`}>
          <DocumentCheckIcon className="w-6 h-6" />
        </div>
        <div>
          <h2 className={`text-xl font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Legal & Tax Documents</h2>
          <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Verify your business to start donating.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className={`p-5 rounded-2xl border ${theme === 'light' ? 'bg-gray-50/50 border-gray-100' : 'bg-gray-900/50 border-gray-700'}`}>
          <DocumentUpload 
            label="Company Registration Certificate" 
            helperText="Upload your official business registration document. Max 10MB."
            value={registrationDoc}
            onChange={setRegistrationDoc}
          />
        </div>

        <div className={`p-5 rounded-2xl border ${theme === 'light' ? 'bg-gray-50/50 border-gray-100' : 'bg-gray-900/50 border-gray-700'}`}>
          <DocumentUpload 
            label="Hygiene / Food Safety Certificate" 
            helperText="Required to prove your ability to safely handle and store food."
            value={hygieneDoc}
            onChange={setHygieneDoc}
          />
        </div>
      </div>
      
      <div className={`mt-6 pt-4 border-t text-xs font-medium text-center ${theme === 'light' ? 'border-gray-100 text-gray-500' : 'border-gray-700 text-gray-400'}`}>
        Documents are securely stored and only reviewed by FoodShare admins.
      </div>
    </div>
  );
};

export default DocumentManager;