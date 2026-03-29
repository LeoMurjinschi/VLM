import type { DonationRecord, Partner, ExportResult, ReportFilters } from '../types/reports';
import { MOCK_DONATION_HISTORY, MOCK_TOP_PARTNERS } from '../_mock';
const SIMULATED_LATENCY_MS = 800;
const simulateRandomError = (): boolean => {
  return Math.random() < 0.1;
};
const simulateNetworkDelay = (ms: number = SIMULATED_LATENCY_MS): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const fetchDonationHistory = async (
  filters: ReportFilters,
  page: number = 1,
  pageSize: number = 10
): Promise<DonationRecord[]> => {

  await simulateNetworkDelay();


  if (simulateRandomError()) {
    throw new Error('Failed to fetch donation history. Please try again later.');
  }


  let results = [...MOCK_DONATION_HISTORY];


  if (filters.dateRange === 'Last 7 Days') {

    results = results.slice(0, 2);
  } else if (filters.dateRange === 'Last Month') {
    results = results.slice(0, 4);
  } else if (filters.dateRange === 'Year to Date (YTD)') {

    results = [...MOCK_DONATION_HISTORY];
  } else if (filters.dateRange === 'This Month') {
    results = results.slice(0, 5);
  }

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedResults = results.slice(startIndex, endIndex);

  return paginatedResults;
};

export const fetchTopPartners = async (filters: ReportFilters): Promise<Partner[]> => {

  await simulateNetworkDelay();

  if (simulateRandomError()) {
    throw new Error('Failed to fetch top partners. Please try again later.');
  }

  let results = [...MOCK_TOP_PARTNERS];

  if (filters.dateRange === 'Last 7 Days') {

    results = results.slice(0, 2);
  } else if (filters.dateRange === 'Last Month') {
    results = results.slice(0, 3);
  }

  return results;
};

export const exportDonationHistoryAsCSV = async (
  _filters: ReportFilters,
  data: DonationRecord[]
): Promise<ExportResult> => {

  await simulateNetworkDelay(1000);


  if (simulateRandomError()) {
    throw new Error('Failed to prepare CSV export. Please try again later.');
  }
  const headers = 'Date,Item Donated,Quantity,Beneficiary,Status\n';
  const rows = data
    .map((row) => `${row.date},${row.item},${row.qty},${row.partner},${row.status}`)
    .join('\n');

  const csvContent = headers + rows;
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute(
    'download',
    `FoodShare_Report_${_filters.dateRange.replace(/\s+/g, '_')}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return {
    success: true,
    message: 'CSV exported successfully',
  };
};

export const exportDonationHistoryAsPDF = async (
  _filters: ReportFilters
): Promise<ExportResult> => {

  await simulateNetworkDelay(1500);

  if (simulateRandomError()) {
    throw new Error('Failed to prepare PDF export. Please try again later.');
  }

  return {
    success: true,
    message: 'PDF exported successfully',
  };
};


export const generateImpactSummary = async (
  _filters: ReportFilters,
  history: DonationRecord[]
): Promise<{ totalKg: number; totalDonations: number; topPartner: string }> => {

  await simulateNetworkDelay();

  const totalDonations = history.length;
  const totalKg = history.reduce((acc, record) => {
    const kg = parseInt(record.qty.replace(/\s*kg/i, ''), 10);
    return acc + (isNaN(kg) ? 0 : kg);
  }, 0);

  const topPartner = history.length > 0 ? history[0].partner : 'N/A';

  return {
    totalKg,
    totalDonations,
    topPartner,
  };
};
