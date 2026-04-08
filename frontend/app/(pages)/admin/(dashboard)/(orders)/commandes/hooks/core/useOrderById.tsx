"use client";

import { useQuery } from "@tanstack/react-query";
import { ordersKeys } from "./queryKeys";
import { orderService } from "../../services/order.service";

export default function useOrderById(orderId: string | number) {
  return useQuery({
    queryKey: ordersKeys.details(orderId),
    queryFn: () => orderService.getById(orderId),
    enabled: Boolean(orderId),
    staleTime: 2 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
