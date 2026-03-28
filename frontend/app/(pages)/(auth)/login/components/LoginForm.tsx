"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/app/components/layout/auth/AuthLayout";
import InputAuth from "@/app/components/ui/auth/InputAuth";
import GoogleButtonAuth from "@/app/components/ui/auth/GoogleButtonAuth";
import FooterAuth from "@/app/components/ui/auth/FooterAuth";
import { useLogin } from "../hooks/useLogin";

export function LoginForm() {
  const [information, setInformation] = useState({
    email: "salim@gmail.com",
    password: "12345678",
  });

  const router = useRouter();
  const loginMutation = useLogin();

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
      await loginMutation.mutateAsync(information);
      toast.success("Connexion réussie!");
      router.push("/dashboard");
    } catch (error: unknown) {
      toast.error("Échec de la connexion. Veuillez vérifier vos identifiants.");
    }
  };

  return (
    <AuthLayout>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <InputAuth
              mode="login"
              label="Email"
              name="email"
              type="email"
              placeholder="Votre email"
              required={true}
              value={information.email}
              handleInformationChange={handleInformationChange}
            />
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Votre mot de passe"
                value={information.password}
                onChange={handleInformationChange}
              />
            </Field>

            <Field>
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Connexion..." : "Connexion"}
              </Button>
              <GoogleButtonAuth mode="login" />
              <FooterAuth
                text="Vous n'avez pas de compte?"
                link="/register"
                linkText="S'inscrire"
              />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </AuthLayout>
  );
}
