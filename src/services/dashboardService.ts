import type { DashboardStats, ChartData, RecentActivityItem } from '../_mock';
import {
  MOCK_BAR_DATA,
  MOCK_PIE_DATA,
  MOCK_RECENT_ACTIVITY,
  PIE_COLORS,
} from '../_mock';
import { stockStore } from './stockStore';

const SIMULATED_LATENCY_MS = 800;

const simulateRandomError = (): boolean => {
  return Math.random() < 0.1;
};

const simulateNetworkDelay = (ms: number = SIMULATED_LATENCY_MS): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const fetchDashboardStats = async (): Promise<DashboardStats[]> => {
  await simulateNetworkDelay();

  if (simulateRandomError()) {
    throw new Error('Failed to fetch dashboard stats. Please try again later.');
  }

  const all = stockStore.getAll();
  const totalQty = all.reduce((sum, i) => sum + i.quantity, 0);
  const kgQty = all.filter((i) => i.unit === 'kg').reduce((sum, i) => sum + i.quantity, 0);
  const meals = all
    .filter((i) => ['Cooked Food', 'Bakery', 'portions', 'plates'].some((t) => i.category.includes(t) || i.unit.includes(t)))
    .reduce((sum, i) => sum + i.quantity, 0);
  const co2 = Math.round(kgQty * 2.5);
  const value = Math.round(totalQty * 3.5);

  return [
    { title: 'Total Food Rescued', value: totalQty.toLocaleString(), unit: 'units', trend: '+live', trendLabel: 'from inventory', color: 'blue' },
    { title: 'Meals Provided', value: meals.toLocaleString(), unit: 'portions', trend: '+live', trendLabel: 'from inventory', color: 'emerald' },
    { title: 'CO₂ Emissions Saved', value: co2.toLocaleString(), unit: 'kg', trend: '+live', trendLabel: 'estimated', color: 'teal' },
    { title: 'Value Donated', value: `€${value.toLocaleString()}`, unit: '', trend: '+live', trendLabel: 'estimated', color: 'indigo' },
  ];
};

export const fetchBarChartData = async (): Promise<ChartData[]> => {
  await simulateNetworkDelay(600);

  if (simulateRandomError()) {
    throw new Error('Failed to fetch chart data. Please try again later.');
  }

  return MOCK_BAR_DATA;
};

export const fetchPieChartData = async (): Promise<ChartData[]> => {
  await simulateNetworkDelay(600);

  if (simulateRandomError()) {
    throw new Error('Failed to fetch pie chart data. Please try again later.');
  }

  return MOCK_PIE_DATA;
};

export const fetchChartColors = async (): Promise<string[]> => {
  await simulateNetworkDelay(200);

  return PIE_COLORS;
};

export const fetchRecentActivity = async (limit: number = 10): Promise<RecentActivityItem[]> => {
  await simulateNetworkDelay(500);

  if (simulateRandomError()) {
    throw new Error('Failed to fetch recent activity. Please try again later.');
  }

  return MOCK_RECENT_ACTIVITY.slice(0, limit);
};

export const fetchImpactSummary = async (): Promise<{
  foodRescued: number;
  mealsProvided: number;
  co2Saved: number;
  valueDonated: number;
}> => {
  await simulateNetworkDelay(700);

  if (simulateRandomError()) {
    throw new Error('Failed to fetch impact summary. Please try again later.');
  }

  return {
    foodRescued: 1250,
    mealsProvided: 3420,
    co2Saved: 3125,
    valueDonated: 4500,
  };
};

export const exportDashboardReport = async (
  format: 'PDF' | 'CSV'
): Promise<{ success: boolean; message: string }> => {
  await simulateNetworkDelay(1000);

  if (simulateRandomError()) {
    throw new Error(`Failed to export ${format} report. Please try again later.`);
  }

  return {
    success: true,
    message: `Dashboard report exported as ${format} successfully`,
  };
};