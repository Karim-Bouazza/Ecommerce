"use client";

import { useMemo } from "react";
import DOMPurify from "isomorphic-dompurify";

type ProductDescriptionProps = {
  description?: string | null;
};

const SANITIZE_CONFIG = {
  ALLOWED_TAGS: [
    "p",
    "br",
    "strong",
    "em",
    "u",
    "s",
    "ul",
    "ol",
    "li",
    "blockquote",
    "code",
    "pre",
    "h2",
    "h3",
    "h4",
    "a",
  ],
  ALLOWED_ATTR: ["href", "target", "rel"],
  ALLOW_DATA_ATTR: false,
  FORBID_TAGS: [
    "script",
    "style",
    "iframe",
    "object",
    "embed",
    "form",
    "input",
    "button",
    "textarea",
    "select",
    "meta",
    "link",
  ],
  FORBID_ATTR: ["style"],
};

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  const sanitizedDescription = useMemo(
    () => DOMPurify.sanitize(description ?? "", SANITIZE_CONFIG),
    [description],
  );

  const hasReadableContent = stripHtml(sanitizedDescription).length > 0;

  return (
    <section className="rounded-2xl border bg-card p-3.5 sm:p-4">
      <h2 className="text-sm font-semibold">Description</h2>

      {hasReadableContent ? (
        <div
          className="mt-3 space-y-2.5 text-sm leading-6 text-foreground [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc [&_ol>li]:list-decimal [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-muted [&_pre]:p-2"
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        />
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">
          Aucune description disponible pour ce produit.
        </p>
      )}
    </section>
  );
}
