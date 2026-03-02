"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { TableSearchProps } from "@/src/types";

export default function TableSearch({ value, onSearch }: TableSearchProps) {
  return (
    <div className={`flex gap-1 w-full md:max-w-[350px]`}>
      <Input
        placeholder="Recherche par ..."
        value={value}
        onChange={(e) => onSearch?.(e.target.value)}
        className="text-sm"
      />
      <Button
        variant="outline"
        size="icon"
        className="shrink-0 h-9 w-9"
        onClick={() => onSearch?.(value)}
      >
        <Search size={16} />
      </Button>
    </div>
  );
}
