"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button, buttonVariants } from "@/components/ui/button";

export default function Navbar() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <header className="border-b">
      <nav className="mx-auto flex w-full items-center justify-between px-6 py-3 sm:px-20">
        <Link href="/" className="text-lg font-semibold">
          StayFinder
        </Link>

        {isLoading ? null : user ? (
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-muted-foreground sm:inline">{user.email}</span>
            <Link href="/properties/new" className={buttonVariants({ variant: "ghost" })}>
              Lägg till boende
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              Logga ut
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
              Logga in
            </Link>
            <Link href="/register" className={buttonVariants()}>
              Skapa konto
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}