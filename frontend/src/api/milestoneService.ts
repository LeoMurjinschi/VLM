import axiosInstance from './axiosProvider';

export interface MilestoneCreateDto {
  donorId: number;
  title: string;
  reward: string;
  currentAmount: number;
  targetAmount: number;
}

export interface MilestoneUpdateDto {
  title: string;
  reward: string;
  currentAmount: number;
  targetAmount: number;
}

export interface MilestoneInfoDto {
  id: number;
  donorId: number;
  title: string;
  reward: string;
  currentAmount: number;
  targetAmount: number;
  createdDate: string;
}

export const milestoneService = {
  getByDonor: async (donorId: number): Promise<MilestoneInfoDto[]> => {
    const response = await axiosInstance.get<MilestoneInfoDto[]>(`/milestones/donor/${donorId}`);
    return response.data;
  },

  create: async (dto: MilestoneCreateDto): Promise<number> => {
    const response = await axiosInstance.post<number>('/milestones/create', dto);
    return response.data;
  },

  update: async (id: number, dto: MilestoneUpdateDto): Promise<string> => {
    const response = await axiosInstance.put<string>(`/milestones/update/${id}`, dto);
    return response.data;
  },

  delete: async (id: number): Promise<string> => {
    const response = await axiosInstance.delete<string>(`/milestones/delete/${id}`);
    return response.data;
  },
};
