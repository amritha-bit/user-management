import { searchUsers, sortUsers, filterUsers, paginateUsers, getTotalPages } from '../utils/Filter';
import type { User } from '../types/Index';

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Alice Smith',
    username: 'alice',
    email: 'alice@example.com',
    phone: '123',
    website: 'alice.com',
    address: {
      street: '1 Main',
      suite: 'A1',
      city: 'Springfield',
      zipcode: '11111',
      geo: { lat: '0', lng: '0' },
    },
    company: {
      name: 'Acme Corp',
      catchPhrase: 'Quality',
      bs: 'synergize',
    },
  },
  {
    id: 2,
    name: 'Bob Jones',
    username: 'bjones',
    email: 'bob@test.com',
    phone: '456',
    website: 'bob.com',
    address: {
      street: '2 Oak',
      suite: 'B2',
      city: 'Shelbyville',
      zipcode: '22222',
      geo: { lat: '1', lng: '1' },
    },
    company: {
      name: 'Beta LLC',
      catchPhrase: 'Innovation',
      bs: 'leverage',
    },
  },
  {
    id: 3,
    name: 'Carol White',
    username: 'carol',
    email: 'carol@demo.com',
    phone: '789',
    website: 'carol.com',
    address: {
      street: '3 Elm',
      suite: 'C3',
      city: 'Springfield',
      zipcode: '33333',
      geo: { lat: '2', lng: '2' },
    },
    company: {
      name: 'Acme Corp',
      catchPhrase: 'Trust',
      bs: 'disrupt',
    },
  },
];
// ── searchUsers ──────────────────────────────────────

describe('searchUsers', () => {

  it('returns all users when query is empty', () => {
    const result = searchUsers(mockUsers, '');
    expect(result).toHaveLength(3);
  });

  it('finds user by name', () => {
    const result = searchUsers(mockUsers, 'alice');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Alice Smith');
  });

  it('is case insensitive', () => {
    const result = searchUsers(mockUsers, 'ALICE');
    expect(result).toHaveLength(1);
  });

  it('finds user by username', () => {
    const result = searchUsers(mockUsers, 'bjones');
    expect(result).toHaveLength(1);
  });

  it('finds user by email', () => {
    const result = searchUsers(mockUsers, 'carol@demo');
    expect(result).toHaveLength(1);
  });

  it('returns empty array when no match', () => {
    const result = searchUsers(mockUsers, 'xyz999');
    expect(result).toHaveLength(0);
  });

});

// ── sortUsers ────────────────────────────────────────

describe('sortUsers', () => {

  it('sorts by name ascending', () => {
    const result = sortUsers(mockUsers, 'name', 'asc');
    expect(result[0].name).toBe('Alice Smith');
    expect(result[2].name).toBe('Carol White');
  });

  it('sorts by name descending', () => {
    const result = sortUsers(mockUsers, 'name', 'desc');
    expect(result[0].name).toBe('Carol White');
  });

  it('sorts by email ascending', () => {
    const result = sortUsers(mockUsers, 'email', 'asc');
    expect(result[0].email).toBe('alice@example.com');
  });

  it('does not mutate original array', () => {
    const original = [...mockUsers];
    sortUsers(mockUsers, 'name', 'desc');
    expect(mockUsers).toEqual(original);
  });

});

// ── filterUsers ──────────────────────────────────────

describe('filterUsers', () => {

  it('returns all users when no filters', () => {
    const result = filterUsers(mockUsers, { city: '', company: '' });
    expect(result).toHaveLength(3);
  });

  it('filters by city', () => {
    const result = filterUsers(mockUsers, { city: 'Springfield', company: '' });
    expect(result).toHaveLength(2);
  });

  it('filters by company', () => {
    const result = filterUsers(mockUsers, { city: '', company: 'Acme Corp' });
    expect(result).toHaveLength(2);
  });

  it('filters by both city and company', () => {
    const result = filterUsers(mockUsers, { city: 'Springfield', company: 'Acme Corp' });
    expect(result).toHaveLength(2);
  });

  it('returns empty when nothing matches', () => {
    const result = filterUsers(mockUsers, { city: 'Springfield', company: 'Beta LLC' });
    expect(result).toHaveLength(0);
  });

});

// ── paginateUsers ────────────────────────────────────

describe('paginateUsers', () => {

  const items = [1, 2, 3, 4, 5, 6, 7];

  it('returns first 5 items on page 1', () => {
    const result = paginateUsers(items, 1, 5);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('returns remaining items on page 2', () => {
    const result = paginateUsers(items, 2, 5);
    expect(result).toEqual([6, 7]);
  });

});

// ── getTotalPages ────────────────────────────────────

describe('getTotalPages', () => {

  it('calculates exact pages', () => {
    expect(getTotalPages(10, 5)).toBe(2);
  });

  it('rounds up when items do not divide evenly', () => {
    expect(getTotalPages(11, 5)).toBe(3);
  });

  it('returns 0 when no items', () => {
    expect(getTotalPages(0, 5)).toBe(0);
  });

});