import { 
  HeartIcon, GlobeEuropeAfricaIcon, CurrencyDollarIcon, ChartBarIcon 
} from '@heroicons/react/24/outline';

export const MOCK_STATS = [
  { title: 'Total Food Rescued', value: '1,250', unit: 'kg', trend: '+12%', trendLabel: 'vs last month', icon: HeartIcon, color: 'blue' },
  { title: 'Meals Provided', value: '3,420', unit: 'portions', trend: '+8%', trendLabel: 'vs last month', icon: ChartBarIcon, color: 'emerald' },
  { title: 'CO₂ Emissions Saved', value: '3,125', unit: 'kg', trend: '+15%', trendLabel: 'vs last month', icon: GlobeEuropeAfricaIcon, color: 'teal' },
  { title: 'Value Donated', value: '€4,500', unit: '', trend: '+5%', trendLabel: 'vs last month', icon: CurrencyDollarIcon, color: 'indigo' }
];

export const BAR_DATA = [
  { name: 'Sep', donations: 120 }, { name: 'Oct', donations: 180 }, { name: 'Nov', donations: 250 },
  { name: 'Dec', donations: 300 }, { name: 'Jan', donations: 280 }, { name: 'Feb', donations: 420 },
];

export const PIE_DATA = [
  { name: 'Vegetables', value: 400 }, { name: 'Bakery', value: 300 }, { name: 'Fruits', value: 200 },
  { name: 'Cooked Food', value: 150 }, { name: 'Dairy', value: 100 },
];

export const PIE_COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export const RECENT_ACTIVITY = [
  { id: 1, action: 'Donation Reserved', detail: 'Save the Children reserved 10 portions of Cooked Food.', time: '2 hours ago', type: 'success' },
  { id: 2, action: 'New Stock Added', detail: 'You added 50 kg of Fresh Apples.', time: '5 hours ago', type: 'info' },
  { id: 3, action: 'Milestone Reached', detail: 'You rescued over 1,000 kg of food this month!', time: '1 day ago', type: 'warning' },
  { id: 4, action: 'Donation Picked Up', detail: 'Local Shelter picked up their 15 kg Bakery reservation.', time: '2 days ago', type: 'success' },
];