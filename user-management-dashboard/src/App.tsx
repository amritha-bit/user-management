import { useEffect } from 'react';
import { fetchUsers } from './api/User';

const App = () => {
  useEffect(() => {
    fetchUsers().then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center py-10">
        User Management Dashboard
      </h1>
    </div>
  );
};

export default App;