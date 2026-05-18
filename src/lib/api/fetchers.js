/**
 * Server-side public data fetchers.
 *
 * Use these in **Server Components** (and `generateMetadata`, `generateStaticParams`).
 * Do NOT call from client components — use the RTK Query hooks for that.
 *
 * Why raw `fetch` and not the existing `axiosPublic`?
 * - Next.js extends `fetch` with caching/deduping (`next: { revalidate, tags }`).
 *   Axios bypasses that integration and forces every server render to hit origin.
 * - Calling `revalidateTag(...)` from a route handler invalidates these tags.
 *
 * Conventions:
 * - Every fetcher tags its response so it can be selectively revalidated.
 * - Default cache lifetime is 1 hour; per-fetcher overrides where needed.
 * - On HTTP failure we `throw` — Server Components surface this to the
 *   nearest `error.js` boundary, which is what we want for marketing pages.
 * - Each fetcher returns the parsed JSON body, NOT the full Response.
 */

import { ENV } from "@/config/env";
import endpoints from "./endpoints";

const DEFAULT_REVALIDATE = 3600; // 1 hour

/**
 * Low-level JSON GET with Next.js fetch-cache semantics.
 *
 * @param {string} pathOrUrl  - relative path (preferred) or absolute URL
 * @param {object} [options]
 * @param {number|false} [options.revalidate] - seconds, or `false` to opt out of caching
 * @param {string[]} [options.tags]
 * @param {Record<string,string>} [options.headers]
 * @returns {Promise<any>} parsed JSON
 */
async function getJson(
  pathOrUrl,
  { revalidate = DEFAULT_REVALIDATE, tags = [], headers = {} } = {},
) {
  const url = pathOrUrl.startsWith("http")
    ? pathOrUrl
    : `${ENV.API_URL}${pathOrUrl}`;

  const res = await fetch(url, {
    next: { revalidate, tags },
    headers: {
      Accept: "application/json",
      ...headers,
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    // log in dev, silent in prod
    if (process.env.NODE_ENV === "development") {
      console.error(`[fetcher] ${res.status} ${url}`, body);
    }
    throw new FetchError(res.status, res.statusText, url, body);
  }

  return res.json();
}

class FetchError extends Error {
  constructor(status, statusText, url, body) {
    super(`[fetcher] ${status} ${statusText} — ${url}`);
    this.name = "FetchError";
    this.status = status;
    this.statusText = statusText;
    this.url = url;
    this.body = body;
  }
}

/**
 * Public, server-only data fetchers.
 * Grouped by domain to mirror `endpoints.js`.
 */
export const fetchers = {
  settings: {
    /** Basic branding/feature-flag/config payload for the marketing site. */
    basic: () =>
      getJson(endpoints.settings.basic(), {
        tags: ["settings", "settings:basic"],
        revalidate: 3600,
      }),
  },

  journal: {
    /** Paginated/filterable list of journal articles. */
    list: (params) =>
      getJson(endpoints.journal.list(params), {
        tags: ["journal", "journal:list"],
        revalidate: 600, // 10 min — list changes more often than detail
      }),

    /** Single article by id + slug. Returns details, categories, recent posts. */
    detail: (id, slug, { lang = "en" } = {}) =>
      getJson(endpoints.journal.detail(id, slug, { lang }), {
        tags: ["journal", `journal:${id}`],
        revalidate: 1800, // 30 min
      }),
  },

  
};

export { getJson, FetchError };
export default fetchers;
