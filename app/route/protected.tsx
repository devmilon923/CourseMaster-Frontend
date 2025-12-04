"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../context/AuthState";

const privateRoutes = ["/dashboard"];

export function ProtectedRouteWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { loading } = useAuth();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth") : null;

  useEffect(() => {
    const isPrivate = privateRoutes.some((route) =>
      pathname?.startsWith(route)
    );
    const isPublicAuth = pathname?.startsWith("/auth");

    if (isPrivate && !token) {
      router.push("/auth/login");
      return;
    }

    if (isPublicAuth && token) {
      router.push("/dashboard");
    }
  }, [pathname, router, token, loading]);

  if (loading) {
    return <>Loading...</>;
  }

  return <>{children}</>;
}
