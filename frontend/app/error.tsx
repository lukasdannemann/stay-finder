"use client";

export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  const message = error instanceof Error ? error.message : "Okänt fel";

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <h2 className="text-lg font-semibold">Något gick fel</h2>
      <p className="mb-4 text-zinc-500">{message}</p>
      <button onClick={() => retry()} className="rounded-lg border px-4 py-2">
        Försök igen
      </button>
    </main>
  );
}