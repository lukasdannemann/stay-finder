const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function getApiBaseUrl(): string {
  if (!API_BASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_API_BASE_URL");
  }

  return API_BASE_URL;
}

// GET

export async function getProperties(): Promise<PaginatedListResponse<Property>> {
    const response = await fetch(`${getApiBaseUrl()}/properties`, {
    cache: "no-store"
  });

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


