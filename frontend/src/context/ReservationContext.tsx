import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Reservation, ReservationStatus } from '../types/reservation';
import { useAuth } from './AuthContext';
import { reservationService, type ReservationInfoDto } from '../api';

function mapDto(dto: ReservationInfoDto): Reservation {
  return {
    id: String(dto.id),
    stockId: String(dto.donationId),
    stockTitle: dto.donationTitle,
    stockImage: dto.donationImage ?? '',
    stockCategory: dto.donationCategory,
    unit: dto.donationUnit,
    pickupLocation: dto.pickupLocation,
    expirationDate: dto.expirationDate ?? new Date().toISOString(),
    donorId: String(dto.donorId),
    donorName: dto.donorName,
    receiverId: String(dto.userId),
    receiverName: dto.receiverName,
    quantityReserved: dto.quantityReserved,
    quantityPickedUpByReceiver: dto.quantityPickedUpByReceiver ?? undefined,
    quantityConfirmed: dto.quantityConfirmed ?? undefined,
    status: dto.status as ReservationStatus,
    reservedAt: dto.createdDate,
    donorConfirmedAt: dto.donorConfirmedAt,
    receiverConfirmedAt: dto.receiverConfirmedAt,
    completedAt: dto.completedAt,
    cancelledAt: dto.cancelledAt,
    cancelledBy: dto.cancelledBy as 'donor' | 'receiver' | undefined,
  };
}

interface ReservationContextType {
  reservations: Reservation[];
  myReservations: Reservation[];
  loading: boolean;
  createReservation: (donationId: string, quantity: number) => Promise<Reservation>;
  confirmReadiness: (reservationId: string) => Promise<void>;
  confirmPickup: (reservationId: string, actualQty: number) => Promise<void>;
  donorFinalConfirm: (reservationId: string, actualQty: number) => Promise<void>;
  cancelReservation: (reservationId: string) => Promise<void>;
  getReservationsForStock: (stockId: string) => Reservation[];
  refresh: () => Promise<void>;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const ReservationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReservations = useCallback(async () => {
    if (!user) { setReservations([]); return; }
    setLoading(true);
    try {
      const userId = parseInt(user.id);
      let dtos: ReservationInfoDto[] = [];
      if (user.role === 'receiver') {
        dtos = await reservationService.getByReceiver(userId);
      } else if (user.role === 'donor') {
        dtos = await reservationService.getByDonor(userId);
      }
      setReservations(dtos.map(mapDto));
    } catch (err) {
      console.error('Failed to load reservations', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchReservations(); }, [fetchReservations]);

  const myReservations = useMemo(() => reservations, [reservations]);

  const createReservation = useCallback(async (donationId: string, quantity: number): Promise<Reservation> => {
    if (!user) throw new Error('Not authenticated');
    if (user.role !== 'receiver') throw new Error('Only receivers can reserve');

    const dto = await reservationService.create({
      userId: parseInt(user.id),
      donationId: parseInt(donationId),
      quantityReserved: quantity,
      notes: '',
    });
    const reservation = mapDto(dto);
    setReservations(prev => [...prev, reservation]);
    return reservation;
  }, [user]);

  const confirmReadiness = useCallback(async (reservationId: string) => {
    const dto = await reservationService.updateStatus(parseInt(reservationId), { status: 'donor_confirmed' });
    const updated = mapDto(dto);
    setReservations(prev => prev.map(r => r.id === reservationId ? updated : r));
  }, []);

  const confirmPickup = useCallback(async (reservationId: string, actualQty: number) => {
    const dto = await reservationService.updateStatus(parseInt(reservationId), {
      status: 'receiver_confirmed',
      quantityPickedUpByReceiver: actualQty,
    });
    const updated = mapDto(dto);
    setReservations(prev => prev.map(r => r.id === reservationId ? updated : r));
  }, []);

  const donorFinalConfirm = useCallback(async (reservationId: string, actualQty: number) => {
    const dto = await reservationService.updateStatus(parseInt(reservationId), {
      status: 'completed',
      quantityConfirmed: actualQty,
    });
    const updated = mapDto(dto);
    setReservations(prev => prev.map(r => r.id === reservationId ? updated : r));
  }, []);

  const cancelReservation = useCallback(async (reservationId: string) => {
    const cancelledBy = user?.role === 'donor' ? 'donor' : 'receiver';
    const dto = await reservationService.updateStatus(parseInt(reservationId), {
      status: 'cancelled',
      cancelledBy,
    });
    const updated = mapDto(dto);
    setReservations(prev => prev.map(r => r.id === reservationId ? updated : r));
  }, [user]);

  const getReservationsForStock = useCallback((stockId: string): Reservation[] => {
    return reservations.filter(r => r.stockId === stockId);
  }, [reservations]);

  const value = useMemo(() => ({
    reservations,
    myReservations,
    loading,
    createReservation,
    confirmReadiness,
    confirmPickup,
    donorFinalConfirm,
    cancelReservation,
    getReservationsForStock,
    refresh: fetchReservations,
  }), [reservations, myReservations, loading, createReservation, confirmReadiness, confirmPickup, donorFinalConfirm, cancelReservation, getReservationsForStock, fetchReservations]);

  return <ReservationContext.Provider value={value}>{children}</ReservationContext.Provider>;
};

export const useReservations = () => {
  const context = useContext(ReservationContext);
  if (context === undefined) throw new Error('useReservations must be used within a ReservationProvider');
  return context;
};
