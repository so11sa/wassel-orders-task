export type OrderStatus = 'new' | 'on_the_way' | 'delivered';

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

export interface TimelineStep {
  step: string;
  at: string;
}

export interface Order {
  id: string;
  customer: string;
  phone: string;
  total: number;
  currency: string;
  delivery_fee: number;
  created_at: string;
  status: OrderStatus;
  status_ar: string;
  address: string;
  items: OrderItem[];
  timeline: TimelineStep[];
}

export type SortField = 'date' | 'amount';
export type SortOrder = 'asc' | 'desc';
export type StatusFilter = 'all' | OrderStatus;
