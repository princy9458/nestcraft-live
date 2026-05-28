# Middleware — Locale Routing

The middleware at `middleware.ts` handles internationalization (i18n) routing by managing locale prefixes in the URL.

## Behavior

| Incoming URL | Action | Result |
|---|---|---|
| `/` or `/about` | Internal rewrite to `/{defaultLocale}{path}` | URL stays clean, locale is `en` |
| `/en` or `/en/about` | 301 redirect strips default locale | URL becomes `/` or `/about` |
| `/hi` or `/hi/about` | Pass through | URL unchanged, locale is `hi` |
| `/admin*` | Pass through (skipped entirely) | Admin has its own layout |

## Locale Resolution

Locales are fetched from MongoDB (`tenant_registry` collection, `{ type: "branding" }` document):

```typescript
const locales = branding?.languages?.available?.map((d: any) => d.code) || ["en"];
const defaultLocale = branding?.languages?.default || "en";
```

If MongoDB is unreachable, the middleware falls back to `["en"]` with `"en"` as default and passes all requests through.

## How It Works

1. **Admin routes** (`/admin*`) are excluded from locale processing so standalone admin pages work without a locale prefix.
2. **Default locale detection**: If the URL already has a locale prefix (any of the configured locales), the middleware either strips it (for the default locale via 301 redirect) or passes through (for non-default locales).
3. **No locale in URL**: The path is internally rewritten (not redirected) to the default locale — the browser URL remains clean while Next.js renders the correct locale route.

## SEO

Default locale URLs (e.g., `/en/about`) get a **301 permanent redirect** to the clean URL (`/about`), ensuring search engines index the canonical clean URL.

## Matcher

```typescript
matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
```

API routes, static assets, and favicon are excluded.
