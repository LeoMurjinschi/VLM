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
    description: 'High quality organic carrots from our farm. Perfect for soups, salads, and juicing. Stored in cool conditions.',
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
    description: 'Traditional sourdough baked fresh daily. Crusty exterior with soft interior. Great for toast and sandwiches.',
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
    description: 'Premium Greek yogurt, high protein content. Kept in refrigerated storage. Best consumed within 2 weeks.',
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
    description: 'Fresh mixed berries including strawberries, blueberries, and raspberries. Keep refrigerated. Very perishable.',
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
    description: 'Pre-made frozen stir-fry mix with broccoli, peppers, and snap peas. Ready to cook. Store in freezer.',
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
    description: 'Nutritious whole wheat pasta made from premium grain. Dry goods with long shelf life. Store in cool, dry place.',
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
