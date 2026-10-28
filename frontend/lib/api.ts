const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function getErrorMessage(body: ApiError, fallback: string): string {
  if (body.errors?.length) {
    return body.errors.map(([, message]) => message).join(", ");
  }
  return body.error ?? fallback;
}

export function getApiBaseUrl(): string {
  if (!API_BASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_API_BASE_URL");
  }

  return API_BASE_URL;
}

// GET

export async function getProperties(filters: PropertyFilters = {}): Promise<PaginatedListResponse<Property>> {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
        if (value) {
            params.set(key, value);
        }
    }

    const query = params.toString();
    const url = `${getApiBaseUrl()}/properties${query ? `?${query}` : ""}`;

    const response = await fetch(url, {cache: "no-store"});

  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }

  return response.json();
}

// GET BY ID

export async function getPropertyById(id: string): Promise<Property | null> {
  const response = await fetch(`${getApiBaseUrl()}/properties/${id}`, {
    cache: "no-store"
  });

    if (response.status === 404 || response.status === 400) {
  return null;
}

  if (!response.ok) {
    throw new Error("Failed to fetch property");
  }

  return response.json();
}

// POST

export async function createProperty(input: NewProperty): Promise<Property> {
  const response = await fetch(`${getApiBaseUrl()}/properties`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify(input)
  })

  const body = await response.json()

  if (!response.ok) {
    throw new Error(getErrorMessage(body as ApiError, 'Kunde inte skapa boendet'))
  }

  return body as Property

}


