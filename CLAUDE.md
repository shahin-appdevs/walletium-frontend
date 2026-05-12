# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Architecture Overview

**Stack:** Next.js 15 (App Router) + React 19, Redux Toolkit + RTK Query, Ant Design, Tailwind CSS v4, next-intl

### Routing

File-based routing under `src/app/[locale]/(admin)/dashboard/`. The `[locale]` dynamic segment drives i18n — all routes are prefixed with the active locale (`en`/`ar`). The `(admin)` group applies a shared dashboard layout.

### State Management

Two layers of state:
- **Redux (auth slice):** Persisted to localStorage via redux-persist. Holds `user`, `token`, and auth flow tokens. Only the `auth` slice is persisted (`src/redux/persistConfig.js`).
- **RTK Query (baseApi):** Server state with caching. All API modules inject into `baseApi` (`src/redux/api/baseApi.js`). The base query automatically appends the `lang` URL param and extracts the Bearer token via `src/lib/token.js`.

### API Layer

`src/lib/axios.js` exports two Axios instances:
- `axiosPublic` — unauthenticated requests
- `axiosPrivate` — auto-attaches Bearer token via request interceptor; handles 401 in response interceptor

RTK Query endpoints live in `src/redux/api/` (e.g., `addMoneyApi.js`, `authApi.js`). Use the generated hooks (`useGetXQuery`, `useXMutation`) in components.

### i18n

`next-intl` with server-side `getMessages()` in the root layout. All user-facing strings must use `useTranslations()`. Arabic locale triggers RTL (`dir="rtl"` on `<html>`). Validation schemas using Yup are built inside `useMemo` so they can reference translated error messages.

### Theme

`src/contexts/ThemeContextProvider.jsx` provides dark/light mode via context. It syncs with localStorage, Tailwind's `dark` class on `<html>`, and Ant Design's `ConfigProvider` theme algorithm. Consume with `useTheme()`. Primary brand color: `#0ebe98`.

### Form Pattern

React Hook Form + Yup + Ant Design:
```jsx
const schema = useMemo(() => yup.object({ ... }), [t]);
const { control, handleSubmit } = useForm({ resolver: yupResolver(schema) });
// Wrap Ant Design inputs with <Controller> from react-hook-form
```
Use `src/components/ui/form/fields/FormInput.jsx` and related wrappers for consistent field styling.

### Token Storage

`src/lib/token.js` abstracts localStorage/sessionStorage. "Remember me" → localStorage; otherwise sessionStorage.

### Notifications

Use `src/lib/toast.js` (`showToast`) for all user feedback — do not call `toast` directly.

### Error/Success Message Extraction

API responses follow a standard shape. Use `src/utils/getErrorMessage.js` and `src/utils/getSuccessMessage.js` rather than directly reading `error.data.message`.

## Key Conventions

- **Path alias:** `@/` maps to `src/`. Always use this for imports.
- **Client components:** Add `"use client"` directive for any component using hooks or browser APIs.
- **Loading states:** Show skeleton components (not spinners) during initial data fetches.
- **API error shape:** `error?.data?.message` (array); success shape: `data?.message?.success` (array).
- **Image URLs:** Build with `src/utils/getImageUrl.js` using `NEXT_PUBLIC_STORAGE_BASE_URL`.
- **No TypeScript:** Project is plain JavaScript/JSX throughout.
- **Lazy queries:** Use RTK Query's `useLazyXQuery` for queries triggered by user interaction (e.g., selecting a payment gateway).

## Environment Variables

```
NEXT_PUBLIC_API_BASE_URL      # Backend API base URL
NEXT_PUBLIC_STORAGE_BASE_URL  # CDN base URL for images/files
```
