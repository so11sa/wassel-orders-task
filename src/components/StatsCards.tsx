import React from 'react';
import type { Order, OrderStatus } from '../types/order';

interface StatsCardsProps {
  orders: Order[];
  onFilterByStatus: (status: 'all' | OrderStatus) => void;
  activeStatus: 'all' | OrderStatus;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  orders,
  onFilterByStatus,
  activeStatus,
}) => {
  const totalCount = orders.length;
  const newCount = orders.filter((o) => o.status === 'new').length;
  const onTheWayCount = orders.filter((o) => o.status === 'on_the_way').length;
  const deliveredCount = orders.filter((o) => o.status === 'delivered').length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
      {/* Total Orders */}
      <button
        onClick={() => onFilterByStatus('all')}
        className={`p-3.5 rounded-xl border text-right transition-colors cursor-pointer ${
          activeStatus === 'all'
            ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
            : 'bg-white border-slate-200/80 text-slate-800 hover:border-slate-300'
        }`}
      >
        <div className={`text-xs font-medium mb-1 ${activeStatus === 'all' ? 'text-slate-300' : 'text-slate-500'}`}>
          إجمالي الطلبات
        </div>
        <div className="text-2xl font-bold tracking-tight tabular-nums">{totalCount}</div>
        <div className={`text-[11px] mt-1 ${activeStatus === 'all' ? 'text-slate-300' : 'text-slate-400'}`}>
          جميع الشحنات الحالية
        </div>
      </button>

      {/* New Orders */}
      <button
        onClick={() => onFilterByStatus('new')}
        className={`p-3.5 rounded-xl border text-right transition-colors cursor-pointer ${
          activeStatus === 'new'
            ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
            : 'bg-white border-slate-200/80 text-slate-800 hover:border-slate-300'
        }`}
      >
        <div className={`text-xs font-medium mb-1 ${activeStatus === 'new' ? 'text-blue-100' : 'text-slate-500'}`}>
          طلبات جديدة
        </div>
        <div className={`text-2xl font-bold tracking-tight tabular-nums ${activeStatus === 'new' ? 'text-white' : 'text-blue-700'}`}>
          {newCount}
        </div>
        <div className={`text-[11px] mt-1 ${activeStatus === 'new' ? 'text-blue-100' : 'text-slate-400'}`}>
          بانتظار الاستلام
        </div>
      </button>

      {/* On The Way */}
      <button
        onClick={() => onFilterByStatus('on_the_way')}
        className={`p-3.5 rounded-xl border text-right transition-colors cursor-pointer ${
          activeStatus === 'on_the_way'
            ? 'bg-amber-600 border-amber-600 text-white shadow-xs'
            : 'bg-white border-slate-200/80 text-slate-800 hover:border-slate-300'
        }`}
      >
        <div className={`text-xs font-medium mb-1 ${activeStatus === 'on_the_way' ? 'text-amber-100' : 'text-slate-500'}`}>
          في الطريق
        </div>
        <div className={`text-2xl font-bold tracking-tight tabular-nums ${activeStatus === 'on_the_way' ? 'text-white' : 'text-amber-700'}`}>
          {onTheWayCount}
        </div>
        <div className={`text-[11px] mt-1 ${activeStatus === 'on_the_way' ? 'text-amber-100' : 'text-slate-400'}`}>
          مع المندوب حالياً
        </div>
      </button>

      {/* Delivered */}
      <button
        onClick={() => onFilterByStatus('delivered')}
        className={`p-3.5 rounded-xl border text-right transition-colors cursor-pointer ${
          activeStatus === 'delivered'
            ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
            : 'bg-white border-slate-200/80 text-slate-800 hover:border-slate-300'
        }`}
      >
        <div className={`text-xs font-medium mb-1 ${activeStatus === 'delivered' ? 'text-emerald-100' : 'text-slate-500'}`}>
          تم التوصيل
        </div>
        <div className={`text-2xl font-bold tracking-tight tabular-nums ${activeStatus === 'delivered' ? 'text-white' : 'text-emerald-700'}`}>
          {deliveredCount}
        </div>
        <div className={`text-[11px] mt-1 ${activeStatus === 'delivered' ? 'text-emerald-100' : 'text-slate-400'}`}>
          تم التسليم بنجاح
        </div>
      </button>

      {/* Total Amount Volume */}
      <div className="col-span-2 sm:col-span-2 lg:col-span-1 p-3.5 rounded-xl border border-slate-200/80 bg-white text-right">
        <div className="text-xs font-medium text-slate-500 mb-1">إجمالي المبالغ</div>
        <div className="text-2xl font-bold text-slate-900 tracking-tight tabular-nums">
          {totalRevenue.toLocaleString('ar-YE')} <span className="text-xs font-normal text-slate-500">ر.ي</span>
        </div>
        <div className="text-[11px] text-slate-400 mt-1">شامل رسوم التوصيل</div>
      </div>
    </div>
  );
};
