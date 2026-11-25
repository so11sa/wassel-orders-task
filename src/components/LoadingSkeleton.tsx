import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Desktop Table Skeleton */}
      <div className="hidden md:block bg-white rounded-xl border border-slate-200/80 overflow-hidden">
        <div className="h-10 bg-slate-50 border-b border-slate-200/80"></div>
        <div className="divide-y divide-slate-100">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-3.5 flex items-center justify-between gap-4 animate-pulse">
              <div className="space-y-1.5 w-24">
                <div className="h-3.5 bg-slate-200 rounded w-16"></div>
                <div className="h-2.5 bg-slate-100 rounded w-20"></div>
              </div>
              <div className="space-y-1.5 flex-1 max-w-xs">
                <div className="h-3.5 bg-slate-200 rounded w-32"></div>
                <div className="h-2.5 bg-slate-100 rounded w-48"></div>
              </div>
              <div className="space-y-1.5 w-36">
                <div className="h-3 bg-slate-200 rounded w-24"></div>
                <div className="h-2.5 bg-slate-100 rounded w-28"></div>
              </div>
              <div className="space-y-1.5 w-24">
                <div className="h-3.5 bg-slate-200 rounded w-18"></div>
                <div className="h-2.5 bg-slate-100 rounded w-12"></div>
              </div>
              <div className="w-20">
                <div className="h-4 bg-slate-200 rounded w-16"></div>
              </div>
              <div className="w-20">
                <div className="h-6 bg-slate-200 rounded-md w-18"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Card Skeleton */}
      <div className="md:hidden space-y-2.5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200/80 p-3.5 animate-pulse space-y-2.5">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="h-3.5 bg-slate-200 rounded w-16"></div>
              <div className="h-5 bg-slate-200 rounded-md w-16"></div>
            </div>
            <div className="space-y-1.5">
              <div className="h-3.5 bg-slate-200 rounded w-32"></div>
              <div className="h-2.5 bg-slate-100 rounded w-40"></div>
            </div>
            <div className="h-7 bg-slate-100 rounded-lg"></div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <div className="h-2.5 bg-slate-100 rounded w-24"></div>
              <div className="h-3.5 bg-slate-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
