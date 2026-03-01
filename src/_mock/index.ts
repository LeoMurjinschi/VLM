
export interface DonationRecord {
  id: string;
  date: string;
  item: string;
  qty: string;
  partner: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface Partner {
  name: string;
  kg: number;
  percentage: number;
}

export interface ReportStats {
  title: string;
  value: string;
  unit: string;
  trend: string;
  trendLabel: string;
  color: 'blue' | 'teal' | 'cyan' | 'emerald';
}

export const MOCK_DONATION_HISTORY: DonationRecord[] = [
  {
    id: '1',
    date: 'Oct 24, 2026',
    item: 'Fresh Apples & Pears',
    qty: '50 kg',
    partner: 'Save the Children',
    status: 'Completed',
  },
  {
    id: '2',
    date: 'Oct 22, 2026',
    item: 'Bakery Pastries',
    qty: '15 kg',
    partner: 'Local Soup Kitchen',
    status: 'Completed',
  },
  {
    id: '3',
    date: 'Oct 20, 2026',
    item: 'Cooked Vegetables',
    qty: '30 kg',
    partner: 'Red Cross Center',
    status: 'Completed',
  },
  {
    id: '4',
    date: 'Oct 18, 2026',
    item: 'Dairy Assortment',
    qty: '25 kg',
    partner: 'Community Shelter',
    status: 'Completed',
  },
  {
    id: '5',
    date: 'Oct 15, 2026',
    item: 'Potato Sacks',
    qty: '100 kg',
    partner: 'Save the Children',
    status: 'Completed',
  },
];

export const MOCK_TOP_PARTNERS: Partner[] = [
  { name: 'Save the Children', kg: 450, percentage: 36 },
  { name: 'Local Soup Kitchen', kg: 320, percentage: 25 },
  { name: 'Red Cross Center', kg: 280, percentage: 22 },
  { name: 'Community Shelter', kg: 200, percentage: 17 },
];

export const MOCK_REPORT_STATS: ReportStats[] = [
  {
    title: 'Total Rescued',
    value: '1,250',
    unit: 'kg',
    trend: '+12%',
    trendLabel: 'vs last period',
    color: 'blue',
  },
  {
    title: 'CO₂ Prevented',
    value: '3,125',
    unit: 'kg',
    trend: '+15%',
    trendLabel: 'vs last period',
    color: 'teal',
  },
  {
    title: 'Water Saved',
    value: '45',
    unit: 'k Liters',
    trend: '+5%',
    trendLabel: 'vs last period',
    color: 'cyan',
  },
  {
    title: 'Meals Provided',
    value: '3,420',
    unit: 'portions',
    trend: '+8%',
    trendLabel: 'vs last period',
    color: 'emerald',
  },
];

export interface Donation {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'Available' | 'Reserved';
  pickupLocation: string;
  expirationDate: string;
  postedAt: string;
  image: string;
  quantity: number;
  unit: string;
}

export const MOCK_DONATIONS: Donation[] = [
  {
    id: '1',
    title: 'Fresh Bio Apples',
    description:
      'A box of red apples, slightly bruised but perfectly edible. Great for pies or compote. Need to be picked up today.',
    category: 'Fruits',
    status: 'Available',
    pickupLocation: 'Green Valley Market, Sector 1',
    expirationDate: '2026-03-01T18:00:00Z',
    postedAt: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quantity: 15,
    unit: 'kg',
  },
  {
    id: '2',
    title: 'Daily Bread Surplus',
    description: "Mixed artisan bread loaves from today's batch. Sourdough and whole wheat available.",
    category: 'Bakery',
    status: 'Available',
    pickupLocation: 'Artisan Bakery, Center',
    expirationDate: '2026-02-23T20:00:00Z',
    postedAt: '30 mins ago',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quantity: 20,
    unit: 'pieces',
  },
  {
    id: '3',
    title: 'Carrots & Potatoes',
    description: 'Leftover stock from local farm delivery. Needs to be cooked soon.',
    category: 'Vegetables',
    status: 'Reserved',
    pickupLocation: 'Farm Connect Warehouse',
    expirationDate: '2026-02-24T12:00:00Z',
    postedAt: '5 hours ago',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quantity: 50,
    unit: 'kg',
  },
  {
    id: '4',
    title: 'Lunch Menu Soups',
    description:
      'Vegetable cream soup portions prepared for lunch but not sold. Kept at safe temperatures.',
    category: 'Cooked Food',
    status: 'Available',
    pickupLocation: 'Bistro 44',
    expirationDate: '2026-02-22T22:00:00Z',
    postedAt: '1 hour ago',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quantity: 12,
    unit: 'plates',
  },
];

export const DONATION_CATEGORIES = ['Vegetables', 'Fruits', 'Bakery', 'Cooked Food', 'Dairy'];

export interface InventoryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  pickupLocation: string;
  expirationDate: string;
  image: string;
  addedAt: string;
  status: 'In Stock' | 'Low Stock' | 'Expired';
}

export const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: 'inv_1',
    title: 'Fresh Organic Carrots',
    description:
      'High quality organic carrots from our farm. Perfect for soups, salads, and juicing. Stored in cool conditions.',
    category: 'Vegetables',
    quantity: 45,
    unit: 'kg',
    pickupLocation: 'Farm Warehouse A',
    expirationDate: '2026-03-15T18:00:00Z',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    addedAt: '3 days ago',
    status: 'In Stock',
  },
  {
    id: 'inv_2',
    title: 'Artisan Sourdough Bread',
    description:
      'Traditional sourdough baked fresh daily. Crusty exterior with soft interior. Great for toast and sandwiches.',
    category: 'Bakery',
    quantity: 8,
    unit: 'pieces',
    pickupLocation: 'Central Bakery',
    expirationDate: '2026-02-24T22:00:00Z',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    addedAt: '1 day ago',
    status: 'Low Stock',
  },
  {
    id: 'inv_3',
    title: 'Greek Yogurt Containers',
    description:
      'Premium Greek yogurt, high protein content. Kept in refrigerated storage. Best consumed within 2 weeks.',
    category: 'Dairy',
    quantity: 24,
    unit: 'portions',
    pickupLocation: 'Cold Storage Unit B',
    expirationDate: '2026-03-08T20:00:00Z',
    image: 'https://images.unsplash.com/photo-1488459716781-6f3ee109e5e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    addedAt: '2 days ago',
    status: 'In Stock',
  },
  {
    id: 'inv_4',
    title: 'Mixed Berries',
    description:
      'Fresh mixed berries including strawberries, blueberries, and raspberries. Keep refrigerated. Very perishable.',
    category: 'Fruits',
    quantity: 12,
    unit: 'boxes',
    pickupLocation: 'Cold Storage Unit A',
    expirationDate: '2026-02-23T16:00:00Z',
    image: 'https://images.unsplash.com/photo-1590721294919-c82a88798190?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    addedAt: '5 hours ago',
    status: 'Low Stock',
  },
  {
    id: 'inv_5',
    title: 'Vegetable Stir-Fry Mix',
    description:
      'Pre-made frozen stir-fry mix with broccoli, peppers, and snap peas. Ready to cook. Store in freezer.',
    category: 'Vegetables',
    quantity: 35,
    unit: 'portions',
    pickupLocation: 'Freezer Section C',
    expirationDate: '2026-06-22T12:00:00Z',
    image: 'https://images.unsplash.com/photo-1610139901882-e2e11488d563?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    addedAt: '1 week ago',
    status: 'In Stock',
  },
  {
    id: 'inv_6',
    title: 'Whole Wheat Pasta',
    description:
      'Nutritious whole wheat pasta made from premium grain. Dry goods with long shelf life. Store in cool, dry place.',
    category: 'Cooked Food',
    quantity: 52,
    unit: 'kg',
    pickupLocation: 'Dry Storage Room',
    expirationDate: '2026-12-01T00:00:00Z',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    addedAt: '2 weeks ago',
    status: 'In Stock',
  },
];

export interface DashboardStats {
  title: string;
  value: string;
  unit: string;
  trend: string;
  trendLabel: string;
  color: 'blue' | 'emerald' | 'teal' | 'indigo';
  icon?: any;
}

export interface ChartData {
  name: string;
  donations?: number;
  value?: number;
}

export interface RecentActivityItem {
  id: number;
  action: string;
  detail: string;
  time: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export const MOCK_DASHBOARD_STATS: DashboardStats[] = [
  {
    title: 'Total Food Rescued',
    value: '1,250',
    unit: 'kg',
    trend: '+12%',
    trendLabel: 'vs last month',
    color: 'blue',
  },
  {
    title: 'Meals Provided',
    value: '3,420',
    unit: 'portions',
    trend: '+8%',
    trendLabel: 'vs last month',
    color: 'emerald',
  },
  {
    title: 'CO₂ Emissions Saved',
    value: '3,125',
    unit: 'kg',
    trend: '+15%',
    trendLabel: 'vs last month',
    color: 'teal',
  },
  {
    title: 'Value Donated',
    value: '€4,500',
    unit: '',
    trend: '+5%',
    trendLabel: 'vs last month',
    color: 'indigo',
  },
];

export const MOCK_BAR_DATA: ChartData[] = [
  { name: 'Sep', donations: 120 },
  { name: 'Oct', donations: 180 },
  { name: 'Nov', donations: 250 },
  { name: 'Dec', donations: 300 },
  { name: 'Jan', donations: 280 },
  { name: 'Feb', donations: 420 },
];

export const MOCK_PIE_DATA: ChartData[] = [
  { name: 'Vegetables', value: 400 },
  { name: 'Bakery', value: 300 },
  { name: 'Fruits', value: 200 },
  { name: 'Cooked Food', value: 150 },
  { name: 'Dairy', value: 100 },
];

export const PIE_COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export const MOCK_RECENT_ACTIVITY: RecentActivityItem[] = [
  {
    id: 1,
    action: 'Donation Reserved',
    detail: 'Save the Children reserved 10 portions of Cooked Food.',
    time: '2 hours ago',
    type: 'success',
  },
  {
    id: 2,
    action: 'New Stock Added',
    detail: 'You added 50 kg of Fresh Apples.',
    time: '5 hours ago',
    type: 'info',
  },
  {
    id: 3,
    action: 'Milestone Reached',
    detail: 'You rescued over 1,000 kg of food this month!',
    time: '1 day ago',
    type: 'warning',
  },
  {
    id: 4,
    action: 'Donation Picked Up',
    detail: 'Local Shelter picked up their 15 kg Bakery reservation.',
    time: '2 days ago',
    type: 'success',
  },
];


export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  avatarInitial: string;
}

export const MOCK_USER: User = {
  id: '1',
  name: 'Mihai Ionescu',
  email: 'mihai.ionescu@example.com',
  role: 'Business Partner',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  avatarInitial: 'M',
};
