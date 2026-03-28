"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { CreateUserForm } from "@/app/components/forms/create-user-form";
import { Button } from "@/components/ui/button";

type CreateUserModalProps = {
  triggerLabel?: string;
};

export default function CreateUserModal({
  triggerLabel = "Créer Utilisateur",
}: CreateUserModalProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onEsc);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        {triggerLabel}
      </Button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-50 bg-black/40"
            onClick={() => setOpen(false)}
          >
            <div className="flex h-full w-full items-stretch justify-end p-0 sm:p-4">
              <section
                role="dialog"
                aria-modal="true"
                aria-label="Create employee"
                style={{ willChange: "transform" }}
                className="transform-gpu h-full w-full max-w-3xl overflow-y-auto rounded-none border-l border-gray-200 bg-white shadow-xl sm:h-[95vh] sm:rounded-2xl"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex min-h-full flex-col">
                  <div className="sticky top-0 z-10 flex items-start justify-between border-b bg-white px-5 py-4">
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900">
                        Ajouter un utilisateur
                      </h2>
                      <p className="mt-1 text-sm text-slate-600">
                        Veuillez remplir le formulaire ci-dessous pour ajouter
                        un utilisateur.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setOpen(false)}
                      aria-label="Close create employee dialog"
                    >
                      <X className="size-5" />
                    </Button>
                  </div>

                  <div className="px-5 py-4">
                    <CreateUserForm
                      onSuccess={() => setOpen(false)}
                      onCancel={() => setOpen(false)}
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
