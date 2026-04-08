import type { ClientProductDetails } from "../../types";

type ProductMediaProps = {
  product: ClientProductDetails;
};

export default function ProductMedia({ product }: ProductMediaProps) {
  return (
    <section className="rounded-2xl border bg-card p-3">
      <div className="aspect-[9/10] overflow-hidden rounded-lg bg-muted/30">
        {product.main_photo_url ? (
          <img
            src={product.main_photo_url}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            Photo indisponible
          </div>
        )}
      </div>

      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="aspect-[4/5] overflow-hidden rounded-md border bg-muted/30"
          >
            {product.main_photo_url ? (
              <img
                src={product.main_photo_url}
                alt={`${product.title} miniature ${index + 1}`}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
