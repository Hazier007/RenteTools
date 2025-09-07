import { z } from "zod";
import { pgTable, text, integer, decimal, boolean, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// Spaarrente calculation schema
export const spaarrenteCalculationSchema = z.object({
  startbedrag: z.number().min(0, "Startbedrag moet positief zijn"),
  storting: z.number().min(0, "Storting moet positief zijn").optional(),
  stortingFrequentie: z.enum(["maandelijks", "jaarlijks", "geen"]),
  rente: z.number().min(0, "Rente moet positief zijn").max(100, "Rente kan niet meer dan 100% zijn"),
  looptijd: z.number().min(1, "Looptijd moet minimaal 1 jaar zijn").max(100, "Looptijd kan niet meer dan 100 jaar zijn"),
  kapitalisatie: z.boolean(),
});

// Samengestelde rente calculation schema  
export const samengesteldeRenteSchema = z.object({
  kapitaal: z.number().min(0, "Kapitaal moet positief zijn"),
  rendement: z.number().min(0, "Rendement moet positief zijn").max(100, "Rendement kan niet meer dan 100% zijn"),
  termijn: z.number().min(1, "Termijn moet minimaal 1 jaar zijn").max(100, "Termijn kan niet meer dan 100 jaar zijn"),
  frequentie: z.number().min(1, "Frequentie moet minimaal 1 zijn"),
});

// Hypotheek calculation schema
export const hypotheekCalculationSchema = z.object({
  leningsbedrag: z.number().min(0, "Leningsbedrag moet positief zijn"),
  looptijd: z.number().min(1, "Looptijd moet minimaal 1 jaar zijn").max(50, "Looptijd kan niet meer dan 50 jaar zijn"),
  rentevoet: z.number().min(0, "Rentevoet moet positief zijn").max(100, "Rentevoet kan niet meer dan 100% zijn"),
  rentetype: z.enum(["vast", "variabel"]),
  herzieningsfrequentie: z.string().optional(),
  maximaleStijging: z.number().optional(),
  notariskosten: z.number().min(0, "Notariskosten moet positief zijn").optional(),
});

export type SpaarrenteCalculation = z.infer<typeof spaarrenteCalculationSchema>;
export type SamengesteldeRenteCalculation = z.infer<typeof samengesteldeRenteSchema>;
export type HypotheekCalculation = z.infer<typeof hypotheekCalculationSchema>;

// Database Schema for Banking System

// Enums for database
export const bankTypeEnum = pgEnum('bank_type', ['retail', 'online', 'cooperative', 'investment']);
export const productTypeEnum = pgEnum('product_type', [
  'spaarrekening', 'deposito', 'hypotheek', 'persoonlijke_lening', 'autolening',
  'kredietkaart', 'beleggingsrekening', 'pensioensparen', 'kasbon', 'staatsbons'
]);
export const rateTypeEnum = pgEnum('rate_type', ['fixed', 'variable', 'promotional']);

// Users table for admin functionality
export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  email: text('email').notNull().unique(),
  role: text('role').notNull().default('admin'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Banks table
export const banksTable = pgTable('banks', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  shortName: text('short_name').notNull(),
  website: text('website'),
  logoUrl: text('logo_url'),
  type: bankTypeEnum('type').notNull(),
  bic: text('bic'),
  phone: text('phone'),
  email: text('email'),
  description: text('description'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Financial products table
export const productsTable = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  bankId: uuid('bank_id').references(() => banksTable.id).notNull(),
  name: text('name').notNull(),
  productType: productTypeEnum('product_type').notNull(),
  description: text('description'),
  minAmount: decimal('min_amount', { precision: 12, scale: 2 }),
  maxAmount: decimal('max_amount', { precision: 12, scale: 2 }),
  minTerm: integer('min_term'), // in months
  maxTerm: integer('max_term'), // in months
  fees: text('fees'), // JSON string for complex fee structure
  conditions: text('conditions'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Interest rates table
export const ratesTable = pgTable('rates', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').references(() => productsTable.id).notNull(),
  rateType: rateTypeEnum('rate_type').notNull(),
  baseRate: decimal('base_rate', { precision: 5, scale: 2 }).notNull(),
  loyaltyBonus: decimal('loyalty_bonus', { precision: 5, scale: 2 }).default('0'),
  promotionalRate: decimal('promotional_rate', { precision: 5, scale: 2 }),
  promotionalPeriod: integer('promotional_period'), // in months
  effectiveDate: timestamp('effective_date').notNull(),
  expiryDate: timestamp('expiry_date'),
  minAmount: decimal('min_amount', { precision: 12, scale: 2 }),
  maxAmount: decimal('max_amount', { precision: 12, scale: 2 }),
  notes: text('notes'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Rate history for tracking changes
export const rateHistoryTable = pgTable('rate_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  rateId: uuid('rate_id').references(() => ratesTable.id).notNull(),
  oldRate: decimal('old_rate', { precision: 5, scale: 2 }),
  newRate: decimal('new_rate', { precision: 5, scale: 2 }),
  changeDate: timestamp('change_date').defaultNow(),
  changeReason: text('change_reason'),
  changedBy: text('changed_by'), // admin user identifier
});

// Zod schemas for API validation
export const insertBankSchema = createInsertSchema(banksTable, {
  name: z.string().min(1, "Bank naam is verplicht"),
  shortName: z.string().min(1, "Korte naam is verplicht"),
  website: z.string().url("Ongeldige website URL").optional(),
  email: z.string().email("Ongeldig e-mailadres").optional(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProductSchema = createInsertSchema(productsTable, {
  name: z.string().min(1, "Product naam is verplicht"),
  minAmount: z.string().optional(),
  maxAmount: z.string().optional(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertRateSchema = createInsertSchema(ratesTable, {
  baseRate: z.string().min(1, "Basisrente is verplicht"),
  loyaltyBonus: z.string().optional(),
  promotionalRate: z.string().optional(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUserSchema = createInsertSchema(usersTable, {
  username: z.string().min(3, "Gebruikersnaam moet minimaal 3 karakters hebben"),
  password: z.string().min(6, "Wachtwoord moet minimaal 6 karakters hebben"),
  email: z.string().email("Ongeldig e-mailadres"),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types for TypeScript
export type User = typeof usersTable.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Bank = typeof banksTable.$inferSelect;
export type InsertBank = z.infer<typeof insertBankSchema>;
export type Product = typeof productsTable.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Rate = typeof ratesTable.$inferSelect;
export type InsertRate = z.infer<typeof insertRateSchema>;
export type RateHistory = typeof rateHistoryTable.$inferSelect;

// API Response types
export type BankWithProducts = Bank & {
  products: (Product & {
    currentRate?: Rate;
  })[];
};

export type ProductWithDetails = Product & {
  bank: Bank;
  currentRate: Rate | null;
  rateHistory: RateHistory[];
};

// Rate comparison types
export type RateComparison = {
  productType: string;
  rates: {
    bankName: string;
    productName: string;
    baseRate: number;
    loyaltyBonus: number;
    totalRate: number;
    minAmount: number | null;
    maxAmount: number | null;
    conditions: string | null;
  }[];
};
