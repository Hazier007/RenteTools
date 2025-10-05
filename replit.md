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
The application is prepared for session-based authentication:

- User schema defined with username/password fields
- Session storage configuration for PostgreSQL ready for implementation
- Currently uses memory storage but designed for easy upgrade to persistent sessions
- No authentication currently implemented but foundation is in place

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

## Sidebar Removal & Content Centering (In Progress - 45% Complete)

**Status:** 20 out of ~44 calculator pages refactored

### Pattern for Sidebar Removal
1. Change `max-w-7xl` to `max-w-4xl` for centered layout
2. Replace `grid lg:grid-cols-4 gap-8` with plain `div`
3. Remove `lg:col-span-3` class from main content wrapper
4. Delete entire sidebar div (contains rectangle ads + related calculators cards)
5. Add 728x90 banner ad section INSIDE main content, directly after Calculator Card component
6. Add bottom 728x90 banner ad section before footer
7. Update AuthorityLinks section to use `max-w-4xl`

### ⚠️ Correction Needed - Ad Placement Issue
All 20 completed pages have incorrect ad placement. The "Ad After Calculator" section must be positioned INSIDE the main content section (directly after Calculator Card component), not as a separate section outside.

**Fix required:** Move ad placement from outside main content to inside, after Calculator Card.

### ✅ Completed Pages (20/44)
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

### 📋 Remaining Pages (~24)
- hoogste-spaarrente-belgie
- deposito-calculator
- kasbon-calculator
- termijnrekening-calculator
- loyalty-bonus-calculator
- kinderrekening-calculator
- etf-calculator
- cryptocurrency-calculator
- obligatie-calculator
- reit-calculator
- portfolio-diversificatie-calculator
- belgische-beleggingsfiscaliteit-calculator
- dollar-cost-averaging-calculator
- levensverzekeraar-calculator
- doorlopend-krediet-calculator
- groepslening-calculator
- groepssparen-calculator
- lening-herfinancieren
- schuldenconsolidatie-calculator
- studieschuld-calculator
- woningkrediet-simulator
- kredietcapaciteit-calculator
- kredietvergelijker-belgie
- leasingkrediet-calculator
- voorschot-calculator
- vakantiegeld-sparen-calculator
- rentevoet-vergelijker
- eindejaarsbonus-calculator

### Next Steps
1. Fix ad placement for all 20 completed pages
2. Complete remaining ~24 calculator pages with correct ad placement
3. Verify all pages render correctly with centered layout and proper ads