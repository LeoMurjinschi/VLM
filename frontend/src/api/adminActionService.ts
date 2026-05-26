import axiosInstance from './axiosProvider';

export interface AdminActionInfoDto {
  id: number;
  adminId: number;
  actionType: string;
  targetType: string;
  targetId?: number;
  details: string;
  createdDate: string;
}

export interface AdminActionCreateDto {
  adminId: number;
  actionType: string;
  targetType: string;
  targetId?: number;
  details: string;
}

export const adminActionService = {
  getAll: async (): Promise<AdminActionInfoDto[]> => {
    const response = await axiosInstance.get<AdminActionInfoDto[]>('/admin-actions');
    return response.data;
  },

  getByAdmin: async (adminId: number): Promise<AdminActionInfoDto[]> => {
    const response = await axiosInstance.get<AdminActionInfoDto[]>(`/admin-actions/by-admin/${adminId}`);
    return response.data;
  },

  getById: async (id: number): Promise<AdminActionInfoDto> => {
    const response = await axiosInstance.get<AdminActionInfoDto>(`/admin-actions/${id}`);
    return response.data;
  },

  create: async (dto: AdminActionCreateDto): Promise<string> => {
    const response = await axiosInstance.post<string>('/admin-actions/create', dto);
    return response.data;
  },

  delete: async (id: number): Promise<string> => {
    const response = await axiosInstance.delete<string>(`/admin-actions/delete/${id}`);
    return response.data;
  },
};
