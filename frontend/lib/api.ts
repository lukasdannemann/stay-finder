const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function getApiBaseUrl(): string {
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

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch property");
  }

  return response.json();
}


