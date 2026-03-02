import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/app/store/auth/auth.context";
import { TooltipProvider } from "@/components/ui/tooltip";
import Providers from "./providers/providers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Storeone - E-commerce",
  description:
    "Storeone est une plateforme e-commerce moderne et intuitive, conçue pour offrir une expérience d'achat en ligne exceptionnelle. Avec une interface conviviale et des fonctionnalités avancées, Storeone facilite la découverte de produits, la gestion des commandes et le suivi des livraisons. Que vous soyez un vendeur cherchant à étendre votre marché ou un acheteur à la recherche de bonnes affaires, Storeone est votre destination idéale pour tous vos besoins e-commerce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <AuthProvider>
          <Providers>
            <TooltipProvider>{children}</TooltipProvider>
          </Providers>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
