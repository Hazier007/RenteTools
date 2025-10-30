import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@shared/schema';

// Database connection
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
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