"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../context/AuthState";

const userRoutes = ["/dashboard"];
const adminRoutes = ["/admin/dashboard"];

export function ProtectedRouteWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { loading } = useAuth();

  const userToken =
    typeof window !== "undefined" ? localStorage.getItem("auth") : null;
  const adminToken =
    typeof window !== "undefined" ? localStorage.getItem("aauth") : null;
  useEffect(() => {
    const isUserRoute = userRoutes.some((route) => pathname?.startsWith(route));
    const isAdminRoute = adminRoutes.some((route) =>
      pathname?.startsWith(route)
    );
    const isPublicAuth = pathname?.startsWith("/auth");

    if (isUserRoute && !userToken) {
      router.push("/auth/login");
      return;
    }
    if (isAdminRoute && !adminToken) {
      router.push("/auth/admin-login");
      return;
    }
    if (isPublicAuth && userToken) {
      router.push("/dashboard");
    }
    if (isPublicAuth && adminToken) {
      router.push("/admin");
    }
  }, [pathname, router, userToken, adminToken, loading]);

  if (loading) {
    return <>Loading...</>;
  }

  return <>{children}</>;
}
