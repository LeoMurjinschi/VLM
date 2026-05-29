// src/api/types.ts

export interface NotificationInfoDto {
  id: number;
  userId: number;
  title: string;
  description: string;
  type: string;
  link: string;
  isRead: boolean;
  createdDate: string;
}
