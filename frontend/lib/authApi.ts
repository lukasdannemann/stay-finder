import {getApiBaseUrl, getErrorMessage} from '@/lib/api'


async function sendAuthRequest(path: string, credentials: AuthCredentials): Promise<AuthUser> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(getErrorMessage(body as ApiError, "Något gick fel, försök igen"));
  }

  return (body as { user: AuthUser }).user;
}

export function login(credentials: AuthCredentials): Promise<AuthUser> {
  return sendAuthRequest("/auth/login", credentials);
}

export function register(credentials: AuthCredentials): Promise<AuthUser> {
  return sendAuthRequest("/auth/register", credentials);
}

export async function logout(): Promise<void> {
  await fetch(`${getApiBaseUrl()}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const response = await fetch(`${getApiBaseUrl()}/auth/me`, {
    credentials: "include",
    cache: "no-store",
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Kunde inte hämta inloggad användare");
  }

  return ((await response.json()) as { user: AuthUser }).user;
}