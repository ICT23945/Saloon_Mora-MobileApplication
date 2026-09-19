export interface Service {
  id: string;
  title: string;
  category: 'haircut' | 'shave' | 'facial' | 'combo';
  duration: number; // in minutes
  price: number;
  originalPrice?: number;
  badge?: string;
  description: string;
  image: string;
  imageAlt: string;
  tags?: string[];
  perks: {
    icon: string;
    label: string;
    isPrimary?: boolean;
    isSecondary?: boolean;
  }[];
  actionText?: string;
}

export interface AddOn {
  id: string;
  title: string;
  description: string;
  price: number;
  durationMinutes: number;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  roleBadgeType?: 'director' | 'architect' | 'shave-master';
  rating: number;
  reviewCount: number;
  nextAvailable: string;
  avatar: string;
  isAny?: boolean;
}

export interface DateOption {
  dayOfWeek: string;
  dayNumber: number;
  month: string;
  year: number;
  dateKey: string;
}

export interface BookingState {
  service: Service;
  selectedAddOns: AddOn[];
  barber: Barber;
  date: DateOption;
  timeSlot: string;
  hospitalityNote: string;
  totalPrice: number;
}

export interface AppointmentPass {
  id: string;
  booking: BookingState;
  bookingCode: string;
  status: 'confirmed' | 'checked-in' | 'completed';
  createdAt: string;
}

export type ActiveTab = 'home' | 'services' | 'book' | 'passes';
