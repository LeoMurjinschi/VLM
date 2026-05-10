export interface AppNotification {
  id: number;
  title: string;
  desc: string;
  time: string;
  date: string;
  unread: boolean;
  type: string;
  link: string;
}

const BASE_USER_NOTIFICATIONS: Omit<AppNotification, 'link'>[] = [
  { id: 1, title: 'Urgent: Hot Meals Available', desc: 'Restaurant Casa has 20 hot meals ready for pickup now. They need to be picked up in the next hour.', time: '5 min ago', date: 'Today', unread: true, type: 'urgent' },
  { id: 2, title: 'New Device Login', desc: 'We noticed a new login from Google Chrome on Windows (Bucharest). If this wasn\'t you, change your password immediately.', time: '1 hour ago', date: 'Today', unread: true, type: 'security' },
  { id: 3, title: 'Pickup Completed', desc: 'Successfully logged 15kg of bakery items from Panaderia.', time: '2 hours ago', date: 'Today', unread: true, type: 'success' },
  { id: 4, title: 'Team Member Added', desc: 'Maria P. has accepted your invitation and joined your authorized volunteer fleet.', time: '5 hours ago', date: 'Today', unread: false, type: 'team' },
  { id: 5, title: 'Donation Canceled', desc: 'A donor canceled a scheduled pickup for 10 portions of soup.', time: '1 day ago', date: 'Yesterday', unread: false, type: 'warning' },
  { id: 6, title: 'Password Updated', desc: 'Your account password was successfully changed from the Settings page.', time: '2 days ago', date: 'Oct 25', unread: false, type: 'system' },
  { id: 7, title: 'Weekly Summary', desc: 'You rescued 120kg of food this week. Great job, FoodHero!', time: '3 days ago', date: 'Oct 24', unread: false, type: 'info' },
  { id: 8, title: 'System Maintenance', desc: 'The app will be offline for 30 minutes tonight at 2 AM for server upgrades.', time: '1 week ago', date: 'Oct 18', unread: false, type: 'system' },
];

const BASE_ADMIN_NOTIFICATIONS: Omit<AppNotification, 'link'>[] = [
  { id: 101, title: 'New Sign-Up Request', desc: 'Mishanea SRL submitted an NGO application.', time: '5 min ago', date: 'Today', unread: true, type: 'warning' },
  { id: 102, title: 'Donation Flagged', desc: 'A donation from Andrei M. was flagged by users. Immediate review required.', time: '1 hour ago', date: 'Today', unread: true, type: 'urgent' },
  { id: 103, title: 'Review Reported', desc: 'A recent review violates community standards.', time: '2 hours ago', date: 'Today', unread: false, type: 'security' },
  { id: 104, title: 'System Maintenance', desc: 'The database backup completed successfully.', time: '1 day ago', date: 'Yesterday', unread: false, type: 'system' }
];

export const getMockNotifications = (role?: string | null): AppNotification[] => {
  const isAdmin = role === 'admin';
  const basePath = isAdmin ? '/admin' : (role === 'donor' ? '/donor' : '/receiver');
  
  const source = isAdmin ? BASE_ADMIN_NOTIFICATIONS : BASE_USER_NOTIFICATIONS;
  
  return source.map(item => {
    let link = `${basePath}/dashboard`;
    if (isAdmin) {
      if (item.id === 101) link = '/admin/signups';
      if (item.id === 102) link = '/admin/donations';
      if (item.id === 103) link = '/admin/reviews';
      if (item.id === 104) link = '/admin/settings';
    } else {
      if (item.id === 1 || item.id === 5) link = `${basePath}/dashboard`;
      if (item.id === 2 || item.id === 6 || item.id === 4) link = `${basePath}/settings`;
      if (item.id === 3) link = `${basePath}/history`;
      if (item.id === 7) link = `${basePath}/reports`;
      if (item.id === 8) link = `${basePath}`;
    }
    return { ...item, link };
  });
};
