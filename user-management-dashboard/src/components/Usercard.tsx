import { useNavigate } from 'react-router-dom';
import  type{ User } from '../types/Index';

interface Props {
  user: User;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const UserCard = ({ user, isFavorite, onToggleFavorite }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/users/${user.id}`)}
      className="bg-white rounded-2xl p-6 border border-gray-100 
        cursor-pointer hover:shadow-lg hover:-translate-y-1 
        transition-all duration-300"
    >

      {/* Top row - avatar + favorite button */}
      <div className="flex items-center justify-between mb-4">

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-bold text-lg">
              {user.name.charAt(0)}
            </span>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 text-sm">{user.name}</h2>
            <p className="text-xs text-blue-500">@{user.username}</p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(user.id);
          }}
          className="text-2xl"
        >
          {isFavorite ? '⭐' : '☆'}
        </button>

      </div>

      {/* User details */}
      <div className="space-y-1.5 text-sm text-gray-500">
        <p>✉️ {user.email}</p>
        <p>📞 {user.phone}</p>
        <p>📍 {user.address.city}</p>
        <p>🏢 {user.company.name}</p>
        <p>🌐 {user.website}</p>
      </div>

    </div>
  );
};

export default UserCard;