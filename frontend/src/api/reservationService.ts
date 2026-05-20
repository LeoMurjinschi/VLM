import axiosInstance from './axiosProvider';

// ── Types ─────────────────────────────────────────────────────────────────────
export interface ReservationCreateDto {
  userId: number;
  donationId: number;
  quantityReserved: number;
  notes: string;
}

export interface ReservationInfoDto {
  id: number;
  userId: number;
  donationId: number;
  quantityReserved: number;
  status: string;
  notes: string;
  createdDate: string;
  updatedDate?: string;
  donorConfirmedAt?: string;
  receiverConfirmedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelledBy?: string;
}

// ── Service ───────────────────────────────────────────────────────────────────
export const reservationService = {

  getAll: async (): Promise<ReservationInfoDto[]> => {
    const response = await axiosInstance.get<ReservationInfoDto[]>('/reservations/list');
    return response.data;
  },

  getById: async (id: number): Promise<ReservationInfoDto> => {
    const response = await axiosInstance.get<ReservationInfoDto>(`/reservations/${id}`);
    return response.data;
  },

  create: async (reservation: ReservationCreateDto): Promise<string> => {
    const response = await axiosInstance.post<string>('/reservations/create', reservation);
    return response.data;
  },

  update: async (id: number, reservation: ReservationCreateDto): Promise<string> => {
    const response = await axiosInstance.put<string>(`/reservations/update/${id}`, reservation);
    return response.data;
  },

  delete: async (id: number): Promise<string> => {
    const response = await axiosInstance.delete<string>(`/reservations/delete/${id}`);
    return response.data;
  },
};
