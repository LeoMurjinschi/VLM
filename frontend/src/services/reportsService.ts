import type { DonationRecord, Partner, ExportResult, ReportFilters } from '../types/reports.ts';
import { donationService } from '../api/donationService';
import { reservationService } from '../api/reservationService';

const getDateBounds = (dateRange: string): { from: Date; to: Date } => {
  const now = new Date();
  const to = new Date(now);
  let from: Date;

  if (dateRange === 'Last 7 Days') {
    from = new Date(now);
    from.setDate(now.getDate() - 7);
  } else if (dateRange === 'This Month') {
    from = new Date(now.getFullYear(), now.getMonth(), 1);
  } else if (dateRange === 'Last Month') {
    from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    to.setDate(0);
  } else {
    // Year to Date
    from = new Date(now.getFullYear(), 0, 1);
  }

  return { from, to };
};

const mapDonationStatus = (status: string): 'Completed' | 'Pending' | 'Failed' => {
  const s = status?.toLowerCase() ?? '';
  if (s === 'completed' || s === 'picked up') return 'Completed';
  if (s === 'expired' || s === 'cancelled' || s === 'rejected') return 'Failed';
  return 'Pending';
};

export const fetchDonationHistory = async (
  donorId: number,
  filters: ReportFilters,
  page: number = 1,
  pageSize: number = 10
): Promise<DonationRecord[]> => {
  const donations = await donationService.getDonationsByDonorId(donorId);
  const { from, to } = getDateBounds(filters.dateRange);

  const filtered = donations.filter(d => {
    const date = new Date(d.createdDate);
    return date >= from && date <= to;
  });

  const records: DonationRecord[] = filtered.map(d => ({
    id: String(d.id),
    date: new Date(d.createdDate).toLocaleDateString('en-GB'),
    item: d.title,
    qty: `${d.quantity} ${d.unit}`,
    partner: '—',
    status: mapDonationStatus(d.status),
  }));

  const startIndex = (page - 1) * pageSize;
  return records.slice(startIndex, startIndex + pageSize);
};

export const fetchTopPartners = async (
  donorId: number,
  filters: ReportFilters
): Promise<Partner[]> => {
  const reservations = await reservationService.getByDonor(donorId);
  const { from, to } = getDateBounds(filters.dateRange);

  const filtered = reservations.filter(r => {
    const date = new Date(r.createdDate);
    return date >= from && date <= to;
  });

  const totals: Record<string, number> = {};
  for (const r of filtered) {
    const name = r.receiverName || 'Unknown';
    totals[name] = (totals[name] || 0) + r.quantityReserved;
  }

  const grandTotal = Object.values(totals).reduce((a, b) => a + b, 0) || 1;

  return Object.entries(totals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, kg]) => ({
      name,
      kg,
      percentage: Math.round((kg / grandTotal) * 100),
    }));
};

export const exportDonationHistoryAsCSV = async (
  filters: ReportFilters,
  data: DonationRecord[]
): Promise<ExportResult> => {
  const headers = 'Date,Item Donated,Quantity,Status\n';
  const rows = data
    .map(row => `"${row.date}","${row.item}","${row.qty}","${row.status}"`)
    .join('\n');

  const csvContent = headers + rows;
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `FoodShare_Report_${filters.dateRange.replace(/\s+/g, '_')}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return { success: true, message: 'CSV exported successfully' };
};

export const exportDonationHistoryAsPDF = async (
  filters: ReportFilters,
  data: DonationRecord[]
): Promise<ExportResult> => {
  const rows = data
    .map(
      row => `
        <tr>
          <td>${row.date}</td>
          <td>${row.item}</td>
          <td>${row.qty}</td>
          <td><span class="badge ${row.status}">${row.status}</span></td>
        </tr>`
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>FoodShare Impact Report — ${filters.dateRange}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 24px; color: #111; }
        h1 { color: #16a34a; font-size: 22px; margin-bottom: 4px; }
        p { color: #555; font-size: 13px; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; font-size: 13px; }
        th { background: #16a34a; color: white; padding: 10px 12px; text-align: left; }
        td { padding: 9px 12px; border-bottom: 1px solid #e5e7eb; }
        tr:last-child td { border-bottom: none; }
        tr:nth-child(even) td { background: #f9fafb; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
        .Completed { background: #d1fae5; color: #065f46; }
        .Pending { background: #fef3c7; color: #92400e; }
        .Failed { background: #fee2e2; color: #991b1b; }
      </style>
    </head>
    <body>
      <h1>FoodShare Impact & CSR Report</h1>
      <p>Period: ${filters.dateRange} &nbsp;|&nbsp; Generated: ${new Date().toLocaleDateString('en-GB')}</p>
      <table>
        <thead>
          <tr><th>Date</th><th>Item Donated</th><th>Quantity</th><th>Status</th></tr>
        </thead>
        <tbody>${rows || '<tr><td colspan="4" style="text-align:center;color:#999;">No records for this period.</td></tr>'}</tbody>
      </table>
    </body>
    </html>`;

  const win = window.open('', '_blank');
  if (!win) return { success: false, message: 'Popup blocked. Please allow popups and try again.' };
  win.document.write(html);
  win.document.close();
  win.focus();
  win.print();

  return { success: true, message: 'PDF exported successfully' };
};

export const generateImpactSummary = async (
  _filters: ReportFilters,
  history: DonationRecord[]
): Promise<{ totalKg: number; totalDonations: number; topPartner: string }> => {
  const totalDonations = history.length;
  const totalKg = history.reduce((acc, record) => {
    const num = parseFloat(record.qty.replace(/[^\d.]/g, ''));
    return acc + (isNaN(num) ? 0 : num);
  }, 0);

  return { totalKg: Math.round(totalKg), totalDonations, topPartner: 'Various' };
};
