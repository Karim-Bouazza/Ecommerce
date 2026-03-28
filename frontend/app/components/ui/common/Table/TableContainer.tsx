import TablePagination from "./TablePagination";

const PAGESIZE = 1000;

export default function TableContainer({
  children,
  handlePaginationNextChange,
  handlePaginationPreviousChange,
  page,
  total,
}: {
  children: React.ReactNode;
  handlePaginationNextChange: () => void;
  handlePaginationPreviousChange: () => void;
  page: number;
  total: number;
  pageSize?: number;
}) {
  return (
    <div className="w-full px-5 pb-10 pt-2">
      <div className="w-full rounded-2xl border border-gray-200 bg-white px-4 transition-opacity duration-300">
        {children}

        <TablePagination
          onNext={handlePaginationNextChange}
          onPrevious={handlePaginationPreviousChange}
          currentPage={page}
          totalPages={Math.ceil(total / PAGESIZE)}
        />
      </div>
    </div>
  );
}
