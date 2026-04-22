import React, { useState, useMemo } from 'react';
import { useTheme } from '../hooks/useTheme';
import PageLayout from '../components/PageLayout';
import HistoryHeader from '../components/HistoryHeader';
import HistoryFilters from '../components/HistoryFilters';
import HistoryItem from '../components/HistoryItem';
import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline';

// Tipul de date
export interface HistoryRecord {
  id: string;
  title: string;
  donor: string;
  quantity: string;
  pickupDate: string;
  status: 'Completed' | 'Cancelled' | 'Expired';
  image: string;
}

// Date Mock
const mockHistoryData: HistoryRecord[] = [
  {
    id: 'h1',
    title: 'Kvelb SRL',
    donor: 'Leonea murjunski',
    quantity: '15 kg',
    pickupDate: 'Oct 24, 2023 - 14:30',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=300&h=300',
  },
  {
    id: 'h2',
    title: 'Jewish bakery',
    donor: 'Mishanea',
    quantity: '5 kg',
    pickupDate: 'Oct 20, 2023 - 19:00',
    status: 'Cancelled',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=300&h=300',
  },
  {
    id: 'h3',
    title: 'Dairy & Milk Cartons',
    donor: 'Mega Image',
    quantity: '12 Liters',
    pickupDate: 'Oct 15, 2023 - 10:00',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=300&h=300',
  },
  {
    id: 'h4',
    title: 'Cooked Meals (Catering)',
    donor: 'La Mama Restaurant',
    quantity: '10 portions',
    pickupDate: 'Sep 28, 2023 - 21:00',
    status: 'Expired',
    image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=300&h=300',
  }
];

const ReservationHistory: React.FC = () => {
  const { theme } = useTheme();

  // State pentru Filtre
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All Time');

  // Logica de filtrare a datelor
  const filteredData = useMemo(() => {
    return mockHistoryData.filter((item) => {
      // Filtru Search
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.donor.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filtru Status
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

      // (Aici s-ar adăuga logica reală pentru dateFilter dacă ai avea timestamp-uri reale)
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter, dateFilter]);

  // Calculăm statisticile pentru Header (din datele reale/mock)
  const totalPickups = mockHistoryData.filter(i => i.status === 'Completed').length;
  const foodSavedKg = 27; // Valoare demonstrativă
  const favoriteDonor = 'Auchan Supermarket';

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
            <p className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              No history records found.
            </p>
            <p className={`text-sm mt-1 text-center ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
              Try adjusting your filters or search query.
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
