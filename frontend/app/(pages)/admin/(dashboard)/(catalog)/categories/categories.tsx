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
import { categoriesColumns } from "./data";
import type { CategoryListItem } from "./types";
import useCategories from "./hooks/core/useCategories";
import CreateCategoryDialog from "./components/CreateCategoryDialog";

type CategoriesTableProps = {
  isLoading: boolean;
  isError: boolean;
  categories: CategoryListItem[];
  page: number;
  onViewCategory: (categoryId: number) => void;
};

const CategoriesTable = React.memo(function CategoriesTable({
  isLoading,
  isError,
  categories,
  page,
  onViewCategory,
}: CategoriesTableProps) {
  return (
    <div className="w-full min-w-0 overflow-x-auto rounded-xl">
      <Table className="w-full table-auto [&_thead_th:last-child]:text-right [&_thead_th:last-child]:pr-12">
        <TableHeaderComponent columns={categoriesColumns} />

        <TableBody className="text-left">
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="py-8 text-center text-muted-foreground"
              >
                Chargement des catégories...
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="py-8 text-center text-destructive"
              >
                Une erreur est survenue lors du chargement des catégories.
              </TableCell>
            </TableRow>
          ) : categories.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="py-8 text-center text-muted-foreground"
              >
                Aucune catégorie trouvée.
              </TableCell>
            </TableRow>
          ) : (
            categories.map((category, index) => (
              <TableRow key={category.id ?? index} className="h-12">
                <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                <TableCell>{category.name || "-"}</TableCell>
                <TableCell className="pr-8 text-right">
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      onClick={() => onViewCategory(category.id)}
                    >
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

export default function Categories() {
  const router = useRouter();

  const { data, isLoading, isError } = useCategories();
  const categories = data ?? [];

  const handleViewCategory = useCallback(
    (categoryId: number) => {
      router.push(`/admin/categories/${categoryId}`);
    },
    [router],
  );

  const page = 1;
  const total = Math.max(categories.length, 1);

  return (
    <div className="w-full min-w-0">
      <TableContainer
        handlePaginationPreviousChange={() => undefined}
        handlePaginationNextChange={() => undefined}
        page={page}
        total={total}
      >
        <TableHeaderPage title="Catégories">
          <CreateCategoryDialog />
        </TableHeaderPage>

        <CategoriesTable
          isLoading={isLoading}
          isError={isError}
          categories={categories}
          page={page}
          onViewCategory={handleViewCategory}
        />
      </TableContainer>
    </div>
  );
}
