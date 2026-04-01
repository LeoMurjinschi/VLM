import React, { useState, useEffect } from 'react';
import Modal from './ui/Modal';
import { useTheme } from '../hooks/useTheme';
import { toast } from 'react-toastify';

export interface Milestone {
  id: string;
  title: string;
  reward: string;
  currentAmount: number;
  targetAmount: number;
}

interface MilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (milestone: Milestone) => void;
  editingMilestone?: Milestone | null;
}

const MilestoneModal: React.FC<MilestoneModalProps> = ({ isOpen, onClose, onSave, editingMilestone }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<Partial<Milestone>>({
    title: '', reward: '', currentAmount: 0, targetAmount: 100
  });

  useEffect(() => {
    if (editingMilestone) {
      setFormData(editingMilestone);
    } else {
      setFormData({ title: '', reward: '', currentAmount: 0, targetAmount: 100 });
    }
  }, [editingMilestone, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Amount') ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.reward || !formData.targetAmount) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (Number(formData.currentAmount) > Number(formData.targetAmount)) {
      toast.error('Current amount cannot be greater than target amount!');
      return;
    }

    onSave({
      id: editingMilestone ? editingMilestone.id : `ms_${Date.now()}`,
      title: formData.title!,
      reward: formData.reward!,
      currentAmount: Number(formData.currentAmount),
      targetAmount: Number(formData.targetAmount),
    });
    
    toast.success(editingMilestone ? 'Milestone updated!' : 'Milestone created!');
    onClose();
  };

  const inputClass = `w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
    theme === 'light' ? 'bg-white border-gray-200 text-gray-900' : 'bg-gray-700 border-gray-600 text-gray-100'
  }`;
  const labelClass = `block text-sm font-semibold mb-1.5 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editingMilestone ? "Edit Milestone" : "Create Milestone"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Goal Title (e.g. Monthly Goal)</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className={inputClass} placeholder="Enter title..." required />
        </div>
        <div>
          <label className={labelClass}>Reward / Badge (e.g. Community Hero 🏅)</label>
          <input type="text" name="reward" value={formData.reward} onChange={handleChange} className={inputClass} placeholder="Enter reward..." required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Current Amount (kg)</label>
            <input type="number" min="0" name="currentAmount" value={formData.currentAmount} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Target Amount (kg)</label>
            <input type="number" min="1" name="targetAmount" value={formData.targetAmount} onChange={handleChange} className={inputClass} required />
          </div>
        </div>
        <button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all active:scale-[0.98]">
          {editingMilestone ? 'Save Changes' : 'Create Milestone'}
        </button>
      </form>
    </Modal>
  );
};

export default MilestoneModal;