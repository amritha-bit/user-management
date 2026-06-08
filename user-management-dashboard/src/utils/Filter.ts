import type { User, SortField, SortOrder, FilterState } from '../types/Index';

export const searchUsers = (users: User[], query: string): User[] => {
  if (!query.trim()) return users;
  
  const q = query.toLowerCase();
  
  return users.filter(
    (u) =>
      u.name.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
  );
};
export const sortUsers = (users: User[], field: SortField, order: SortOrder): User[] => {
  return [...users].sort((a, b) => {
    const valA = String(a[field]).toLowerCase();
    const valB = String(b[field]).toLowerCase();
    
    if (valA < valB) return order === 'asc' ? -1 : 1;
    if (valA > valB) return order === 'asc' ? 1 : -1;
    return 0;
  });
};
export const filterUsers = (users: User[], filters: FilterState): User[] => {
  return users.filter((u) => {
    const cityMatch = !filters.city || u.address.city === filters.city;
    const companyMatch = !filters.company || u.company.name === filters.company;
    return cityMatch && companyMatch;
  });
};
export const paginateUsers = <T>(items: T[], page: number, perPage: number): T[] => {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
};

export const getTotalPages = (total: number, perPage: number): number => {
  return Math.ceil(total / perPage);
};
export const exportToCSV = (users: User[]): void => {
  const headers = ['ID', 'Name', 'Username', 'Email', 'Phone', 'Website', 'City', 'Company'];
  
  const rows = users.map((u) => [
    u.id,
    u.name,
    u.username,
    u.email,
    u.phone,
    u.website,
    u.address.city,
    u.company.name,
  ]);

  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'users.csv';
  a.click();
  URL.revokeObjectURL(url);
};