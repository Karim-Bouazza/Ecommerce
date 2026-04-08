"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageContainer from "@/app/components/ui/common/PageContainer";
import Loading from "@/app/components/ui/common/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/app/components/ui/common/Table/TablePrimitives";
import useOrderById from "../hooks/core/useOrderById";
import type { OrderDetailsItem } from "../types";

function formatDate(value?: string | null): string {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("fr-FR");
}

function formatCurrency(value: string | number): string {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return "-";
  }

  return new Intl.NumberFormat("fr-DZ", {
    style: "currency",
    currency: "DZD",
  }).format(parsed);
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

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    PENDING: "En attente",
    CONFIRMED: "Confirmée",
    SHIPPID: "Expédiée",
    OUT_FOR_DELIVERY: "En livraison",
    FAILED: "Échouée",
    RETURNED: "Retournée",
    DELIVERED: "Livrée",
  };

  return labels[status] ?? status;
}

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = String(params.id ?? "");

  const { data: order, isLoading, isError } = useOrderById(orderId);

  const totalItems = useMemo(
    () =>
      (order?.items ?? []).reduce(
        (acc: number, item: OrderDetailsItem) => acc + item.quantity,
        0,
      ),
    [order?.items],
  );

  if (isLoading) {
    return <Loading message="Chargement de la commande..." />;
  }

  if (isError || !order) {
    return (
      <PageContainer>
        <Card>
          <CardHeader>
            <CardTitle>Impossible de charger cette commande</CardTitle>
            <CardDescription>
              Vérifiez l'identifiant de la commande ou réessayez plus tard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              onClick={() => router.push("/admin/commandes")}
            >
              Retour aux commandes
            </Button>
          </CardContent>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-border/70">
          <CardHeader className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle className="text-2xl">Commande #{order.id}</CardTitle>
                <CardDescription className="mt-1">
                  Détails complets de la commande client.
                </CardDescription>
              </div>
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClassName(
                  order.status,
                )}`}
              >
                {getStatusLabel(order.status)}
              </span>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-xl border bg-muted/20 p-4">
              <h3 className="text-sm font-semibold">Client</h3>
              <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                <p>
                  <span className="font-medium">Nom:</span> {order.nom}
                </p>
                <p>
                  <span className="font-medium">Prénom:</span> {order.prenom}
                </p>
                <p>
                  <span className="font-medium">Téléphone:</span>{" "}
                  {order.numero_telephone}
                </p>
                <p>
                  <span className="font-medium">Wilaya:</span> {order.wilaya}
                </p>
                <p>
                  <span className="font-medium">Baladia:</span> {order.baladia}
                </p>
              </div>
            </div>

            <div className="rounded-xl border p-3">
              <div className="overflow-x-auto rounded-lg">
                <Table className="w-full table-auto">
                  <thead>
                    <tr className="border-b text-left text-sm text-muted-foreground">
                      <th className="px-4 py-2 font-medium">Produit</th>
                      <th className="px-4 py-2 font-medium">Quantité</th>
                      <th className="px-4 py-2 font-medium">Prix unitaire</th>
                      <th className="px-4 py-2 font-medium">Total ligne</th>
                    </tr>
                  </thead>
                  <TableBody>
                    {order.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          {item.product_title ?? `Produit #${item.product_id}`}
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{formatCurrency(item.unit_price)}</TableCell>
                        <TableCell>
                          {formatCurrency(item.total_price)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit border-border/70">
          <CardHeader>
            <CardTitle className="text-lg">Résumé</CardTitle>
            <CardDescription>Vue rapide de la commande</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-muted-foreground">Articles</span>
              <span className="font-medium">{totalItems}</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-muted-foreground">Créée le</span>
              <span className="font-medium">
                {formatDate(order.created_at)}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-muted-foreground">Modifiée le</span>
              <span className="font-medium">
                {formatDate(order.updated_at)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total commande</span>
              <span className="text-base font-semibold text-primary">
                {formatCurrency(order.total_price)}
              </span>
            </div>

            <Button
              className="mt-2 w-full"
              variant="outline"
              onClick={() => router.push("/admin/commandes")}
            >
              Retour à la liste
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
