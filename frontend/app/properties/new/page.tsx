import PropertyForm from "@/components/PropertyForm";
import RequireAuth from "@/components/RequireAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewPropertyPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8">
      <RequireAuth>
        <Card>
          <CardHeader>
            <CardTitle>
              <h1 className="text-xl">Lägg till boende</h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PropertyForm />
          </CardContent>
        </Card>
      </RequireAuth>
    </main>
  );
}