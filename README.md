# Elite Biotech Peptides

Elite Biotech Peptides is a branded research storefront built with Next.js 16 and Tailwind CSS 4.
The current launch flow is invoice-first: buyers browse the catalog, review product details, and
submit a manual invoice request that routes to the procurement team for follow-up.

## Current Platform

- Web storefront with Elite Biotech branding
- Product catalog and detail pages
- COA library placeholder and quality pages
- Manual invoice request flow
- Promo tiers for larger orders

## Local Development

Run the site locally:

```bash
npm run dev
```

Build and validate:

```bash
npm run lint
npm run build
```

## Launch Model

The current storefront does not process checkout directly on-site. Instead, each product can route
to a manual invoice request flow. That keeps launch operations simple while payment and fulfillment
processes are finalized.

## Environment Variables

Copy the example file before local work:

```bash
cp .env.example .env.local
cp apps/mobile/.env.example apps/mobile/.env
```

Core variables:

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_COMPANY_NAME`
- `NEXT_PUBLIC_SUPPORT_EMAIL`
- `NEXT_PUBLIC_PROCUREMENT_EMAIL`
- `EXPO_PUBLIC_API_BASE_URL`

## Database Prep

The repo includes a Prisma schema for invoice requests at `prisma/schema.prisma`.

Useful commands:

```bash
npm run db:generate
npm run db:push
npm run db:studio
```

Notes:

- The production target is PostgreSQL.
- `DATABASE_URL` should be your pooled/runtime connection string.
- `DIRECT_URL` should be the direct connection string used by Prisma CLI operations.
- Prisma Client generation is working in this repo.
- For Vercel production, a hosted Postgres provider is the recommended path.

## Invoice API

The web and mobile invoice flows now post to:

- `GET /api/invoice-requests`
- `POST /api/invoice-requests`

Both clients still fall back to opening a manual email draft after submission, so launch-time ops stay unchanged while requests can also be captured server-side.

## Mobile API Base URL

For local mobile testing on a physical phone, `EXPO_PUBLIC_API_BASE_URL` should point to a reachable host such as your Mac's LAN IP or a deployed Vercel URL. `http://localhost:3000` only works from the simulator or the same machine.

## Deploying To Vercel

1. Push the repo to GitHub.
2. Import the repo into Vercel.
3. Keep the project root at the repository root.
4. Add production env vars in Vercel:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_COMPANY_NAME`
   - `NEXT_PUBLIC_SUPPORT_EMAIL`
   - `NEXT_PUBLIC_PROCUREMENT_EMAIL`
5. Deploy the web app.
6. Add your custom domain and update DNS in Vercel.
7. Set the mobile app `EXPO_PUBLIC_API_BASE_URL` to the deployed production URL so the app talks to the same invoice API.

Recommended production direction:

- Use hosted Postgres for both development and production if possible.
- Use the deployed Vercel URL as the mobile API base until a separate API domain is needed.

## Recommended Multi-Platform Architecture

To support web, iPhone, and Android without maintaining separate catalogs by hand:

1. Keep this Next.js app as the main web storefront.
2. Add an Expo app for iOS and Android in the same repository.
3. Move shared catalog, branding, and invoice-flow logic into shared modules.
4. Point both the web app and mobile app at the same data and backend endpoints.
5. Roll out native checkout later only if the business/payment workflow supports it.

This is the safest way to make updates once and have both the website and mobile apps stay aligned.

## Next Build-Out

- Convert the invoice request into a fully server-backed submission flow
- Add invoice history/status reads from the database
- Prepare Vercel deployment and production domain setup
- Add App Store / Play Store icon and splash assets
