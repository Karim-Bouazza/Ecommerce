"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import AuthLayout from "@/app/components/layout/auth/AuthLayout";
import InputAuth from "@/app/components/ui/auth/InputAuth";
import GoogleButtonAuth from "@/app/components/ui/auth/GoogleButtonAuth";
import FooterAuth from "@/app/components/ui/auth/FooterAuth";
import { useRegister } from "../hooks/useRegister";
import { getRegisterErrorMessage } from "../services/register.service";

export function RegisterForm() {
  const [information, setInformation] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const router = useRouter();
  const registerMutation = useRegister();

  const handleInformationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInformation((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await registerMutation.mutateAsync(information);
      toast.success("Inscription réussie!");
      router.push("/dashboard");
    } catch (error: unknown) {
      toast.error(
        getRegisterErrorMessage(
          error,
          "Échec de l'inscription. Veuillez vérifier vos informations.",
        ),
      );
    }
  };

  return (
    <AuthLayout>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup className="gap-2">
            <InputAuth
              mode="register"
              label="Username"
              name="name"
              type="text"
              placeholder="Votre username"
              required={true}
              value={information.name}
              handleInformationChange={handleInformationChange}
            />
            <InputAuth
              mode="register"
              label="Email"
              name="email"
              type="email"
              placeholder="Votre email"
              required={true}
              value={information.email}
              handleInformationChange={handleInformationChange}
            />
            <InputAuth
              mode="register"
              label="Mot de pass"
              name="password"
              type="password"
              placeholder="Votre mot de passe"
              required={true}
              value={information.password}
              handleInformationChange={handleInformationChange}
            />
            <InputAuth
              mode="register"
              label="Mot de pass confirmation"
              name="password_confirmation"
              type="password"
              placeholder="Votre confirmation mot de pass"
              required={true}
              value={information.password_confirmation}
              handleInformationChange={handleInformationChange}
            />

            <Field className="mt-1">
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending
                  ? "Inscription en cours..."
                  : "S'inscrire"}
              </Button>
              <GoogleButtonAuth mode="register" />
              <FooterAuth
                text="Vous avez un compte?"
                link="/login"
                linkText="Se connecter"
              />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </AuthLayout>
  );
}
