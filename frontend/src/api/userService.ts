import axiosInstance from './axiosProvider';

// ── Types ─────────────────────────────────────────────────────────────────────
export interface UserCreateDto {
  name: string;
  email: string;
  password: string;
  role: string;
  bio: string;
  avatar?: string;
}

export interface UserInfoUpdateDto {
  name: string;
  email: string;
  avatar?: string;
}

export interface UserInfoDto {
  id: number;
  name: string;
  email: string;
  role: string;
  bio: string;
  avatar?: string;
  isActive: boolean;
  createdDate: string;
}

// ── Service ───────────────────────────────────────────────────────────────────
export const userService = {

  getAll: async (): Promise<UserInfoDto[]> => {
    const response = await axiosInstance.get<UserInfoDto[]>('/users/list');
    return response.data;
  },

  getById: async (id: number): Promise<UserInfoDto> => {
    const response = await axiosInstance.get<UserInfoDto>(`/users/${id}`);
    return response.data;
  },

  create: async (user: UserCreateDto): Promise<string> => {
    const response = await axiosInstance.post<string>('/users/create', user);
    return response.data;
  },

  update: async (id: number, user: UserCreateDto): Promise<string> => {
    const response = await axiosInstance.put<string>(`/users/update/${id}`, user);
    return response.data;
  },

  updateInfo: async (id: number, info: UserInfoUpdateDto): Promise<string> => {
    const response = await axiosInstance.put<string>(`/users/info/${id}`, info);
    return response.data;
  },

  delete: async (id: number): Promise<string> => {
    const response = await axiosInstance.delete<string>(`/users/delete/${id}`);
    return response.data;
  },
};
