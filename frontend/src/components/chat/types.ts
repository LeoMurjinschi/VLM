// src/components/chat/types.ts

export interface Contact {
  id: number;
  name: string;
  role: string;
  initials: string;
  // Am șters "online: boolean;"
  lastMessage: string;
  time: string;
  unread: number;
}

export interface ChatMessage {
  id: number;
  senderId: number | 'me';
  text: string;
  time: string;
}