import { useAuth } from "./auth.context";

export function RoleGuard({
  roles,
  children,
}: {
  roles: string[];
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user || !roles.includes(user.role.toLowerCase())) {
    return null;
  }

  return <>{children}</>;
}
