import axiosInstance from './axiosProvider';

// ── Types ─────────────────────────────────────────────────────────────────────
export interface UserSettingsDto {
  userId: number;
  theme: string;
  notifyPush: boolean;
  notifySms: boolean;
  notifyEmail: boolean;
  emailUpdates: boolean;
}

// ── Service ───────────────────────────────────────────────────────────────────
export const settingsService = {

  getByUser: async (userId: number): Promise<UserSettingsDto> => {
    const response = await axiosInstance.get<UserSettingsDto>(`/settings/${userId}`);
    return response.data;
  },

  save: async (settings: UserSettingsDto): Promise<string> => {
    const response = await axiosInstance.put<string>('/settings/save', settings);
    return response.data;
  },
};
