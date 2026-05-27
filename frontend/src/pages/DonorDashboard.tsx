import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';
import { dashboardApiService } from '../api/dashboardApiService';
import { milestoneService } from '../api/milestoneService';
import type { MilestoneInfoDto } from '../api/milestoneService';
import StatCard from '../components/UI/StatCard';
import ImpactCharts from '../components/ImpactCharts';
import RecentActivity from '../components/RecentActivity';
import MilestoneTracker from '../components/MilestoneTracker';
import MilestoneModal, { type Milestone } from '../components/MilestoneModal';
import { toast } from 'react-toastify';
import { PlusIcon } from '@heroicons/react/24/outline';
import { SpinnerLoader, ErrorState } from '../components/UI/StateIndicators';
import type { DashboardStats } from '../_mock';
import { PIE_COLORS } from '../_mock';

const mapDtoToMilestone = (dto: MilestoneInfoDto): Milestone => ({
  id: String(dto.id),
  title: dto.title,
  reward: dto.reward,
  currentAmount: dto.currentAmount,
  targetAmount: dto.targetAmount,
});

const DonorDashboard: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const donorId = user?.id ? parseInt(user.id, 10) : null;

  const [stats, setStats] = useState<DashboardStats[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [milestonesLoading, setMilestonesLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);

  const loadStats = useCallback(async () => {
    if (!donorId) return;
    setStatsLoading(true);
    setStatsError(null);
    try {
      const data = await dashboardApiService.getStats(donorId);
      setStats([
        {
          title: 'Total Food Rescued',
          value: data.totalFoodRescued.toLocaleString(),
          unit: 'units',
          trend: '+live',
          trendLabel: 'from donations',
          color: 'blue',
        },
        {
          title: 'Meals Provided',
          value: data.mealsProvided.toLocaleString(),
          unit: 'portions',
          trend: '+live',
          trendLabel: 'from donations',
          color: 'emerald',
        },
        {
          title: 'CO₂ Emissions Saved',
          value: data.co2Saved.toLocaleString(),
          unit: 'kg',
          trend: '+live',
          trendLabel: 'estimated',
          color: 'teal',
        },
        {
          title: 'Value Donated',
          value: `€${data.valueDonated.toLocaleString()}`,
          unit: '',
          trend: '+live',
          trendLabel: 'estimated',
          color: 'indigo',
        },
      ]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load dashboard stats';
      setStatsError(message);
      toast.error(message);
    } finally {
      setStatsLoading(false);
    }
  }, [donorId]);

  const loadMilestones = useCallback(async () => {
    if (!donorId) return;
    setMilestonesLoading(true);
    try {
      const dtos = await milestoneService.getByDonor(donorId);
      setMilestones(dtos.map(mapDtoToMilestone));
    } catch {
      // silently keep empty list
    } finally {
      setMilestonesLoading(false);
    }
  }, [donorId]);

  useEffect(() => {
    loadStats();
    loadMilestones();
  }, [loadStats, loadMilestones]);

  useEffect(() => {
    if (!statsError) return;
    const timer = setTimeout(loadStats, 5000);
    return () => clearTimeout(timer);
  }, [statsError, loadStats]);

  const handleSaveMilestone = useCallback(async (milestone: Milestone) => {
    if (!donorId) return;
    try {
      if (editingMilestone) {
        await milestoneService.update(parseInt(milestone.id, 10), {
          title: milestone.title,
          reward: milestone.reward,
          currentAmount: milestone.currentAmount,
          targetAmount: milestone.targetAmount,
        });
        setMilestones(prev => prev.map(m => m.id === milestone.id ? milestone : m));
      } else {
        const newId = await milestoneService.create({
          donorId,
          title: milestone.title,
          reward: milestone.reward,
          currentAmount: milestone.currentAmount,
          targetAmount: milestone.targetAmount,
        });
        setMilestones(prev => [{ ...milestone, id: String(newId) }, ...prev]);
      }
      setEditingMilestone(null);
      toast.success('Milestone saved!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save milestone');
    }
  }, [donorId, editingMilestone]);

  const handleEditMilestone = useCallback((milestone: Milestone) => {
    setEditingMilestone(milestone);
    setIsModalOpen(true);
  }, []);

  const handleDeleteMilestone = useCallback(async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this milestone?')) return;
    try {
      await milestoneService.delete(parseInt(id, 10));
      setMilestones(prev => prev.filter(m => m.id !== id));
      toast.info('Milestone deleted.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete milestone');
    }
  }, []);

  const openNewMilestoneModal = useCallback(() => {
    setEditingMilestone(null);
    setIsModalOpen(true);
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto min-h-screen relative pb-10">

      <div className={`pb-6 border-b relative z-20 ${theme === 'light' ? 'border-gray-200/60' : 'border-[#2e2e2e]'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className={`text-3xl font-bold tracking-tight mb-2 ${theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'}`} style={{ fontFamily: 'var(--font-display)' }}>
              Donor Impact Dashboard
            </h1>
            <p className={`text-[15px] leading-relaxed ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              Track your contribution to reducing food waste and helping the community.
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={openNewMilestoneModal} className="flex items-center justify-center gap-2 px-4 py-2.5 font-semibold rounded-xl transition-all active:scale-[0.98] bg-[#16a34a] text-white hover:bg-[#15803d] shadow-md shadow-green-500/20 text-sm">
              <PlusIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Add Goal</span>
            </button>
          </div>
        </div>
      </div>

      {!milestonesLoading && milestones.length > 0 && (
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
