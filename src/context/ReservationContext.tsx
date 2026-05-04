import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Reservation, ReservationStatus } from '../types/reservation';
import { reservationStore } from '../services/reservationStore';
import { stockStore } from '../services/stockStore';
import { useAuth } from './AuthContext';
import usersMock from '../_mock/users.json';

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `res_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

interface ReservationContextType {
  reservations: Reservation[];
  myReservations: Reservation[];
  createReservation: (stockId: string, quantity: number) => Reservation;
  confirmReadiness: (reservationId: string) => void;
  confirmPickup: (reservationId: string, actualQty: number) => void;
  donorFinalConfirm: (reservationId: string, actualQty: number) => void;
  cancelReservation: (reservationId: string) => void;
  getReservationsForStock: (stockId: string) => Reservation[];
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const ReservationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>(() => reservationStore.getAll());

  useEffect(() => {
    const unsubscribe = reservationStore.subscribe(() => {
      setReservations(reservationStore.getAll());
    });
    return unsubscribe;
  }, []);

  const myReservations = useMemo(() => {
    if (!user) return [];
    if (user.role === 'donor') return reservationStore.getByDonor(user.id);
    if (user.role === 'receiver') return reservationStore.getByReceiver(user.id);
    return reservationStore.getAll();
  }, [user, reservations]); // eslint-disable-line react-hooks/exhaustive-deps

  const createReservation = useCallback((stockId: string, quantity: number): Reservation => {
    if (!user) throw new Error('Not authenticated');
    if (user.role !== 'receiver') throw new Error('Only receivers can reserve');

    const stock = stockStore.getById(stockId);
    if (!stock) throw new Error('Stock item not found');
    if (stock.quantity < quantity) throw new Error(`Only ${stock.quantity} ${stock.unit} available`);

    const donorUser = (usersMock as { id: string; name: string }[]).find((u) => u.id === stock.donorId);
    const donorName = donorUser?.name ?? 'Unknown Donor';

    stockStore.update(stockId, { quantity: stock.quantity - quantity });

    const reservation: Reservation = {
      id: generateId(),
      stockId,
      stockTitle: stock.title,
      stockImage: stock.image,
      stockCategory: stock.category,
      unit: stock.unit,
      pickupLocation: stock.pickupLocation,
      expirationDate: stock.expirationDate,
      donorId: stock.donorId ?? '',
      donorName,
      receiverId: user.id,
      receiverName: user.name,
      quantityReserved: quantity,
      status: 'pending',
      reservedAt: new Date().toISOString(),
    };

    return reservationStore.add(reservation);
  }, [user]);

  const confirmReadiness = useCallback((reservationId: string) => {
    if (!user || user.role !== 'donor') return;
    const reservation = reservationStore.getById(reservationId);
    if (!reservation || reservation.status !== 'pending') return;
    if (reservation.donorId !== user.id) return;

    reservationStore.update(reservationId, {
      status: 'donor_confirmed' as ReservationStatus,
      donorConfirmedAt: new Date().toISOString(),
    });
  }, [user]);

  const confirmPickup = useCallback((reservationId: string, actualQty: number) => {
    if (!user || user.role !== 'receiver') return;
    const reservation = reservationStore.getById(reservationId);
    if (!reservation || reservation.status !== 'donor_confirmed') return;
    if (reservation.receiverId !== user.id) return;

    reservationStore.update(reservationId, {
      status: 'receiver_confirmed' as ReservationStatus,
      quantityPickedUpByReceiver: actualQty,
      receiverConfirmedAt: new Date().toISOString(),
    });
  }, [user]);

  const donorFinalConfirm = useCallback((reservationId: string, actualQty: number) => {
    if (!user || user.role !== 'donor') return;
    const reservation = reservationStore.getById(reservationId);
    if (!reservation || reservation.status !== 'receiver_confirmed') return;
    if (reservation.donorId !== user.id) return;

    const diff = reservation.quantityReserved - actualQty;
    if (diff > 0) {
      const stock = stockStore.getById(reservation.stockId);
      if (stock && new Date(reservation.expirationDate) > new Date()) {
        stockStore.update(reservation.stockId, { quantity: stock.quantity + diff });
      }
    }

    reservationStore.update(reservationId, {
      status: 'completed' as ReservationStatus,
      quantityConfirmed: actualQty,
      completedAt: new Date().toISOString(),
    });
  }, [user]);

  const cancelReservation = useCallback((reservationId: string) => {
    if (!user) return;
    const reservation = reservationStore.getById(reservationId);
    if (!reservation) return;
    if (reservation.status === 'completed' || reservation.status === 'cancelled') return;

    const stock = stockStore.getById(reservation.stockId);
    if (stock && new Date(reservation.expirationDate) > new Date()) {
      stockStore.update(reservation.stockId, { quantity: stock.quantity + reservation.quantityReserved });
    }

    reservationStore.update(reservationId, {
      status: 'cancelled' as ReservationStatus,
      cancelledAt: new Date().toISOString(),
      cancelledBy: user.role === 'donor' ? 'donor' : 'receiver',
    });
  }, [user]);

  const getReservationsForStock = useCallback((stockId: string): Reservation[] => {
    return reservations.filter((r) => r.stockId === stockId);
  }, [reservations]);

  const value = useMemo(() => ({
    reservations,
    myReservations,
    createReservation,
    confirmReadiness,
    confirmPickup,
    donorFinalConfirm,
    cancelReservation,
    getReservationsForStock,
  }), [reservations, myReservations, createReservation, confirmReadiness, confirmPickup, donorFinalConfirm, cancelReservation, getReservationsForStock]);

  return <ReservationContext.Provider value={value}>{children}</ReservationContext.Provider>;
};

export const useReservations = () => {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservations must be used within a ReservationProvider');
  }
  return context;
};
