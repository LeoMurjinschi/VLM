import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckBadgeIcon,
  XMarkIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  MapPinIcon,
  ArchiveBoxIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';
import { useReservations } from '../context/ReservationContext';
import { toast } from 'react-toastify';
import type { Reservation, ReservationStatus } from '../types/reservation';

type FilterTab = 'all' | ReservationStatus;

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function expiresLabel(iso: string): string {
  const diff = new Date(iso).getTime() - Date.now();
  if (diff <= 0) return 'Expired';
  const hrs = Math.floor(diff / 3600000);
  if (hrs < 24) return `${hrs}h left`;
  return `${Math.floor(hrs / 24)}d left`;
}

const STATUS_LABEL: Record<ReservationStatus, string> = {
  pending: 'Pending',
  donor_confirmed: 'Ready',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const STATUS_COLORS: Record<ReservationStatus, string> = {
  pending: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  donor_confirmed: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  completed: 'bg-gray-500/15 text-gray-500',
  cancelled: 'bg-red-500/15 text-red-500',
};

interface StockGroup {
  stockId: string;
  stockTitle: string;
  stockImage: string;
  stockCategory: string;
  unit: string;
  pickupLocation: string;
  expirationDate: string;
  reservations: Reservation[];
}

const DonorPickupManager: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { myReservations, confirmReadiness, cancelReservation } = useReservations();
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const donorReservations = useMemo(
    () => myReservations.filter((r) => r.donorId === user?.id),
    [myReservations, user]
  );

  const counts = useMemo(() => ({
    all: donorReservations.length,
    pending: donorReservations.filter((r) => r.status === 'pending').length,
    donor_confirmed: donorReservations.filter((r) => r.status === 'donor_confirmed').length,
    completed: donorReservations.filter((r) => r.status === 'completed').length,
    cancelled: donorReservations.filter((r) => r.status === 'cancelled').length,
  }), [donorReservations]);

  const filtered = useMemo(() => {
    if (activeTab === 'all') return donorReservations;
    return donorReservations.filter((r) => r.status === activeTab);
  }, [donorReservations, activeTab]);

  const grouped = useMemo((): StockGroup[] => {
    const map = new Map<string, StockGroup>();
    for (const r of filtered) {
      if (!map.has(r.stockId)) {
        map.set(r.stockId, {
          stockId: r.stockId,
          stockTitle: r.stockTitle,
          stockImage: r.stockImage,
          stockCategory: r.stockCategory,
          unit: r.unit,
          pickupLocation: r.pickupLocation,
          expirationDate: r.expirationDate,
          reservations: [],
        });
      }
      map.get(r.stockId)!.reservations.push(r);
    }
    return Array.from(map.values());
  }, [filtered]);

  const handleMarkReady = (id: string) => {
    setConfirmingId(id);
  };

  const handleConfirmReady = (id: string) => {
    confirmReadiness(id);
    setConfirmingId(null);
    toast.success('Reservation marked as ready for pickup!');
  };

  const handleCancel = (id: string) => {
    cancelReservation(id);
    toast.info('Reservation cancelled. Quantity returned to stock.');
  };

  const handleMessage = (receiverId: string) => {
    navigate(`/donor/messages?user=${receiverId}`);
  };

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: counts.all },
    { key: 'pending', label: 'Pending', count: counts.pending },
    { key: 'donor_confirmed', label: 'Ready', count: counts.donor_confirmed },
    { key: 'completed', label: 'Completed', count: counts.completed },
    { key: 'cancelled', label: 'Cancelled', count: counts.cancelled },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto min-h-screen pb-12">
      {/* Header */}
      <div className={`flex flex-col pb-6 border-b ${isDark ? 'border-[#2e2e2e]' : 'border-gray-200/60'}`}>
        <h1 className={`text-3xl font-bold tracking-tight mb-2 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
          Pickup Manager
        </h1>
        <p className={`text-[15px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Track and confirm reservations made on your donated stock.
        </p>
      </div>

      {/* Stat tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
              activeTab === tab.key
                ? 'bg-[#16a34a] border-transparent text-white shadow-md shadow-green-500/20'
                : isDark
                ? 'bg-[#1a1a1a] border-[#2e2e2e] text-gray-400 hover:text-white hover:bg-[#222]'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.label}
            <span className={`px-1.5 py-0.5 rounded-md text-[11px] font-bold ${
              activeTab === tab.key
                ? 'bg-white/20 text-white'
                : isDark ? 'bg-[#2e2e2e] text-gray-300' : 'bg-gray-100 text-gray-600'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {grouped.length === 0 ? (
        <div className={`flex flex-col items-center justify-center min-h-[40vh] rounded-2xl border border-dashed ${
          isDark ? 'bg-[#1a1a1a] border-[#2e2e2e]' : 'bg-white border-gray-300'
        }`}>
          <ArchiveBoxIcon className={`w-12 h-12 mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
          <p className={`font-semibold text-lg ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            No reservations here
          </p>
          <p className={`mt-1 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {activeTab === 'all'
              ? 'When receivers reserve your stock, they will appear here.'
              : `No ${STATUS_LABEL[activeTab as ReservationStatus]?.toLowerCase()} reservations.`}
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {grouped.map((group) => (
            <div
              key={group.stockId}
              className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-[#1a1a1a] border-[#2e2e2e]' : 'bg-white border-gray-200'}`}
            >
              {/* Stock header */}
              <div className={`flex items-center gap-4 p-4 border-b ${isDark ? 'border-[#2e2e2e] bg-[#161616]' : 'border-gray-100 bg-gray-50/50'}`}>
                <img
                  src={group.stockImage}
                  alt={group.stockTitle}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
                      isDark ? 'bg-green-400/10 text-green-400' : 'bg-[#16a34a]/10 text-[#16a34a]'
                    }`}>
                      {group.stockCategory}
                    </span>
                    <span className={`text-[11px] font-semibold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                      {expiresLabel(group.expirationDate)}
                    </span>
                  </div>
                  <h3 className={`text-base font-bold mt-0.5 truncate ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                    {group.stockTitle}
                  </h3>
                  <div className={`flex items-center gap-3 text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span className="flex items-center gap-1">
                      <MapPinIcon className="w-3.5 h-3.5" />
                      {group.pickupLocation}
                    </span>
                    <span className="font-semibold text-[#16a34a]">
                      {group.reservations.length} reservation{group.reservations.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* Reservation rows */}
              <div className="divide-y divide-gray-100 dark:divide-[#2e2e2e]">
                {group.reservations.map((r) => (
                  <div key={r.id} className="p-4">
                    {/* Inline "Mark as Ready" confirmation */}
                    {confirmingId === r.id ? (
                      <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-xl ${
                        isDark ? 'bg-[#222]' : 'bg-amber-50'
                      }`}>
                        <p className={`text-sm font-semibold flex-grow ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                          Mark this reservation as ready for pickup?
                        </p>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => setConfirmingId(null)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                              isDark ? 'bg-[#2e2e2e] text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                          >
                            No
                          </button>
                          <button
                            onClick={() => handleConfirmReady(r.id)}
                            className="px-3 py-1.5 rounded-lg text-sm font-bold bg-[#16a34a] text-white hover:bg-[#15803d] transition-all"
                          >
                            Yes, mark ready
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        {/* Left: receiver info */}
                        <div className="flex items-center gap-3 flex-grow min-w-0">
                          <div className="w-9 h-9 rounded-full bg-[#16a34a] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {r.receiverName.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className={`text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                              {r.receiverName}
                            </p>
                            <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              <span className="font-semibold text-[#16a34a]">
                                {r.quantityReserved} {r.unit}
                              </span>
                              <span>·</span>
                              <span className="flex items-center gap-0.5">
                                <ClockIcon className="w-3 h-3" />
                                {timeAgo(r.reservedAt)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Status badge */}
                        <span className={`self-start sm:self-center px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wide flex-shrink-0 ${STATUS_COLORS[r.status]}`}>
                          {STATUS_LABEL[r.status]}
                        </span>

                        {/* Actions */}
                        {(r.status === 'pending' || r.status === 'donor_confirmed') && (
                          <div className="flex gap-2 flex-shrink-0">
                            <button
                              onClick={() => handleMessage(r.receiverId)}
                              title="Message receiver"
                              className={`p-2 rounded-lg transition-all ${
                                isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              <ChatBubbleLeftRightIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleCancel(r.id)}
                              title="Cancel reservation"
                              className={`p-2 rounded-lg transition-all ${
                                isDark ? 'text-red-400 hover:bg-red-400/10' : 'text-red-500 hover:bg-red-50'
                              }`}
                            >
                              <XMarkIcon className="w-4 h-4" />
                            </button>
                            {r.status === 'pending' && (
                              <button
                                onClick={() => handleMarkReady(r.id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#16a34a] text-white hover:bg-[#15803d] transition-all shadow-sm shadow-green-500/20"
                              >
                                <CheckBadgeIcon className="w-4 h-4" />
                                Mark Ready
                              </button>
                            )}
                          </div>
                        )}

                        {r.status === 'completed' && r.quantityConfirmed !== undefined && (
                          <span className={`text-xs flex-shrink-0 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            Picked up: {r.quantityConfirmed} {r.unit}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonorPickupManager;
