import ClientNavbar from "@/app/components/layout/client-navbar/ClientNavbar";

export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <ClientNavbar />
      {children}
    </div>
  );
}
