export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface Alert {
  id: string;
  type: AlertSeverity;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  donor?: string;
  address?: string;
  actionText?: string;
}

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a1',
    type: 'critical',
    title: 'Flash Donation Available NOW! ⚡',
    message: 'We have an urgent surplus of hot meals that need to be rescued immediately before they are discarded.',
    timestamp: '10 mins ago',
    isRead: false,
    donor: 'Kvelb SRL',
    address: 'Strada Episcopiei 1, Bucuresti',
    actionText: 'Reserve 50 Portions',
  },
  {
    id: 'a2',
    type: 'warning',
    title: 'Pickup Window Closing Soon',
    message: 'Your scheduled pickup window closes in exactly 45 minutes. Please ensure your driver is on the way.',
    timestamp: '1 hour ago',
    isRead: false,
    donor: 'Auchan Supermarket',
    address: 'Bulevardul Moscova 17, Chisinau',
    actionText: 'Contact Donor',
  },
  {
    id: 'a3',
    type: 'info',
    title: 'Donation Quantity Updated',
    message: 'The donor has updated the quantity for your upcoming pickup from 15kg to 12kg due to sorting adjustments at the warehouse.',
    timestamp: '2 hours ago',
    isRead: true,
    donor: 'Kaufland',
  }
];