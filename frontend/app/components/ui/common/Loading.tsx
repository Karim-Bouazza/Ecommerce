import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import PageContainer from "@/app/components/ui/common/PageContainer";

type LoadingProps = {
  message?: string;
};

export default function Loading({
  message = "Chargement du profil...",
}: LoadingProps) {
  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">{message}</CardTitle>
        </CardHeader>
      </Card>
    </PageContainer>
  );
}
