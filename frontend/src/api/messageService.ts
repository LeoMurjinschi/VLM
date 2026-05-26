import axiosInstance from './axiosProvider';
import type { Contact } from '../components/chat/types';

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
  getContacts: async (userId: number): Promise<Contact[]> => {
    const response = await axiosInstance.get<Contact[]>(`/messages/contacts/${userId}`);
    return response.data;
  },

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