interface Props {
  message: string;
  onRetry: () => void;
}

const ErrorState = ({ message, onRetry }: Props) => {
  return (
    <div className="text-center py-20">
      <p className="text-5xl mb-4">⚠️</p>
      <h3 className="text-lg font-semibold text-gray-700">
        Something went wrong
      </h3>
      <p className="text-sm text-gray-400 mt-1 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="px-5 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorState;