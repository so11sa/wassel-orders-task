import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  onRetry: () => void;
  message?: string;
  isRetrying?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  onRetry,
  message = 'تعذر تحميل بيانات الطلبات بسبب خطأ في الاتصال بالخادم.',
  isRetrying = false,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-8 sm:p-10 text-center my-6">
      <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
        <AlertCircle size={24} />
      </div>

      <h3 className="text-base font-bold text-slate-900 mb-1">
        تعذر تحميل قائمة الطلبات
      </h3>

      <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5 leading-relaxed">
        {message}
      </p>

      <button
        onClick={onRetry}
        disabled={isRetrying}
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg text-xs transition-colors cursor-pointer disabled:opacity-50"
      >
        <RefreshCw size={14} className={isRetrying ? 'animate-spin' : ''} />
        <span>{isRetrying ? 'جارٍ إعادة المحاولة...' : 'إعادة المحاولة'}</span>
      </button>
    </div>
  );
};
