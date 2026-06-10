import axiosInstance from './axiosProvider';

export interface AdminProfileDto {
  userId: number;
  adminLevel: number; // 1 = moderator, 2 = admin, 3 = super-admin
  departmentName: string;
  permissions: Record<string, boolean>;
  isActive: boolean;
}

export const adminProfileService = {
  getByUser: async (userId: number): Promise<AdminProfileDto> => {
    const response = await axiosInstance.get<AdminProfileDto>(`/admin-profile/${userId}`);
    return response.data;
  },

  save: async (dto: AdminProfileDto): Promise<AdminProfileDto> => {
    const response = await axiosInstance.put<AdminProfileDto>('/admin-profile/save', dto);
    return response.data;
  },
};
