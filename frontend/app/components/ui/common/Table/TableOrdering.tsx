"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownUp } from "lucide-react";

interface OrderOption {
  id: string;
  label: string;
}

interface TableOrderingProps {
  options: OrderOption[];
  selectedOrders: string;
  onOrderChange: (orderId: string) => void;
}

export function TableOrdering({
  options,
  selectedOrders,
  onOrderChange,
}: TableOrderingProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-9 gap-2">
          Order
          <ArrowDownUp size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.id}
            checked={selectedOrders === option.id}
            onCheckedChange={() => onOrderChange(option.id)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
