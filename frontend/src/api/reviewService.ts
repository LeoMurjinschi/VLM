import axiosInstance from './axiosProvider';

export interface ReviewCreateDto {
  donorId: number;
  receiverId: number;
  donationId: number;
  reservationId?: number;
  rating: number;
  text: string;
}

export interface ReviewInfoDto {
  id: number;
  donorId: number;
  receiverId: number;
  donationId: number;
  rating: number;
  text: string;
  status: string;
  createdDate: string;
}

export interface PendingReviewDto {
  reviewId: number;
  reservationId: number;
  donationId: number;
  donorId: number;
  donorName: string;
  donationTitle: string;
  donationImage?: string;
  pickupDate: string;
}

export const reviewService = {
  getPending: async (receiverId: number): Promise<PendingReviewDto[]> => {
    const response = await axiosInstance.get<PendingReviewDto[]>(`/reviews/pending/${receiverId}`);
    return response.data;
  },

  getByReceiver: async (receiverId: number): Promise<ReviewInfoDto[]> => {
    const response = await axiosInstance.get<ReviewInfoDto[]>(`/reviews/by-receiver/${receiverId}`);
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
};