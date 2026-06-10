export type ReservationStatus = 'pending' | 'donor_confirmed' | 'receiver_confirmed' | 'completed' | 'cancelled';

export interface Reservation {
  id: string;
  stockId: string;
  stockTitle: string;
  stockImage: string;
  stockCategory: string;
  unit: string;
  pickupLocation: string;
  pickupLatitude?: number;
  pickupLongitude?: number;
  expirationDate: string;
  donorId: string;
  donorName: string;
  donorAvatar?: string;
  receiverId: string;
  receiverName: string;
  receiverAvatar?: string;
  quantityReserved: number;
  quantityPickedUpByReceiver?: number;
  quantityConfirmed?: number;
  status: ReservationStatus;
  reservedAt: string;
  donorConfirmedAt?: string;
  receiverConfirmedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelledBy?: 'donor' | 'receiver';
}
