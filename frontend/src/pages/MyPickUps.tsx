import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { avatarSrc } from '../utils/avatarUtils';
import { useTheme } from '../hooks/useTheme';
import { toast } from 'react-toastify';
import {
  MapPinIcon,
  XMarkIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  MapIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import PageLayout from '../components/PageLayout';
import PickupConfirmModal from '../components/PickupConfirmModal';
import { useReservations } from '../context/ReservationContext';
import { useAuth } from '../context/AuthContext';
import type { Reservation } from '../types/reservation';


const DEFAULT_DONATION_IMAGE = 'https://images.unsplash.com/vector-1740026651800-93fb37caa211?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGdyb2Nlcnl8ZW58MHx8MHx8fDA%3D';

type TabKey = 'active' | 'completed' | 'cancelled';

interface GroupedPickup {
  groupKey: string;
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
  status: Reservation['status'];
  totalQty: number;
  reservations: Reservation[];
}

function expiresLabel(iso: string): { text: string; urgent: boolean } {
  const diff = new Date(iso).getTime() - Date.now();
  if (diff <= 0) return { text: 'Expired', urgent: true };
  const hrs = Math.floor(diff / 3600000);
  if (hrs < 6) return { text: `${hrs}h left`, urgent: true };
  if (hrs < 24) return { text: `${hrs}h left`, urgent: false };
  return { text: `${Math.floor(hrs / 24)}d left`, urgent: false };
}

function mapEmbedFromAddress(address: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

const StatusBadge: React.FC<{ status: Reservation['status'] }> = ({ status }) => {
  const map: Record<string, { label: string; cls: string }> = {
    pending: { label: 'Waiting for donor', cls: 'bg-amber-500/15 text-amber-600 dark:text-amber-400' },
    donor_confirmed: { label: 'Ready for Pickup', cls: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
    receiver_confirmed: { label: 'Awaiting donor confirmation', cls: 'bg-blue-500/15 text-blue-600 dark:text-blue-400' },
    completed: { label: 'Completed', cls: 'bg-gray-500/15 text-gray-500' },
    cancelled: { label: 'Cancelled', cls: 'bg-red-500/15 text-red-500' },
  };
  const { label, cls } = map[status] ?? map.pending;
  return (
    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wide ${cls}`}>
      {label}
    </span>
  );
};

const MyPickups: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { myReservations, confirmPickup, cancelReservation } = useReservations();
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<TabKey>('active');
  const [mapGroup, setMapGroup] = useState<GroupedPickup | null>(null);
  const [confirmingGroup, setConfirmingGroup] = useState<GroupedPickup | null>(null);

  const receiverReservations = useMemo(
    () => myReservations.filter((r) => r.receiverId === user?.id),
    [myReservations, user]
  );

  const buildGroups = (list: Reservation[]): GroupedPickup[] => {
    const map = new Map<string, GroupedPickup>();
    for (const r of list) {
      const key = `${r.stockId}_${r.status}`;
      if (!map.has(key)) {
        map.set(key, {
          groupKey: key,
          stockId: r.stockId,
          stockTitle: r.stockTitle,
          stockImage: r.stockImage || DEFAULT_DONATION_IMAGE,
          stockCategory: r.stockCategory,
          unit: r.unit,
          pickupLocation: r.pickupLocation,
          pickupLatitude: r.pickupLatitude,
          pickupLongitude: r.pickupLongitude,
          expirationDate: r.expirationDate,
          donorId: r.donorId,
          donorName: r.donorName,
          donorAvatar: r.donorAvatar,
          status: r.status,
          totalQty: 0,
          reservations: [],
        });
      }
      const g = map.get(key)!;
      g.totalQty += r.quantityReserved;
      g.reservations.push(r);
    }
    return Array.from(map.values());
  };

  const activeGroups = useMemo(
    () => buildGroups(receiverReservations.filter((r) => r.status === 'pending' || r.status === 'donor_confirmed' || r.status === 'receiver_confirmed')),
    [receiverReservations]
  );
  const completedGroups = useMemo(
    () => buildGroups(receiverReservations.filter((r) => r.status === 'completed')),
    [receiverReservations]
  );
  const cancelledGroups = useMemo(
    () => buildGroups(receiverReservations.filter((r) => r.status === 'cancelled')),
    [receiverReservations]
  );

  const displayGroups = activeTab === 'active' ? activeGroups : activeTab === 'completed' ? completedGroups : cancelledGroups;

  const handleConfirmPickup = async (actualQty: number) => {
    if (!confirmingGroup) return;
    const { reservations, totalQty } = confirmingGroup;
    await Promise.all(
      reservations.map((r) => {
        const share = totalQty > 0 ? Math.round(actualQty * (r.quantityReserved / totalQty) * 10) / 10 : actualQty;
        return confirmPickup(r.id, Math.max(0.1, share));
      })
    );
    toast.success('Pickup confirmed! You can now go to the Feedback page to leave a review.');
    setConfirmingGroup(null);
  };

  const handleCancel = (ids: string[]) => {
    ids.forEach((id) => cancelReservation(id));
    toast.info('Reservation cancelled. Quantity returned to the feed.');
  };

  const handleMessage = (donorId: string, donorName: string) => {
    navigate('/receiver/messages', {
      state: { openChatWith: { id: parseInt(donorId, 10), name: donorName, role: 'Donor' } },
    });
  };

  const tabs = [
    { key: 'active' as TabKey, label: 'Active', count: activeGroups.length },
    { key: 'completed' as TabKey, label: 'Completed', count: completedGroups.length },
    { key: 'cancelled' as TabKey, label: 'Cancelled', count: cancelledGroups.length },
  ];

  return (
    <PageLayout>
      <div className="w-full space-y-6 max-w-7xl mx-auto min-h-screen relative pb-10 bg-transparent">

        {/* Header */}
        <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b ${
          isDark ? 'border-[#2e2e2e]' : 'border-gray-200/60'
        }`}>
          <div className="max-w-2xl">
            <h1 className={`text-3xl font-bold tracking-tight mb-2 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
              My Pickups
            </h1>
            <p className={`text-[15px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Track your reserved donations and confirm pickups.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                  activeTab === tab.key
                    ? 'bg-[#16a34a] border-transparent text-white shadow-md shadow-green-500/20'
                    : isDark
                    ? 'bg-[#1a1a1a] border-[#2e2e2e] text-gray-400 hover:text-white'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
                <span className={`px-1.5 py-0.5 rounded-md text-[11px] font-bold ${
                  activeTab === tab.key ? 'bg-white/20 text-white' : isDark ? 'bg-[#2e2e2e] text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        {displayGroups.length === 0 ? (
          <div className={`flex flex-col items-center justify-center min-h-[45vh] rounded-2xl border border-dashed ${
            isDark ? 'bg-[#1a1a1a] border-[#2e2e2e]' : 'bg-white border-gray-300'
          }`}>
            <img src="/grocery-bag.svg" alt="" className="w-28 h-28 mb-4 opacity-60" />
            <p className={`font-semibold text-lg ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
              {activeTab === 'active'
                ? 'No active pickups'
                : activeTab === 'completed'
                ? 'No completed pickups yet'
                : 'No cancelled pickups'}
            </p>
            <p className={`mt-1.5 text-center max-w-sm text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {activeTab === 'active'
                ? 'Reserve donations from the feed and they will appear here.'
                : activeTab === 'completed'
                ? 'Your confirmed pickups will appear here once complete.'
                : ''}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayGroups.map((group) => {
              const { text: expiresText, urgent } = expiresLabel(group.expirationDate);
              const isReady = group.status === 'donor_confirmed';

              return (
                <div
                  key={group.groupKey}
                  className={`group relative rounded-2xl overflow-hidden flex flex-col transition-all border ${
                    isDark ? 'bg-[#1a1a1a] border-[#2e2e2e]' : 'bg-white border-gray-200'
                  } ${urgent ? 'ring-2 ring-red-400' : ''} ${isReady ? 'ring-2 ring-emerald-400' : ''}`}
                >
                  {/* Image */}
                  <div className="relative h-[180px] overflow-hidden flex-shrink-0">
                    <img
                      src={group.stockImage}
                      alt={group.stockTitle}
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                        group.status === 'completed' || group.status === 'cancelled' ? 'grayscale opacity-60' : ''
                      }`}
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase bg-[#16a34a] text-white shadow-sm">
                      {group.totalQty} {group.unit}
                      {group.reservations.length > 1 && (
                        <span className="ml-1 opacity-80">×{group.reservations.length}</span>
                      )}
                    </span>
                    <div className="absolute top-3 right-3">
                      <StatusBadge status={group.status} />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-grow p-4">
                    <span className={`self-start px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2 ${
                      isDark ? 'bg-green-400/10 text-green-400' : 'bg-[#16a34a]/10 text-[#16a34a]'
                    }`}>
                      {group.stockCategory}
                    </span>

                    <h3 className={`text-base font-bold leading-snug mb-1.5 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                      {group.stockTitle}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <img
                        src={avatarSrc(group.donorName, group.donorAvatar)}
                        alt={group.donorName}
                        className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                      />
                      <p className={`text-xs font-medium truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        from {group.donorName}
                      </p>
                    </div>

                    <div className={`mt-auto space-y-1.5 pt-3 border-t ${isDark ? 'border-[#2e2e2e]' : 'border-gray-100'}`}>
                      <div className={`flex items-center text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        <MapPinIcon className="w-3.5 h-3.5 mr-2 text-[#16a34a] flex-shrink-0" />
                        <span className="truncate">{group.pickupLocation}</span>
                      </div>
                      <div className={`flex items-center text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        <ClockIcon className={`w-3.5 h-3.5 mr-2 flex-shrink-0 ${urgent ? 'text-red-500' : 'text-gray-400'}`} />
                        <span className={urgent ? 'text-red-500 font-semibold' : ''}>{expiresText}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover actions */}
                  {(group.status === 'pending' || group.status === 'donor_confirmed' || group.status === 'receiver_confirmed') && (
                    <div className={`absolute bottom-0 inset-x-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex gap-2 border-t ${
                      isDark ? 'bg-[#1a1a1a] border-[#2e2e2e]' : 'bg-white border-gray-200'
                    }`}>
                      {group.status === 'receiver_confirmed' ? (
                        <div className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold ${
                          isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'
                        }`}>
                          <CheckCircleIcon className="w-4 h-4" />
                          Pickup reported — awaiting donor
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => setMapGroup(group)}
                            className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-1.5 ${
                              isDark ? 'bg-[#222] text-gray-200 hover:bg-gray-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <MapIcon className="w-4 h-4" /> Map
                          </button>

                          <button
                            onClick={() => handleMessage(group.donorId, group.donorName)}
                            title="Message donor"
                            className={`p-2 rounded-xl transition-all flex items-center justify-center ${
                              isDark ? 'bg-[#222] text-gray-300 hover:bg-gray-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <ChatBubbleLeftRightIcon className="w-4 h-4" />
                          </button>

                          {group.status === 'pending' && (
                            <button
                              onClick={() => handleCancel(group.reservations.map((r) => r.id))}
                              title="Cancel reservation"
                              className={`p-2 rounded-xl transition-all flex items-center justify-center ${
                                isDark ? 'text-red-400 bg-red-400/10 hover:bg-red-400/20' : 'text-red-500 bg-red-50 hover:bg-red-100'
                              }`}
                            >
                              <XMarkIcon className="w-4 h-4" />
                            </button>
                          )}

                          {group.status === 'donor_confirmed' && (
                            <button
                              onClick={() => setConfirmingGroup(group)}
                              className="flex-1 py-2 rounded-xl font-bold text-sm bg-[#16a34a] text-white hover:bg-[#15803d] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-green-500/20"
                            >
                              <CheckCircleIcon className="w-4 h-4" /> Confirm Pickup
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {urgent && group.status !== 'cancelled' && group.status !== 'completed' && (
                    <div className="absolute bottom-0 inset-x-0 h-[3px] bg-red-400 group-hover:opacity-0 transition-opacity" />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Map modal */}
        {mapGroup && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div
              className={`absolute inset-0 ${isDark ? 'bg-black/60' : 'bg-black/40'}`}
              onClick={() => setMapGroup(null)}
            />
            <div className={`relative w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fade-in-up ${
              isDark ? 'bg-[#1a1a1a]' : 'bg-white'
            }`}>
              <div className="relative w-full h-[55vh] min-h-[300px]">
                <iframe
                  src={
                    mapGroup.pickupLatitude && mapGroup.pickupLongitude
                      ? `https://maps.google.com/maps?q=${mapGroup.pickupLatitude},${mapGroup.pickupLongitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`
                      : mapEmbedFromAddress(mapGroup.pickupLocation)
                  }
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
                <div className={`absolute top-0 inset-x-0 h-24 bg-gradient-to-b pointer-events-none z-[400] ${
                  isDark ? 'from-black/60 to-transparent' : 'from-white/60 to-transparent'
                }`} />
                <button
                  onClick={() => setMapGroup(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 shadow-sm border border-gray-200 text-gray-700 flex items-center justify-center hover:scale-105 transition-all z-[500]"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 flex flex-col sm:flex-row gap-6 items-center justify-between">
                <div>
                  <p className={`text-sm font-bold uppercase tracking-widest mb-1 ${isDark ? 'text-green-400' : 'text-[#16a34a]'}`}>
                    Pickup Location
                  </p>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                    {mapGroup.stockTitle}
                  </h3>
                  <div className={`flex items-center gap-2 mt-1 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <MapPinIcon className="w-4 h-4 text-[#16a34a]" />
                    {mapGroup.pickupLocation}
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <div className={`flex items-center gap-2 text-xs px-3 py-2 rounded-xl border ${
                    isDark ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    <ExclamationTriangleIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="font-semibold">Respect pickup window</span>
                  </div>
                  <button
                    onClick={() => setMapGroup(null)}
                    className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-green-500/20 transition-all"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pickup confirm modal */}
        {confirmingGroup && (
          <PickupConfirmModal
            reservation={{
              ...confirmingGroup.reservations[0],
              quantityReserved: confirmingGroup.totalQty,
            }}
            onConfirm={handleConfirmPickup}
            onClose={() => setConfirmingGroup(null)}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default MyPickups;