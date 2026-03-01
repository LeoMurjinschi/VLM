import { 
  HeartIcon, 
  GlobeEuropeAfricaIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

export const REPORT_STATS = [
  { title: 'Total Rescued', value: '1,250', unit: 'kg', trend: '+12%', trendLabel: 'vs last period', icon: HeartIcon, color: 'blue' },
  { title: 'CO₂ Prevented', value: '3,125', unit: 'kg', trend: '+15%', trendLabel: 'vs last period', icon: GlobeEuropeAfricaIcon, color: 'teal' },
  { title: 'Water Saved', value: '45', unit: 'k Liters', trend: '+5%', trendLabel: 'vs last period', icon: GlobeEuropeAfricaIcon, color: 'cyan' },
  { title: 'Meals Provided', value: '3,420', unit: 'portions', trend: '+8%', trendLabel: 'vs last period', icon: ChartBarIcon, color: 'emerald' }
];

export const TOP_PARTNERS = [
  { name: 'Save the Children', kg: 450, percentage: 36 },
  { name: 'Local Soup Kitchen', kg: 320, percentage: 25 },
  { name: 'Red Cross Center', kg: 280, percentage: 22 },
  { name: 'Community Shelter', kg: 200, percentage: 17 },
];

export const DONATION_HISTORY = [
  { id: '1', date: 'Oct 24, 2026', item: 'Fresh Apples & Pears', qty: '50 kg', partner: 'Save the Children', status: 'Completed' },
  { id: '2', date: 'Oct 22, 2026', item: 'Bakery Pastries', qty: '15 kg', partner: 'Local Soup Kitchen', status: 'Completed' },
  { id: '3', date: 'Oct 20, 2026', item: 'Cooked Vegetables', qty: '30 kg', partner: 'Red Cross Center', status: 'Completed' },
  { id: '4', date: 'Oct 18, 2026', item: 'Dairy Assortment', qty: '25 kg', partner: 'Community Shelter', status: 'Completed' },
  { id: '5', date: 'Oct 15, 2026', item: 'Potato Sacks', qty: '100 kg', partner: 'Save the Children', status: 'Completed' },
];