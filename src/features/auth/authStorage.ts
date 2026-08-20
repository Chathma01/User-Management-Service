const ACCESS_KEY = "ump_access_token";
const PENDING_KEY = "ump_pending_token";

export const authStorage = {
  getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ACCESS_KEY);
  },

  getPendingToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(PENDING_KEY);
  },

  setAccessToken(token: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem(ACCESS_KEY, token);
  },

  setPendingToken(token: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem(PENDING_KEY, token);
  },

  clear() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(PENDING_KEY);
  },
};