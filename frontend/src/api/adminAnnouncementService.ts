import axiosInstance from './axiosProvider';

export interface AdminAnnouncementInfoDto {
  id: number;
  adminId: number;
  title: string;
  body: string;
  type: string;
  priority: string;
  startsAt: string;
  endsAt?: string;
  isActive: boolean;
  createdDate: string;
}

export interface AdminAnnouncementCreateDto {
  adminId: number;
  title: string;
  body: string;
  type: string;
  priority: string;
  startsAt: string;
  endsAt?: string;
  isActive: boolean;
}

export const adminAnnouncementService = {
  getAll: async (): Promise<AdminAnnouncementInfoDto[]> => {
    const response = await axiosInstance.get<AdminAnnouncementInfoDto[]>('/admin-announcements');
    return response.data;
  },

  getActive: async (): Promise<AdminAnnouncementInfoDto[]> => {
    const response = await axiosInstance.get<AdminAnnouncementInfoDto[]>('/admin-announcements/active');
    return response.data;
  },

  getById: async (id: number): Promise<AdminAnnouncementInfoDto> => {
    const response = await axiosInstance.get<AdminAnnouncementInfoDto>(`/admin-announcements/${id}`);
    return response.data;
  },

  create: async (dto: AdminAnnouncementCreateDto): Promise<string> => {
    const response = await axiosInstance.post<string>('/admin-announcements/create', dto);
    return response.data;
  },

  update: async (id: number, dto: AdminAnnouncementCreateDto): Promise<string> => {
    const response = await axiosInstance.put<string>(`/admin-announcements/update/${id}`, dto);
    return response.data;
  },

  delete: async (id: number): Promise<string> => {
    const response = await axiosInstance.delete<string>(`/admin-announcements/delete/${id}`);
    return response.data;
  },
};
