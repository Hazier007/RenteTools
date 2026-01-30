# Overview

Interesten.be is a Belgian financial calculator web application providing specialized tools for savings interest, compound interest, and mortgage calculations. Built as a full-stack TypeScript application with React and Express.js, its purpose is to empower Belgian users with accurate financial insights and visualizations to aid in informed decision-making. The project aims to become a leading financial guidance platform in the Belgian market.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The React 18 frontend, built with TypeScript, uses Vite for fast development, Wouter for routing, and TanStack Query for data fetching. UI components are built with shadcn/ui (Radix UI primitives) and styled with Tailwind CSS. Form handling uses React Hook Form with Zod validation, and Recharts is used for data visualization. The architecture is modular, with a custom theme system supporting light and dark modes.

## Backend Architecture
The Express.js backend, written in TypeScript, provides a RESTful API for financial calculations. It utilizes Zod for shared request validation, custom middleware for logging and error handling, and implements an in-memory storage system with an `IStorage` interface for future database integration. The backend is stateless, ensuring calculation accuracy and consistency through dedicated logic modules.

## Data Storage Solutions
Currently uses an in-memory storage system with an `IStorage` interface, allowing for easy migration to persistent storage. User management is UUID-based. The system is prepared for Drizzle ORM with PostgreSQL integration and `connect-pg-simple` for session management.

## Authentication and Authorization
The application uses secure session-based authentication with Bcrypt for password hashing (saltRounds=10). Express-session is configured for production with httpOnly, sameSite='lax', and secure: true (in production) cookies, and a 24-hour expiration. Rate limiting is applied to the login endpoint. Role-based access control (using `requireAuth` and `requireAdmin` middleware) protects administrative routes for bank, product, rate, blog, RSS, blog automation, and IndexNow management. All GET endpoints and calculator pages are publicly accessible.

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver for future database integration.
- **drizzle-orm** and **drizzle-kit**: Type-safe SQL ORM and migration toolkit.
- **connect-pg-simple**: PostgreSQL session store for Express sessions.

## UI and Component Libraries
- **@radix-ui/**: Accessible, unstyled UI primitives.
- **@tanstack/react-query**: Server state management and data fetching.
- **@hookform/resolvers**: Form validation resolvers.
- **recharts**: Charting library.
- **tailwindcss**: Utility-first CSS framework.

## Development and Build Tools
- **vite**: Fast build tool and dev server.
- **typescript**: Type safety.
- **esbuild**: Fast JavaScript bundler.

## Financial Calculation Libraries
- **date-fns**: Date manipulation.
- **zod**: Runtime type validation and schema definition.
- **drizzle-zod**: Drizzle ORM and Zod schema integration.