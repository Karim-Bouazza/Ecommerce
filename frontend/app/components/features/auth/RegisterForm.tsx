"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authService } from "@/app/services/api/AuthService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [information, setInformation] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-secondary">
        <CardHeader>
          <CardTitle className="mx-auto text-2xl">Storeon</CardTitle>
          <CardDescription className="mx-auto">
            Votre plateforme de commerce en ligne
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup className="gap-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="name">Username</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Votre username"
                  required
                  value={information.name}
                  onChange={handleInformationChange}
                />
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Votre email"
                  required
                  value={information.email}
                  onChange={handleInformationChange}
                />
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="password">Mot de pass</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Votre mot de passe"
                  value={information.password}
                  onChange={handleInformationChange}
                />
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="password_confirmation">
                  Mot de pass confirmation
                </FieldLabel>
                <Input
                  id="password_confirmation"
                  type="password"
                  name="password_confirmation"
                  placeholder="Votre confirmation mot de pass"
                  value={information.password_confirmation}
                  onChange={handleInformationChange}
                />
              </Field>
              <Field className="mt-1">
                <Button type="submit" className="cursor-pointer">
                  Register
                </Button>
                <Button variant="outline" type="button">
                  Register with Google comming soon
                </Button>
                <FieldDescription className="text-center">
                  have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
