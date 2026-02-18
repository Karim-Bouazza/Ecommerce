"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AuthLayout from "../../layout/auth/AuthLayout";
import InputAuth from "../../ui/auth/InputAuth";
import GoogleButtonAuth from "../../ui/auth/GoogleButtonAuth";
import FooterAuth from "../../ui/auth/FooterAuth";
import { useState } from "react";
import useAuthActions from "@/app/hooks/auth/useAuthActions";
import { useAuth } from "@/app/store/auth/auth.context";

export function LoginForm() {
  const [information, setInformation] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuthActions();
  const { state } = useAuth();

  const handleInformationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInformation((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(information.email, information.password);
      toast.success("Connexion réussie!");
      router.push("/dashboard");
    } catch (error) {
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
                  {/* to-do */}
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
              <Button type="submit" className="cursor-pointer">
                {state?.loading ? "Connexion..." : "Connexion"}
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
