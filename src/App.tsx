import { useState, useMemo, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { StatsCards } from './components/StatsCards';
import { SearchAndFilters } from './components/SearchAndFilters';
import { OrdersTable } from './components/OrdersTable';
import { OrderCard } from './components/OrderCard';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { ErrorState } from './components/ErrorState';
import { EmptyState } from './components/EmptyState';
import { mockOrders } from './data/mockOrders';
import type { Order, SortField, SortOrder, StatusFilter } from './types/order';

export function App() {
  // State management
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Filters & Sorting state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Simulation: Fetch orders with simulated async delay
  const fetchOrders = useCallback((forceFail: boolean = false) => {
    setIsLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      if (forceFail) {
        setIsLoading(false);
        setError('تعذر الاتصال بالخادم لتحديث قائمة الشحنات (خطأ 503).');
      } else {
        setOrders(mockOrders);
        setIsLoading(false);
        setError(null);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Initial load simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSimulateLoading = () => {
    fetchOrders(false);
  };

  const handleSimulateError = () => {
    fetchOrders(true);
  };

  const handleRetry = () => {
    fetchOrders(false);
  };

  const handleReset = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setSortField('date');
    setSortOrder('desc');
    fetchOrders(false);
  };

  const handleToggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleSortFieldChange = (field: SortField) => {
    if (sortField === field) {
      handleToggleSortOrder();
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Status counts for filter badges
  const statusCounts = useMemo(() => {
    return {
      all: orders.length,
      new: orders.filter((o) => o.status === 'new').length,
      on_the_way: orders.filter((o) => o.status === 'on_the_way').length,
      delivered: orders.filter((o) => o.status === 'delivered').length,
    };
  }, [orders]);

  // Filter and sort logic
  const filteredAndSortedOrders = useMemo(() => {
    return orders
      .filter((order) => {
        const query = searchQuery.trim().toLowerCase();
        const matchesName =
          !query || order.customer.toLowerCase().includes(query);

        const matchesStatus =
          statusFilter === 'all' || order.status === statusFilter;

        return matchesName && matchesStatus;
      })
      .sort((a, b) => {
        let comparison = 0;
        if (sortField === 'date') {
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        } else if (sortField === 'amount') {
          comparison = a.total - b.total;
        }

        return sortOrder === 'asc' ? comparison : -comparison;
      });
  }, [orders, searchQuery, statusFilter, sortField, sortOrder]);

  const hasActiveFilters = searchQuery !== '' || statusFilter !== 'all';

  return (
    <div className="min-h-screen bg-slate-50/70 flex flex-col text-slate-900" dir="rtl">
      {/* App Header */}
      <Header
        onSimulateLoading={handleSimulateLoading}
        onSimulateError={handleSimulateError}
        onReset={handleReset}
        isLoading={isLoading}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        {/* Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              طلبات التوصيل
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              متابعة وإدارة مسار شحنات العملاء في صنعاء
            </p>
          </div>
        </div>

        {/* Overview Stats */}
        <StatsCards
          orders={orders}
          onFilterByStatus={setStatusFilter}
          activeStatus={statusFilter}
        />

        {/* Search & Filters */}
        <SearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          sortField={sortField}
          onSortFieldChange={handleSortFieldChange}
          sortOrder={sortOrder}
          onToggleSortOrder={handleToggleSortOrder}
          totalFilteredCount={filteredAndSortedOrders.length}
          statusCounts={statusCounts}
        />

        {/* Content Body */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState onRetry={handleRetry} message={error} isRetrying={isLoading} />
        ) : filteredAndSortedOrders.length === 0 ? (
          <EmptyState
            searchQuery={searchQuery}
            onClearFilters={() => {
              setSearchQuery('');
              setStatusFilter('all');
            }}
            hasFiltersActive={hasActiveFilters}
          />
        ) : (
          <div className="space-y-3">
            {/* Desktop Table View */}
            <OrdersTable
              orders={filteredAndSortedOrders}
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSortFieldChange}
            />

            {/* Mobile Card View */}
            <div className="md:hidden space-y-2.5">
              {filteredAndSortedOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-4 text-center text-xs text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-slate-500">
            شركة وصّل لخدمات التوصيل السريع • لوحة تحكم العمليات
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
