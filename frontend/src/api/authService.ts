import axiosInstance from './axiosProvider';

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  token: string;
}

export const authService = {
  login: async (credentials: LoginRequestDto): Promise<LoginResponseDto> => {
    const response = await axiosInstance.post<LoginResponseDto>('/auth/login', credentials);
    return response.data;
  },
};
