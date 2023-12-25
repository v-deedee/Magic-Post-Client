import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface IPaginationProps {
  itemCount: number;
  currentPage: number;
  setCurrentPage: (newPage: number) => void;
}

export const ITEMS_PER_PAGE = 5;

const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  setCurrentPage,
  itemCount,
}) => {
  const pageCount = itemCount / ITEMS_PER_PAGE + 1;
  const changePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= pageCount) {
      setCurrentPage(newPage);
    }
  };

  return (
    <nav
      className="flex-column flex flex-wrap items-center justify-between pt-4 md:flex-row"
      aria-label="Table navigation"
    >
      <span className="mb-4 block w-full text-sm font-normal text-gray-500 dark:text-gray-400 md:mb-0 md:inline md:w-auto">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {1 + (currentPage - 1) * ITEMS_PER_PAGE}-
          {ITEMS_PER_PAGE + (currentPage - 1) * ITEMS_PER_PAGE <= itemCount
            ? ITEMS_PER_PAGE + (currentPage - 1) * ITEMS_PER_PAGE
            : itemCount}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {itemCount}
        </span>
      </span>
      <ul className="inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse">
        <li>
          <button
            className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-gray-300 bg-white px-3 text-lg leading-tight text-black hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white disabled:dark:text-gray-400 disabled:dark:hover:bg-gray-800 disabled:dark:hover:text-gray-400"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <HiChevronLeft />
          </button>
        </li>
        <li>
          <button
            className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 text-lg leading-tight text-black hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white disabled:dark:text-gray-400 disabled:dark:hover:bg-gray-800 disabled:dark:hover:text-gray-400"
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === pageCount}
          >
            <HiChevronRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
