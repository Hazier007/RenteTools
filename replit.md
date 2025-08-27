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