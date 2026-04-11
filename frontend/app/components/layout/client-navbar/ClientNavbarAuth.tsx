"use client";

import Link from "next/link";
import { Heart, ShoppingCart, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ClientAuthUser } from "@/app/(pages)/(clients)/services/auth.service";
import useLogout from "@/app/(pages)/(clients)/hooks/useLogout";

type ClientNavbarAuthProps = {
  user: ClientAuthUser | null;
  isLoading: boolean;
};

export default function ClientNavbarAuth({
  user,
  isLoading,
}: ClientNavbarAuthProps) {
  const logout = useLogout();

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      toast.success("Déconnexion réussie");
    } catch {
      toast.error("Impossible de vous déconnecter pour le moment");
    }
  };

  if (isLoading) {
    return (
      <div
        className="h-9 w-44 animate-pulse rounded-md bg-muted"
        aria-hidden="true"
      />
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/register">Register</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        aria-label="Panier"
      >
        <ShoppingCart className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        aria-label="Favoris"
      >
        <Heart className="h-4 w-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            aria-label="Compte"
          >
            <UserRound className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <p className="truncate font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} disabled={logout.isPending}>
            {logout.isPending ? "Déconnexion..." : "Se déconnecter"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
