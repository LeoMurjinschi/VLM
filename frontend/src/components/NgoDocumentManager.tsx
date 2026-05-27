import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { DocumentTextIcon, CheckCircleIcon, CloudArrowUpIcon, DocumentCheckIcon, TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { documentService, type UserDocumentInfoDto } from '../api';

const DOC_TYPES = [
  { key: 'Registration Certificate', label: 'NGO Registration Certificate', helper: 'PDF, JPG or PNG (Max 5MB)', accept: '.pdf,.jpg,.jpeg,.png' },
  { key: 'Food Handling Authorization', label: 'Food Handling Authorization', helper: 'Proof from local authorities. PDF, JPG or PNG (Max 5MB)', accept: '.pdf,.jpg,.jpeg,.png' },
];

const StatusBadge: React.FC<{ status: UserDocumentInfoDto['status']; theme: string }> = ({ status, theme }) => {
  if (status === 'verified')
    return <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg ${theme === 'light' ? 'bg-[#16a34a]/10 text-[#16a34a]' : 'bg-[#16a34a]/20 text-[#16a34a]'}`}><CheckCircleIcon className="w-3.5 h-3.5" /> Verified</span>;
  if (status === 'rejected')
    return <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg ${theme === 'light' ? 'bg-red-50 text-red-700' : 'bg-red-900/30 text-red-400'}`}>Update Required</span>;
  return <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg ${theme === 'light' ? 'bg-amber-50 text-amber-700' : 'bg-amber-900/30 text-amber-400'}`}>Review in Progress</span>;
};

const NgoDocumentManager: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [documents, setDocuments] = useState<UserDocumentInfoDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!user) return;
    documentService.getByUser(parseInt(user.id))
      .then(setDocuments)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [user]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File is too large. Maximum size is 5MB.');
      return;
    }

    setUploading(prev => ({ ...prev, [docType]: true }));

    const reader = new FileReader();
    reader.onloadend = async () => {
      if (typeof reader.result !== 'string') return;
      try {
        const saved = await documentService.upload({
          userId: parseInt(user.id),
          fileName: file.name,
          documentType: docType,
          contentType: file.type,
          fileData: reader.result,
        });
        setDocuments(prev => [saved, ...prev]);
        toast.success(`${docType} uploaded successfully for review.`);
      } catch {
        toast.error('Upload failed. Please try again.');
      } finally {
        setUploading(prev => ({ ...prev, [docType]: false }));
        e.target.value = '';
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = async (id: number) => {
    if (!user) return;
    try {
      await documentService.delete(id, parseInt(user.id));
      setDocuments(prev => prev.filter(d => d.id !== id));
      toast.success('Document removed.');
    } catch {
      toast.error('Failed to remove document.');
    }
  };

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
          <DocumentTextIcon className="w-6 h-6" />
        </div>
        <div>
          <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-[#1a1a1a]' : 'text-gray-100'}`} style={{ fontFamily: 'var(--font-display)' }}>Compliance Documents</h2>
          <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Upload statutory documents to verify your NGO status and handling capabilities.</p>
        </div>
      </div>

      <div className="space-y-6">
        {DOC_TYPES.map(({ key, label, helper, accept }) => (
          <div key={key} className={`p-5 rounded-2xl border border-dashed text-center transition-colors ${theme === 'light' ? 'bg-white border-gray-300 hover:bg-gray-50' : 'bg-[#222222] border-[#2e2e2e] hover:bg-[#333333]'}`}>
            <DocumentCheckIcon className="w-8 h-8 mx-auto mb-3 text-[#16a34a]" />
            <h3 className={`font-bold text-sm mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>{label}</h3>
            <p className={`text-xs mb-4 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{helper}</p>
            {uploading[key] ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold">
                <div className="w-4 h-4 border-2 border-[#16a34a] border-t-transparent rounded-full animate-spin" />
                Uploading…
              </div>
            ) : (
              <label className={`inline-flex items-center gap-2 px-4 py-2 font-bold text-sm rounded-lg cursor-pointer transition-colors ${theme === 'light' ? 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm' : 'bg-[#1a1a1a] border border-[#2e2e2e] text-gray-200 hover:bg-[#222222]'}`}>
                <CloudArrowUpIcon className="w-5 h-5" />
                Upload
                <input type="file" className="hidden" accept={accept} onChange={(e) => handleFileUpload(e, key)} />
              </label>
            )}
          </div>
        ))}

        {documents.length > 0 && (
          <div className="mt-2">
            <h3 className={`font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Uploaded Documents</h3>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className={`flex items-center justify-between p-4 rounded-xl border ${theme === 'light' ? 'bg-white border-gray-200/60' : 'bg-[#222222] border-[#2e2e2e]'}`}>
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${theme === 'light' ? 'bg-[#16a34a]/10' : 'bg-[#16a34a]/20'}`}>
                      <DocumentTextIcon className="w-5 h-5 text-[#16a34a]" />
                    </div>
                    <div className="overflow-hidden">
                      <p className={`font-bold text-sm truncate ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>{doc.fileName}</p>
                      <p className={`text-xs mt-0.5 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                        {doc.documentType} • {new Date(doc.uploadedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                    <StatusBadge status={doc.status} theme={theme} />
                    <button
                      type="button"
                      onClick={() => handleDelete(doc.id)}
                      className={`p-1.5 rounded-lg transition-colors ${theme === 'light' ? 'text-gray-400 hover:text-red-500 hover:bg-red-50' : 'text-gray-500 hover:text-red-400 hover:bg-red-900/30'}`}
                      title="Remove"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NgoDocumentManager;
