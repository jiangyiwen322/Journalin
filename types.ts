
export interface Activity {
  id: string;
  type: 'Breakfast' | 'Culture' | 'Dining' | 'Shopping' | 'Sightseeing' | 'Transport' | 'Relaxation';
  title: string;
  time: string;
  description: string;
  imageUrl: string;
  lat: number;
  lng: number;
  durationMinutes: number;
  cost?: number;
}

export interface UserPreferences {
  spiceLevel: 'None' | 'Mild' | 'Hot';
  caffeine: boolean;
  pace: number; // 0 (Soldier) to 100 (Zen)
}

export interface DayPlan {
  dayNumber: number;
  title: string;
  date: string;
  activities: Activity[];
}

export interface Itinerary {
  id: string;
  location: string;
  title: string;
  days: DayPlan[];
  tags: string[];
}

export enum AppView {
  Home = 'HOME',
  Itinerary = 'ITINERARY',
  Decision = 'DECISION',
  Memories = 'MEMORIES'
}

export interface Spark {
  id: string;
  location: string;
  title: string;
  description: string;
  imageUrl: string;
  status: 'Parsed' | 'Saved' | 'In Progress';
}

/**
 * Interface representing a travel memory captured by the user.
 */
export interface Memory {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  description: string;
}

/**
 * Interface representing a scanned expense receipt.
 */
export interface Receipt {
  id: string;
  merchant: string;
  amount: number;
  currency: string;
  items: string[];
  date: string;
}
