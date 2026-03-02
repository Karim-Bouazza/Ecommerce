import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CreateButton({
  buttonName,
  onCreateClick,
}: {
  buttonName: string;
  onCreateClick: () => void;
}) {
  return (
    <Button
      variant="custom_color"
      onClick={onCreateClick}
      className="hidden md:flex text-xs md:text-sm h-8 md:h-9 px-2 md:px-4"
    >
      <Plus className="size-4" /> Create {buttonName}
    </Button>
  );
}
