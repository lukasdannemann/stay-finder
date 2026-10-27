import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Sidan finns inte</h1>
      <p className="mt-2 text-muted-foreground">Kontrollera adressen och försök igen.</p>
      <Link href="/" className={`${buttonVariants()} mt-6`}>
        Till startsidan
      </Link>
    </main>
  );
}