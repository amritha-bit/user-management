import { useNavigate } from 'react-router-dom';
import type{ User, SortField, SortOrder } from '../types/Index';

interface Props {
  users: User[];
  favorites: Set<number>;
  onToggleFavorite: (id: number) => void;
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

const UserTable = ({
  users,
  favorites,
  onToggleFavorite,
  sortField,
  sortOrder,
  onSort,
}: Props) => {
  const navigate = useNavigate();

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return '↕';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white">
      <table className="w-full">

        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>

            <th
              onClick={() => onSort('name')}
              className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:text-gray-700"
            >
              Name {getSortIcon('name')}
            </th>

            <th
              onClick={() => onSort('username')}
              className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:text-gray-700"
            >
              Username {getSortIcon('username')}
            </th>

            <th
              onClick={() => onSort('email')}
              className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:text-gray-700"
            >
              Email {getSortIcon('email')}
            </th>

            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
              Phone
            </th>

            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
              City
            </th>

            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
              Company
            </th>

            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
              Fav
            </th>

          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              onClick={() => navigate(`/users/${user.id}`)}
              className="border-b border-gray-50 cursor-pointer hover:bg-blue-50 transition-colors"
            >

              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                {user.name}
              </td>

              <td className="px-4 py-3 text-sm text-blue-500">
                @{user.username}
              </td>

              <td className="px-4 py-3 text-sm text-gray-600">
                {user.email}
              </td>

              <td className="px-4 py-3 text-sm text-gray-600">
                {user.phone}
              </td>

              <td className="px-4 py-3 text-sm text-gray-600">
                {user.address.city}
              </td>

              <td className="px-4 py-3 text-sm text-gray-600">
                {user.company.name}
              </td>

              <td className="px-4 py-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(user.id);
                  }}
                  className="text-xl"
                >
                  {favorites.has(user.id) ? '⭐' : '☆'}
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default UserTable;