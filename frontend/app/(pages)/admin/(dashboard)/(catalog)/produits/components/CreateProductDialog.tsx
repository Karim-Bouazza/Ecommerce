import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateProductDialog() {
  return (
    <Button asChild size="sm">
      <Link href="/admin/produits/nouveau">Créer produit</Link>
    </Button>
  );
}
