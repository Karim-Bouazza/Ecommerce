import { z } from "zod";
import type { ClientCreateOrderPayload } from "../types";

export const orderFormSchema = z.object({
    nom: z.string().trim().min(1, "Le nom est requis.").max(255),
    prenom: z.string().trim().min(1, "Le prénom est requis.").max(255),
    wilaya: z.string().trim().min(1, "La wilaya est requise.").max(255),
    baladia: z.string().trim().min(1, "La baladia est requise.").max(255),
    numero_telephone: z
        .string()
        .trim()
        .min(1, "Le numéro de téléphone est requis.")
        .max(50)
        .regex(/^[0-9+\s-]{8,20}$/, "Numéro de téléphone invalide."),
    quantity: z.coerce.number().int().min(1, "La quantité doit être au moins 1."),
});

export type OrderFormSchemaValues = z.output<typeof orderFormSchema>;

export function mapOrderFormToPayload(
    productId: number,
    values: OrderFormSchemaValues,
): ClientCreateOrderPayload {
    return {
        nom: values.nom,
        prenom: values.prenom,
        wilaya: values.wilaya,
        baladia: values.baladia,
        numero_telephone: values.numero_telephone,
        items: [
            {
                product_id: productId,
                quantity: values.quantity,
            },
        ],
    };
}
