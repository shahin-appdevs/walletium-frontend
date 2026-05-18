/**
 * Centralized API endpoint paths.
 *
 * Conventions:
 * - Each entry is a function that returns a URL string (so dynamic params
 *   are explicit at the call site).
 * - Paths are PATH-ONLY (no host). The caller decides whether to prefix
 *   with ENV.API_URL — server fetchers use `${ENV.API_URL}${path}`, while
 *   the existing axios instances are already configured with `baseURL`,
 *   so they just need the relative path.
 * - Group by domain. Keep adjacent to the consuming feature when it
 *   matures — this file is for cross-cutting URLs.
 *
 * DO NOT import from RTK Query slices or component files. This module is
 * dependency-free so it can be used in both server and client code.
 */

const path = (s) => s;

export const endpoints = {
  // ── Settings & public configuration ───────────────────────────────────
  settings: {
    basic: () => path("/settings/basic-settings"),
  },

  // ── Marketing / public content ────────────────────────────────────────
  journal: {
    list: ({ category, search, page = 1, perPage = 12 } = {}) => {
      const params = new URLSearchParams();
      if (category && category !== "All") params.set("category", category);
      if (search) params.set("q", search);
      params.set("page", String(page));
      params.set("per_page", String(perPage));
      return path(`/journal/articles?${params.toString()}`);
    },
    detail: (slug) => path(`/journal/articles/${encodeURIComponent(slug)}`),
  },

  // ── Auth (public) ─────────────────────────────────────────────────────
  auth: {
    login: () => path("/auth/login"),
    register: () => path("/auth/register"),
    verifyEmail: () => path("/auth/verify-email"),
    forgotPassword: () => path("/auth/forgot-password"),
    resetPassword: () => path("/auth/reset-password"),
  },

  // ── Contact ───────────────────────────────────────────────────────────
  contact: {
    submit: () => path("/contact"),
  },

  // ── Newsletter ────────────────────────────────────────────────────────
  newsletter: {
    subscribe: () => path("/newsletter/subscribe"),
  },
};

export default endpoints;
