import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { MOCK_STATS, BAR_DATA } from '../_mock/dashboard';
import StatCard from '../components/UI/StatCard';
import ImpactCharts from '../components/ImpactCharts';
import RecentActivity from '../components/RecentActivity';
import MilestoneTracker from '../components/MilestoneTracker';
import MilestoneModal, {type Milestone } from '../components/MilestoneModal';
import { toast } from 'react-toastify';
import { ArrowDownTrayIcon, PlusIcon } from '@heroicons/react/24/outline';

const INITIAL_MILESTONES: Milestone[] = [
  { id: 'ms_1', title: 'Monthly Goal', reward: 'Community Hero Badge 🏅', currentAmount: 420, targetAmount: 500 }
];

const DonorDashboard: React.FC = () => {
  const { theme } = useTheme();
  const [isDownloading, setIsDownloading] = useState(false);
  

  const [milestones, setMilestones] = useState<Milestone[]>(INITIAL_MILESTONES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);

  const handleDownloadReport = () => {
    setIsDownloading(true);
    setTimeout(() => {
      try {
        const headers = "Month,Donations (kg)\n";
        const rows = BAR_DATA.map(item => `${item.name},${item.donations}`).join('\n');
        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' }));
        link.setAttribute('download', `Report_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link); link.click(); document.body.removeChild(link);
        toast.success('Report downloaded successfully! 📊');
      } catch (error) { toast.error('Failed to generate report.'); } 
      finally { setIsDownloading(false); }
    }, 1000);
  };


  const handleSaveMilestone = (newMilestone: Milestone) => {
    if (editingMilestone) {
      setMilestones(prev => prev.map(m => m.id === newMilestone.id ? newMilestone : m));
    } else {
      setMilestones(prev => [newMilestone, ...prev]);
    }
    setEditingMilestone(null);
  };

  const handleEditMilestone = (milestone: Milestone) => {
    setEditingMilestone(milestone);
    setIsModalOpen(true);
  };

  const handleDeleteMilestone = (id: string) => {
    if(window.confirm('Are you sure you want to delete this milestone?')) {
      setMilestones(prev => prev.filter(m => m.id !== id));
      toast.info('Milestone deleted.');
    }
  };

  const openNewMilestoneModal = () => {
    setEditingMilestone(null);
    setIsModalOpen(true);
  };

  return (
    <div className={`space-y-8 max-w-7xl mx-auto min-h-screen relative pb-10 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
      

      <div className={`pb-6 border-b relative z-20 ${theme === 'light' ? 'border-gray-100' : 'border-gray-700'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
              Donor Impact Dashboard
            </h1>
            <p className={`text-base md:text-lg leading-relaxed ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              Track your contribution to reducing food waste and helping the community.
            </p>
          </div>
          <div className="flex gap-3">

             <button onClick={openNewMilestoneModal} className={`flex items-center justify-center gap-2 px-4 py-3 font-bold rounded-xl shadow-sm transition-all active:scale-[0.98] ${theme === 'light' ? 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200' : 'bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-600'}`}>
                <PlusIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Add Goal</span>
             </button>

             <button onClick={handleDownloadReport} disabled={isDownloading} className={`flex items-center justify-center gap-2 px-6 py-3 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] ${isDownloading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200/50'}`}>
               <ArrowDownTrayIcon className="w-5 h-5" />
               <span className="hidden sm:inline">Download Report</span>
             </button>
          </div>
        </div>
      </div>

      {milestones.length > 0 && (
        <div className="space-y-4">
          {milestones.map(milestone => (
            <MilestoneTracker 
              key={milestone.id} 
              milestone={milestone} 
              onEdit={handleEditMilestone} 
              onDelete={handleDeleteMilestone} 
            />
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 animate-fade-in-up">
        {MOCK_STATS.map((stat, index) => <StatCard key={index} stat={stat} />)}
      </div>

      <ImpactCharts />
      <RecentActivity />
      <MilestoneModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveMilestone}
        editingMilestone={editingMilestone}
      />
    </div>
  );
};

export default DonorDashboard;