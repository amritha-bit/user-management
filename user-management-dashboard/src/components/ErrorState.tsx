interface Props {
  value: string;
  message?: string;
  onRetry: () => void;
  onChange: (val: string) => void;
}

const SearchInput = ({ value, onChange }: Props) => {
  return (
    <div className="flex-1">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, username, or email..."
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200
          text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchInput;