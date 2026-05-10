import axiosInstance from './axiosProvider';

// ── Types ─────────────────────────────────────────────────────────────────────
export interface CommentCreateDto {
  text: string;
  userId: number;
  donationId: number;
  parentCommentId?: number;
}

export interface CommentInfoDto {
  id: number;
  text: string;
  userId: number;
  donationId: number;
  parentCommentId?: number;
  createdDate: string;
  updatedDate?: string;
}

// ── Service ───────────────────────────────────────────────────────────────────
export const commentService = {

  getByDonation: async (donationId: number): Promise<CommentInfoDto[]> => {
    const response = await axiosInstance.get<CommentInfoDto[]>(`/comments/by-donation/${donationId}`);
    return response.data;
  },

  getById: async (id: number): Promise<CommentInfoDto> => {
    const response = await axiosInstance.get<CommentInfoDto>(`/comments/${id}`);
    return response.data;
  },

  create: async (comment: CommentCreateDto): Promise<string> => {
    const response = await axiosInstance.post<string>('/comments/create', comment);
    return response.data;
  },

  update: async (id: number, comment: CommentCreateDto): Promise<string> => {
    const response = await axiosInstance.put<string>(`/comments/update/${id}`, comment);
    return response.data;
  },

  delete: async (id: number): Promise<string> => {
    const response = await axiosInstance.delete<string>(`/comments/delete/${id}`);
    return response.data;
  },
};
