import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { User } from '../types/Index';
import { fetchUserById } from '../api/User';

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetchUserById(Number(id))
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48" />
          <div className="h-40 bg-gray-200 rounded-2xl" />
          <div className="h-40 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  // Error state
  if (error || !user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <p className="text-red-500 mb-4">{error ?? 'User not found'}</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 
          hover:text-blue-600 transition-colors mb-6"
      >
        ← Back to Users
      </button>

      {/* User Hero */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-bold text-2xl">
              {user.name.charAt(0)}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-blue-500 text-sm">@{user.username}</p>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
        <h2 className="font-bold text-gray-700 mb-4 uppercase text-xs tracking-wider">
          Basic Information
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Email</span>
            <span className="text-gray-700">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Phone</span>
            <span className="text-gray-700">{user.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Website</span>
            <span className="text-gray-700">{user.website}</span>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
        <h2 className="font-bold text-gray-700 mb-4 uppercase text-xs tracking-wider">
          Address
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Street</span>
            <span className="text-gray-700">{user.address.street}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Suite</span>
            <span className="text-gray-700">{user.address.suite}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">City</span>
            <span className="text-gray-700">{user.address.city}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Zipcode</span>
            <span className="text-gray-700">{user.address.zipcode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Latitude</span>
            <span className="text-gray-700">{user.address.geo.lat}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Longitude</span>
            <span className="text-gray-700">{user.address.geo.lng}</span>
          </div>
        </div>
      </div>

      {/* Company */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-bold text-gray-700 mb-4 uppercase text-xs tracking-wider">
          Company
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Name</span>
            <span className="text-gray-700">{user.company.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Catch Phrase</span>
            <span className="text-gray-700">{user.company.catchPhrase}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Description</span>
            <span className="text-gray-700">{user.company.bs}</span>
          </div>
        </div>
      </div>

    </main>
  );
};

export default UserDetailPage;