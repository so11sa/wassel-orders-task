import React from 'react';
import { Truck, RotateCw, AlertCircle, RefreshCcw } from 'lucide-react';

interface HeaderProps {
  onSimulateLoading: () => void;
  onSimulateError: () => void;
  onReset: () => void;
  isLoading: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onSimulateLoading,
  onSimulateError,
  onReset,
  isLoading,
}) => {
  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
          {/* Logo & Identity */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-900 flex items-center justify-center text-amber-400 shrink-0">
              <Truck size={18} strokeWidth={2.2} className="sm:hidden" />
              <Truck size={20} strokeWidth={2.2} className="hidden sm:block" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none whitespace-nowrap">
                  وصّل
                </span>
                <span className="hidden sm:inline-block text-[11px] font-medium text-slate-500 border-r border-slate-200 pr-2 leading-none whitespace-nowrap">
                  إدارة العمليات والتوصيل
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 leading-none truncate">
                فرع صنعاء
              </p>
            </div>
          </div>

          {/* Action Simulation Controls */}
          <div className="flex items-center gap-1 bg-slate-50 p-0.5 sm:p-1 rounded-lg border border-slate-200/70 text-xs shrink-0">
            <span className="text-[11px] text-slate-400 px-1.5 hidden md:inline-block whitespace-nowrap">
              اختبار الحالات:
            </span>
            
            <button
              onClick={onSimulateLoading}
              disabled={isLoading}
              title="محاكاة حالة التحميل"
              className="inline-flex items-center gap-1 px-2 py-1 text-slate-700 hover:text-slate-900 hover:bg-white rounded font-medium text-[11px] sm:text-xs transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
            >
              <RotateCw size={11} className={isLoading ? 'animate-spin text-amber-600' : 'text-slate-400'} />
              <span>تحميل</span>
            </button>

            <button
              onClick={onSimulateError}
              disabled={isLoading}
              title="محاكاة خطأ الشبكة وزر إعادة المحاولة"
              className="inline-flex items-center gap-1 px-2 py-1 text-rose-700 hover:bg-rose-50 rounded font-medium text-[11px] sm:text-xs transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
            >
              <AlertCircle size={11} className="text-rose-500" />
              <span>خطأ</span>
            </button>

            <button
              onClick={onReset}
              disabled={isLoading}
              title="إعادة تعيين الحالة الافتراضية"
              className="inline-flex items-center gap-1 px-2 py-1 text-slate-600 hover:bg-white rounded font-medium text-[11px] sm:text-xs transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
            >
              <RefreshCcw size={11} className="text-slate-400" />
              <span>استعادة</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
