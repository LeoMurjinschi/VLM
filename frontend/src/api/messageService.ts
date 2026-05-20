import axiosInstance from './axiosProvider';

// ── Types ─────────────────────────────────────────────────────────────────────
export interface MessageCreateDto {
  senderId: number;
  receiverId: number;
  text: string;
}

export interface MessageInfoDto {
  id: number;
  senderId: number;
  receiverId: number;
  text: string;
  createdDate: string;
}

// ── Service ───────────────────────────────────────────────────────────────────
export const messageService = {

  getConversation: async (userId1: number, userId2: number): Promise<MessageInfoDto[]> => {
    const response = await axiosInstance.get<MessageInfoDto[]>(`/messages/conversation/${userId1}/${userId2}`);
    return response.data;
  },

  send: async (message: MessageCreateDto): Promise<string> => {
    const response = await axiosInstance.post<string>('/messages/send', message);
    return response.data;
  },

  delete: async (id: number): Promise<string> => {
    const response = await axiosInstance.delete<string>(`/messages/delete/${id}`);
    return response.data;
  },
};
