import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function AuthLayout({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-secondary">
        <CardHeader>
          <CardTitle className="mx-auto text-2xl">Storeon</CardTitle>
          <CardDescription className="mx-auto">
            Votre plateforme de commerce en ligne
          </CardDescription>
        </CardHeader>

        {children}
      </Card>
    </div>
  );
}
