import axiosInstance from './axiosProvider';

export interface UserDocumentInfoDto {
  id: number;
  userId: number;
  fileName: string;
  documentType: string;
  contentType: string;
  fileData: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: string;
}

export interface UserDocumentCreateDto {
  userId: number;
  fileName: string;
  documentType: string;
  contentType: string;
  fileData: string;
}

export const documentService = {
  getByUser: async (userId: number): Promise<UserDocumentInfoDto[]> => {
    const response = await axiosInstance.get<UserDocumentInfoDto[]>(`/documents/by-user/${userId}`);
    return response.data;
  },

  upload: async (dto: UserDocumentCreateDto): Promise<UserDocumentInfoDto> => {
    const response = await axiosInstance.post<UserDocumentInfoDto>('/documents/upload', dto);
    return response.data;
  },

  delete: async (id: number, userId: number): Promise<string> => {
    const response = await axiosInstance.delete<string>(`/documents/${id}/user/${userId}`);
    return response.data;
  },
};
