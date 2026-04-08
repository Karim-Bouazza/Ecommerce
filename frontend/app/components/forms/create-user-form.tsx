"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import {
  type Control,
  type UseFormRegister,
  useController,
  useForm,
  useFormState,
} from "react-hook-form";
import { toast } from "sonner";

import useCreateUser from "@/app/(pages)/admin/(dashboard)/(users)/administrateurs/hooks/core/useCreateUser";
import { createUserSchema, type CreateUserInput } from "@/lib/schemas/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CreateUserFormProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
};

type SectionProps = {
  register: UseFormRegister<CreateUserInput>;
  control: Control<CreateUserInput>;
};

type JobSectionProps = {
  control: Control<CreateUserInput>;
};

const initialValues: CreateUserInput = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  first_name: "",
  last_name: "",
  phone_number: "",
  province: "",
  city: "",
  role: "admin",
};

function normalizeNullableField(value?: string): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeCreateUserPayload(values: CreateUserInput) {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    password: values.password,
    password_confirmation: values.password_confirmation,
    first_name: normalizeNullableField(values.first_name),
    last_name: normalizeNullableField(values.last_name),
    phone_number: normalizeNullableField(values.phone_number),
    province: normalizeNullableField(values.province),
    city: normalizeNullableField(values.city),
    role: values.role,
  };
}

const AccountSection = React.memo(function AccountSection({
  register,
  control,
}: SectionProps) {
  const { errors } = useFormState({
    control,
    name: ["name", "email", "password", "password_confirmation"],
  });

  return (
    <section className="space-y-4">
      <h3 className="text-sm font-semibold">Informations du compte</h3>

      <div className="space-y-2">
        <Label htmlFor="name">Nom d'utilisateur</Label>
        <Input
          id="name"
          autoComplete="username"
          placeholder="Entrer votre nom d'utilisateur"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name?.message ? (
          <p className="text-destructive text-sm">
            {String(errors.name.message)}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Entrer votre e-mail"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email?.message ? (
          <p className="text-destructive text-sm">
            {String(errors.email.message)}
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="Entrer votre mot de passe"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password?.message ? (
            <p className="text-destructive text-sm">
              {String(errors.password.message)}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password_confirmation">
            Confirmer le mot de passe
          </Label>
          <Input
            id="password_confirmation"
            type="password"
            autoComplete="new-password"
            placeholder="Confirmer votre mot de passe"
            aria-invalid={!!errors.password_confirmation}
            {...register("password_confirmation")}
          />
          {errors.password_confirmation?.message ? (
            <p className="text-destructive text-sm">
              {String(errors.password_confirmation.message)}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
});

const PersonalSection = React.memo(function PersonalSection({
  register,
  control,
}: SectionProps) {
  const { errors } = useFormState({
    control,
    name: ["first_name", "last_name", "phone_number", "province", "city"],
  });

  return (
    <section className="space-y-4">
      <h3 className="text-sm font-semibold">Informations personnelles</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="first_name">Prénom</Label>
          <Input
            id="first_name"
            placeholder="Entrer votre prénom"
            aria-invalid={!!errors.first_name}
            {...register("first_name")}
          />
          {errors.first_name?.message ? (
            <p className="text-destructive text-sm">
              {String(errors.first_name.message)}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="last_name">Nom</Label>
          <Input
            id="last_name"
            placeholder="Entrer votre nom"
            aria-invalid={!!errors.last_name}
            {...register("last_name")}
          />
          {errors.last_name?.message ? (
            <p className="text-destructive text-sm">
              {String(errors.last_name.message)}
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone_number">Numéro de téléphone</Label>
        <Input
          id="phone_number"
          autoComplete="tel"
          placeholder="Entrer votre numéro de téléphone"
          aria-invalid={!!errors.phone_number}
          {...register("phone_number")}
        />
        {errors.phone_number?.message ? (
          <p className="text-destructive text-sm">
            {String(errors.phone_number.message)}
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="province">Région</Label>
          <Input
            id="province"
            placeholder="Entrer votre région"
            aria-invalid={!!errors.province}
            {...register("province")}
          />
          {errors.province?.message ? (
            <p className="text-destructive text-sm">
              {String(errors.province.message)}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Ville</Label>
          <Input
            id="city"
            placeholder="Entrer votre ville"
            aria-invalid={!!errors.city}
            {...register("city")}
          />
          {errors.city?.message ? (
            <p className="text-destructive text-sm">
              {String(errors.city.message)}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
});

const JobSection = React.memo(function JobSection({
  control,
}: JobSectionProps) {
  const { field } = useController({
    name: "role",
    control,
  });
  const { errors } = useFormState({ control, name: "role" });
  const roleError = errors.role?.message?.toString();

  return (
    <section className="space-y-4">
      <h3 className="text-sm font-semibold">Informations du poste</h3>

      <div className="space-y-2">
        <Label htmlFor="role">Rôle</Label>
        <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger id="role" aria-invalid={!!roleError}>
            <SelectValue placeholder="Sélectionner votre rôle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Administrateur</SelectItem>
            <SelectItem value="client">Client</SelectItem>
          </SelectContent>
        </Select>
        {roleError ? (
          <p className="text-destructive text-sm">{roleError}</p>
        ) : null}
      </div>
    </section>
  );
});

export function CreateUserForm({ onSuccess, onCancel }: CreateUserFormProps) {
  const createUser = useCreateUser();

  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const isLoading = createUser.isPending;

  async function onSubmit(values: CreateUserInput) {
    if (isLoading) {
      return;
    }

    form.clearErrors();

    try {
      const payload = normalizeCreateUserPayload(values);

      const createdUser = await createUser.mutateAsync(payload);

      toast.success(`Utilisateur ${createdUser.name} créé avec succès`);
      form.reset(initialValues);
      onSuccess?.();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const validationErrors = error.response?.data?.errors;

        if (validationErrors && typeof validationErrors === "object") {
          Object.entries(validationErrors).forEach(([field, messages]) => {
            const firstMessage = Array.isArray(messages)
              ? messages[0]
              : String(messages);

            if (field in initialValues) {
              form.setError(field as keyof CreateUserInput, {
                type: "server",
                message: firstMessage,
              });
            }
          });

          toast.error("Veuillez corriger les champs en erreur puis réessayer.");
          return;
        }

        const errorMessage = error.response?.data?.message;
        if (typeof errorMessage === "string" && errorMessage.length > 0) {
          toast.error(errorMessage);
          return;
        }
      }

      toast.error(
        "Une erreur est survenue lors de la création de l'utilisateur.",
      );
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <AccountSection register={form.register} control={form.control} />
      <PersonalSection register={form.register} control={form.control} />
      <JobSection control={form.control} />

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Annuler
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Création..." : "Ajouter un utilisateur"}
        </Button>
      </div>
    </form>
  );
}
