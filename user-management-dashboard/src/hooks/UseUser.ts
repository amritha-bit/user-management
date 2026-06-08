import { useState, useEffect } from 'react';
import type {User} from '../types/Index';
import { fetchUsers } from '../api/User';

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchUsers()
      .then((data) => {
        if (!cancelled) {
          setUsers(data);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message || 'Failed to fetch users');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  const retry = () => setRetryCount((c) => c + 1);

  return { users, loading, error, retry };
};