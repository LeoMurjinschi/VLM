import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTheme } from '../hooks/useTheme';
import Select from '../components/ui/Select';
import { 
  ArrowDownTrayIcon, 
  DocumentArrowDownIcon,
  BuildingOfficeIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import {
  fetchDonationHistory,
  fetchTopPartners,
  exportDonationHistoryAsCSV,
  exportDonationHistoryAsPDF,
  generateImpactSummary,
} from '../services/reportsService';
import type { DonationRecord, Partner, ReportFilters } from '../types/reports';
import { SkeletonTableLoader, EmptyState, ErrorState, SpinnerLoader } from '../components/ui/StateIndicators';

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

  const [donationHistory, setDonationHistory] = useState<DonationRecord[]>([]);
  const [donationLoading, setDonationLoading] = useState(true);
  const [donationError, setDonationError] = useState<string | null>(null);

  const [topPartners, setTopPartners] = useState<Partner[]>([]);
  const [partnersLoading, setPartnersLoading] = useState(true);
  const [partnersError, setPartnersError] = useState<string | null>(null);

  const [impactSummary, setImpactSummary] = useState<{
    totalKg: number;
    totalDonations: number;
    topPartner: string;
  } | null>(null);


  const currentFilters = useMemo<ReportFilters>(() => ({
    dateRange,
  }), [dateRange]);


  useEffect(() => {
    const loadDonationHistory = async () => {
      setDonationLoading(true);
      setDonationError(null);
      
      try {
        const data = await fetchDonationHistory(currentFilters, 1, 10);
        setDonationHistory(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load donation history';
        setDonationError(message);
        toast.error(message);
      } finally {
        setDonationLoading(false);
      }
    };

    loadDonationHistory();
  }, [currentFilters]);


  useEffect(() => {
    const loadTopPartners = async () => {
      setPartnersLoading(true);
      setPartnersError(null);
      
      try {
        const data = await fetchTopPartners(currentFilters);
        setTopPartners(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load top partners';
        setPartnersError(message);
        toast.error(message);
      } finally {
        setPartnersLoading(false);
      }
    };

    loadTopPartners();
  }, [currentFilters]);


  useEffect(() => {
    const generateSummary = async () => {
      if (donationHistory.length === 0) {
        setImpactSummary(null);
        return;
      }
      
      try {
        const summary = await generateImpactSummary(currentFilters, donationHistory);
        setImpactSummary(summary);
      } catch (err) {
        console.error('Failed to generate impact summary:', err);
      }
    };

    generateSummary();
  }, [donationHistory, currentFilters]);

  const handleExport = useCallback(async (format: string) => {
    setIsExporting(true);

    try {
      if (format === 'CSV') {
        await exportDonationHistoryAsCSV(currentFilters, donationHistory);
        toast.success(`Report exported as ${format} successfully! 📄`);
      } else if (format === 'PDF') {
        await exportDonationHistoryAsPDF(currentFilters);
        toast.success(`Report exported as ${format} successfully! 📄`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : `Failed to export ${format} report.`;
      toast.error(message);
    } finally {
      setIsExporting(false);
    }
  }, [currentFilters, donationHistory]);

  const handleDateRangeChange = useCallback((newRange: string) => {
    setDateRange(newRange);
  }, []);

  const handleRetryDonationHistory = useCallback(() => {
    setDonationError(null);
    setDonationLoading(true);
  }, []);

  const handleRetryPartners = useCallback(() => {
    setPartnersError(null);
    setPartnersLoading(true);
  }, []);

  return (
    <div className={`space-y-6 max-w-7xl mx-auto min-h-screen relative pb-10 ${
      theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
    }`}>
      

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
            <div className="relative z-50 w-full sm:w-56">
              <Select 
                options={DATE_RANGE_OPTIONS}
                value={dateRange}
                onChange={handleDateRangeChange}
              />
            </div>

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

      {donationLoading ? (
        <SpinnerLoader />
      ) : donationError ? (
        <ErrorState 
          message={donationError} 
          onRetry={handleRetryDonationHistory}
        />
      ) : impactSummary ? (
        <div className={`p-4 rounded-2xl border flex items-start gap-3 animate-fade-in-up relative z-10 ${
          theme === 'light' ? 'bg-blue-50/50 border-blue-100 text-blue-800' : 'bg-blue-900/10 border-blue-900/50 text-blue-300'
        }`}>
          <InformationCircleIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div className="text-sm leading-relaxed">
            <span className="font-bold">Report Summary for {dateRange}:</span> You have successfully completed <span className="font-extrabold underline decoration-blue-400/30 decoration-2 underline-offset-2">{impactSummary.totalDonations} donations</span> totaling <span className="font-extrabold underline decoration-blue-400/30 decoration-2 underline-offset-2">{impactSummary.totalKg} kg</span> of rescued food. Your top partner in this period was <span className="font-bold">{impactSummary.topPartner}</span>.
          </div>
        </div>
      ) : null}


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up relative z-0" style={{ animationDelay: '100ms' }}>

        {donationLoading ? (
          <div className="lg:col-span-2">
            <SkeletonTableLoader rows={5} showHeader={true} />
          </div>
        ) : donationError ? (
          <div className="lg:col-span-2">
            <ErrorState 
              message={donationError}
              onRetry={handleRetryDonationHistory}
            />
          </div>
        ) : donationHistory.length === 0 ? (
          <div className="lg:col-span-2">
            <EmptyState 
              title="No donations found"
              description={`No donation records found for ${dateRange}. Try selecting a different date range.`}
              action={{
                label: 'Retry',
                onClick: handleRetryDonationHistory,
              }}
            />
          </div>
        ) : (
          <div className={`lg:col-span-2 p-6 rounded-3xl border shadow-sm ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-900 border-gray-700'}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-xl font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
                Donation History
              </h3>
              <button 
                onClick={() => handleExport('CSV')} 
                className={`text-sm font-bold flex items-center gap-1 transition-colors ${theme === 'light' ? 'text-blue-600 hover:text-blue-700' : 'text-blue-400 hover:text-blue-300'}`}
              >
                <ArrowDownTrayIcon className="w-4 h-4" /> Download CSV
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`border-b text-xs uppercase tracking-wider ${theme === 'light' ? 'border-gray-100 text-gray-400' : 'border-gray-700 text-gray-500'}`}>
                    <th className="pb-3 font-bold whitespace-nowrap">Date</th>
                    <th className="pb-3 font-bold min-w-[150px]">Item Donated</th>
                    <th className="pb-3 font-bold">Qty</th>
                    <th className="pb-3 font-bold min-w-[150px]">Beneficiary</th>
                    <th className="pb-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  {donationHistory.map((row) => (
                    <tr key={row.id} className={`border-b last:border-0 transition-colors ${theme === 'light' ? 'border-gray-50 hover:bg-gray-50/50' : 'border-gray-700/50 hover:bg-gray-800/50'}`}>
                      <td className="py-4 font-medium whitespace-nowrap">{row.date}</td>
                      <td className="py-4 font-bold">{row.item}</td>
                      <td className="py-4 font-extrabold text-blue-500">{row.qty}</td>
                      <td className="py-4">{row.partner}</td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide whitespace-nowrap ${theme === 'light' ? 'bg-emerald-50 text-emerald-600' : 'bg-emerald-900/30 text-emerald-400'}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {partnersLoading ? (
          <div className="p-6 rounded-3xl border shadow-sm" style={{ minHeight: '400px' }}>
            <SpinnerLoader />
          </div>
        ) : partnersError ? (
          <div>
            <ErrorState 
              message={partnersError}
              onRetry={handleRetryPartners}
            />
          </div>
        ) : topPartners.length === 0 ? (
          <div>
            <EmptyState 
              title="No partner data"
              description={`No partner information available for ${dateRange}.`}
            />
          </div>
        ) : (
          <div className={`p-6 rounded-3xl border shadow-sm ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-900 border-gray-700'}`}>
            <h3 className={`text-xl font-extrabold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
              Top Partners
            </h3>
            <p className={`text-sm font-medium mb-6 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              Organizations that received the most food.
            </p>

            <div className="space-y-5">
              {topPartners.map((partner, idx) => (
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
              Based on <span className="font-bold text-blue-500">{dateRange}</span> data.
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default ImpactReports;