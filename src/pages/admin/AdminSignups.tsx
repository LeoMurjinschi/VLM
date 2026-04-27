import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { MOCK_SIGNUP_REQUESTS, type SignupRequest } from '../../_mock/adminMockData';
import { toast } from 'react-toastify';
import { 
  CheckIcon, 
  XMarkIcon,
  DocumentTextIcon,
  PhoneIcon,
  MapPinIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import Modal from '../../components/ui/Modal';

const AdminSignups: React.FC = () => {
  const { theme } = useTheme();
  
  // Show pending first, then others
  const sortedRequests = [...MOCK_SIGNUP_REQUESTS].sort((a, b) => {
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (a.status !== 'pending' && b.status === 'pending') return 1;
    return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
  });

  const [viewMode, setViewMode] = useState<'pending' | 'history'>('pending');
  const [requests, setRequests] = useState<SignupRequest[]>(sortedRequests);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<SignupRequest | null>(null);

  // Decline logic
  const [declineModalOpen, setDeclineModalOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState('');

  const displayRequests = requests.filter(req => 
    viewMode === 'pending' ? req.status === 'pending' : req.status !== 'pending'
  );

  const viewDetails = (req: SignupRequest) => {
    setSelectedRequest(req);
    setModalOpen(true);
  };

  const handleStatusChange = (id: string, newStatus: 'approved' | 'rejected', name: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
    toast.success(`Application for ${name} has been approved.`);
    setModalOpen(false);
  };

  const confirmDecline = () => {
    if (selectedRequest) {
      if (!declineReason.trim()) {
        toast.error('Please provide a reason for rejecting the application.');
        return;
      }
      setRequests(prev => prev.map(req => 
        req.id === selectedRequest.id ? { ...req, status: 'rejected' } : req
      ));
      toast.success(`Rejection email sent to ${selectedRequest.email}.`);
      setDeclineModalOpen(false);
      setModalOpen(false);
    }
  };

  const openPdf = () => {
    window.open('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', '_blank');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto min-h-screen relative animate-fade-in-up">
      {/* Header */}
      <div className={`pb-6 border-b ${theme === 'light' ? 'border-gray-200/60' : 'border-[#2e2e2e]'}`}>
        <h1 className={`text-3xl font-bold tracking-tight mb-2 ${theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'}`} style={{ fontFamily: 'var(--font-display)' }}>
          Sign-Up Requests
        </h1>
        <p className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'}>
          Review and approve or reject organization applications to join FoodShare.
        </p>
      </div>

      {/* View Mode Tabs */}
      <div className="flex gap-2 p-1 bg-gray-100 dark:bg-[#1a1a1a] rounded-xl w-fit border border-gray-200 dark:border-[#2e2e2e]">
        <button
          onClick={() => setViewMode('pending')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            viewMode === 'pending'
              ? 'bg-white dark:bg-[#2e2e2e] shadow-sm text-gray-900 dark:text-white'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          Pending Requests
          {requests.filter(r => r.status === 'pending').length > 0 && (
            <span className="ml-2 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 py-0.5 px-2 rounded-full text-[10px]">
              {requests.filter(r => r.status === 'pending').length}
            </span>
          )}
        </button>
        <button
          onClick={() => setViewMode('history')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            viewMode === 'history'
              ? 'bg-white dark:bg-[#2e2e2e] shadow-sm text-gray-900 dark:text-white'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          History Log
        </button>
      </div>

      {/* Requests Table */}
      <div className={`rounded-xl border overflow-hidden shadow-sm ${
        theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className={`text-xs uppercase tracking-wider font-semibold border-b ${
              theme === 'light' ? 'bg-gray-50 text-gray-500 border-gray-200' : 'bg-[#222222] text-gray-400 border-[#2e2e2e]'
            }`}>
              <tr>
                <th className="py-4 px-5">Organization</th>
                <th className="py-4 px-5">Type</th>
                <th className="py-4 px-5">Contact Person</th>
                <th className="py-4 px-5">Submitted On</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right flex-shrink-0">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#2e2e2e]">
              {displayRequests.map((req) => (
                <tr key={req.id} className={`transition-colors ${
                  req.status === 'pending'
                    ? theme === 'light' ? 'bg-violet-50/30' : 'bg-violet-900/10'
                    : ''
                } ${
                  theme === 'light' ? 'hover:bg-gray-50/50' : 'hover:bg-gray-800/20'
                }`}>
                  <td className="py-4 px-5">
                    <p className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
                      {req.organizationName}
                    </p>
                    <p className={`text-xs mt-0.5 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      {req.email}
                    </p>
                  </td>
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                        req.role === 'donor' 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' 
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                      }`}>
                        {req.role}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <p className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>{req.contactPerson}</p>
                  </td>
                  <td className="py-4 px-5 text-gray-500 dark:text-gray-400">
                    {req.submittedDate}
                  </td>
                  <td className="py-4 px-5">
                    {req.status === 'pending' && (
                      <span className="inline-flex items-center gap-1.5 text-violet-600 dark:text-violet-400 font-semibold bg-violet-100 dark:bg-violet-900/20 px-2.5 py-1 rounded-md text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                        Review Needed
                      </span>
                    )}
                    {req.status === 'approved' && (
                      <span className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-500 font-semibold text-xs">
                        <CheckIcon className="w-4 h-4" /> Approved
                      </span>
                    )}
                    {req.status === 'rejected' && (
                      <span className="inline-flex items-center gap-1.5 text-red-600 dark:text-red-500 font-semibold text-xs">
                        <XMarkIcon className="w-4 h-4" /> Rejected
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => viewDetails(req)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        req.status === 'pending'
                          ? 'bg-[#8b5cf6] text-white border-transparent hover:bg-violet-600 shadow-sm'
                          : theme === 'light' 
                            ? 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50' 
                            : 'bg-[#1a1a1a] text-gray-300 border-[#2e2e2e] hover:bg-gray-800'
                      }`}
                    >
                      {req.status === 'pending' ? 'Review Application' : 'View Details'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {displayRequests.length === 0 && (
            <div className={`p-8 text-center text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              No sign-up requests available in this view.
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Application Details">
        {selectedRequest && (
          <div className="space-y-6">
            
            {/* Business Info */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  theme === 'light' ? 'bg-gray-100 text-gray-500' : 'bg-gray-800 text-gray-400'
                }`}>
                  <BuildingOfficeIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {selectedRequest.organizationName}
                  </h3>
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    {selectedRequest.email}
                  </p>
                </div>
              </div>
            </div>

            {/* General Information blocks */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-3 rounded-lg border ${theme === 'light' ? 'bg-gray-50 border-gray-100' : 'bg-gray-800/50 border-gray-700'}`}>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Contact Person</p>
                <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-gray-100">
                  <span className="truncate">{selectedRequest.contactPerson}</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg border ${theme === 'light' ? 'bg-gray-50 border-gray-100' : 'bg-gray-800/50 border-gray-700'}`}>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Phone Number</p>
                <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-gray-100">
                  <PhoneIcon className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{selectedRequest.phone}</span>
                </div>
              </div>
            </div>

            <div className={`p-3 rounded-lg border ${theme === 'light' ? 'bg-gray-50 border-gray-100' : 'bg-gray-800/50 border-gray-700'}`}>
               <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Address</p>
               <div className="flex items-start gap-1.5 text-sm font-medium text-gray-900 dark:text-gray-100">
                  <MapPinIcon className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span>{selectedRequest.address}</span>
               </div>
            </div>

            <div>
              <p className={`text-xs font-bold uppercase tracking-wider mt-4 mb-2 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                Organization Description
              </p>
              <p className={`text-sm leading-relaxed ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                {selectedRequest.description}
              </p>
            </div>

            {/* Documents */}
             <div>
              <p className={`text-xs font-bold uppercase tracking-wider mt-2 mb-2 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                Attached Documents
              </p>
              <div className="space-y-2">
                {selectedRequest.documents.map((doc, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-3 rounded-lg border ${
                    theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-gray-700'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <DocumentTextIcon className={`w-5 h-5 ${theme === 'light' ? 'text-violet-500' : 'text-violet-400'}`} />
                      <span className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{doc}</span>
                    </div>
                    <button onClick={openPdf} className="text-xs font-semibold text-violet-500 cursor-pointer hover:underline focus:outline-none">View PDF</button>
                  </div>
                ))}
              </div>
            </div>

             {/* Action Buttons for Pending */}
            {selectedRequest.status === 'pending' ? (
              <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => { setDeclineReason(''); setDeclineModalOpen(true); }}
                  className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                    theme === 'light' 
                      ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                      : 'bg-red-900/20 text-red-400 hover:bg-red-900/40'
                  }`}
                >
                  Decline
                </button>
                <button
                  onClick={() => handleStatusChange(selectedRequest.id, 'approved', selectedRequest.organizationName)}
                  className="flex-1 py-2.5 rounded-lg font-semibold text-sm transition-colors bg-[#16a34a] hover:bg-[#15803d] text-white shadow-md shadow-green-500/20"
                >
                  Approve Application
                </button>
              </div>
            ) : (
               <div className={`p-4 rounded-lg flex items-center justify-center gap-2 font-bold ${
                 selectedRequest.status === 'approved' 
                  ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
               }`}>
                 {selectedRequest.status === 'approved' ? (
                   <> <CheckIcon className="w-5 h-5" /> This application was approved. </>
                 ) : (
                   <> <XMarkIcon className="w-5 h-5" /> This application was rejected. </>
                 )}
               </div>
            )}
          </div>
        )}
      </Modal>

      {/* Decline Reason Modal */}
      <Modal isOpen={declineModalOpen} onClose={() => setDeclineModalOpen(false)} title="Decline Application">
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <XMarkIcon className="h-6 w-6 text-red-600 dark:text-red-500" aria-hidden="true" />
            </div>
            <div>
              <h4 className={`text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Reject {selectedRequest?.organizationName}</h4>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Provide a reason for rejection.</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                Reason for Rejection <span className="text-red-500">*</span>
              </label>
              <textarea 
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                placeholder="Explain why this application was rejected (e.g. missing food safety certificates)..."
                className={`w-full p-3 rounded-xl border text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-colors ${
                  theme === 'light' ? 'bg-white border-gray-200 text-gray-900' : 'bg-[#1a1a1a] border-[#2e2e2e] text-white'
                }`}
                rows={4}
              />
              <p className={`text-[10px] mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>This reason will be sent directly via email to <strong>{selectedRequest?.email}</strong>.</p>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => setDeclineModalOpen(false)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                theme === 'light' 
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={confirmDecline}
              className="px-4 py-2 rounded-lg font-semibold text-sm transition-colors bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20"
            >
              Reject & Send Email
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default AdminSignups;
