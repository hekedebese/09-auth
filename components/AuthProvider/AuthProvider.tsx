"use client";

import { useEffect } from "react";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await checkSession();

        if (!session) {
          clearIsAuthenticated();
          return;
        }

        const user = await getMe();
        setUser(user);
      } catch {
        clearIsAuthenticated();
      }
    };

    initAuth();
  }, [setUser, clearIsAuthenticated]);

  return <>{children}</>;
}
