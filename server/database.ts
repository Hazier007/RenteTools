import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@shared/schema';

// Database connection - postgres-js creates a lazy pool (no connection until first query)
// If DATABASE_URL is not set, a placeholder is used. Queries will fail but the app won't crash at startup.
const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/placeholder';
export const client = postgres(connectionString);
export const db = drizzle(client, { schema });

// Export all tables for convenience
export const {
  usersTable,
  banksTable,
  productsTable,
  ratesTable,
  rateHistoryTable,
  blogPostsTable,
  rssFeedsTable
} = schema;