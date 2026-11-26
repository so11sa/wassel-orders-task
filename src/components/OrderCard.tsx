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
    <div className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-3.5 space-y-2.5 shadow-2xs">
      {/* Top Header: ID, Items count, and Status Badge */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="font-mono text-xs font-bold text-slate-800 tabular-nums bg-slate-100 px-2 py-0.5 rounded">
            {order.id}
          </span>
          <span className="text-[11px] text-slate-400 shrink-0">
            ({totalItemsCount} قطع)
          </span>
        </div>
        <StatusBadge status={order.status} label={order.status_ar} size="sm" />
      </div>

      {/* Customer Info & Location */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-slate-900 text-sm leading-snug truncate">
            {order.customer}
          </h3>
          <a
            href={`tel:${order.phone}`}
            className="inline-flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-900 bg-slate-50 active:bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0 transition-colors"
            dir="ltr"
            title="اتصال بالعميل"
          >
            <Phone size={11} className="text-slate-400" />
            <span>{order.phone}</span>
          </a>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin size={12} className="text-slate-400 shrink-0" />
          <span className="truncate">{order.address}</span>
        </div>
      </div>

      {/* Items Toggle Dropdown */}
      <div className="bg-slate-50/80 rounded-lg p-2 border border-slate-100 text-xs">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full font-medium text-slate-700 cursor-pointer"
        >
          <span className="text-[11px]">
            الأصناف ({order.items.length} أصناف • {totalItemsCount} قطع)
          </span>
          <span className="flex items-center gap-0.5 text-slate-400 text-[10px]">
            <span>{isExpanded ? 'إخفاء' : 'عرض'}</span>
            {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </span>
        </button>

        {isExpanded && (
          <div className="mt-2 pt-2 border-t border-slate-200/70 space-y-1.5">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-[11px] text-slate-600">
                <span className="truncate pr-1">{item.name}</span>
                <span className="tabular-nums font-medium text-slate-800 shrink-0">
                  {item.qty} × {item.price.toLocaleString('ar-YE')} ر.ي
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-1 border-t border-dashed border-slate-200 text-[11px] text-slate-500">
              <span>رسوم التوصيل:</span>
              <span className="tabular-nums">{order.delivery_fee.toLocaleString('ar-YE')} ر.ي</span>
            </div>
          </div>
        )}
      </div>

      {/* Timeline Status Step (if available) */}
      {order.timeline && order.timeline.length > 0 && (
        <div className="text-[11px] text-slate-500 flex items-center justify-between pt-0.5">
          <span className="text-slate-400">آخر تحديث:</span>
          <span className="font-medium text-slate-700 bg-slate-100/80 px-2 py-0.5 rounded text-[10px]">
            {order.timeline[order.timeline.length - 1].step}
          </span>
        </div>
      )}

      {/* Footer: Date & Total Amount */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
        <div className="text-slate-400 text-[11px] tabular-nums">
          {dateStr} • {timeStr}
        </div>
        <div className="font-bold text-slate-900 text-sm tabular-nums">
          {order.total.toLocaleString('ar-YE')}{' '}
          <span className="text-[11px] font-normal text-slate-500">ر.ي</span>
        </div>
      </div>
    </div>
  );
};
