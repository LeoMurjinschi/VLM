import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { DocumentTextIcon, CheckCircleIcon, CloudArrowUpIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

interface UploadedDoc {
  id: string;
  name: string;
  type: string;
  status: 'verified' | 'pending' | 'rejected';
  date: string;
}

const NgoDocumentManager: React.FC = () => {
  const { theme } = useTheme();
  const [documents, setDocuments] = useState<UploadedDoc[]>([
    {
      id: 'doc_1',
      name: 'NGO_Registration_Certificate_2026.pdf',
      type: 'Registration Certificate',
      status: 'verified',
      date: 'Jan 15, 2026',
    },
    {
      id: 'doc_2',
      name: 'Food_Handling_Auth_Current.pdf',
      type: 'Food Handling Authorization',
      status: 'pending',
      date: 'Mar 28, 2026',
    }
  ]);

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, doctype: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newDoc: UploadedDoc = {
        id: `doc_${Date.now()}`,
        name: file.name,
        type: doctype,
        status: 'pending',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };
      
      setDocuments([newDoc, ...documents]);
      setIsUploading(false);
      toast.success(`${doctype} uploaded successfully for review.`);
    }, 1500);
  };

  const getStatusBadge = (status: UploadedDoc['status']) => {
    switch (status) {
      case 'verified':
        return <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg ${theme === 'light' ? 'bg-[#16a34a]/10 text-[#16a34a]' : 'bg-[#16a34a]/20 text-[#16a34a]'}`}><CheckCircleIcon className="w-3.5 h-3.5" /> Verified</span>;
      case 'pending':
        return <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg ${theme === 'light' ? 'bg-amber-50 text-amber-700' : 'bg-amber-900/30 text-amber-500'}`}>Review in Progress</span>;
      case 'rejected':
        return <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg ${theme === 'light' ? 'bg-red-50 text-red-700' : 'bg-red-900/30 text-red-500'}`}>Update Required</span>;
    }
  };

  return (
    <div className={`p-6 md:p-8 rounded-3xl border shadow-sm ${theme === 'light' ? 'bg-white border-gray-200/60' : 'bg-[#1a1a1a] border-[#2e2e2e]'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-[#16a34a]/10 text-[#16a34a]' : 'bg-[#16a34a]/20 text-[#16a34a]'}`}>
          <DocumentTextIcon className="w-6 h-6" />
        </div>
        <div>
          <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-[#1a1a1a]' : 'text-gray-100'}`} style={{ fontFamily: 'var(--font-display)' }}>Compliance Documents</h2>
          <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Upload statutory documents to verify your NGO status and handling capabilities.</p>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Registration Cert Upload */}
        <div className={`p-5 rounded-2xl border border-dashed text-center transition-colors ${theme === 'light' ? 'bg-white border-gray-300 hover:bg-gray-50' : 'bg-[#222222] border-[#2e2e2e] hover:bg-[#333333]'}`}>
          <DocumentCheckIcon className={`w-8 h-8 mx-auto mb-3 ${theme === 'light' ? 'text-[#16a34a]' : 'text-[#16a34a]'}`} />
          <h3 className={`font-bold text-sm mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>NGO Registration Certificate</h3>
          <p className={`text-xs mb-4 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>PDF, JPG or PNG (Max 5MB)</p>
          
          <label className={`inline-flex items-center gap-2 px-4 py-2 font-bold text-sm rounded-lg cursor-pointer transition-colors ${theme === 'light' ? 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm' : 'bg-[#1a1a1a] border border-[#2e2e2e] text-gray-200 hover:bg-[#222222]'}`}>
            <CloudArrowUpIcon className="w-5 h-5" />
            Upload Certificate
            <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileUpload(e, 'Registration Certificate')} disabled={isUploading} />
          </label>
        </div>

        {/* Food Handling Upload */}
        <div className={`p-5 rounded-2xl border border-dashed text-center transition-colors ${theme === 'light' ? 'bg-white border-gray-300 hover:bg-gray-50' : 'bg-[#222222] border-[#2e2e2e] hover:bg-[#333333]'}`}>
          <DocumentCheckIcon className={`w-8 h-8 mx-auto mb-3 ${theme === 'light' ? 'text-[#16a34a]' : 'text-[#16a34a]'}`} />
          <h3 className={`font-bold text-sm mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Food Handling Authorization</h3>
          <p className={`text-xs mb-4 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Proof from local authorities. PDF, JPG or PNG (Max 5MB)</p>
          
          <label className={`inline-flex items-center gap-2 px-4 py-2 font-bold text-sm rounded-lg cursor-pointer transition-colors ${theme === 'light' ? 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm' : 'bg-[#1a1a1a] border border-[#2e2e2e] text-gray-200 hover:bg-[#222222]'}`}>
            <CloudArrowUpIcon className="w-5 h-5" />
            Upload Authorization
            <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileUpload(e, 'Food Handling Authorization')} disabled={isUploading} />
          </label>
        </div>

        {/* Document List */}
        <div className="mt-8">
          <h3 className={`font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Uploaded Documents</h3>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className={`flex items-center justify-between p-4 rounded-xl border ${theme === 'light' ? 'bg-white border-gray-200/60' : 'bg-[#222222] border-[#2e2e2e]'}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-[#16a34a]/10' : 'bg-[#16a34a]/20'}`}>
                    <DocumentTextIcon className={`w-5 h-5 ${theme === 'light' ? 'text-[#16a34a]' : 'text-[#16a34a]'}`} />
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>{doc.name}</p>
                    <p className={`text-xs mt-0.5 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{doc.type} • Uploaded {doc.date}</p>
                  </div>
                </div>
                <div>
                  {getStatusBadge(doc.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default NgoDocumentManager;
