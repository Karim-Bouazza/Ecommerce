"use client";

import { useQuery } from "@tanstack/react-query";
import type { ListOrdersParams } from "../../types";
import { ordersKeys } from "./queryKeys";
import { orderService } from "../../services/order.service";

export default function useOrders(params: ListOrdersParams = {}) {
  return useQuery({
    queryKey: ordersKeys.list(params),
    queryFn: () => orderService.list(params),
    staleTime: 2 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
