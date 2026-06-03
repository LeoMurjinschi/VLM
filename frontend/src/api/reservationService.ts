import axiosInstance from './axiosProvider';

export interface ReservationCreateDto {
  userId: number;
  donationId: number;
  quantityReserved: number;
  notes: string;
}

export interface ReservationStatusUpdateDto {
  status: string;
  quantityPickedUpByReceiver?: number;
  quantityConfirmed?: number;
  cancelledBy?: string;
}

export interface ReservationInfoDto {
  id: number;
  userId: number;
  donationId: number;
  quantityReserved: number;
  quantityPickedUpByReceiver?: number;
  quantityConfirmed?: number;
  status: string;
  notes: string;
  createdDate: string;
  updatedDate?: string;
  donorConfirmedAt?: string;
  receiverConfirmedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelledBy?: string;
  // Joined fields
  donationTitle: string;
  donationImage?: string;
  donationCategory: string;
  donationUnit: string;
  pickupLocation: string;
  expirationDate?: string;
  donorId: number;
  donorName: string;
  receiverName: string;
}

export const reservationService = {

  getAll: async (): Promise<ReservationInfoDto[]> => {
    const response = await axiosInstance.get<ReservationInfoDto[]>('/reservations/list');
    return response.data;
  },

  getByReceiver: async (userId: number): Promise<ReservationInfoDto[]> => {
    const response = await axiosInstance.get<ReservationInfoDto[]>(`/reservations/by-receiver/${userId}`);
    return response.data;
  },

  getByDonor: async (donorId: number): Promise<ReservationInfoDto[]> => {
    const response = await axiosInstance.get<ReservationInfoDto[]>(`/reservations/by-donor/${donorId}`);
    return response.data;
  },

  getById: async (id: number): Promise<ReservationInfoDto> => {
    const response = await axiosInstance.get<ReservationInfoDto>(`/reservations/${id}`);
    return response.data;
  },

  create: async (reservation: ReservationCreateDto): Promise<ReservationInfoDto> => {
    const response = await axiosInstance.post<ReservationInfoDto>('/reservations/create', reservation);
    return response.data;
  },

  updateStatus: async (id: number, dto: ReservationStatusUpdateDto): Promise<ReservationInfoDto> => {
    const response = await axiosInstance.put<ReservationInfoDto>(`/reservations/status/${id}`, dto);
    return response.data;
  },

  delete: async (id: number): Promise<string> => {
    const response = await axiosInstance.delete<string>(`/reservations/delete/${id}`);
    return response.data;
  },
};