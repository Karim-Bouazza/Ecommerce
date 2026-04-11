import { z } from "zod";

const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
const maxImageSizeInBytes = 5 * 1024 * 1024;

const imageFileSchema = z
    .custom<File | null | undefined>(
        (value) => {
            if (value === undefined || value === null) {
                return true;
            }

            if (typeof File === "undefined") {
                return false;
            }

            return value instanceof File;
        },
        "Le fichier photo est invalide.",
    )
    .refine(
        (value) => {
            if (!value) {
                return true;
            }

            return allowedImageTypes.includes(value.type);
        },
        "Le format de l'image doit être JPG, PNG ou WEBP.",
    )
    .refine(
        (value) => {
            if (!value) {
                return true;
            }

            return value.size <= maxImageSizeInBytes;
        },
        "La taille de l'image ne doit pas dépasser 5 Mo.",
    )
    .optional();

export const productFormSchema = z
    .object({
        title: z
            .string()
            .trim()
            .min(1, "Le titre est requis.")
            .max(255, "Le titre ne doit pas dépasser 255 caractères."),
        description: z.string().trim().optional().or(z.literal("")),
        quantity: z
            .string()
            .trim()
            .min(1, "La quantité est requise.")
            .refine(
                (value) => Number.isInteger(Number(value)),
                "La quantité doit être un entier positif ou nul.",
            )
            .refine(
                (value) => Number(value) >= 0,
                "La quantité doit être un entier positif ou nul.",
            ),
        price: z
            .string()
            .trim()
            .min(1, "Le prix est requis.")
            .refine(
                (value) => !Number.isNaN(Number(value)),
                "Le prix doit être un nombre positif ou nul.",
            )
            .refine(
                (value) => Number(value) >= 0,
                "Le prix doit être un nombre positif ou nul.",
            ),
        price_after_discount: z.string().trim().optional().or(z.literal("")),
        main_photo: imageFileSchema,
        sub_image_01: imageFileSchema,
        sub_image_02: imageFileSchema,
        sub_image_03: imageFileSchema,
        category_id: z
            .string()
            .trim()
            .min(1, "Veuillez sélectionner une catégorie valide.")
            .refine(
                (value) => Number.isInteger(Number(value)) && Number(value) > 0,
                "Veuillez sélectionner une catégorie valide.",
            ),
    })
    .superRefine((data, ctx) => {
        if (!data.price_after_discount || data.price_after_discount.length === 0) {
            return;
        }

        const parsedPrice = Number(data.price);
        const parsedDiscount = Number(data.price_after_discount);

        if (Number.isNaN(parsedDiscount) || parsedDiscount < 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Le prix remisé doit être un nombre positif ou nul.",
                path: ["price_after_discount"],
            });
            return;
        }

        if (!Number.isNaN(parsedPrice) && parsedDiscount > parsedPrice) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Le prix remisé doit être inférieur ou égal au prix.",
                path: ["price_after_discount"],
            });
        }
    });

export type ProductFormInput = z.infer<typeof productFormSchema>;

export function mapProductFormToPayload(values: ProductFormInput) {
    const trimmedDescription = values.description?.trim() ?? "";
    const trimmedDiscount = values.price_after_discount?.trim() ?? "";

    return {
        title: values.title.trim(),
        description: trimmedDescription,
        quantity: Number(values.quantity),
        price: Number(values.price),
        price_after_discount:
            trimmedDiscount.length > 0 ? Number(trimmedDiscount) : null,
        category_id: Number(values.category_id),
        main_photo: values.main_photo ?? null,
        sub_image_01: values.sub_image_01 ?? null,
        sub_image_02: values.sub_image_02 ?? null,
        sub_image_03: values.sub_image_03 ?? null,
    };
}
