"use client";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCreateOrder from "../../hooks/core/useCreateOrder";
import {
  mapOrderFormToPayload,
  orderFormSchema,
  type OrderFormSchemaValues,
} from "../../schemas/order";

type OrderFormProps = {
  productId: number;
  maxQuantity: number;
};

type OrderFormSchemaInput = z.input<typeof orderFormSchema>;

function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const fieldErrors = error.response?.data?.errors as
      | Record<string, string[]>
      | undefined;

    const firstFieldError = Object.values(fieldErrors ?? {})
      .flat()
      .find((message) => typeof message === "string" && message.length > 0);

    if (firstFieldError) {
      return firstFieldError;
    }

    const fallbackMessage = error.response?.data?.message;
    if (typeof fallbackMessage === "string" && fallbackMessage.length > 0) {
      return fallbackMessage;
    }
  }

  return "Impossible d'envoyer la commande. Veuillez réessayer.";
}

export default function OrderForm({ productId, maxQuantity }: OrderFormProps) {
  const createOrder = useCreateOrder();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<OrderFormSchemaInput, unknown, OrderFormSchemaValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      wilaya: "",
      baladia: "",
      numero_telephone: "",
      quantity: 1,
    },
  });

  const onSubmit = async (values: OrderFormSchemaValues) => {
    if (maxQuantity < 1) {
      toast.error("Ce produit est actuellement en rupture de stock.");
      return;
    }

    if (values.quantity > maxQuantity) {
      toast.error(
        `La quantité demandée dépasse le stock disponible (${maxQuantity}).`,
      );
      return;
    }

    try {
      const order = await createOrder.mutateAsync(
        mapOrderFormToPayload(productId, values),
      );

      toast.success(`Commande #${order.id} envoyée avec succès.`);
      reset({
        nom: "",
        prenom: "",
        wilaya: "",
        baladia: "",
        numero_telephone: "",
        quantity: 1,
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  const isOrderDisabled =
    isSubmitting || createOrder.isPending || maxQuantity < 1;

  return (
    <section className="rounded-2xl border bg-card p-3.5">
      <h2 className="text-sm font-semibold">Commander ce produit</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Renseignez vos informations pour finaliser votre commande.
      </p>

      <form className="mt-3 space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="order-nom">Nom</Label>
            <Input id="order-nom" {...register("nom")} />
            {errors.nom?.message ? (
              <p className="text-sm text-destructive">{errors.nom.message}</p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="order-prenom">Prénom</Label>
            <Input id="order-prenom" {...register("prenom")} />
            {errors.prenom?.message ? (
              <p className="text-sm text-destructive">
                {errors.prenom.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="order-wilaya">Wilaya</Label>
            <Input id="order-wilaya" {...register("wilaya")} />
            {errors.wilaya?.message ? (
              <p className="text-sm text-destructive">
                {errors.wilaya.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="order-baladia">Baladia</Label>
            <Input id="order-baladia" {...register("baladia")} />
            {errors.baladia?.message ? (
              <p className="text-sm text-destructive">
                {errors.baladia.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="order-phone">Numéro téléphone</Label>
          <Input id="order-phone" {...register("numero_telephone")} />
          {errors.numero_telephone?.message ? (
            <p className="text-sm text-destructive">
              {errors.numero_telephone.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="order-quantity">Quantité</Label>
          <Input
            id="order-quantity"
            type="number"
            min={1}
            max={Math.max(maxQuantity, 1)}
            step={1}
            {...register("quantity", { valueAsNumber: true })}
          />
          {errors.quantity?.message ? (
            <p className="text-sm text-destructive">
              {errors.quantity.message}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Stock disponible: {maxQuantity}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isOrderDisabled}
          size="sm"
          className="w-full sm:w-auto"
        >
          {isSubmitting || createOrder.isPending ? "Envoi..." : "Commander"}
        </Button>
      </form>
    </section>
  );
}
