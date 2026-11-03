"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <header className="border-b bg-card shadow-sm">
      <nav className="mx-auto flex w-full items-center justify-between px-6 py-3 sm:px-20">
        <Link href="/" className="text-lg font-semibold">
          StayFinder
        </Link>

        {isLoading ? null : (
          <>
            <div className="hidden items-center gap-2 sm:flex">
              {user ? (
                <>
                  <Link
                    href="/bookings"
                    className={buttonVariants({ variant: "ghost" })}
                  >
                    Mina bokningar
                  </Link>
                  <Link
                    href="/properties/new"
                    className={buttonVariants({ variant: "ghost" })}
                  >
                    Lägg till boende
                  </Link>
                  <span className="text-sm text-muted-foreground">
                    {user.email}
                  </span>
                  <Button variant="outline" onClick={handleLogout}>
                    Logga ut
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={buttonVariants({ variant: "ghost" })}
                  >
                    Logga in
                  </Link>
                  <Link href="/register" className={buttonVariants()}>
                    Skapa konto
                  </Link>
                </>
              )}
            </div>

            <div className="sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={buttonVariants({
                    variant: "outline",
                    size: "icon",
                  })}
                  aria-label="Öppna meny"
                >
                  <MenuIcon />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  {user ? (
                    <>
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="truncate">
                          {user.email}
                        </DropdownMenuLabel>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => router.push("/bookings")}
                      >
                        Mina bokningar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push("/properties/new")}
                      >
                        Lägg till boende
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        Logga ut
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem onClick={() => router.push("/login")}>
                        Logga in
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push("/register")}
                      >
                        Skapa konto
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
