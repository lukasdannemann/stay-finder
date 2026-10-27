import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function PropertyNotFound() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Boendet finns inte</h1>
      <p className="mt-2 text-muted-foreground">
        Det kan ha tagits bort, eller så är länken fel.
      </p>
      <Link href="/" className={`${buttonVariants()} mt-6`}>
        Tillbaka till alla boenden
      </Link>
    </main>
  );
}