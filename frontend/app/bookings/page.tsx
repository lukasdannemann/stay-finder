import MyBookings from "@/components/MyBookings";
import RequireAuth from "@/components/RequireAuth";

export default function BookingsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Mina bokningar</h1>
      <RequireAuth>
        <MyBookings />
      </RequireAuth>
    </main>
  );
}