// src/lib/api.ts
export type ApiError = {
  status?: number;
  message?: string; 
  raw?: unknown;  
};

function getBaseUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw { status: 0, message: "API base URL not configured" } as ApiError;
  }
  return baseUrl;
}

function buildValidationMessage(detail: any): string | null {
  // FastAPI validation format:
  if (!Array.isArray(detail) || detail.length === 0) return null;

  const first = detail[0];
  const loc = Array.isArray(first?.loc) ? first.loc : [];
  const field = loc[loc.length - 1]; // e.g. "password"
  const msg = typeof first?.msg === "string" ? first.msg : null;

  if (!msg) return null;

  const fieldLabel =
    typeof field === "string"
      ? field
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()) // Title Case
      : "Field";

  
  return `${fieldLabel}: ${msg}`;
}

async function readErrorMessage(res: Response): Promise<{ message: string; raw?: unknown }> {
  const contentType = res.headers.get("content-type") || "";

  // Try JSON first (FastAPI usually returns JSON)
  if (contentType.includes("application/json")) {
    try {
      const json = await res.json();

      // FastAPI validation
      const validationMsg = buildValidationMessage((json as any)?.detail);
      if (validationMsg) return { message: validationMsg, raw: json };

      // Common JSON error shapes
      if (typeof (json as any)?.message === "string") return { message: (json as any).message, raw: json };
      if (typeof (json as any)?.detail === "string") return { message: (json as any).detail, raw: json };

      return { message: `Request failed (${res.status})`, raw: json };
    } catch {
      // fallthrough to text
    }
  }

  // Fallback to text
  try {
    const text = await res.text();
    const msg = text?.trim();
    return { message: msg || `Request failed (${res.status})`, raw: msg };
  } catch {
    return { message: `Request failed (${res.status})` };
  }
}

export async function apiRequest<T>(args: {
  path: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  token?: string;
  query?: Record<string, string | number | undefined>;
  body?: unknown;
}): Promise<T> {
  const baseUrl = getBaseUrl();
  const url = new URL(`${baseUrl}${args.path}`);

  if (args.query) {
    for (const [k, v] of Object.entries(args.query)) {
      if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
    }
  }

  const headers: Record<string, string> = {};
  if (args.token) headers.Authorization = `Bearer ${args.token}`;
  if (args.body !== undefined) headers["Content-Type"] = "application/json";

  let res: Response;
  try {
    res = await fetch(url.toString(), {
      method: args.method ?? "GET",
      headers,
      body: args.body !== undefined ? JSON.stringify(args.body) : undefined,
    });
  } catch {
    throw { status: 0, message: "NETWORK_ERROR" } as ApiError;
  }

  if (!res.ok) {
    const { message, raw } = await readErrorMessage(res);
    throw { status: res.status, message, raw } as ApiError;
  }

  return (await res.json()) as T;
}