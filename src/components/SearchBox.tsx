const SearchBox: React.FC<{
  placeholder: string;
  setKeyword: (keyword: string) => void;
}> = ({ placeholder, setKeyword }) => {
  const search = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.currentTarget.value;
    setKeyword(keyword);
  };

  return (
    <form action="" method="">
      <label htmlFor="topbar-search" className="sr-only">
        Search
      </label>
      <div className="relative">
        {/* Search icon */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="absolute h-4 w-4 text-slate-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {/* Text field */}
        <input
          type="text"
          name=""
          id="topbar-search"
          onChange={search}
          className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 p-2 pl-9 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          placeholder={placeholder ? placeholder : "Search"}
        />
      </div>
    </form>
  );
};

export default SearchBox;
