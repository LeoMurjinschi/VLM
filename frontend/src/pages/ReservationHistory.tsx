import React, { useState, useMemo, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import PageLayout from '../components/PageLayout';
import HistoryHeader from '../components/HistoryHeader';
import HistoryFilters from '../components/HistoryFilters';
import HistoryItem from '../components/HistoryItem';
import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline';
import { reservationService } from '../api';
import { useAuth } from '../context/AuthContext';

export interface HistoryRecord {
  id: string;
  title: string;
  donor: string;
  quantity: string;
  pickupDate: string;
  status: 'Completed' | 'Cancelled' | 'Expired';
  image: string;
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1488459716781-6f3ee109e5e4?auto=format&fit=crop&q=80&w=300&h=300';

const mapStatus = (s: string): 'Completed' | 'Cancelled' | 'Expired' => {
  if (s === 'completed' || s === 'Confirmed') return 'Completed';
  if (s === 'cancelled' || s === 'Cancelled') return 'Cancelled';
  return 'Expired';
};

const ReservationHistory: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [historyData, setHistoryData] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    if (!user?.id) return;
    
    reservationService.getAll()
      .then((reservations) => {
        const userReservations = reservations.filter(r => 
            user.role === 'donor' ? r.donorId === Number(user.id) : r.userId === Number(user.id)
        );

        const mapped: HistoryRecord[] = userReservations.map(r => {
          return {
            id: String(r.id),
            title: r.donationTitle ?? `Donation #${r.donationId}`,
            donor: r.donorName ?? `Donor #${r.userId}`,
            quantity: `${r.quantityReserved} ${r.donationUnit ?? 'units'}`,
            pickupDate: new Date(r.createdDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: mapStatus(r.status),
            image: r.donationImage ?? DEFAULT_IMAGE,
          };
        });
        setHistoryData(mapped);
      })
      .catch((err) => console.error("Failed to fetch reservation history", err));
  }, [user?.id, user?.role]);
    if (!user) return;
    const userId = parseInt(user.id);
    reservationService.getByReceiver(userId)
      .then(reservations => {
        const mapped: HistoryRecord[] = reservations.map(r => ({
          id: String(r.id),
          title: r.donationTitle ?? `Donation #${r.donationId}`,
          donor: r.donorName ?? `Donor #${r.donorId}`,
          quantity: `${r.quantityReserved} ${r.donationUnit ?? 'units'}`,
          pickupDate: new Date(r.createdDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: mapStatus(r.status),
          image: r.donationImage ?? DEFAULT_IMAGE,
        }));
        setHistoryData(mapped);
      })
      .catch(() => {});
  }, [user]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All Time');

  const filteredData = useMemo(() => {
    return historyData.filter((item) => {
      // Filtru Search
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.donor.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filtru Status
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

      // (Aici s-ar adăuga logica reală pentru dateFilter dacă ai avea timestamp-uri reale)
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter, dateFilter, historyData]);

  const totalPickups = historyData.filter(i => i.status === 'Completed').length;
  const foodSavedKg = historyData.filter(i => i.status === 'Completed').length * 5;
  const favoriteDonor = historyData[0]?.donor ?? '—';

  return (
    <PageLayout>
      <div className="space-y-6 max-w-7xl mx-auto min-h-screen pb-10">
        
        {/* Zona de Sus (Titlu + Statistici) */}
        <HistoryHeader 
          totalPickups={totalPickups}
          foodSavedKg={foodSavedKg}
          favoriteDonor={favoriteDonor}
        />

        {/* Bara de Filtre */}
        <HistoryFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          dateFilter={dateFilter}
          onDateChange={setDateFilter}
        />

        {/* Lista de Istoric sau Empty State */}
        {filteredData.length > 0 ? (
          <div className="space-y-3 animate-fade-in-up">
            {filteredData.map((item) => (
              <HistoryItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className={`flex flex-col items-center justify-center py-16 rounded-2xl border-2 border-dashed transition-all ${
            theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
          }`}>
            <ArchiveBoxXMarkIcon className={`w-16 h-16 mb-4 ${theme === 'light' ? 'text-gray-300' : 'text-gray-600'}`} />
            <p className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
              No reservations yet.
            </p>
            <p className={`text-sm mt-1 text-center max-w-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              Start making reservations from available donations to build your history and help your community.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setStatusFilter('All'); setDateFilter('All Time'); }}
              className={`mt-6 px-6 py-2.5 font-bold text-sm rounded-xl transition-all active:scale-[0.98] ${
                theme === 'light' ? 'bg-[#16a34a]/10 text-[#16a34a] hover:bg-[#16a34a]/20' : 'bg-[#16a34a]/10 text-[#16a34a] border border-[#16a34a]/30 hover:bg-[#16a34a]/20'
              }`}
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>
    </PageLayout>
  );
};

export default ReservationHistory;