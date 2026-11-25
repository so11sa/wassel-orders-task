import React from 'react';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  searchQuery: string;
  onClearFilters: () => void;
  hasFiltersActive: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  searchQuery,
  onClearFilters,
  hasFiltersActive,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-8 sm:p-10 text-center my-6">
      <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
        <SearchX size={22} />
      </div>

      <h3 className="text-base font-bold text-slate-900 mb-1">
        لم يتم العثور على طلبات
      </h3>

      {searchQuery ? (
        <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4 leading-relaxed">
          لا توجد نتائج مطابقة لاسم العميل «<span className="font-semibold text-slate-700">{searchQuery}</span>».
        </p>
      ) : (
        <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4 leading-relaxed">
          لا توجد طلبات تطابق الفلاتر المحددة حالياً.
        </p>
      )}

      {hasFiltersActive && (
        <button
          onClick={onClearFilters}
          className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
        >
          مسح البحث والفلاتر
        </button>
      )}
    </div>
  );
};
