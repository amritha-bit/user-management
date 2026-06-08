interface Props {
  message?: string;
}

const EmptyState = ({ message = 'No users found' }: Props) => {
  return (
    <div className="text-center py-20">
      <p className="text-5xl mb-4">👥</p>
      <h3 className="text-lg font-semibold text-gray-700">{message}</h3>
      <p className="text-sm text-gray-400 mt-1">
        Try adjusting your search or filters
      </p>
    </div>
  );
};

export default EmptyState;