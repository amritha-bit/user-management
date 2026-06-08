import { useState, useMemo } from 'react';
import { useUsers } from '../hooks/UseUser';
import { useDebounce } from '../hooks/UseDebounce';
import { useFavorites } from '../hooks/UseFavorites';
import { searchUsers, sortUsers, filterUsers, paginateUsers, getTotalPages, exportToCSV } from '../utils/Filter';
import type { SortField, SortOrder, ViewMode, FilterState } from '../types/Index';
import SearchInput from '../components/SearchInput';
import UserCard from '../components/Usercard';
import UserTable from '../components/UserTable';
import Pagination from '../components/Paginantion';
import SkeletonCard from '../components/SkeltonCard';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components//ErrorState';

const PER_PAGE = 5;

const UserListPage = () => {

  // ── Data ──────────────────────────────────────────
  const { users, loading, error, retry } = useUsers();
  const { favorites, toggle: toggleFavorite } = useFavorites();

  // ── UI State ──────────────────────────────────────
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [filters, setFilters] = useState<FilterState>({ city: '', company: '' });
  const [page, setPage] = useState(1);

  // ── Debounced search ──────────────────────────────
  const debouncedSearch = useDebounce(search, 400);

  // ── Dropdown options ──────────────────────────────
  const cities = useMemo(() => {
    return [...new Set(users.map((u) => u.address.city))].sort();
  }, [users]);

  const companies = useMemo(() => {
    return [...new Set(users.map((u) => u.company.name))].sort();
  }, [users]);

  // ── Process users (search → filter → sort) ────────
  const processedUsers = useMemo(() => {
    let result = searchUsers(users, debouncedSearch);
    result = filterUsers(result, filters);
    result = sortUsers(result, sortField, sortOrder);
    return result;
  }, [users, debouncedSearch, filters, sortField, sortOrder]);

  // ── Pagination ────────────────────────────────────
  const totalPages = getTotalPages(processedUsers.length, PER_PAGE);
  const pagedUsers = paginateUsers(processedUsers, page, PER_PAGE);

  // ── Handlers ──────────────────────────────────────
  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleFilter = (key: keyof FilterState, val: string) => {
    setFilters((prev) => ({ ...prev, [key]: val }));
    setPage(1);
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setFilters({ city: '', company: '' });
    setPage(1);
  };

  const hasActiveFilters = search || filters.city || filters.company;

  // ── Error state ───────────────────────────────────
  if (error) {
    return <ErrorState message={error} onRetry={retry} />;
  }

  // ── Render ────────────────────────────────────────
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-sm text-gray-400 mt-1">
          {loading ? 'Loading...' : `${processedUsers.length} users found`}
        </p>
      </div>

      {/* Controls Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 space-y-4">

        {/* Row 1 - Search + View Toggle + Export */}
        <div className="flex flex-col sm:flex-row gap-3">

          <SearchInput value={search} onChange={handleSearch} />

          {/* View Toggle */}
          <div className="flex border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode('card')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === 'card'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              ⊞ Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              ≡ Table
            </button>
          </div>

          {/* Export Button */}
          <button
            onClick={() => exportToCSV(processedUsers)}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm 
              text-gray-600 hover:bg-gray-100 transition-colors"
          >
            ↓ Export CSV
          </button>

        </div>

        {/* Row 2 - Filters + Sort */}
        <div className="flex flex-wrap gap-3">

          {/* City Filter */}
          <select
            value={filters.city}
            onChange={(e) => handleFilter('city', e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm 
              text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          {/* Company Filter */}
          <select
            value={filters.company}
            onChange={(e) => handleFilter('company', e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm 
              text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Companies</option>
            {companies.map((company) => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>

          {/* Sort Buttons */}
          {(['name', 'username', 'email'] as SortField[]).map((field) => (
            <button
              key={field}
              onClick={() => handleSort(field)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                sortField === field
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-200 text-gray-600 hover:border-blue-300'
              }`}
            >
              {field} {sortField === field ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </button>
          ))}

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 rounded-xl text-xs font-medium 
                text-red-500 border border-red-200 hover:bg-red-50 transition-colors"
            >
              ✕ Clear all
            </button>
          )}

        </div>

      </div>

      {/* User Grid or Table */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : pagedUsers.length === 0 ? (
        <EmptyState />
      ) : viewMode === 'card' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {pagedUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isFavorite={favorites.has(user.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <UserTable
          users={pagedUsers}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      )}

      {/* Pagination */}
      {!loading && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

    </main>
  );
};

export default UserListPage;