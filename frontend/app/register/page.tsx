import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <main className="w-full px-4 py-16">
      <AuthForm mode="register" />
    </main>
  );
}