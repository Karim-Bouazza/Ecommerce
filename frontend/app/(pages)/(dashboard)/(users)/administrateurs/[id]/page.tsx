"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { CircleAlert, Eye, Mail, MapPin, Phone, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Loading from "@/app/components/ui/common/Loading";
import PageContainer from "@/app/components/ui/common/PageContainer";
import useUserById from "../hooks/core/useUserById";

type MainTab = "informations" | "rapports";
type DetailsTab = "timeline" | "about";

const DEFAULT_AVATAR_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Ccircle cx='128' cy='128' r='124' fill='%23b3b3b3'/%3E%3Ccircle cx='128' cy='104' r='42' fill='%23f0f0f0'/%3E%3Cpath d='M42 222c14-34 46-56 86-56s72 22 86 56' fill='%23f0f0f0'/%3E%3C/svg%3E";

function valueOrEmpty(value: string | null | undefined): string {
  return value?.trim() ?? "";
}

function capitalizeFirstLetter(value: string): string {
  if (!value) {
    return "";
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function UserDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: user, isLoading, isError } = useUserById(id);

  const [activeMainTab, setActiveMainTab] = useState<MainTab>("informations");
  const [activeDetailsTab, setActiveDetailsTab] = useState<DetailsTab>("about");

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !user) {
    return (
      <PageContainer>
        <Card>
          <CardHeader>
            <CardTitle>Impossible de charger ce profil</CardTitle>
            <CardDescription>
              Veuillez reessayer plus tard ou verifier l'identifiant
              utilisateur.
            </CardDescription>
          </CardHeader>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Card className="mx-auto max-w-6xl">
        <CardContent className="grid grid-cols-1 gap-8 pt-6 lg:grid-cols-[300px_1fr]">
          <aside className="space-y-8">
            <div className="space-y-4">
              <div className="relative mx-auto aspect-square w-full max-w-60 overflow-hidden rounded-full bg-muted">
                <Image
                  src={DEFAULT_AVATAR_PLACEHOLDER}
                  alt="Image de l'utilisateur"
                  fill
                  unoptimized
                  className="object-cover rounded-full"
                />
              </div>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-semibold text-foreground">
                  {capitalizeFirstLetter(user.name)}
                </h1>
              </div>
              <p className="text-lg text-primary">
                {capitalizeFirstLetter(valueOrEmpty(user.roles[0]))}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="ghost"
                className={
                  activeMainTab === "informations"
                    ? "border border-primary/20 bg-primary/10 text-primary hover:bg-primary/10"
                    : "text-muted-foreground"
                }
                onClick={() => setActiveMainTab("informations")}
              >
                Informations
              </Button>
              <Button
                variant="ghost"
                className={
                  activeMainTab === "rapports"
                    ? "border border-primary/20 bg-primary/10 text-primary hover:bg-primary/10"
                    : "text-muted-foreground"
                }
                onClick={() => setActiveMainTab("rapports")}
              >
                Rapports utilisateur
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 border-b border-border pb-2 text-sm">
              <button
                type="button"
                className={
                  activeDetailsTab === "timeline"
                    ? "inline-flex items-center gap-2 border-b-2 border-primary pb-2 text-foreground"
                    : "inline-flex items-center gap-2 pb-2 text-muted-foreground"
                }
                onClick={() => setActiveDetailsTab("timeline")}
              >
                <Eye className="h-4 w-4" />
                Timeline
              </button>
              <button
                type="button"
                className={
                  activeDetailsTab === "about"
                    ? "inline-flex items-center gap-2 border-b-2 border-primary pb-2 text-foreground"
                    : "inline-flex items-center gap-2 pb-2 text-muted-foreground"
                }
                onClick={() => setActiveDetailsTab("about")}
              >
                <User className="h-4 w-4" />À propos
              </button>
            </div>

            <Separator />

            {activeMainTab === "informations" &&
              activeDetailsTab === "about" && (
                <div className="space-y-6">
                  <div>
                    <p className="mb-3 text-sm font-semibold text-muted-foreground">
                      INFORMATIONS DE CONTACT
                    </p>
                    <div className="space-y-3 text-sm">
                      <p className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Téléphone:</span>
                        <span className="text-primary">
                          {valueOrEmpty(user.phone_number)}
                        </span>
                      </p>
                      <p className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Adresse:</span>
                        <span>
                          Algeria, {valueOrEmpty(user.province)}{" "}
                          {valueOrEmpty(user.city)}
                        </span>
                      </p>
                      <p className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">E-mail:</span>
                        <span className="text-primary">
                          {valueOrEmpty(user.email)}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-sm font-semibold text-muted-foreground">
                      INFORMATIONS DE BASE
                    </p>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Date de naissance:</span>{" "}
                        {/* to-do */}
                        {/* {valueOrEmpty(user.birthDate)} */}
                        "10/10/1990"
                      </p>
                      <p>
                        <span className="font-medium">Genre:</span>{" "}
                        {/* to-do */}
                        {/* {valueOrEmpty(user.gender)} */}
                        "Masculin"
                      </p>
                      <p>
                        <span className="font-medium">Rôle système:</span>{" "}
                        {valueOrEmpty((user.roles[0] ?? "").toUpperCase())}
                      </p>
                      <p>
                        <span className="font-medium">
                          Date de création : :
                        </span>{" "}
                        {valueOrEmpty((user.created_at ?? "").split("T")[0])}
                      </p>
                      <p>
                        <span className="font-medium">Date de modifié : :</span>{" "}
                        {valueOrEmpty((user.updated_at ?? "").split("T")[0])}
                      </p>
                    </div>
                  </div>
                </div>
              )}

            {activeMainTab === "informations" &&
              activeDetailsTab === "timeline" && (
                <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
                  Timeline utilisateur indisponible pour le moment.
                </div>
              )}

            {activeMainTab === "rapports" && (
              <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
                <p className="inline-flex items-center gap-2">
                  <CircleAlert className="h-4 w-4" />
                  Aucun rapport utilisateur pour le moment.
                </p>
              </div>
            )}
          </section>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
