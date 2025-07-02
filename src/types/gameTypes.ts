
export interface Division {
  id: string;
  name: string;
  icon: string;
  color: string;
  trackTheme: string;
}

export interface TeamMember {
  id: string;
  name: string;
  salesPoints: number;
  visits: number;
  calls: number;
  chats: number;
  color: string;
  avatar: string;
}

export interface LeadMeasure {
  visits: number;
  calls: number;
  chats: number;
}

export const DIVISIONS: Division[] = [
  {
    id: 'sales-project',
    name: 'Sales Project',
    icon: '🎯',
    color: 'from-orange-500 to-red-500',
    trackTheme: 'city'
  },
  {
    id: 'sales-distribusi',
    name: 'Sales Distribusi',
    icon: '🚚',
    color: 'from-blue-500 to-indigo-500',
    trackTheme: 'highway'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: '📢',
    color: 'from-pink-500 to-purple-500',
    trackTheme: 'neon'
  },
  {
    id: 'hr',
    name: 'HR',
    icon: '👥',
    color: 'from-green-500 to-teal-500',
    trackTheme: 'forest'
  },
  {
    id: 'operasional',
    name: 'Operasional',
    icon: '⚙️',
    color: 'from-gray-500 to-slate-500',
    trackTheme: 'industrial'
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: '💰',
    color: 'from-yellow-500 to-orange-500',
    trackTheme: 'gold'
  },
  {
    id: 'teknisi',
    name: 'Teknisi',
    icon: '🔧',
    color: 'from-cyan-500 to-blue-500',
    trackTheme: 'tech'
  },
  {
    id: 'logistik',
    name: 'Logistik',
    icon: '📦',
    color: 'from-brown-500 to-orange-500',
    trackTheme: 'warehouse'
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    icon: '🛒',
    color: 'from-violet-500 to-purple-500',
    trackTheme: 'digital'
  },
  {
    id: 'umum',
    name: 'Umum',
    icon: '🏢',
    color: 'from-slate-500 to-gray-500',
    trackTheme: 'office'
  }
];

export const TARGET_POINTS = 1000;
export const CHECKPOINT_INTERVAL = 100;
