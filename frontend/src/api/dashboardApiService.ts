import axiosInstance from './axiosProvider';

export interface DonorDashboardStatsDto {
  totalFoodRescued: number;
  mealsProvided: number;
  co2Saved: number;
  valueDonated: number;
}

export interface ChartPointDto {
  name: string;
  value: number;
}

export interface ActivityItemDto {
  id: number;
  action: string;
  detail: string;
  time: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export const dashboardApiService = {
  getStats: async (donorId: number): Promise<DonorDashboardStatsDto> => {
    const response = await axiosInstance.get<DonorDashboardStatsDto>(`/dashboard/${donorId}/stats`);
    return response.data;
  },

  getBarChart: async (donorId: number): Promise<ChartPointDto[]> => {
    const response = await axiosInstance.get<ChartPointDto[]>(`/dashboard/${donorId}/bar-chart`);
    return response.data;
  },

  getPieChart: async (donorId: number): Promise<ChartPointDto[]> => {
    const response = await axiosInstance.get<ChartPointDto[]>(`/dashboard/${donorId}/pie-chart`);
    return response.data;
  },

  getActivity: async (donorId: number, limit = 10): Promise<ActivityItemDto[]> => {
    const response = await axiosInstance.get<ActivityItemDto[]>(`/dashboard/${donorId}/activity`, {
      params: { limit },
    });
    return response.data;
  },
};
