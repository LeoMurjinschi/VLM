import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../hooks/useTheme';
import { fetchDashboardStats } from '../services/dashboardService';
import StatCard from '../components/UI/StatCard';
import ImpactCharts from '../components/ImpactCharts';
import RecentActivity from '../components/RecentActivity';
import MilestoneTracker from '../components/MilestoneTracker';
import MilestoneModal, { type Milestone } from '../components/MilestoneModal';
import { toast } from 'react-toastify';
import { PlusIcon } from '@heroicons/react/24/outline';
import { SpinnerLoader, ErrorState } from '../components/UI/StateIndicators';
import type { DashboardStats } from '../_mock';

const INITIAL_MILESTONES: Milestone[] = [
  { id: 'ms_1', title: 'Monthly Goal', reward: 'Community Hero Badge 🏅', currentAmount: 420, targetAmount: 500 }
];

const DonorDashboard: React.FC = () => {
  const { theme } = useTheme();
  

  const [stats, setStats] = useState<DashboardStats[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);
  

  const [milestones, setMilestones] = useState<Milestone[]>(INITIAL_MILESTONES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);


  useEffect(() => {
    const loadStats = async () => {
      setStatsLoading(true);
      setStatsError(null);
      
      try {
        const data = await fetchDashboardStats();
        setStats(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load dashboard stats';
        setStatsError(message);
        toast.error(message);
      } finally {
        setStatsLoading(false);
      }
    };

    loadStats();
  }, []);


  const handleSaveMilestone = useCallback((newMilestone: Milestone) => {
    if (editingMilestone) {
      setMilestones(prev => prev.map(m => m.id === newMilestone.id ? newMilestone : m));
    } else {
      setMilestones(prev => [newMilestone, ...prev]);
    }
    setEditingMilestone(null);
    toast.success('Milestone saved!');
  }, [editingMilestone]);

  const handleEditMilestone = useCallback((milestone: Milestone) => {
    setEditingMilestone(milestone);
    setIsModalOpen(true);
  }, []);

  const handleDeleteMilestone = useCallback((id: string) => {
    if (window.confirm('Are you sure you want to delete this milestone?')) {
      setMilestones(prev => prev.filter(m => m.id !== id));
      toast.info('Milestone deleted.');
    }
  }, []);

  const openNewMilestoneModal = useCallback(() => {
    setEditingMilestone(null);
    setIsModalOpen(true);
  }, []);

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
             <button onClick={openNewMilestoneModal} className={`flex items-center justify-center gap-2 px-4 py-3 font-bold rounded-xl shadow-sm transition-all active:scale-[0.98] ${theme === 'light' ? 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200' : 'bg-gray-900 text-gray-200 hover:bg-gray-700 border border-gray-600'}`}>
                <PlusIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Add Goal</span>
             </button>

          </div>
        </div>
      </div>

      {milestones.length > 0 && (
        <div className="space-y-4">
          {milestones.map(milestone => (
            <MilestoneTracker key={milestone.id} milestone={milestone} onEdit={handleEditMilestone} onDelete={handleDeleteMilestone} />
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 animate-fade-in-up">
        {statsLoading ? (
          <SpinnerLoader />
        ) : statsError ? (
          <ErrorState message={statsError} />
        ) : (
          stats.map((stat, index) => <StatCard key={index} stat={stat} />)
        )}
      </div>

      <ImpactCharts />
      <RecentActivity />

      <MilestoneModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveMilestone} editingMilestone={editingMilestone} />
    </div>
  );
};

export default DonorDashboard;