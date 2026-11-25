import React, { useState } from 'react';
import type { Order } from '../types/order';
import { StatusBadge } from './StatusBadge';
import { ChevronDown, ChevronUp, Phone, MapPin } from 'lucide-react';

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const d = new Date(order.created_at);
  const dateStr = d.toLocaleDateString('ar-YE', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });
  const timeStr = d.toLocaleTimeString('ar-YE', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const totalItemsCount = order.items.reduce((acc, it) => acc + it.qty, 0);

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 space-y-2.5">
      {/* Top Header: ID & Status Badge */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-slate-800 tabular-nums">
            {order.id}
          </span>
          <span className="text-[11px] text-slate-400">
            ({totalItemsCount} قطع)
          </span>
        </div>
        <StatusBadge status={order.status} label={order.status_ar} size="sm" />
      </div>

      {/* Customer Info */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900 text-sm">{order.customer}</h3>
          <a
            href={`tel:${order.phone}`}
            className="inline-flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-900 bg-slate-50 px-2 py-0.5 rounded border border-slate-200"
            dir="ltr"
          >
            <Phone size={10} className="text-slate-400" />
            <span>{order.phone}</span>
          </a>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <MapPin size={12} className="text-slate-400 shrink-0" />
          <span>{order.address}</span>
        </div>
      </div>

      {/* Items Toggle */}
      <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 text-xs">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full font-medium text-slate-700 cursor-pointer"
        >
          <span>الأصناف ({order.items.length})</span>
          {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>

        {isExpanded && (
          <div className="mt-2 pt-2 border-t border-slate-200 space-y-1">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-[11px] text-slate-600">
                <span>{item.name}</span>
                <span className="tabular-nums font-medium text-slate-800">
                  {item.qty} × {item.price.toLocaleString('ar-YE')} ر.ي
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[11px] text-slate-500">
              <span>رسوم التوصيل:</span>
              <span className="tabular-nums">{order.delivery_fee.toLocaleString('ar-YE')} ر.ي</span>
            </div>
          </div>
        )}
      </div>

      {/* Timeline Current Step */}
      {order.timeline && order.timeline.length > 0 && (
        <div className="text-[11px] text-slate-500 flex items-center justify-between">
          <span>الحالة الحالية:</span>
          <span className="font-medium text-slate-800">{order.timeline[order.timeline.length - 1].step}</span>
        </div>
      )}

      {/* Footer: Date and Total Amount */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
        <div className="text-slate-400 text-[11px] tabular-nums">
          {dateStr} • {timeStr}
        </div>
        <div className="font-semibold text-slate-900 tabular-nums">
          {order.total.toLocaleString('ar-YE')}{' '}
          <span className="text-[11px] font-normal text-slate-500">ر.ي</span>
        </div>
      </div>
    </div>
  );
};
