import axiosInstance from './axiosProvider';

export interface DonorProfileDto {
  userId: number;
  companyName: string;
  description: string;
  operatingHours: string;
  transportType: string;
  phone: string;
  address: string;
  location: string;
}

export const donorProfileService = {
  getByUser: async (userId: number): Promise<DonorProfileDto> => {
    const response = await axiosInstance.get<DonorProfileDto>(`/donor-profile/${userId}`);
    return response.data;
  },

  save: async (dto: DonorProfileDto): Promise<DonorProfileDto> => {
    const response = await axiosInstance.put<DonorProfileDto>('/donor-profile/save', dto);
    return response.data;
  },
};
