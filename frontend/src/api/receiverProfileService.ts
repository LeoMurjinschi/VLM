import axiosInstance from './axiosProvider';

export interface ReceiverProfileDto {
  userId: number;
  orgName: string;
  missionStatement: string;
  operatingRadius: number;
  acceptedCategories: string;
  transportType: string;
  hasIndustrialStorage: boolean;
  phone: string;
  address: string;
  location: string;
}

export const receiverProfileService = {
  getByUser: async (userId: number): Promise<ReceiverProfileDto> => {
    const response = await axiosInstance.get<ReceiverProfileDto>(`/receiver-profile/${userId}`);
    return response.data;
  },

  save: async (dto: ReceiverProfileDto): Promise<ReceiverProfileDto> => {
    const response = await axiosInstance.put<ReceiverProfileDto>('/receiver-profile/save', dto);
    return response.data;
  },
};
