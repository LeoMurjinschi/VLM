export interface DonationRecord {
  id: string;
  date: string;
  item: string;
  qty: string;
  partner: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface Partner {
  name: string;
  kg: number;
  percentage: number;
}

export interface ReportStats {
  title: string;
  value: string;
  unit: string;
  trend: string;
  trendLabel: string;
  color: 'blue' | 'teal' | 'cyan' | 'emerald';
}

export interface ReportFilters {
  dateRange: string;
}

export interface ExportResult {
  success: boolean;
  message: string;
}

export type UIState = 'idle' | 'loading' | 'success' | 'error' | 'empty';
