# Overview

This is a Belgian financial calculator web application called "Interesten.be" that provides specialized interest and financial calculation tools for the Belgian market. The application offers three main calculator types: savings interest (spaarrente), compound interest (samengestelde rente), and mortgage calculations (hypotheek). It's built as a full-stack TypeScript application with a React frontend and Express.js backend, designed to help Belgian users make informed financial decisions through accurate calculations and visualizations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side application is built with **React 18** using **TypeScript** and follows a component-based architecture. Key architectural decisions include:

- **Vite** as the build tool for fast development and optimized production builds
- **Wouter** for lightweight client-side routing instead of React Router
- **TanStack Query** for server state management and API data fetching
- **shadcn/ui** component library built on **Radix UI** primitives for accessible, customizable UI components
- **Tailwind CSS** for utility-first styling with custom design tokens
- **React Hook Form** with **Zod** validation for type-safe form handling
- **Recharts** for data visualization and financial charts

The frontend follows a modular structure with separate directories for pages, components (including calculator-specific components), UI components, utilities, and hooks. The application uses a custom theme system with CSS variables for consistent styling across light and dark modes.

## Backend Architecture
The server is built with **Express.js** and TypeScript, implementing a RESTful API architecture:

- **Express.js** server with TypeScript for type safety
- RESTful API endpoints for financial calculations
- **Zod** schemas for request validation shared between frontend and backend
- Custom middleware for request logging and error handling
- In-memory storage implementation with interface abstraction for future database integration
- Modular route registration system

The backend is designed to be stateless, with all financial calculations performed server-side to ensure accuracy and consistency. The calculation logic is separated into dedicated modules for maintainability.

## Data Storage Solutions
Currently implements an **in-memory storage** system with a well-defined interface (`IStorage`) that abstracts storage operations. This design allows for easy migration to persistent storage solutions:

- Interface-based storage abstraction for future database integration
- User management with UUID-based identification
- Prepared for **Drizzle ORM** with **PostgreSQL** integration (configuration already present)
- Session management ready for implementation with `connect-pg-simple`

The storage interface defines CRUD operations for users, making it straightforward to replace the in-memory implementation with a database-backed solution.

## Authentication and Authorization
The application implements secure session-based authentication with industry-standard security practices:

### Security Implementation
- **Bcrypt password hashing**: All passwords hashed with saltRounds=10 (never stored in plaintext)
- **Express-session** with production-ready configuration:
  - Requires SESSION_SECRET environment variable (application fails to start without it in production)
  - httpOnly cookies to prevent XSS attacks
  - sameSite: 'lax' for CSRF protection
  - secure: true in production for HTTPS-only cookies
  - 24-hour session expiration
- **Rate limiting**: Login endpoint limited to 5 attempts per IP per 15 minutes to prevent brute-force attacks
- **Role-based access control**: Authentication middleware (`requireAuth`, `requireAdmin`) protects administrative routes

### Admin Credentials
- Username: `Bart`
- Password: `BB@@sucks007`
- Email: `bart@interesten.be`
- **⚠️ IMPORTANT**: Keep these credentials secure and change password if needed

### Protected Endpoints (Admin-only)
- Bank management: POST/PUT/DELETE `/api/banks`
- Product management: POST/PUT/DELETE `/api/products`
- Rate management: POST/PUT/DELETE `/api/rates`
- Blog post management: POST/PATCH/DELETE `/api/blog/posts`
- RSS feed management: POST/PATCH/DELETE `/api/rss/feeds`
- Blog automation: POST `/api/blog/automation/*`
- IndexNow submissions: POST `/api/indexnow/submit`

### Public Endpoints
- All GET endpoints (reading data)
- Calculator pages and calculations
- Blog post viewing
- Bank/product/rate viewing

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless** - Serverless PostgreSQL database driver for future database integration
- **drizzle-orm** and **drizzle-kit** - Type-safe SQL ORM and migration toolkit
- **connect-pg-simple** - PostgreSQL session store for Express sessions

### UI and Component Libraries
- **@radix-ui/** components - Accessible, unstyled UI primitives for building the component system
- **@tanstack/react-query** - Server state management and data fetching
- **@hookform/resolvers** - Form validation resolvers for React Hook Form
- **recharts** - Charting library for financial data visualization
- **tailwindcss** - Utility-first CSS framework for styling

### Development and Build Tools
- **vite** - Fast build tool and dev server
- **typescript** - Type safety across the entire application
- **esbuild** - Fast JavaScript bundler for production builds
- **@replit/vite-plugin-runtime-error-modal** - Development error handling
- **@replit/vite-plugin-cartographer** - Development tooling integration

### Financial Calculation Libraries
- **date-fns** - Date manipulation for financial calculations
- **zod** - Runtime type validation and schema definition
- **drizzle-zod** - Integration between Drizzle ORM and Zod schemas

The application is specifically designed for the Belgian market with Belgian-specific financial terminology, currency formatting (EUR), and calculation methods that comply with Belgian financial practices.

# Ongoing Refactoring Tasks

## ✅ Sidebar Removal & Content Centering - COMPLETED (100%)

**Status:** All calculator pages with ad sidebar layout have been refactored

### Pattern for Sidebar Removal (Standard Ad Sidebar Layout)
1. Change `max-w-7xl` to `max-w-4xl` for centered layout
2. Replace `grid lg:grid-cols-4 gap-8` with plain `div`
3. Remove `lg:col-span-3` class from main content wrapper
4. Delete entire sidebar div (contains rectangle ads + related calculators cards)
5. Add 728x90 banner ad section INSIDE main content, directly after Calculator Card component
6. Add bottom 728x90 banner ad section before footer (or update existing to max-w-4xl)
7. Update AuthorityLinks section to use `max-w-4xl`

### ✅ Completed Pages - Ad Sidebar Layout (33 pages)

**Previous batches (20 pages):**
1. belastingplanning-calculator
2. budget-planner  
3. fire-calculator
4. doelspaarcalculator
5. hypothecaire-lening-berekenen
6. pensioensparen-calculator
7. autolening-berekenen
8. persoonlijke-lening-berekenen
9. kredietkaart-calculator
10. spaarrekening-vergelijker
11. samengestelde-interest-berekenen
12. noodfonds-calculator
13. inflatie-calculator-belgie
14. beleggingsrente-calculator
15. aandelen-calculator (special 3-column layout - only ad additions)
16. roerende-voorheffing-calculator
17. pensioen-calculator
18. geldontwaarding-calculator
19. reele-rente-berekenen
20. wettelijke-rentevoet-belgie

**Batch 1 (4 pages):**
21. hoogste-spaarrente-belgie
22. deposito-calculator
23. kasbon-calculator
24. termijnrekening-calculator

**Batch 2 (2 pages):**
25. loyalty-bonus-calculator
26. kinderrekening-calculator

**Batch 3 (4 pages):**
27. kredietvergelijker-belgie
28. eindejaarsbonus-calculator
29. levensverzekeraar-calculator
30. groepssparen-calculator

**Batch 4 (3 pages):**
31. vakantiegeld-sparen-calculator
32. lening-herfinancieren
33. studieschuld-calculator

### 🔄 Pages with Input Form Sidebar Layout (Skipped - Functional Layout)
These pages use a different layout with input form on the left (lg:col-span-1) and results on the right (lg:col-span-3). This is a functional layout, not an ad sidebar, so sidebar removal was not needed:
- etf-calculator
- cryptocurrency-calculator
- dollar-cost-averaging-calculator

### ✅ Pages Already Using Correct Layout (No Changes Needed)
These pages already use max-w-4xl centered layout or don't have lg:col-span-3 sidebar structure:
- doorlopend-krediet-calculator
- groepslening-calculator
- schuldenconsolidatie-calculator
- woningkrediet-simulator
- kredietcapaciteit-calculator
- leasingkrediet-calculator
- rentevoet-vergelijker
- obligatie-calculator
- reit-calculator
- portfolio-diversificatie-calculator
- belgische-beleggingsfiscaliteit-calculator
- voorschot-calculator

### Summary
✅ **All calculator pages with ad sidebar layout have been successfully refactored** (33 pages)
✅ **All pages now follow consistent ad placement pattern** (banner ad inside main content after calculator)
✅ **Pages with functional input form sidebars preserved** (3 pages)
✅ **Pages already using correct layout identified** (12 pages)

## ✅ Post-Refactor Bug Fixes - COMPLETED (100%)

**Status:** All critical post-refactor issues have been resolved

### Fixed Issues

1. **Google AdSense Ads Not Showing** ✅
   - Added min-height enforcement to GoogleAdsense component (`client/src/components/ui/google-adsense.tsx`)
   - Ensures ad containers reserve proper space for ad loading
   - Fixed both container and <ins> element min-height styles

2. **Dropdown/Select Menu Z-Index Issue** ✅
   - Increased Select dropdown content z-index to z-[100] (`client/src/components/ui/select.tsx`)
   - Resolved stacking context conflicts with other elements
   - Dropdown menus now properly display above all content

3. **AuthorityLinks Centering & Empty Sections** ✅
   - Implemented conditional wrapper pattern on all pages: `{seoConfig && (<section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><AuthorityLinks /></section>)}`
   - Removed duplicate nested sections from 7 pages (belgische-beleggingsfiscaliteit, cryptocurrency, dollar-cost-averaging, etf, obligatie, portfolio-diversificatie, reit)
   - Prevents empty section rendering when seoConfig is undefined
   - All 48+ calculator pages now properly centered with max-w-4xl

### Technical Details
- **Component Changes**: GoogleAdsense.tsx, Select.tsx
- **Pages Fixed**: All 48+ calculator pages now use consistent AuthorityLinks pattern
- **Pattern Validated**: Architect-reviewed and approved for production use

## ✅ SEO Indexing Fixes - COMPLETED (December 2024)

**Problem:** Bing Webmaster Tools reported failing URLs blocking Google/Bing indexing:
- Legacy .html URLs returning soft-404s (HTTP 200 with homepage content)
- Duplicate calculator URLs (/slug vs /category/slug) causing duplicate content penalties
- Sitemap containing non-canonical URLs

### Implemented Fixes

1. **Legacy .html URL Redirects** ✅ (server/index.ts)
   - 5 specific .html URLs now 301 redirect to modern equivalents:
     - `/de-intrest-op-mijn-spaarrekening.html` → `/sparen/spaarrekening-vergelijker`
     - `/intresten-rekening-courant.html` → `/sparen/samengestelde-interest-berekenen`
     - `/welke-interesten-krijg-ik-op-mijn-spaarrekeningen.html` → `/sparen/hoogste-spaarrente-belgie`
     - `/wettelijke-interesten.html` → `/lenen/wettelijke-rentevoet-belgie`
     - `/looif.html` → `/` (home)

2. **Proper 404 Handler** ✅ (server/index.ts)
   - Returns HTTP 404 for unknown legacy .html URLs
   - Dutch error page with `noindex` meta tag
   - Skips legitimate files: /index.html, /sitemap.xml, /news-sitemap.xml, verification files

3. **Calculator URL Canonicalization** ✅ (server/index.ts)
   - Server-side 301 redirects from `/slug` to `/category/slug`
   - Dynamically generated from calculatorRegistry (48+ calculators)
   - Examples:
     - `/kasbon-calculator` → `/sparen/kasbon-calculator`
     - `/pensioen-calculator` → `/planning/pensioen-calculator`
     - `/roerende-voorheffing-calculator` → `/beleggen/roerende-voorheffing-calculator`

4. **Dynamic Sitemap Generator** ✅ (server/routes.ts)
   - Replaced static sitemap.xml with dynamic server-side generator
   - Uses calculatorRegistry for canonical URLs only
   - Includes: homepage, 5 category landing pages, all calculators, nieuws, blog, static pages
   - Dynamically includes published blog posts with lastmod dates
   - Cached for 1 hour via Cache-Control header

### SEO Middleware Order (server/index.ts)
1. Session configuration
2. Legacy .html redirects (301)
3. Legacy .html 404 handler
4. Calculator canonical redirects (301)
5. Request logging
6. API routes
7. Vite/static serving

### Endpoints
- `/sitemap.xml` - Dynamic sitemap with canonical URLs (68+ URLs)
- `/news-sitemap.xml` - News sitemap for recent blog posts (7 days)

### Next Steps
- Submit updated sitemap in Bing Webmaster Tools
- Request URL re-crawl of previously failing entries
- Monitor crawl stats for soft-404 warning clearance