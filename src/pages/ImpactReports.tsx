import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import StatCard from '../components/UI/StatCard';
import Select from '../components/UI/Select'; // <-- 1. IMPORTĂM COMPONENTA CUSTOM
import { 
  ArrowDownTrayIcon, 
  DocumentArrowDownIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { REPORT_STATS, TOP_PARTNERS, DONATION_HISTORY } from '../_mock/reports';

// <-- 2. CREĂM ARRAY-UL DE OPȚIUNI PENTRU COMPONENTA SELECT
const DATE_RANGE_OPTIONS = [
  { value: 'Last 7 Days', label: 'Last 7 Days' },
  { value: 'This Month', label: 'This Month' },
  { value: 'Last Month', label: 'Last Month' },
  { value: 'Year to Date', label: 'Year to Date (YTD)' },
];

const ImpactReports: React.FC = () => {
  const { theme } = useTheme();
  const [dateRange, setDateRange] = useState('This Month');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = (format: string) => {
    setIsExporting(true);

    setTimeout(() => {
      try {
        if (format === 'CSV') {
          const headers = "Date,Item Donated,Quantity,Beneficiary,Status\n";
          const rows = DONATION_HISTORY.map(row => 
            `${row.date},${row.item},${row.qty},${row.partner},${row.status}`
          ).join('\n');
          
          const csvContent = headers + rows;
          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `FoodShare_Report_${dateRange.replace(/\s+/g, '_')}.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }

        toast.success(`Report exported as ${format} successfully! 📄`);
      } catch (error) {
        toast.error(`Failed to export ${format} report.`);
      } finally {
        setIsExporting(false);
      }
    }, 1000);
  };

  return (
    <div className={`space-y-8 max-w-7xl mx-auto min-h-screen relative pb-10 ${
      theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
    }`}>
      
      {/* HEADER & CONTROALE RAPORT */}
      <div className={`pb-6 border-b relative z-40 ${theme === 'light' ? 'border-gray-100' : 'border-gray-700'}`}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
              Impact & CSR Reports
            </h1>
            <p className={`text-base font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              Generate official sustainability documents and track historical data.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            
            {/* 3. FOLOSIM SELECT-UL CUSTOM AICI */}
            <div className="relative z-50 w-full sm:w-56">
              <Select 
                options={DATE_RANGE_OPTIONS}
                value={dateRange}
                onChange={(value) => setDateRange(value)}
              />
            </div>

            {/* Buton Export PDF */}
            <button 
              onClick={() => handleExport('PDF')}
              disabled={isExporting}
              className={`flex items-center justify-center gap-2 px-5 py-3 h-[46px] text-white font-bold rounded-xl shadow-sm transition-all active:scale-[0.98] w-full sm:w-auto ${
                isExporting ? 'bg-blue-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <DocumentArrowDownIcon className="w-5 h-5" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. KPI GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 animate-fade-in-up relative z-10">
        {REPORT_STATS.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      {/* 2. CONȚINUT PRINCIPAL: TABEL + TOP PARTENERI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up relative z-0" style={{ animationDelay: '100ms' }}>
        
        {/* SECȚIUNEA STÂNGĂ: Tabelul Istoric */}
        <div className={`lg:col-span-2 p-6 rounded-3xl border shadow-sm ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700'}`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-xl font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
              Donation History
            </h3>
            <button onClick={() => handleExport('CSV')} className={`text-sm font-bold flex items-center gap-1 transition-colors ${theme === 'light' ? 'text-blue-600 hover:text-blue-700' : 'text-blue-400 hover:text-blue-300'}`}>
              <ArrowDownTrayIcon className="w-4 h-4" /> Download CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`border-b text-xs uppercase tracking-wider ${theme === 'light' ? 'border-gray-100 text-gray-400' : 'border-gray-700 text-gray-500'}`}>
                  <th className="pb-3 font-bold">Date</th>
                  <th className="pb-3 font-bold">Item Donated</th>
                  <th className="pb-3 font-bold">Qty</th>
                  <th className="pb-3 font-bold">Beneficiary</th>
                  <th className="pb-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                {DONATION_HISTORY.map((row) => (
                  <tr key={row.id} className={`border-b last:border-0 transition-colors ${theme === 'light' ? 'border-gray-50 hover:bg-gray-50/50' : 'border-gray-700/50 hover:bg-gray-800/50'}`}>
                    <td className="py-4 font-medium">{row.date}</td>
                    <td className="py-4 font-bold">{row.item}</td>
                    <td className="py-4 font-extrabold text-blue-500">{row.qty}</td>
                    <td className="py-4">{row.partner}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${theme === 'light' ? 'bg-emerald-50 text-emerald-600' : 'bg-emerald-900/30 text-emerald-400'}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECȚIUNEA DREAPTĂ: Top Parteneri */}
        <div className={`p-6 rounded-3xl border shadow-sm ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700'}`}>
          <h3 className={`text-xl font-extrabold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
            Top Partners
          </h3>
          <p className={`text-sm font-medium mb-6 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            Organizations that received the most food.
          </p>

          <div className="space-y-5">
            {TOP_PARTNERS.map((partner, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-2">
                    <BuildingOfficeIcon className={`w-4 h-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm font-bold ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                      {partner.name}
                    </span>
                  </div>
                  <span className={`text-sm font-extrabold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>
                    {partner.kg} kg
                  </span>
                </div>
                <div className={`h-2 w-full rounded-full overflow-hidden ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'}`}>
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${partner.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-6 pt-5 border-t text-xs font-medium text-center ${theme === 'light' ? 'border-gray-100 text-gray-500' : 'border-gray-700 text-gray-400'}`}>
            Based on {dateRange} data.
          </div>
        </div>

      </div>

    </div>
  );
};

export default ImpactReports;