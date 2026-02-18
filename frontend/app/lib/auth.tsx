import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// get current user info from backend
export async function getCurrentUser() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/auth/me/`,
    {
      headers: {
        Cookie: (await cookies()).toString(),
      },
      cache: "no-store",
    },
  );
  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  return data.user;
}

// check the role of user
export async function requireRole(allowedRole: string) {
  const user = await getCurrentUser();

  // @ts-ignore
  if (!user || user.role !== allowedRole) {
    redirect("/unauthorized");
  }

  return user;
}

// pages that require multiple roles
export async function requireRoles(allowedRoles: string[]) {
  const user = await getCurrentUser();

  // @ts-ignore
  if (!user || !allowedRoles.includes(user.role)) {
    redirect("/unauthorized");
  }

  return user;
}
