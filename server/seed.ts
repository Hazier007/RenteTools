import { seedBelgianBankingData } from './seed-data';

async function main() {
  try {
    await seedBelgianBankingData();
    console.log('✅ Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

main();