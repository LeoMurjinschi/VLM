import React, { useEffect, useState } from 'react';
import { useTheme } from './../hooks/useTheme';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MOCK_BAR_DATA, MOCK_PIE_DATA, PIE_COLORS } from '../_mock';
import { dashboardApiService } from '../api/dashboardApiService';
import type { ChartPointDto } from '../api/dashboardApiService';

const ImpactCharts: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();

  const [barData, setBarData] = useState<ChartPointDto[]>([]);
  const [pieData, setPieData] = useState<ChartPointDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    const donorId = parseInt(user.id, 10);
    setLoading(true);
    Promise.all([
      dashboardApiService.getBarChart(donorId),
      dashboardApiService.getPieChart(donorId),
    ])
      .then(([bar, pie]) => {
        setBarData(bar.length > 0 ? bar : MOCK_BAR_DATA.map(d => ({ name: d.name, value: d.donations ?? 0 })));
        setPieData(pie.length > 0 ? pie : MOCK_PIE_DATA.map(d => ({ name: d.name, value: d.value ?? 0 })));
      })
      .catch(() => {
        setBarData(MOCK_BAR_DATA.map(d => ({ name: d.name, value: d.donations ?? 0 })));
        setPieData(MOCK_PIE_DATA.map(d => ({ name: d.name, value: d.value ?? 0 })));
      })
      .finally(() => setLoading(false));
  }, [user?.id]);

  const chartTextColor = theme === 'light' ? '#6b7280' : '#9ca3af';
  const chartGridColor = theme === 'light' ? '#f3f4f6' : '#2e2e2e';
  const tooltipBg = theme === 'light' ? '#ffffff' : '#1a1a1a';
  const tooltipBorder = theme === 'light' ? '#e5e7eb' : '#2e2e2e';

  const barChartData = barData.map(d => ({ name: d.name, donations: d.value }));
  const pieChartData = pieData;
  const categoryCount = pieData.length || MOCK_PIE_DATA.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>

      <div className={`lg:col-span-2 p-6 md:p-8 rounded-3xl border shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${theme === 'light' ? 'bg-white border-gray-200/60' : 'bg-[#1a1a1a] border-[#2e2e2e]'}`}>
        <div className="mb-6">
          <h3 className={`text-xl font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Donation Volume Over Time</h3>
          <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Monthly breakdown of rescued food quantity.</p>
        </div>
        <div className="h-72 w-full">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-6 h-6 border-2 border-[#16a34a] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartGridColor} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: chartTextColor, fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: chartTextColor, fontSize: 12, fontWeight: 600 }} />
                <Tooltip cursor={{ fill: theme === 'light' ? '#f3f4f6' : '#374151' }} contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px', fontWeight: 'bold', color: theme === 'light' ? '#1f2937' : '#f9fafb' }} />
                <Bar dataKey="donations" fill="#16a34a" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className={`p-6 md:p-8 rounded-3xl border shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${theme === 'light' ? 'bg-white border-gray-200/60' : 'bg-[#1a1a1a] border-[#2e2e2e]'}`}>
        <div className="mb-2">
          <h3 className={`text-xl font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Donation by Category</h3>
          <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Distribution of your rescued items.</p>
        </div>
        <div className="h-64 w-full relative">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-6 h-6 border-2 border-[#16a34a] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                    {pieChartData.map((_, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px', fontWeight: 'bold', color: theme === 'light' ? '#1f2937' : '#f9fafb' }} itemStyle={{ color: theme === 'light' ? '#1f2937' : '#f9fafb' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className={`text-2xl font-black ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>{categoryCount}</span>
                <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>Categories</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImpactCharts;
