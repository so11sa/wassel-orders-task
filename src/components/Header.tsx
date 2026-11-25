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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-amber-400 shrink-0">
              <Truck size={20} strokeWidth={2.2} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-slate-900 tracking-tight leading-none">وصّل</span>
                <span className="text-[11px] font-medium text-slate-500 border-r border-slate-200 pr-2 leading-none">
                  إدارة العمليات والتوصيل
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-none">فرع صنعاء الرئيسي</p>
            </div>
          </div>

          {/* Simulation Tools for Reviewers */}
          <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-lg border border-slate-200/70 text-xs">
            <span className="text-[11px] text-slate-400 px-2 hidden sm:inline-block">اختبار الحالات:</span>
            
            <button
              onClick={onSimulateLoading}
              disabled={isLoading}
              title="محاكاة حالة التحميل"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-slate-700 hover:text-slate-900 hover:bg-white rounded font-medium transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RotateCw size={12} className={isLoading ? 'animate-spin text-amber-600' : 'text-slate-400'} />
              <span>تحميل</span>
            </button>

            <button
              onClick={onSimulateError}
              disabled={isLoading}
              title="محاكاة خطأ الشبكة وزر إعادة المحاولة"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-rose-700 hover:bg-rose-50 rounded font-medium transition-colors disabled:opacity-50 cursor-pointer"
            >
              <AlertCircle size={12} className="text-rose-500" />
              <span>خطأ</span>
            </button>

            <button
              onClick={onReset}
              disabled={isLoading}
              title="إعادة تعيين الحالة الافتراضية"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-slate-600 hover:bg-white rounded font-medium transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RefreshCcw size={12} className="text-slate-400" />
              <span>استعادة</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
