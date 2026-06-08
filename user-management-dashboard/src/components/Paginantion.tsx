interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-xl text-sm border border-gray-200
          disabled:opacity-40 hover:bg-gray-50 transition-colors"
      >
        ← Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 rounded-xl text-sm font-medium transition-all
            ${page === currentPage
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-xl text-sm border border-gray-200
          disabled:opacity-40 hover:bg-gray-50 transition-colors"
      >
        Next →
      </button>

      <span className="text-sm text-gray-400 ml-2">
        Page {currentPage} of {totalPages}
      </span>

    </div>
  );
};

export default Pagination;