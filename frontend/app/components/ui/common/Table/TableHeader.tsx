"use client";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Column {
  id: string;
  name: string;
}

interface TableHeaderComponentProps {
  columns: Column[];
  hasActions?: boolean;
}

export default function TableHeaderComponent({
  columns,
  hasActions = true,
}: TableHeaderComponentProps) {
  return (
    <TableHeader>
      <TableRow className="px-2">
        {columns.map((column) => (
          <TableHead key={column.id}>{column.name}</TableHead>
        ))}

        {/* {hasActions && <TableHead className="text-right">Actions</TableHead>} */}
      </TableRow>
    </TableHeader>
  );
}
