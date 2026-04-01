import type { DashboardStats, ChartData, RecentActivityItem } from '../_mock';
import {
  MOCK_DASHBOARD_STATS,
  MOCK_BAR_DATA,
  MOCK_PIE_DATA,
  MOCK_RECENT_ACTIVITY,
  PIE_COLORS,
} from '../_mock';

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

  return MOCK_DASHBOARD_STATS;
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