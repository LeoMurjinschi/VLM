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

export const OPEN_POSITIONS = [
  {
    id: 1,
    title: 'Senior Full-Stack Developer',
    department: 'Engineering',
    location: 'Chișinău, Moldova (Hybrid)',
    type: 'Full-time',
  },
  {
    id: 2,
    title: 'NGO Partnership Manager',
    department: 'Operations',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    id: 3,
    title: 'Marketing & PR Specialist',
    department: 'Marketing',
    location: 'Chișinău, Moldova',
    type: 'Part-time',
  }
];

export const PARTNERS = [
  {
    id: 1,
    name: 'Green Market Central',
    category: 'Business Donor',
    logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=80',
    description: 'Providing fresh produce and daily bakery surplus to local shelters.'
  },
  {
    id: 2,
    name: 'Hope Foundation',
    category: 'NGO Partner',
    logo: 'https://images.unsplash.com/photo-1593113563332-e147e43ce873?auto=format&fit=crop&w=200&q=80',
    description: 'Distributing warm meals to over 500 vulnerable individuals daily.'
  },
  {
    id: 3,
    name: 'EcoLogistics',
    category: 'Logistics Partner',
    logo: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c663c0?auto=format&fit=crop&w=200&q=80',
    description: 'Ensuring safe and fast transportation of food donations across the city.'
  },
  {
    id: 4,
    name: 'City Bakery',
    category: 'Business Donor',
    logo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=200&q=80',
    description: 'Donating unsold bread and pastries at the end of every business day.'
  },
  {
    id: 5,
    name: 'Safe Haven Shelter',
    category: 'NGO Partner',
    logo: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=200&q=80',
    description: 'Providing shelter and food for homeless families in the region.'
  },
  {
    id: 6,
    name: 'Tech for Good',
    category: 'Sponsor',
    logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=200&q=80',
    description: 'Providing cloud infrastructure and technical support for the FoodShare platform.'
  }
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: 'How FoodShare is reducing food waste in local supermarkets',
    date: 'October 12, 2024',
    category: 'Impact',
    image: 'https://images.unsplash.com/photo-1573246123716-6b1782bfc499?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Discover how our recent partnerships with top supermarkets have redirected over 5 tons of food from landfills this month alone.',
    content: `Food waste is a massive problem globally, but change starts locally. Over the past month, FoodShare has partnered with three major supermarket chains to intercept food just before it hits its display expiration date, but while it is still perfectly safe and nutritious to eat. 
    \n\nThrough our automated platform, store managers can list surplus inventory in under two minutes. Instantly, our network of local NGOs receives a notification. This seamless integration has resulted in over 5 tons of fresh produce, baked goods, and dairy products being redirected to local shelters. 
    \n\n"The process is incredibly simple," says Maria, a store manager. "Instead of throwing food in the dumpster at 9 PM, we press a button, and by 9:30 PM, a volunteer is here to pick it up."`
  },
  {
    id: 2,
    title: '5 Ways your restaurant can become more sustainable today',
    date: 'October 05, 2024',
    category: 'Tips & Guides',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Sustainability is more than just a buzzword. Here are actionable steps your kitchen can take to minimize waste and maximize efficiency.',
    content: `Running a kitchen is chaotic, and waste often seems like an unavoidable byproduct. However, small changes can lead to massive environmental and financial savings. Here are 5 steps you can take today:\n\n1. **Conduct a Waste Audit:** You can't fix what you don't measure. Spend one week tracking exactly what goes into the bin. Is it prep waste, or plate waste?\n\n2. **Optimize Inventory:** Adopt a 'First-In, First-Out' (FIFO) method in your walk-in fridge to ensure older ingredients are used first.\n\n3. **Repurpose Trimmings:** Vegetable peels can make excellent stocks. Stale bread can become croutons or breadcrumbs.\n\n4. **Train Your Staff:** Ensure everyone from the head chef to the dishwashers understands your sustainability goals.\n\n5. **Join FoodShare:** For the unavoidable surplus at the end of the night, use our platform to donate it to those in need instead of throwing it away.`
  },
  {
    id: 3,
    title: 'Meet the volunteers: The unsung heroes of food distribution',
    date: 'September 28, 2024',
    category: 'Community',
    image: 'https://images.unsplash.com/photo-1593113563332-e147e43ce873?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Behind every successful donation is a team of dedicated volunteers. Read their stories and learn how you can get involved.',
    content: `Technology connects the dots, but people do the heavy lifting. The FoodShare platform relies on a dedicated network of volunteers who ensure that the food gets from the donor to the receiver safely and quickly.\n\nTake Andrei, for example. A university student who uses his bicycle to do short-distance deliveries between local bakeries and a nearby children's center. "It keeps me fit, and I know exactly where my effort is going," he says.\n\nOr Elena, a retired teacher who coordinates the evening pickups for a large homeless shelter. "Seeing the relief on people's faces when warm meals arrive makes every late night worth it."\n\nIf you have a few spare hours a week and a vehicle (or a bike!), you can join our volunteer network. It's the most direct way to impact your community.`
  }
];