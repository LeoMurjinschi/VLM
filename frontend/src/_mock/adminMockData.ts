
export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  role: 'donor' | 'receiver';
  status: 'active' | 'inactive';
  avatar: string;
  joinDate: string;
  violations: number;
  deletedDonations: number;
  deletedReviews: number;
  lastActive: string;
}

export interface SignupRequest {
  id: string;
  organizationName: string;
  email: string;
  role: 'donor' | 'receiver';
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  contactPerson: string;
  phone: string;
  address: string;
  description: string;
  documents: string[];
}

export interface AdminReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  targetName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'approved' | 'flagged' | 'deleted';
  userViolations: number;
}

export interface AdminDonationItem {
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
  donorName: string;
  donorId: string;
  reported: boolean;
  flagReason?: string;
}

export interface AdminActivityLog {
  id: string;
  action: string;
  detail: string;
  timestamp: string;
  type: 'approve' | 'reject' | 'deactivate' | 'reactivate' | 'delete' | 'flag';
}

export interface AdminDashboardStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  totalDonors: number;
  totalReceivers: number;
  activeDonations: number;
  pendingSignups: number;
  flaggedContent: number;
  totalViolations: number;
  totalReviews: number;
  deletedReviews: number;
}

export const MOCK_ADMIN_STATS: AdminDashboardStats = {
  totalUsers: 6,
  activeUsers: 5,
  inactiveUsers: 1,
  totalDonors: 3,
  totalReceivers: 3,
  activeDonations: 4,
  pendingSignups: 3,
  flaggedContent: 2,
  totalViolations: 7,
  totalReviews: 8,
  deletedReviews: 2,
};

export const MOCK_ADMIN_ACCOUNTS: AdminAccount[] = [
  {
    id: 'donor1',
    name: 'Donor Company 1',
    email: 'donor1@test.com',
    role: 'donor',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=donor1',
    joinDate: '2025-09-15',
    violations: 0,
    deletedDonations: 0,
    deletedReviews: 0,
    lastActive: '2 hours ago',
  },
  {
    id: 'donor2',
    name: 'Donor Bakery 2',
    email: 'leomurjinschi@gmail.com',
    role: 'donor',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=donor2',
    joinDate: '2025-10-02',
    violations: 1,
    deletedDonations: 1,
    deletedReviews: 0,
    lastActive: '5 hours ago',
  },
  {
    id: 'donor3',
    name: 'Donor Supermarket 3',
    email: 'donor3@test.com',
    role: 'donor',
    status: 'active',
    avatar: 'https://i.pinimg.com/736x/fa/8e/28/fa8e28964c40bb0d9b7e8ccf6a07a4b6.jpg',
    joinDate: '2025-11-20',
    violations: 3,
    deletedDonations: 2,
    deletedReviews: 1,
    lastActive: '1 day ago',
  },
  {
    id: 'receiver1',
    name: 'Receiver Charity 1',
    email: 'rec1@test.com',
    role: 'receiver',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=receiver1',
    joinDate: '2025-08-10',
    violations: 0,
    deletedDonations: 0,
    deletedReviews: 0,
    lastActive: '30 mins ago',
  },
  {
    id: 'receiver2',
    name: 'Receiver Shelter 2',
    email: 'rec2@test.com',
    role: 'receiver',
    status: 'inactive',
    avatar: 'https://i.pravatar.cc/150?u=receiver2',
    joinDate: '2025-07-05',
    violations: 2,
    deletedDonations: 0,
    deletedReviews: 2,
    lastActive: '2 weeks ago',
  },
  {
    id: 'receiver3',
    name: 'Vasilii',
    email: 'rec3@test.com',
    role: 'receiver',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=receiver3',
    joinDate: '2026-01-12',
    violations: 1,
    deletedDonations: 0,
    deletedReviews: 1,
    lastActive: '3 hours ago',
  },
];

export const MOCK_SIGNUP_REQUESTS: SignupRequest[] = [
  {
    id: 'signup1',
    organizationName: 'Green Harvest NGO',
    email: 'contact@greenharvest.org',
    role: 'receiver',
    submittedDate: '2026-04-18',
    status: 'pending',
    contactPerson: 'Maria Popescu',
    phone: '+40 721 234 567',
    address: 'Str. Libertății 45, București',
    description: 'Non-profit organization focused on distributing food to homeless shelters across Bucharest. Operating since 2019 with over 200 volunteers.',
    documents: ['registration_cert.pdf', 'ngo_license.pdf'],
  },
  {
    id: 'signup2',
    organizationName: 'FreshMart Supermarket',
    email: 'csr@freshmart.ro',
    role: 'donor',
    submittedDate: '2026-04-19',
    status: 'pending',
    contactPerson: 'Ion Vasilescu',
    phone: '+40 731 456 789',
    address: 'Bd. Unirii 120, Cluj-Napoca',
    description: 'National supermarket chain wanting to donate surplus fresh produce and bakery items from 15 locations.',
    documents: ['company_registration.pdf', 'food_safety_cert.pdf', 'tax_clearance.pdf'],
  },
  {
    id: 'signup3',
    organizationName: 'Hope Kitchen Foundation',
    email: 'info@hopekitchen.md',
    role: 'receiver',
    submittedDate: '2026-04-20',
    status: 'pending',
    contactPerson: 'Elena Rusu',
    phone: '+373 69 123 456',
    address: 'Str. Columna 2, Chișinău',
    description: 'Community kitchen feeding 150+ people daily. Seeking partnership for regular food supply from local donors.',
    documents: ['org_certificate.pdf'],
  },
  {
    id: 'signup4',
    organizationName: 'BioFarm Organic',
    email: 'donations@biofarm.ro',
    role: 'donor',
    submittedDate: '2026-04-10',
    status: 'approved',
    contactPerson: 'Andrei Munteanu',
    phone: '+40 745 678 901',
    address: 'Sat. Verdea, Ilfov',
    description: 'Organic farm producing vegetables and fruits. Regularly has surplus that we want to share with communities.',
    documents: ['farm_license.pdf', 'organic_cert.pdf'],
  },
  {
    id: 'signup5',
    organizationName: 'QuickBite Restaurant',
    email: 'manager@quickbite.ro',
    role: 'donor',
    submittedDate: '2026-04-08',
    status: 'rejected',
    contactPerson: 'Cristian Barbu',
    phone: '+40 756 789 012',
    address: 'Str. Victoriei 88, Timișoara',
    description: 'Fast food restaurant chain. Application rejected due to incomplete food safety documentation.',
    documents: ['business_registration.pdf'],
  },
];

export const MOCK_ADMIN_REVIEWS: AdminReview[] = [
  {
    id: 'rev1',
    userId: 'receiver1',
    userName: 'Receiver Charity 1',
    userAvatar: 'https://i.pravatar.cc/150?u=receiver1',
    targetName: 'Donor Company 1',
    rating: 5,
    comment: 'Excellent quality produce! Everything was fresh and well-packaged. The staff was incredibly helpful.',
    date: '2026-04-15',
    status: 'approved',
    userViolations: 0,
  },
  {
    id: 'rev2',
    userId: 'receiver3',
    userName: 'Vasilii',
    userAvatar: 'https://i.pravatar.cc/150?u=receiver3',
    targetName: 'Donor Bakery 2',
    rating: 4,
    comment: 'Good bakery items but had to wait 20 minutes past the pickup window. Otherwise great quality.',
    date: '2026-04-14',
    status: 'approved',
    userViolations: 1,
  },
  {
    id: 'rev3',
    userId: 'receiver2',
    userName: 'Receiver Shelter 2',
    userAvatar: 'https://i.pravatar.cc/150?u=receiver2',
    targetName: 'Donor Supermarket 3',
    rating: 1,
    comment: 'Terrible experience! The food was expired and smelled bad. Do not recommend at all!!! SCAM!!!',
    date: '2026-04-12',
    status: 'flagged',
    userViolations: 2,
  },
  {
    id: 'rev4',
    userId: 'receiver1',
    userName: 'Receiver Charity 1',
    userAvatar: 'https://i.pravatar.cc/150?u=receiver1',
    targetName: 'Donor Bakery 2',
    rating: 5,
    comment: 'Wonderful donation! Fresh bread and pastries that our community absolutely loved. Thank you!',
    date: '2026-04-10',
    status: 'approved',
    userViolations: 0,
  },
  {
    id: 'rev5',
    userId: 'receiver2',
    userName: 'Receiver Shelter 2',
    userAvatar: 'https://i.pravatar.cc/150?u=receiver2',
    targetName: 'Donor Company 1',
    rating: 2,
    comment: 'This is spam content that should be removed from the platform immediately. Fake review.',
    date: '2026-04-08',
    status: 'deleted',
    userViolations: 2,
  },
  {
    id: 'rev6',
    userId: 'receiver3',
    userName: 'Vasilii',
    userAvatar: 'https://i.pravatar.cc/150?u=receiver3',
    targetName: 'Donor Company 1',
    rating: 3,
    comment: 'Average experience. The vegetables were okay but some items were close to expiration date.',
    date: '2026-04-05',
    status: 'approved',
    userViolations: 1,
  },
  {
    id: 'rev7',
    userId: 'receiver1',
    userName: 'Receiver Charity 1',
    userAvatar: 'https://i.pravatar.cc/150?u=receiver1',
    targetName: 'Donor Supermarket 3',
    rating: 4,
    comment: 'Great variety of dairy products. Could improve the packaging but overall very satisfied.',
    date: '2026-04-02',
    status: 'approved',
    userViolations: 0,
  },
  {
    id: 'rev8',
    userId: 'receiver2',
    userName: 'Receiver Shelter 2',
    userAvatar: 'https://i.pravatar.cc/150?u=receiver2',
    targetName: 'Donor Supermarket 3',
    rating: 1,
    comment: 'Abusive and inappropriate language used in pickup. Totally unprofessional behavior.',
    date: '2026-03-28',
    status: 'flagged',
    userViolations: 2,
  },
];

export const MOCK_ADMIN_DONATIONS: AdminDonationItem[] = [
  {
    id: 'ad1',
    title: 'Fresh Bio Apples',
    description: 'A box of red apples, slightly bruised but perfectly edible.',
    category: 'Fruits',
    status: 'Available',
    pickupLocation: 'Green Valley Market, Sector 1',
    expirationDate: '2026-05-01T18:00:00Z',
    postedAt: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quantity: 15,
    unit: 'kg',
    donorName: 'Donor Company 1',
    donorId: 'donor1',
    reported: false,
  },
  {
    id: 'ad2',
    title: 'Daily Bread Surplus',
    description: 'Mixed artisan bread loaves from today\'s batch.',
    category: 'Bakery',
    status: 'Available',
    pickupLocation: 'Artisan Bakery, Center',
    expirationDate: '2026-04-23T20:00:00Z',
    postedAt: '30 mins ago',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quantity: 20,
    unit: 'pieces',
    donorName: 'Donor Bakery 2',
    donorId: 'donor2',
    reported: false,
  },
  {
    id: 'ad3',
    title: 'Suspicious Expired Products',
    description: 'Multiple items reported as already expired when posted. Users complained about quality.',
    category: 'Dairy',
    status: 'Available',
    pickupLocation: 'Unknown Location',
    expirationDate: '2026-04-01T12:00:00Z',
    postedAt: '1 day ago',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quantity: 10,
    unit: 'kg',
    donorName: 'Donor Supermarket 3',
    donorId: 'donor3',
    reported: true,
    flagReason: 'Multiple users reported expired products',
  },
  {
    id: 'ad4',
    title: 'Lunch Menu Soups',
    description: 'Vegetable cream soup portions prepared for lunch but not sold.',
    category: 'Cooked Food',
    status: 'Reserved',
    pickupLocation: 'Bistro 44',
    expirationDate: '2026-04-24T22:00:00Z',
    postedAt: '1 hour ago',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quantity: 12,
    unit: 'plates',
    donorName: 'Donor Company 1',
    donorId: 'donor1',
    reported: false,
  },
  {
    id: 'ad5',
    title: 'Inappropriate Listing - Not Food',
    description: 'This listing contains non-food items which violates platform guidelines.',
    category: 'Vegetables',
    status: 'Available',
    pickupLocation: 'Random Address 123',
    expirationDate: '2026-05-15T12:00:00Z',
    postedAt: '3 hours ago',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quantity: 5,
    unit: 'kg',
    donorName: 'Donor Supermarket 3',
    donorId: 'donor3',
    reported: true,
    flagReason: 'Non-food items listed as food donation',
  },
];

export const MOCK_ADMIN_ACTIVITY: AdminActivityLog[] = [
  {
    id: 'act1',
    action: 'Signup Approved',
    detail: 'BioFarm Organic has been approved as a new donor.',
    timestamp: '2 hours ago',
    type: 'approve',
  },
  {
    id: 'act2',
    action: 'Review Deleted',
    detail: 'Spam review from Receiver Shelter 2 has been removed.',
    timestamp: '5 hours ago',
    type: 'delete',
  },
  {
    id: 'act3',
    action: 'Account Deactivated',
    detail: 'Receiver Shelter 2 account suspended due to repeated violations.',
    timestamp: '1 day ago',
    type: 'deactivate',
  },
  {
    id: 'act4',
    action: 'Signup Rejected',
    detail: 'QuickBite Restaurant rejected — incomplete food safety docs.',
    timestamp: '2 days ago',
    type: 'reject',
  },
  {
    id: 'act5',
    action: 'Content Flagged',
    detail: 'Donation "Suspicious Expired Products" flagged for review.',
    timestamp: '3 days ago',
    type: 'flag',
  },
  {
    id: 'act6',
    action: 'Account Reactivated',
    detail: 'Donor Company 1 account has been reactivated after appeal.',
    timestamp: '5 days ago',
    type: 'reactivate',
  },
];

export const MOCK_ADMIN_MONTHLY_DATA = [
  { month: 'Nov', donations: 45, signups: 8, violations: 2 },
  { month: 'Dec', donations: 62, signups: 12, violations: 3 },
  { month: 'Jan', donations: 78, signups: 15, violations: 1 },
  { month: 'Feb', donations: 95, signups: 10, violations: 4 },
  { month: 'Mar', donations: 110, signups: 18, violations: 2 },
  { month: 'Apr', donations: 85, signups: 14, violations: 5 },
];
