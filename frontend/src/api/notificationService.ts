import axiosInstance from './axiosProvider';

// ── Types ─────────────────────────────────────────────────────────────────────
export interface NotificationCreateDto {
  userId: number;
  title: string;
  description: string;
  type: string;
  link: string;
}

export interface NotificationInfoDto {
  id: number;
  userId: number;
  title: string;
  description: string;
  type: string;
  link: string;
  isRead: boolean;
  createdDate: string;
}

// ── Service ───────────────────────────────────────────────────────────────────
export const notificationService = {

  getByUser: async (userId: number): Promise<NotificationInfoDto[]> => {
    const response = await axiosInstance.get<NotificationInfoDto[]>(`/notifications/by-user/${userId}`);
    return response.data;
  },

  create: async (notification: NotificationCreateDto): Promise<string> => {
    const response = await axiosInstance.post<string>('/notifications/create', notification);
    return response.data;
  },

  markAsRead: async (id: number): Promise<string> => {
    const response = await axiosInstance.put<string>(`/notifications/read/${id}`);
    return response.data;
  },

  delete: async (id: number): Promise<string> => {
    const response = await axiosInstance.delete<string>(`/notifications/delete/${id}`);
    return response.data;
  },
};
