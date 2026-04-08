import type { ClientProductDetails } from "../../types";

type ProductSummaryProps = {
  product: ClientProductDetails;
};

function formatPrice(value: string | number | null): string {
  if (value === null) {
    return "-";
  }

  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return "-";
  }

  return new Intl.NumberFormat("fr-DZ", {
    style: "currency",
    currency: "DZD",
  }).format(parsed);
}

export default function ProductSummary({ product }: ProductSummaryProps) {
  const hasDiscount =
    product.price_after_discount !== null &&
    Number(product.price_after_discount) < Number(product.price);

  return (
    <section className="rounded-2xl border bg-card p-3.5">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Produit
      </p>
      <h1 className="mt-1 text-lg font-semibold">{product.title}</h1>

      <p className="mt-2 text-sm leading-5 text-muted-foreground">
        {product.description ||
          "Aucune description disponible pour ce produit."}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2.5 border-t pt-3">
        {hasDiscount ? (
          <>
            <p className="text-sm text-muted-foreground line-through">
              {formatPrice(product.price)}
            </p>
            <p className="text-base font-semibold text-primary">
              {formatPrice(product.price_after_discount)}
            </p>
          </>
        ) : (
          <p className="text-base font-semibold">
            {formatPrice(product.price)}
          </p>
        )}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <p>
          <span className="font-medium">Catégorie:</span>{" "}
          {product.category?.name ?? "-"}
        </p>
        <p>
          <span className="font-medium">Stock:</span> {product.quantity}
        </p>
      </div>
    </section>
  );
}
