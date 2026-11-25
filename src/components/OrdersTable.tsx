import React from 'react';
import type { Order, SortField, SortOrder } from '../types/order';
import { StatusBadge } from './StatusBadge';
import { ArrowUpDown } from 'lucide-react';

interface OrdersTableProps {
  orders: Order[];
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  sortField,
  sortOrder,
  onSort,
}) => {
  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    const dateStr = d.toLocaleDateString('ar-YE', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });
    const timeStr = d.toLocaleTimeString('ar-YE', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return { dateStr, timeStr };
  };

  return (
    <div className="hidden md:block bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/80 text-xs font-semibold text-slate-600">
              <th className="py-3 px-4 text-right">رقم الطلب</th>
              <th className="py-3 px-4 text-right">العميل والعنوان</th>
              <th className="py-3 px-4 text-right">الأصناف المطلوبة</th>
              <th className="py-3 px-4 text-right">
                <button
                  onClick={() => onSort('date')}
                  className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <span>تاريخ الطلب</span>
                  <ArrowUpDown
                    size={12}
                    className={sortField === 'date' ? 'text-slate-900' : 'text-slate-400'}
                  />
                  {sortField === 'date' && (
                    <span className="text-[10px] text-slate-500 font-normal">
                      ({sortOrder === 'desc' ? 'الأحدث' : 'الأقدم'})
                    </span>
                  )}
                </button>
              </th>
              <th className="py-3 px-4 text-right">
                <button
                  onClick={() => onSort('amount')}
                  className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <span>المبلغ الإجمالي</span>
                  <ArrowUpDown
                    size={12}
                    className={sortField === 'amount' ? 'text-slate-900' : 'text-slate-400'}
                  />
                  {sortField === 'amount' && (
                    <span className="text-[10px] text-slate-500 font-normal">
                      ({sortOrder === 'desc' ? 'الأعلى' : 'الأقل'})
                    </span>
                  )}
                </button>
              </th>
              <th className="py-3 px-4 text-right">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {orders.map((order) => {
              const { dateStr, timeStr } = formatDate(order.created_at);
              const totalItemsCount = order.items.reduce((acc, it) => acc + it.qty, 0);

              return (
                <tr
                  key={order.id}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  {/* Order ID */}
                  <td className="py-3 px-4 align-top">
                    <span className="font-mono text-xs font-semibold text-slate-800 tabular-nums">
                      {order.id}
                    </span>
                    <div className="text-[11px] text-slate-400 mt-0.5 tabular-nums">
                      توصيل: {order.delivery_fee.toLocaleString('ar-YE')} ر.ي
                    </div>
                  </td>

                  {/* Customer Info & Address */}
                  <td className="py-3 px-4 align-top">
                    <div className="font-medium text-slate-900 leading-snug">
                      {order.customer}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {order.address}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 tabular-nums" dir="ltr">
                      <a href={`tel:${order.phone}`} className="hover:text-slate-700 transition-colors">
                        {order.phone}
                      </a>
                    </div>
                  </td>

                  {/* Order Items */}
                  <td className="py-3 px-4 align-top">
                    <div className="text-xs text-slate-700 font-medium">
                      {totalItemsCount} قطع ({order.items.length} أصناف)
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 space-y-0.5 max-w-xs">
                      {order.items.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="truncate">
                          {item.name} <span className="text-slate-400 tabular-nums">×{item.qty}</span>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="text-[10px] text-slate-400">
                          + {order.items.length - 2} أصناف أخرى
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Date and Time */}
                  <td className="py-3 px-4 align-top">
                    <div className="text-xs font-medium text-slate-800 tabular-nums">
                      {dateStr}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 tabular-nums">
                      {timeStr}
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="py-3 px-4 align-top">
                    <div className="text-sm font-semibold text-slate-900 tabular-nums">
                      {order.total.toLocaleString('ar-YE')}{' '}
                      <span className="text-xs font-normal text-slate-500">ر.ي</span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-4 align-top">
                    <StatusBadge status={order.status} label={order.status_ar} />
                    {order.timeline && order.timeline.length > 0 && (
                      <div className="text-[11px] text-slate-500 mt-1">
                        {order.timeline[order.timeline.length - 1].step}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
