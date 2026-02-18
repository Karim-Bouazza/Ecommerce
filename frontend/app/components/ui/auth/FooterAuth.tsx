import { FieldDescription } from "@/components/ui/field";
import Link from "next/link";

export default function FooterAuth({
  text,
  link,
  linkText,
}: {
  text: string;
  link: string;
  linkText: string;
}) {
  return (
    <FieldDescription className="text-center">
      {text} <Link href={link}>{linkText}</Link>
    </FieldDescription>
  );
}
