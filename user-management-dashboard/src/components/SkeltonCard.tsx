const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
      <div className="w-12 h-12 rounded-xl bg-gray-200 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
      <div className="h-3 bg-gray-200 rounded w-full mb-2" />
      <div className="h-3 bg-gray-200 rounded w-5/6 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-4/6" />
    </div>
  );
};

export default SkeletonCard;