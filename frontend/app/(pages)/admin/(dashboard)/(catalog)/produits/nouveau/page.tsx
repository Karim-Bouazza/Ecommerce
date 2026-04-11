import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageContainer from "@/app/components/ui/common/PageContainer";
import CreateProductForm from "../components/CreateProductForm";

export default function CreateProductPage() {
  return (
    <PageContainer>
      <Card className="mx-auto max-w-6xl">
        <CardHeader className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-2xl">Créer un produit</CardTitle>
            <Button asChild variant="outline">
              <Link href="/admin/produits">Retour à la liste</Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <CreateProductForm />
        </CardContent>
      </Card>
    </PageContainer>
  );
}
