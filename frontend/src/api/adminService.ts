import axiosInstance from './axiosProvider';
import type { UserInfoDto } from './userService';

export interface AccountApprovalDecisionDto {
  adminId: number;
  reason?: string;
}

export const adminService = {
  getPendingUsers: async (): Promise<UserInfoDto[]> => {
    const response = await axiosInstance.get<UserInfoDto[]>('/admin/pending-users');
    return response.data;
  },

  approveUser: async (userId: number, decision: AccountApprovalDecisionDto): Promise<string> => {
    const response = await axiosInstance.put<string>(`/admin/approve-user/${userId}`, decision);
    return response.data;
  },

  rejectUser: async (userId: number, decision: AccountApprovalDecisionDto): Promise<string> => {
    const response = await axiosInstance.put<string>(`/admin/reject-user/${userId}`, decision);
    return response.data;
  },
};
