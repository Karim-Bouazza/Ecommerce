"use client";

import Link from "next/link";
import useAuthUser from "@/app/(pages)/(clients)/hooks/useAuthUser";
import ClientNavbarAuth from "./ClientNavbarAuth";

const clientNavItems = [
  { label: "New arrivals", href: "/produits" },
  { label: "Winter collection", href: "/produits" },
  { label: "Jackets", href: "/produits" },
  { label: "Knitwear", href: "/produits" },
  { label: "Sale", href: "/produits" },
];

export default function ClientNavbar() {
  const { data: user, isLoading } = useAuthUser();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <h1 className="text-[20px] font-bold tracking-wider text-gray-900 cursor-pointer">
          STOREONE
        </h1>

        <nav className="hidden items-center gap-6 md:flex">
          {clientNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <ClientNavbarAuth user={user ?? null} isLoading={isLoading} />
      </div>
    </header>
  );
}
