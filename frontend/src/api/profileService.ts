import axiosInstance from './axiosProvider';

// ── Types ─────────────────────────────────────────────────────────────────────
export interface UserProfileDto {
  userId: number;
  phone?: string;
  address?: string;
  orgName?: string;
  description?: string;
  missionStatement?: string;
  operatingHours?: string;
  operatingRadius: number;
  acceptedCategories?: string;
  transportType?: string;
  hasIndustrialStorage: boolean;
  location?: string;
  verified: boolean;
}

// ── Service ───────────────────────────────────────────────────────────────────
export const profileService = {

  getByUser: async (userId: number): Promise<UserProfileDto> => {
    const response = await axiosInstance.get<UserProfileDto>(`/profile/${userId}`);
    return response.data;
  },

  save: async (profile: UserProfileDto): Promise<string> => {
    const response = await axiosInstance.put<string>('/profile/save', profile);
    return response.data;
  },
};
