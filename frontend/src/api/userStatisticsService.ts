import axiosInstance from './axiosProvider';

export interface UserStatisticsDto {
  userId: number;
  userRole: string;

  // Donor metrics
  totalDonated: number;
  totalDonations: number;
  activeDonations: number;

  // Receiver metrics
  totalReserved: number;
  totalReservations: number;
  activeReservations: number;

  // Admin / platform metrics
  totalUsers: number;
  totalPlatformDonations: number;

  lastActivityDate?: string | null;
}

export const userStatisticsService = {
  getByUser: async (userId: number): Promise<UserStatisticsDto> => {
    const response = await axiosInstance.get<UserStatisticsDto>(`/user-statistics/${userId}`);
    return response.data;
  },
};
