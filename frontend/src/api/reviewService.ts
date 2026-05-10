import axiosInstance from './axiosProvider';

// ── Types ─────────────────────────────────────────────────────────────────────
export interface ReviewCreateDto {
  donorId: number;
  receiverId: number;
  rating: number;
  text: string;
}

export interface ReviewInfoDto {
  id: number;
  donorId: number;
  receiverId: number;
  rating: number;
  text: string;
  createdDate: string;
}

// ── Service ───────────────────────────────────────────────────────────────────
export const reviewService = {

  getByDonor: async (donorId: number): Promise<ReviewInfoDto[]> => {
    const response = await axiosInstance.get<ReviewInfoDto[]>(`/reviews/by-donor/${donorId}`);
    return response.data;
  },

  getById: async (id: number): Promise<ReviewInfoDto> => {
    const response = await axiosInstance.get<ReviewInfoDto>(`/reviews/${id}`);
    return response.data;
  },

  create: async (review: ReviewCreateDto): Promise<string> => {
    const response = await axiosInstance.post<string>('/reviews/create', review);
    return response.data;
  },

  update: async (id: number, review: ReviewCreateDto): Promise<string> => {
    const response = await axiosInstance.put<string>(`/reviews/update/${id}`, review);
    return response.data;
  },

  delete: async (id: number): Promise<string> => {
    const response = await axiosInstance.delete<string>(`/reviews/delete/${id}`);
    return response.data;
  },
};
