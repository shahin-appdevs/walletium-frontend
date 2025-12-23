const TOKEN_KEY = "auth_token";

export const token = {
  get() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  },
  set(value, type) {
    if (type === "local") {
      localStorage.setItem(TOKEN_KEY, value);
    } else {
      sessionStorage.setItem(TOKEN_KEY, value);
    }
  },
  remove() {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  },
};
