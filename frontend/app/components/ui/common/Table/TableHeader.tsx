"use client";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Column {
  id: string;
  name: string;
}

interface TableHeaderComponentProps {
  columns: Column[];
}

export default function TableHeaderComponent({
  columns,
}: TableHeaderComponentProps) {
  return (
    <TableHeader className="[&_tr]:border-b-0 bg-[#f1f6f5]">
      <TableRow>
        {columns.map((column) => (
          <TableHead
            key={column.id}
            className={column.id.startsWith("action") ? "text-center" : ""}
          >
            {column.name}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
