"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { useState } from "react";
import { authService } from "@/app/services/api/AuthService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AuthLayout from "../../layout/auth/AuthLayout";
import InputAuth from "../../ui/auth/InputAuth";
import GoogleButtonAuth from "../../ui/auth/GoogleButtonAuth";
import FooterAuth from "../../ui/auth/FooterAuth";
import { useAuth } from "@/app/store/auth/auth.context";

export function RegisterForm() {
  const [information, setInformation] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const { state } = useAuth();

  const handleInformationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInformation((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authService.Register(
        information.name,
        information.email,
        information.password,
        information.password_confirmation,
      );
      toast.success("Inscription réussie!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(
        "Échec de l'inscription. Veuillez vérifier vos informations.",
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
              <Button type="submit" className="cursor-pointer">
                {state?.loading ? "Inscription en cours..." : "S'inscrire"}
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
