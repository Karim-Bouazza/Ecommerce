"use client";

import { useMutation } from "@tanstack/react-query";
import { clientOrdersKeys } from "./queryKeys";
import { clientOrderService } from "../../services/order.service";
import type { ClientCreateOrderPayload } from "../../types";

export default function useCreateOrder() {
    return useMutation({
        mutationKey: clientOrdersKeys.create(),
        mutationFn: (payload: ClientCreateOrderPayload) =>
            clientOrderService.create(payload),
    });
}
