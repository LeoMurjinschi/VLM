export type ReservationStatus = 'pending' | 'donor_confirmed' | 'completed' | 'cancelled';

export interface Reservation {
  id: string;
  stockId: string;
  stockTitle: string;
  stockImage: string;
  stockCategory: string;
  unit: string;
  pickupLocation: string;
  expirationDate: string;
  donorId: string;
  donorName: string;
  receiverId: string;
  receiverName: string;
  quantityReserved: number;
  quantityConfirmed?: number;
  status: ReservationStatus;
  reservedAt: string;
  donorConfirmedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelledBy?: 'donor' | 'receiver';
}
