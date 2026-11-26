import React from 'react';
import { Search, X, ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-react';
import type { SortField, SortOrder, StatusFilter } from '../types/order';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (status: StatusFilter) => void;
  sortField: SortField;
  onSortFieldChange: (field: SortField) => void;
  sortOrder: SortOrder;
  onToggleSortOrder: () => void;
  totalFilteredCount: number;
  statusCounts: {
    all: number;
    new: number;
    on_the_way: number;
    delivered: number;
  };
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortField,
  onSortFieldChange,
  sortOrder,
  onToggleSortOrder,
  totalFilteredCount,
  statusCounts,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-4 mb-4 space-y-3">
      {/* Search Input & Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            <Search size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="بحث باسم العميل (مثال: محمد، فاطمة)..."
            className="w-full pr-9 pl-9 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-400 transition-colors text-right"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              title="مسح البحث"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 self-end sm:self-auto shrink-0 w-full sm:w-auto justify-between sm:justify-start">
          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">الترتيب:</span>
          
          <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-xs">
            <button
              onClick={() => onSortFieldChange('date')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
                sortField === 'date'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              التاريخ
            </button>

            <button
              onClick={() => onSortFieldChange('amount')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
                sortField === 'amount'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              المبلغ
            </button>
          </div>

          <button
            onClick={onToggleSortOrder}
            title={sortOrder === 'desc' ? 'ترتيب تنازلي (اضغط للتبديل إلى تصاعدي)' : 'ترتيب تصاعدي (اضغط للتبديل إلى تنازلي)'}
            className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
          >
            {sortOrder === 'desc' ? (
              <>
                <ArrowDownWideNarrow size={13} className="text-slate-600" />
                <span className="text-[11px] sm:text-xs">تنازلي</span>
              </>
            ) : (
              <>
                <ArrowUpNarrowWide size={13} className="text-slate-600" />
                <span className="text-[11px] sm:text-xs">تصاعدي</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status Segmented Tabs & Results Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2.5 border-t border-slate-100">
        {/* Horizontal Status Tabs with smooth scroll */}
        <div className="w-full sm:w-auto overflow-x-auto scroll-smooth overscroll-x-contain py-1 -my-1 touch-pan-x flex items-center gap-1.5 text-xs">
          <button
            onClick={() => onStatusFilterChange('all')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 whitespace-nowrap cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 bg-slate-100/70 hover:bg-slate-100'
            }`}
          >
            <span>الكل</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
              statusFilter === 'all' ? 'bg-slate-800 text-slate-200' : 'bg-slate-200/80 text-slate-600'
            }`}>
              {statusCounts.all}
            </span>
          </button>

          <button
            onClick={() => onStatusFilterChange('new')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 whitespace-nowrap cursor-pointer ${
              statusFilter === 'new'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 bg-slate-100/70 hover:bg-slate-100'
            }`}
          >
            <span>جديد</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
              statusFilter === 'new' ? 'bg-blue-700 text-blue-100' : 'bg-slate-200/80 text-slate-600'
            }`}>
              {statusCounts.new}
            </span>
          </button>

          <button
            onClick={() => onStatusFilterChange('on_the_way')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 whitespace-nowrap cursor-pointer ${
              statusFilter === 'on_the_way'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'text-slate-600 bg-slate-100/70 hover:bg-slate-100'
            }`}
          >
            <span>في الطريق</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
              statusFilter === 'on_the_way' ? 'bg-amber-700 text-amber-100' : 'bg-slate-200/80 text-slate-600'
            }`}>
              {statusCounts.on_the_way}
            </span>
          </button>

          <button
            onClick={() => onStatusFilterChange('delivered')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 whitespace-nowrap cursor-pointer ${
              statusFilter === 'delivered'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 bg-slate-100/70 hover:bg-slate-100'
            }`}
          >
            <span>تم التوصيل</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
              statusFilter === 'delivered' ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-200/80 text-slate-600'
            }`}>
              {statusCounts.delivered}
            </span>
          </button>
          
          {/* Subtle spacer at end for comfortable RTL scrolling */}
          <span className="w-1 shrink-0" aria-hidden="true" />
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between sm:justify-end text-xs text-slate-500 font-medium pt-1 sm:pt-0 shrink-0">
          <span className="sm:hidden text-slate-400">إجمالي النتائج:</span>
          <span>
            <strong className="text-slate-900 tabular-nums">{totalFilteredCount}</strong> طلب
          </span>
        </div>
      </div>
    </div>
  );
};
