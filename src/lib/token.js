const TOKEN_KEY = "auth_token";
const USER_INFO = "user_info";

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

export const userInfo = {
  get() {
    if (typeof window === "undefined") return null;
    return (
      JSON.parse(localStorage.getItem(USER_INFO)) ||
      JSON.parse(sessionStorage.getItem(USER_INFO))
    );
  },
  set(value, type) {
    if (type === "local") {
      localStorage.setItem(USER_INFO, JSON.stringify(value));
    } else {
      sessionStorage.setItem(USER_INFO, JSON.stringify(value));
    }
  },
  remove() {
    localStorage.removeItem(USER_INFO);
    sessionStorage.removeItem(USER_INFO);
  },
};
