"use client";

import { useState, type SubmitEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type AuthMode = "login" | "register";

type AuthFormText = {
  title: string;
  submit: string;
  pending: string;
  switchText: string;
  switchLink: string;
  switchHref: string;
};

const TEXT: Record<AuthMode, AuthFormText> = {
  login: {
    title: "Logga in",
    submit: "Logga in",
    pending: "Loggar in…",
    switchText: "Har du inget konto?",
    switchLink: "Skapa konto",
    switchHref: "/register",
  },
  register: {
    title: "Skapa konto",
    submit: "Skapa konto",
    pending: "Skapar konto…",
    switchText: "Har du redan ett konto?",
    switchLink: "Logga in",
    switchHref: "/login",
  },
};

type AuthFormProps = {
  mode: AuthMode;
};

export default function AuthForm({ mode }: AuthFormProps) {
  const { login, register } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const text = TEXT[mode];

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const credentials: AuthCredentials = {
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    };

    setError(null);
    setIsPending(true);

    try {
      if (mode === "login") {
        await login(credentials);
      } else {
        await register(credentials);
      }
      router.push("/");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Något gick fel");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <h1 className="text-xl">{text.title}</h1>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">E-post</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Lösenord</Label>
            <Input
              id="password"
              name="password"
              type="password"
              minLength={6}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              required
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" disabled={isPending}>
            {isPending ? text.pending : text.submit}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {text.switchText}{" "}
            <Link href={text.switchHref} className="text-foreground underline">
              {text.switchLink}
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}