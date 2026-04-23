import { sql } from 'drizzle-orm';
import { db, banksTable, productsTable, ratesTable } from './database';
import { seedBelgianBankingData } from './seed-data';

type CountRow = { count: number | string };

async function getTableCount(table: typeof banksTable | typeof productsTable | typeof ratesTable): Promise<number> {
  const result = await db.select({ count: sql<number>`count(*)` }).from(table);
  const row = result[0] as CountRow | undefined;
  return Number(row?.count ?? 0);
}

export async function bootstrapBankingDataIfEmpty(): Promise<void> {
  const [bankCount, productCount, rateCount] = await Promise.all([
    getTableCount(banksTable),
    getTableCount(productsTable),
    getTableCount(ratesTable),
  ]);

  const databaseIsEmpty = bankCount === 0 && productCount === 0 && rateCount === 0;

  if (!databaseIsEmpty) {
    console.log(
      `Data bootstrap skipped (banks=${bankCount}, products=${productCount}, rates=${rateCount})`,
    );
    return;
  }

  console.log('No banking data found, seeding default Belgian dataset...');
  await seedBelgianBankingData();
}
