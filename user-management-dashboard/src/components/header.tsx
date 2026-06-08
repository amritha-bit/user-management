const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <span className="text-2xl">👥</span>
          <span className="font-bold text-gray-900 text-lg">UserFlow</span>
        </div>

        <p className="text-sm text-gray-400">User Management Dashboard</p>

      </div>
    </header>
  );
};

export default Header;