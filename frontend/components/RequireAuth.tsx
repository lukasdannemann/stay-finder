"use client";

import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type RequireAuthProps = {
  children: ReactNode;
};

export default function RequireAuth({ children }: RequireAuthProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p className="text-muted-foreground">Laddar…</p>;
  }

  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
}