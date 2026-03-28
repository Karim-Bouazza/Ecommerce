import { z } from "zod"

export const createUserSchema = z
    .object({
        name: z.string().trim().min(1, "Le nom d'utilisateur est requis").max(255, "Le nom d'utilisateur ne doit pas dépasser 255 caractères"),
        email: z.string().trim().min(1, "L'e-mail est requis").email("Adresse e-mail invalide"),
        password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
        password_confirmation: z.string().min(8, "La confirmation du mot de passe doit contenir au moins 8 caractères"),
        first_name: z.string().max(255, "Le prénom ne doit pas dépasser 255 caractères").optional().or(z.literal("")),
        last_name: z.string().max(255, "Le nom ne doit pas dépasser 255 caractères").optional().or(z.literal("")),
        phone_number: z.string().max(50, "Le numéro de téléphone ne doit pas dépasser 50 caractères").optional().or(z.literal("")),
        province: z.string().max(255, "La région ne doit pas dépasser 255 caractères").optional().or(z.literal("")),
        city: z.string().max(255, "La ville ne doit pas dépasser 255 caractères").optional().or(z.literal("")),
        role: z.enum(["admin", "client"], {
            message: "Le rôle est requis",
        }),
    })
    .refine((data) => data.password === data.password_confirmation, {
        path: ["password_confirmation"],
        message: "La confirmation du mot de passe ne correspond pas.",
    })

export type CreateUserInput = z.infer<typeof createUserSchema>
