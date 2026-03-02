"use client";

import { Button } from "@/components/ui/button";

export default function TablePagination({
  onNext,
  onPrevious,
  currentPage,
  totalPages,
}: {
  onNext: () => void;
  onPrevious: () => void;
  currentPage: number;
  totalPages: number;
}) {

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-4">
      <div className="text-muted-foreground text-xs sm:text-sm order-2 sm:order-1">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex gap-2 order-1 sm:order-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPrevious()}
          disabled={currentPage <= 1}
          className="text-sm sm:text-sm h-10 sm:h-8 px-4 sm:px-3"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNext()}
          disabled={currentPage >= totalPages}
          className="text-sm sm:text-sm h-10 sm:h-8 px-4 sm:px-3"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
