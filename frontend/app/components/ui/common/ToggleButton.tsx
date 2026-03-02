import { Button } from "@/components/ui/button";

export default function ToggleButton({
  isActive,
  setIsActive,
}: {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}) {
  return (
    <Button
      onClick={() => setIsActive(!isActive)}
      className={`w-24 ${
        isActive
          ? "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
          : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </Button>
  );
}
