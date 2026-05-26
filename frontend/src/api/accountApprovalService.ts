import axiosInstance from './axiosProvider';

export interface AccountApprovalInfoDto {
  id: number;
  userId: number;
  adminId: number;
  decision: string;
  reason: string;
  decidedAt: string;
}

export interface AccountApprovalCreateDto {
  userId: number;
  adminId: number;
  decision: string;
  reason: string;
}

export const accountApprovalService = {
  getAll: async (): Promise<AccountApprovalInfoDto[]> => {
    const response = await axiosInstance.get<AccountApprovalInfoDto[]>('/account-approvals');
    return response.data;
  },

  getByUser: async (userId: number): Promise<AccountApprovalInfoDto[]> => {
    const response = await axiosInstance.get<AccountApprovalInfoDto[]>(`/account-approvals/by-user/${userId}`);
    return response.data;
  },

  getById: async (id: number): Promise<AccountApprovalInfoDto> => {
    const response = await axiosInstance.get<AccountApprovalInfoDto>(`/account-approvals/${id}`);
    return response.data;
  },

  create: async (dto: AccountApprovalCreateDto): Promise<string> => {
    const response = await axiosInstance.post<string>('/account-approvals/create', dto);
    return response.data;
  },

  delete: async (id: number): Promise<string> => {
    const response = await axiosInstance.delete<string>(`/account-approvals/delete/${id}`);
    return response.data;
  },
};
