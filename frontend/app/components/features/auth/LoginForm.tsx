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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [information, setInformation] = useState({
    email: "",
    password: "",
  });

  const handleInformationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInformation((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authService.Login(
        information.email,
        information.password,
      );
      toast.success("Connexion réussie!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Échec de la connexion. Veuillez vérifier vos identifiants.");
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
            <FieldGroup>
              <Field>
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
                <Button type="submit" className="cursor-pointer">
                  Login
                </Button>
                <Button variant="outline" type="button">
                  Login with Google comming soon
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
