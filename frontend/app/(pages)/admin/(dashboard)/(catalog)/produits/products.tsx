"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import TableContainer from "@/app/components/ui/common/Table/TableContainer";
import TableHeaderComponent from "@/app/components/ui/common/Table/TableHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/app/components/ui/common/Table/TablePrimitives";
import TableHeaderPage from "@/app/components/ui/common/Table/TableHeaderPage";
import { productsColumns } from "./data";
import type { ProductListItem } from "./types";
import useProducts from "./hooks/core/useProducts";
import CreateProductDialog from "./components/CreateProductDialog";

function formatCurrency(value: string | number | null): string {
  if (value === null) {
    return "-";
  }

  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    return "-";
  }

  return (
    new Intl.NumberFormat("fr-DZ", {
      minimumFractionDigits: 2,
    }).format(numericValue) + " DZ"
  );
}

type ProductsTableProps = {
  isLoading: boolean;
  isError: boolean;
  products: ProductListItem[];
  page: number;
  onViewProduct: (productId: number) => void;
};

const ProductsTable = React.memo(function ProductsTable({
  isLoading,
  isError,
  products,
  page,
  onViewProduct,
}: ProductsTableProps) {
  return (
    <div className="w-full min-w-0 overflow-x-auto rounded-xl">
      <Table className="w-full table-auto [&_thead_th:last-child]:text-right [&_thead_th:last-child]:pr-12">
        <TableHeaderComponent columns={productsColumns} />

        <TableBody className="text-left">
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-8 text-center text-muted-foreground"
              >
                Chargement des produits...
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-8 text-center text-destructive"
              >
                Une erreur est survenue lors du chargement des produits.
              </TableCell>
            </TableRow>
          ) : products.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-8 text-center text-muted-foreground"
              >
                Aucun produit trouvé.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product, index) => (
              <TableRow key={product.id ?? index} className="h-12">
                <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                <TableCell>{product.title || "-"}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell>
                  {formatCurrency(product.price_after_discount)}
                </TableCell>
                <TableCell className="pr-8 text-right">
                  <div className="flex justify-end">
                    <Button size="sm" onClick={() => onViewProduct(product.id)}>
                      Voir
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
});

export default function Products() {
  const router = useRouter();

  const { data, isLoading, isError } = useProducts();
  const products = data ?? [];

  const handleViewProduct = useCallback(
    (productId: number) => {
      router.push(`/admin/produits/${productId}`);
    },
    [router],
  );

  const page = 1;
  const total = Math.max(products.length, 1);

  return (
    <div className="w-full min-w-0">
      <TableContainer
        handlePaginationPreviousChange={() => undefined}
        handlePaginationNextChange={() => undefined}
        page={page}
        total={total}
      >
        <TableHeaderPage title="Produits">
          <CreateProductDialog />
        </TableHeaderPage>

        <ProductsTable
          isLoading={isLoading}
          isError={isError}
          products={products}
          page={page}
          onViewProduct={handleViewProduct}
        />
      </TableContainer>
    </div>
  );
}
