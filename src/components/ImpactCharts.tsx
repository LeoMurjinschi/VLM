import React from 'react';
import { useTheme } from './../hooks/useTheme';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BAR_DATA, PIE_DATA, PIE_COLORS } from './../_mock/dashboard';

const ImpactCharts: React.FC = () => {
  const { theme } = useTheme();

  const chartTextColor = theme === 'light' ? '#6b7280' : '#9ca3af';
  const chartGridColor = theme === 'light' ? '#f3f4f6' : '#374151';
  const tooltipBg = theme === 'light' ? '#ffffff' : '#1f2937';
  const tooltipBorder = theme === 'light' ? '#e5e7eb' : '#374151';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>

      <div className={`lg:col-span-2 p-6 md:p-8 rounded-3xl border shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700'}`}>
        <div className="mb-6">
          <h3 className={`text-xl font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Donation Volume Over Time</h3>
          <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Monthly breakdown of rescued food in kg.</p>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={BAR_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartGridColor} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: chartTextColor, fontSize: 12, fontWeight: 600 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: chartTextColor, fontSize: 12, fontWeight: 600 }} />
              <Tooltip cursor={{ fill: theme === 'light' ? '#f3f4f6' : '#374151' }} contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px', fontWeight: 'bold', color: theme === 'light' ? '#1f2937' : '#f9fafb' }} />
              <Bar dataKey="donations" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`p-6 md:p-8 rounded-3xl border shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700'}`}>
        <div className="mb-2">
          <h3 className={`text-xl font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Donation by Category</h3>
          <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Distribution of your rescued items.</p>
        </div>
        <div className="h-64 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                {PIE_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px', fontWeight: 'bold', color: theme === 'light' ? '#1f2937' : '#f9fafb' }} itemStyle={{ color: theme === 'light' ? '#1f2937' : '#f9fafb' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className={`text-2xl font-black ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>5</span>
            <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>Categories</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactCharts;