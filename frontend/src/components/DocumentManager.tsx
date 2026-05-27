import React, { useState, useEffect } from 'react';
import { useTheme } from './../hooks/useTheme';
import { DocumentCheckIcon, DocumentTextIcon, TrashIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import DocumentUpload, { type UploadedDocument } from './UI/DocumentUpload';
import { useAuth } from '../context/AuthContext';
import { documentService, type UserDocumentInfoDto } from '../api';

const DOC_TYPES = [
  { key: 'registration', label: 'Company Registration Certificate', helper: 'Upload your official business registration document. Max 10MB.' },
  { key: 'hygiene', label: 'Hygiene / Food Safety Certificate', helper: 'Required to prove your ability to safely handle and store food.' },
];

const StatusBadge: React.FC<{ status: UserDocumentInfoDto['status']; theme: string }> = ({ status, theme }) => {
  if (status === 'verified')
    return <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg ${theme === 'light' ? 'bg-[#16a34a]/10 text-[#16a34a]' : 'bg-[#16a34a]/20 text-[#16a34a]'}`}><CheckCircleIcon className="w-3.5 h-3.5" /> Verified</span>;
  if (status === 'rejected')
    return <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg ${theme === 'light' ? 'bg-red-50 text-red-700' : 'bg-red-900/30 text-red-400'}`}>Update Required</span>;
  return <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg ${theme === 'light' ? 'bg-amber-50 text-amber-700' : 'bg-amber-900/30 text-amber-400'}`}>Review in Progress</span>;
};

const DocumentManager: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [documents, setDocuments] = useState<UserDocumentInfoDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [staged, setStaged] = useState<Record<string, UploadedDocument | null>>({});

  useEffect(() => {
    if (!user) return;
    documentService.getByUser(parseInt(user.id))
      .then(setDocuments)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [user]);

  const handleUpload = async (docType: string, doc: UploadedDocument | null) => {
    setStaged(prev => ({ ...prev, [docType]: doc }));
    if (!doc || !user) return;

    setUploading(prev => ({ ...prev, [docType]: true }));
    try {
      const saved = await documentService.upload({
        userId: parseInt(user.id),
        fileName: doc.name,
        documentType: docType,
        contentType: doc.data.split(';')[0].replace('data:', ''),
        fileData: doc.data,
      });
      setDocuments(prev => [saved, ...prev]);
      setStaged(prev => ({ ...prev, [docType]: null }));
      toast.success(`${docType} uploaded for review.`);
    } catch {
      toast.error('Upload failed. Please try again.');
    } finally {
      setUploading(prev => ({ ...prev, [docType]: false }));
    }
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
      <div className={`p-6 md:p-8 rounded-3xl border shadow-sm flex items-center justify-center h-40 ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-[#1a1a1a] border-[#2e2e2e]'}`}>
        <div className="w-6 h-6 border-2 border-[#16a34a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`p-6 md:p-8 rounded-3xl border shadow-sm ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-[#1a1a1a] border-[#2e2e2e]'}`}>
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
        {DOC_TYPES.map(({ key, label, helper }) => (
          <div key={key} className={`p-5 rounded-2xl border ${theme === 'light' ? 'bg-gray-50/50 border-gray-100' : 'bg-[#222222] border-[#2e2e2e]'}`}>
            {uploading[key] ? (
              <div className="flex items-center gap-3 py-4 justify-center">
                <div className="w-5 h-5 border-2 border-[#16a34a] border-t-transparent rounded-full animate-spin" />
                <span className={`text-sm font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Uploading…</span>
              </div>
            ) : (
              <DocumentUpload
                label={label}
                helperText={helper}
                value={staged[key] ?? null}
                onChange={(doc) => handleUpload(key, doc)}
              />
            )}
          </div>
        ))}
      </div>

      {documents.length > 0 && (
        <div className="mt-8">
          <h3 className={`font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Uploaded Documents</h3>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className={`flex items-center justify-between p-4 rounded-xl border ${theme === 'light' ? 'bg-white border-gray-200/60' : 'bg-[#222222] border-[#2e2e2e]'}`}>
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className={`p-2 rounded-lg flex-shrink-0 ${theme === 'light' ? 'bg-[#16a34a]/10' : 'bg-[#16a34a]/20'}`}>
                    <DocumentTextIcon className={`w-5 h-5 ${theme === 'light' ? 'text-[#16a34a]' : 'text-[#16a34a]'}`} />
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

      <div className={`mt-6 pt-4 border-t text-xs font-medium text-center ${theme === 'light' ? 'border-gray-100 text-gray-500' : 'border-[#2e2e2e] text-gray-400'}`}>
        Documents are securely stored and only reviewed by FoodShare admins.
      </div>
    </div>
  );
};

export default DocumentManager;
