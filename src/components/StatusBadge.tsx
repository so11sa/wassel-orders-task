import React from 'react';
import type { OrderStatus } from '../types/order';

interface StatusBadgeProps {
  status: OrderStatus;
  label?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  switch (status) {
    case 'new':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-medium rounded-md bg-blue-50 text-blue-700 border border-blue-200/70 ${sizeClasses}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
          <span>{label || 'جديد'}</span>
        </span>
      );
    case 'on_the_way':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-medium rounded-md bg-amber-50 text-amber-800 border border-amber-200/80 ${sizeClasses}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
          <span>{label || 'في الطريق'}</span>
        </span>
      );
    case 'delivered':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-medium rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/80 ${sizeClasses}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
          <span>{label || 'تم التوصيل'}</span>
        </span>
      );
    default:
      return null;
  }
};
