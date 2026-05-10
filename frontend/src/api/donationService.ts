import axiosInstance from './axiosProvider';

// ── Types ─────────────────────────────────────────────────────────────────────
export interface DonationCreateDto {
  title: string;
  description: string;
  quantity: number;
  unit: string;
  donorId: number;
}

export interface DonationInfoDto {
  id: number;
  title: string;
  description: string;
  quantity: number;
  unit: string;
  donorId: number;
  status: string;
  createdDate: string;
  updatedDate?: string;
}

// ── Service ───────────────────────────────────────────────────────────────────
export const donationService = {

  getAll: async (): Promise<DonationInfoDto[]> => {
    const response = await axiosInstance.get<DonationInfoDto[]>('/donations/list');
    return response.data;
  },

  getById: async (id: number): Promise<DonationInfoDto> => {
    const response = await axiosInstance.get<DonationInfoDto>(`/donations/${id}`);
    return response.data;
  },

  create: async (donation: DonationCreateDto): Promise<string> => {
    const response = await axiosInstance.post<string>('/donations/create', donation);
    return response.data;
  },

  update: async (id: number, donation: DonationCreateDto): Promise<string> => {
    const response = await axiosInstance.put<string>(`/donations/update/${id}`, donation);
    return response.data;
  },

  delete: async (id: number): Promise<string> => {
    const response = await axiosInstance.delete<string>(`/donations/delete/${id}`);
    return response.data;
  },
};
