# Quib Fashion — premium menswear storefront

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion.

```bash
npm run dev      # http://localhost:3000
npm run build    # static build (every product and collection page is prerendered)
npm run sync     # refresh data/catalog.json from the live store's product feed
```

Set `NEXT_PUBLIC_SITE_URL` to the production domain so canonical URLs, the sitemap and structured data point at it.

## Where things live

| Path | What it holds |
| --- | --- |
| `lib/site.ts` | Brand, contact details, announcement copy, homepage section order, editorial image picks |
| `data/collections.json` | Collections to sync: site slug, source collection handle, title, description |
| `data/catalog.json` | Generated product snapshot (do not edit by hand; run `npm run sync`) |
| `lib/catalog.ts` | The only module that reads the catalog. Swap its internals to move to a live API |
| `lib/store.ts` | Cart, wishlist and recently viewed (localStorage) |
| `lib/seo.tsx` | JSON-LD builders: Organization, WebSite, Product, BreadcrumbList |
| `data/journal.ts`, `data/help.ts` | Journal articles and policy pages |
| `components/` | UI, one component per file |
| `app/(store)` | All storefront routes, sharing the header, footer and cart drawer |
| `app/(checkout)` | Checkout, with no navigation around it |

## Not wired up yet

- **Checkout** collects details and shows a confirmation, but does not create an order or take payment (`components/CheckoutForm.tsx`).
- **Newsletter** shows a success state without sending the address anywhere (`components/Newsletter.tsx`).
- **Ratings** are placeholders generated in `scripts/sync-catalog.mjs`; they are excluded from structured data.
- **Size guide** measurements in `components/SizeSelector.tsx` are indicative.
- **Shipping fee** below the free-shipping threshold (`shippingFee` in `lib/site.ts`) is an assumed value.
- **Privacy and Terms** copy in `data/help.ts` is a draft.
- **Accounts** are a placeholder page.
# quib
