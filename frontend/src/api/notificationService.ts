import axiosInstance from './axiosProvider';
import type { NotificationInfoDto } from './types'; // Modificat pentru a importa din types.ts

interface UnreadCountResponse {
  count: number;
}

// ── Service ───────────────────────────────────────────────────────────────────
export const notificationService = {

  getByUser: async (userId: number): Promise<NotificationInfoDto[]> => {
    const response = await axiosInstance.get<NotificationInfoDto[]>(`/notifications/${userId}`);
    return response.data;
  },

  getUnreadCount: async (userId: number): Promise<number> => {
    const response = await axiosInstance.get<UnreadCountResponse>(`/notifications/unread-count/${userId}`);
    return response.data.count;
  },

  markAsRead: async (id: number): Promise<void> => {
    await axiosInstance.post(`/notifications/${id}/mark-as-read`);
  },
};
