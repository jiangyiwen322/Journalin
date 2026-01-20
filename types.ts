
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
  Decision = 'DECISION'
}

export interface Spark {
  id: string;
  location: string;
  title: string;
  description: string;
  imageUrl: string;
  status: 'Parsed' | 'Saved' | 'In Progress';
}
