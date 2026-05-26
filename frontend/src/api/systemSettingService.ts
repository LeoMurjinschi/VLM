import axiosInstance from './axiosProvider';

export interface SystemSettingInfoDto {
  id: number;
  key: string;
  value: string;
  description: string;
  updatedById?: number;
  updatedDate: string;
}

export interface SystemSettingCreateDto {
  key: string;
  value: string;
  description: string;
  updatedById?: number;
}

export const systemSettingService = {
  getAll: async (): Promise<SystemSettingInfoDto[]> => {
    const response = await axiosInstance.get<SystemSettingInfoDto[]>('/system-settings');
    return response.data;
  },

  getById: async (id: number): Promise<SystemSettingInfoDto> => {
    const response = await axiosInstance.get<SystemSettingInfoDto>(`/system-settings/${id}`);
    return response.data;
  },

  getByKey: async (key: string): Promise<SystemSettingInfoDto> => {
    const response = await axiosInstance.get<SystemSettingInfoDto>(`/system-settings/by-key/${key}`);
    return response.data;
  },

  create: async (dto: SystemSettingCreateDto): Promise<string> => {
    const response = await axiosInstance.post<string>('/system-settings/create', dto);
    return response.data;
  },

  update: async (id: number, dto: SystemSettingCreateDto): Promise<string> => {
    const response = await axiosInstance.put<string>(`/system-settings/update/${id}`, dto);
    return response.data;
  },

  delete: async (id: number): Promise<string> => {
    const response = await axiosInstance.delete<string>(`/system-settings/delete/${id}`);
    return response.data;
  },
};
