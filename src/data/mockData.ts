import { Store, MousePointerClick, HeartHandshake, Scale, Soup, Leaf, Building2 } from 'lucide-react';

export const RECENT_DONORS = [
  { 
    id: 1, 
    name: 'Fresh Market Central', 
    type: 'Supermarket',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=100&q=80' 
  },
  { 
    id: 2, 
    name: 'Green Bakery', 
    type: 'Bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=100&q=80' 
  },
  { 
    id: 3, 
    name: 'Bistro 55', 
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=100&q=80' 
  },
  { 
    id: 4, 
    name: 'Organic Juice Bar', 
    type: 'Cafe',
    image: 'https://images.unsplash.com/photo-1621360841013-c768371e93cf?auto=format&fit=crop&w=100&q=80' 
  },
];

export const STEPS = [
  {
    id: 1,
    title: 'Donors List Food',
    description: 'Restaurants and stores upload details about surplus food items (quantity, expiry time) in less than 2 minutes.',
    icon: Store,
    color: 'bg-blue-600',
    shadow: 'shadow-blue-200',
  },
  {
    id: 2,
    title: 'NGOs Reserve It',
    description: 'Registered charities get instant alerts and reserve the food directly from the interactive map or dashboard.',
    icon: MousePointerClick,
    color: 'bg-orange-500',
    shadow: 'shadow-orange-200',
  },
  {
    id: 3,
    title: 'Pickup & Impact',
    description: 'The receiver picks up the food. The transaction is completed, and we calculate the environmental impact saved.',
    icon: HeartHandshake,
    color: 'bg-green-500',
    shadow: 'shadow-green-200',
  },
];

export const STATS = [
  {
    id: 1,
    label: 'Food Saved',
    value: '15,400 kg',
    icon: Scale,
    description: 'Surplus redirected from waste'
  },
  {
    id: 2,
    label: 'Meals Provided',
    value: '42,000+',
    icon: Soup,
    description: 'Warm meals for shelters'
  },
  {
    id: 3,
    label: 'CO2 Prevented',
    value: '38 Tons',
    icon: Leaf,
    description: 'Carbon footprint reduced'
  },
  {
    id: 4,
    label: 'Partner NGOs',
    value: '120+',
    icon: Building2,
    description: 'Active organizations verified'
  },
];