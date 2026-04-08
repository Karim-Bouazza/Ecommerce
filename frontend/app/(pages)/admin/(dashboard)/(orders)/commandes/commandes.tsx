"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import TableContainer from "@/app/components/ui/common/Table/TableContainer";
import TableHeaderComponent from "@/app/components/ui/common/Table/TableHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/app/components/ui/common/Table/TablePrimitives";
import TableHeaderPage from "@/app/components/ui/common/Table/TableHeaderPage";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ordersColumns } from "./data";
import type { OrderListItem, OrderStatus } from "./types";
import useOrders from "./hooks/core/useOrders";

const statusOptions: { label: string; value: "ALL" | OrderStatus }[] = [
  { label: "Tous", value: "ALL" },
  { label: "En attente", value: "PENDING" },
  { label: "Confirmée", value: "CONFIRMED" },
  { label: "Expédiée", value: "SHIPPID" },
  { label: "En livraison", value: "OUT_FOR_DELIVERY" },
  { label: "Échouée", value: "FAILED" },
  { label: "Retournée", value: "RETURNED" },
  { label: "Livrée", value: "DELIVERED" },
];

function getStatusLabel(status: string): string {
  const match = statusOptions.find((option) => option.value === status);
  return match?.label ?? status;
}

function getStatusClassName(status: string): string {
  if (status === "FAILED") {
    return "bg-red-100 text-red-700 border-red-200";
  }

  if (status === "DELIVERED") {
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  }

  if (status === "RETURNED") {
    return "bg-amber-100 text-amber-700 border-amber-200";
  }

  return "bg-muted text-muted-foreground border-border";
}

type OrdersTableProps = {
  isLoading: boolean;
  isError: boolean;
  orders: OrderListItem[];
  page: number;
  onViewOrder: (orderId: number) => void;
};

const OrdersTable = React.memo(function OrdersTable({
  isLoading,
  isError,
  orders,
  page,
  onViewOrder,
}: OrdersTableProps) {
  return (
    <div className="w-full min-w-0 overflow-x-auto rounded-xl">
      <Table className="w-full table-auto [&_thead_th:last-child]:text-right [&_thead_th:last-child]:pr-12">
        <TableHeaderComponent columns={ordersColumns} />

        <TableBody className="text-left">
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-8 text-center text-muted-foreground"
              >
                Chargement des commandes...
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-8 text-center text-destructive"
              >
                Une erreur est survenue lors du chargement des commandes.
              </TableCell>
            </TableRow>
          ) : orders.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-8 text-center text-muted-foreground"
              >
                Aucune commande trouvée.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order, index) => (
              <TableRow key={order.id ?? index} className="h-12">
                <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                <TableCell>{order.nom || "-"}</TableCell>
                <TableCell>{order.prenom || "-"}</TableCell>
                <TableCell>{order.numero_telephone || "-"}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${getStatusClassName(
                      order.status,
                    )}`}
                  >
                    {getStatusLabel(order.status)}
                  </span>
                </TableCell>
                <TableCell className="pr-8 text-right">
                  <div className="flex justify-end">
                    <Button size="sm" onClick={() => onViewOrder(order.id)}>
                      Voir
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
});

export default function Commandes() {
  const router = useRouter();
  const [status, setStatus] = useState<"ALL" | OrderStatus>("ALL");

  const filters = useMemo(
    () => ({
      status: status === "ALL" ? undefined : status,
      page: 1,
      per_page: 100,
    }),
    [status],
  );

  const { data, isLoading, isError } = useOrders(filters);
  const orders = data ?? [];

  const page = 1;
  const total = Math.max(orders.length, 1);

  const handleViewOrder = (orderId: number) => {
    router.push(`/admin/commandes/${orderId}`);
  };

  return (
    <div className="w-full min-w-0">
      <TableContainer
        handlePaginationPreviousChange={() => undefined}
        handlePaginationNextChange={() => undefined}
        page={page}
        total={total}
      >
        <TableHeaderPage title="Commandes">
          <div className="w-52">
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as "ALL" | OrderStatus)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </TableHeaderPage>

        <OrdersTable
          isLoading={isLoading}
          isError={isError}
          orders={orders}
          page={page}
          onViewOrder={handleViewOrder}
        />
      </TableContainer>
    </div>
  );
}
