# DigitalVault — Premium Digital Goods Marketplace

A full-stack Next.js 14 digital goods showcase with Supabase authentication, PostgreSQL via Prisma, and a clean professional UI built with Tailwind CSS + ShadCN/UI.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + ShadCN/UI |
| Database | PostgreSQL via Prisma ORM |
| Auth | Supabase Auth |
| Rendering | SSR (product pages) + ISR (listings) |
| SEO | Next.js Metadata API + JSON-LD |

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your credentials:

```env
# PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/digital_goods"

# Supabase (get from https://supabase.com/dashboard)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# App
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_TELEGRAM_SUPPORT="https://t.me/your_support_channel"
```

### 3. Set up the database

```bash
# Run migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# Seed with sample products and categories
npm run db:seed
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Project Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. In **Authentication → URL Configuration**, add:
   - Site URL: `http://localhost:3000` (or your production URL)
   - Redirect URLs: `http://localhost:3000/auth/callback`

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (Navbar + Footer)
│   ├── page.tsx                      # Homepage (hero, categories, featured)
│   ├── globals.css                   # Tailwind + CSS variables
│   ├── sitemap.ts                    # Dynamic sitemap
│   ├── robots.ts                     # robots.txt
│   ├── products/
│   │   ├── page.tsx                  # Product catalog (search + filter + pagination)
│   │   └── [slug]/page.tsx           # Product detail (SSR, JSON-LD, ReactMarkdown)
│   ├── categories/
│   │   └── [slug]/page.tsx           # Category listing (ISR, JSON-LD)
│   ├── contact/page.tsx              # Telegram support page
│   ├── about/page.tsx                # About page
│   ├── auth/callback/route.ts        # Supabase OAuth callback + Postgres user sync
│   └── api/
│       ├── products/route.ts         # GET /api/products (search, filter, paginate)
│       ├── products/[id]/route.ts    # GET /api/products/:id
│       ├── categories/route.ts       # GET /api/categories
│       ├── categories/[slug]/route.ts# GET /api/categories/:slug
│       └── auth/sync/route.ts        # POST /api/auth/sync (upsert user to Postgres)
├── components/
│   ├── Navbar.tsx                    # Sticky navbar with auth state
│   ├── Footer.tsx                    # Footer with navigation
│   ├── AuthModal.tsx                 # Sign in / sign up dialog
│   ├── ProductCard.tsx               # Product card (image, badge, price, min order)
│   ├── ProductGrid.tsx               # Responsive product grid
│   ├── ProductFiltersBar.tsx         # Search + category filter bar
│   ├── CategoryCard.tsx              # Category card with image overlay
│   ├── Pagination.tsx                # URL-based pagination component
│   └── ui/                           # ShadCN/UI components
│       ├── badge.tsx                 # Includes success/warning variants
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       └── skeleton.tsx
├── hooks/
│   └── useUser.ts                    # Auth hook with Postgres sync on login
├── lib/
│   ├── prisma.ts                     # Singleton Prisma client
│   ├── supabase.ts                   # Browser + server Supabase clients
│   ├── products.ts                   # Product data access layer
│   ├── categories.ts                 # Category data access layer
│   └── utils.ts                      # cn(), formatPrice(), truncate()
├── types/
│   └── index.ts                      # TypeScript interfaces
└── middleware.ts                     # Supabase auth session refresh
```

---

## Database Schema

```prisma
model User {
  id         String   @id @default(cuid())
  email      String   @unique
  supabaseId String   @unique
  balance    Decimal  @default(0)   // For future wallet functionality
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model Category {
  id          String    @id @default(cuid())
  name        String    @unique
  slug        String    @unique
  description String?
  image       String?
  products    Product[]
}

model Product {
  id           String   @id @default(cuid())
  slug         String   @unique
  title        String
  description  String   @db.Text   // Supports Markdown
  image        String
  minOrder     Int
  price        Decimal  @db.Decimal(10, 2)
  availability Boolean  @default(true)
  tags         String[]
  categoryId   String
  category     Category @relation(...)
}
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | List products with `?search=`, `?category=`, `?tag=`, `?page=`, `?pageSize=` |
| GET | `/api/products/:id` | Single product by ID |
| GET | `/api/categories` | All categories with product counts |
| GET | `/api/categories/:slug` | Category + its products |
| POST | `/api/auth/sync` | Upsert authenticated user into Postgres |

---

## Seeded Data

Running `npm run db:seed` creates **12 products** across **6 categories**:

- **Streaming**: Netflix Premium, Spotify Premium, Disney+ Bundle
- **Gaming**: Steam Wallet $50, Xbox Game Pass, Roblox Robux
- **Software**: NordVPN 1 Year, Microsoft 365
- **Gift Cards**: Amazon Gift Card $25, Google Play $10
- **Social Media**: Instagram Followers 1000
- **Education**: Udemy Course Bundle

---

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run db:migrate   # Run Prisma migrations
npm run db:generate  # Regenerate Prisma client
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database with sample data
```

---

## Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

Set all environment variables in the Vercel dashboard. Run migrations against your production database before deploying.

### Environment variables for production

```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
NEXT_PUBLIC_TELEGRAM_SUPPORT="https://t.me/your_channel"
```

---

## SEO Features

- **Product pages**: Dynamic `<title>`, `<meta description>`, Open Graph tags, JSON-LD Product schema, BreadcrumbList schema
- **Category pages**: Dynamic metadata, JSON-LD CollectionPage schema
- **Sitemap**: Auto-generated at `/sitemap.xml` including all products and categories
- **robots.txt**: Auto-generated at `/robots.txt`
- **ISR**: Product and category pages revalidate every 3600 seconds

---

## Authentication Flow

1. User clicks **Sign In** in navbar → `AuthModal` opens
2. On successful login, Supabase sets session cookies via middleware
3. `useUser` hook fires `POST /api/auth/sync` → upserts user into Postgres `User` table
4. Auth state is available throughout the app via `useUser()` hook
5. Email confirmation redirect → `/auth/callback` → exchanges code → redirects to homepage
