import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Download, Printer } from "lucide-react";

export default function TableDownloads({
  onDownloadExcel,
  onPrint,
}: {
  onDownloadExcel?: () => void;
  onPrint?: () => void;
}) {
  const downloads = [
    { id: 1, name: "Print PDF", icon: Printer, action: onPrint },
    { id: 2, name: "Download Excel", icon: Download, action: onDownloadExcel },
  ].filter((d) => d.action);

  return (
    <>
      <ButtonGroup className="ml-auto px-2 gap-1.5 hidden md:flex">
        {downloads.map((d) => (
          <Button
            key={d.id}
            className="bg-[#f4f5f6] text-black border text-[12px] hover:bg-[#f4f5f6]"
            onClick={d.action}
          >
            <d.icon size={8} />
            {d.name}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
}
