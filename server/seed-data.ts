import { db } from './database';
import { banksTable, productsTable, ratesTable } from '@shared/schema';

export async function seedBelgianBankingData() {
  console.log('🌱 Seeding Belgian banking data...');

  // Major Belgian Banks
  const bankData = [
    {
      name: 'KBC Bank',
      shortName: 'KBC',
      website: 'https://www.kbc.be',
      type: 'retail' as const,
      bic: 'KREDBEBB',
      phone: '+32 78 152 153',
      email: 'info@kbc.be',
      description: 'Een van de grootste banken in België, actief in retail banking, verzekeringen en asset management.'
    },
    {
      name: 'BNP Paribas Fortis',
      shortName: 'Fortis',
      website: 'https://www.bnpparibasfortis.be',
      type: 'retail' as const,
      bic: 'GEBABEBB',
      phone: '+32 2 433 41 11',
      email: 'info@bnpparibasfortis.com',
      description: 'Dochteronderneming van BNP Paribas, een van de leidende banken in België.'
    },
    {
      name: 'ING België',
      shortName: 'ING',
      website: 'https://www.ing.be',
      type: 'retail' as const,
      bic: 'BBRUBEBB',
      phone: '+32 2 464 60 04',
      email: 'info@ing.be',
      description: 'Digitale bank die focust op eenvoudige en transparante bankdiensten.'
    },
    {
      name: 'Belfius Bank',
      shortName: 'Belfius',
      website: 'https://www.belfius.be',
      type: 'retail' as const,
      bic: 'GKCCBEBB',
      phone: '+32 2 222 12 11',
      email: 'info@belfius.be',
      description: 'Belgische bank die zowel particulieren als ondernemingen bedient.'
    },
    {
      name: 'Argenta',
      shortName: 'Argenta',
      website: 'https://www.argenta.be',
      type: 'cooperative' as const,
      bic: 'ARSPBE22',
      phone: '+32 3 285 51 11',
      email: 'info@argenta.be',
      description: 'Coöperatieve bank die bekendstaat om haar spaarproducten en hypotheken.'
    },
    {
      name: 'Keytrade Bank',
      shortName: 'Keytrade',
      website: 'https://www.keytradebank.com',
      type: 'online' as const,
      bic: 'KEYABEBB',
      phone: '+32 2 679 90 00',
      email: 'info@keytradebank.com',
      description: 'Online bank gespecialiseerd in beleggen en sparen.'
    }
  ];

  // Insert banks
  const banks = await db.insert(banksTable).values(bankData).returning();
  console.log(`✅ Inserted ${banks.length} banks`);

  // Products for each bank
  const productData = [
    // KBC Products
    {
      bankId: banks[0].id,
      name: 'KBC Spaarrekening',
      productType: 'spaarrekening' as const,
      description: 'Klassieke spaarrekening met dagelijkse beschikbaarheid',
      minAmount: '1',
      maxAmount: null,
      minTerm: null,
      maxTerm: null,
      conditions: 'Geen openingskosten, gratis geldopnames aan automaten'
    },
    {
      bankId: banks[0].id,
      name: 'KBC Start to Save',
      productType: 'spaarrekening' as const,
      description: 'Digitale spaarrekening voor jongeren',
      minAmount: '1',
      maxAmount: null,
      minTerm: null,
      maxTerm: null,
      conditions: 'Tot 25 jaar, hogere rente op eerste €25.000'
    },
    {
      bankId: banks[0].id,
      name: 'KBC Woningkrediet Vast',
      productType: 'hypotheek' as const,
      description: 'Woningkrediet met vaste rentevoet',
      minAmount: '25000',
      maxAmount: '2000000',
      minTerm: 60,
      maxTerm: 360,
      conditions: 'Vaste rente voor hele looptijd, mogelijkheid vervroegde terugbetaling'
    },
    
    // Fortis Products
    {
      bankId: banks[1].id,
      name: 'Fortis Spaarrekening',
      productType: 'spaarrekening' as const,
      description: 'Traditionele spaarrekening',
      minAmount: '1',
      maxAmount: null,
      minTerm: null,
      maxTerm: null,
      conditions: 'Dagelijkse beschikbaarheid, geen boetes'
    },
    {
      bankId: banks[1].id,
      name: 'Fortis Deposito 1 jaar',
      productType: 'deposito' as const,
      description: 'Termijnrekening met vaste rente voor 1 jaar',
      minAmount: '500',
      maxAmount: null,
      minTerm: 12,
      maxTerm: 12,
      conditions: 'Geblokkeerd bedrag voor 1 jaar, hogere rente dan spaarrekening'
    },
    {
      bankId: banks[1].id,
      name: 'Fortis Hypotheek Variabel',
      productType: 'hypotheek' as const,
      description: 'Woningkrediet met variabele rentevoet',
      minAmount: '30000',
      maxAmount: '1500000',
      minTerm: 60,
      maxTerm: 300,
      conditions: 'Rente herzien elke 5 jaar, lagere startrente'
    },

    // ING Products
    {
      bankId: banks[2].id,
      name: 'ING Spaarrekening',
      productType: 'spaarrekening' as const,
      description: 'Online spaarrekening zonder kosten',
      minAmount: '1',
      maxAmount: null,
      minTerm: null,
      maxTerm: null,
      conditions: 'Volledig digitaal beheer, geen bankkosten'
    },
    {
      bankId: banks[2].id,
      name: 'ING Persoonlijke Lening',
      productType: 'persoonlijke_lening' as const,
      description: 'Flexibele persoonlijke lening',
      minAmount: '1000',
      maxAmount: '75000',
      minTerm: 12,
      maxTerm: 84,
      conditions: 'Snelle online aanvraag, vaste maandelijkse afbetaling'
    },

    // Belfius Products
    {
      bankId: banks[3].id,
      name: 'Belfius Spaarrekening Plus',
      productType: 'spaarrekening' as const,
      description: 'Spaarrekening met loyaliteitsbonus',
      minAmount: '1',
      maxAmount: null,
      minTerm: null,
      maxTerm: null,
      conditions: 'Loyaliteitsbonus na 12 maanden trouw blijven'
    },
    {
      bankId: banks[3].id,
      name: 'Belfius Deposito 2 jaar',
      productType: 'deposito' as const,
      description: 'Termijnrekening voor 2 jaar',
      minAmount: '1000',
      maxAmount: null,
      minTerm: 24,
      maxTerm: 24,
      conditions: 'Vaste rente, kapitaal geblokkeerd voor 24 maanden'
    },

    // Argenta Products
    {
      bankId: banks[4].id,
      name: 'Argenta Spaarrekening',
      productType: 'spaarrekening' as const,
      description: 'Coöperatieve spaarrekening',
      minAmount: '1',
      maxAmount: null,
      minTerm: null,
      maxTerm: null,
      conditions: 'Dividend voor coöperatieve leden'
    },
    {
      bankId: banks[4].id,
      name: 'Argenta Woningkrediet',
      productType: 'hypotheek' as const,
      description: 'Hypotheekproduct van de coöperatieve bank',
      minAmount: '25000',
      maxAmount: '1000000',
      minTerm: 60,
      maxTerm: 300,
      conditions: 'Voordelige tarieven voor leden, flexibele voorwaarden'
    },

    // Keytrade Products
    {
      bankId: banks[5].id,
      name: 'Keytrade Spaarrekening',
      productType: 'spaarrekening' as const,
      description: 'Online spaarrekening met hoge rente',
      minAmount: '1',
      maxAmount: null,
      minTerm: null,
      maxTerm: null,
      conditions: 'Volledig online, hoge basisrente'
    },
    {
      bankId: banks[5].id,
      name: 'Keytrade Deposito 6 maanden',
      productType: 'deposito' as const,
      description: 'Korte termijn deposito',
      minAmount: '500',
      maxAmount: null,
      minTerm: 6,
      maxTerm: 6,
      conditions: 'Competitive rente voor 6 maanden vastzetting'
    }
  ];

  const products = await db.insert(productsTable).values(productData).returning();
  console.log(`✅ Inserted ${products.length} products`);

  // Current rates (realistic Belgian rates as of late 2024)
  const rateData = [
    // Spaarrekening rates
    { productId: products[0].id, rateType: 'fixed' as const, baseRate: '0.11', loyaltyBonus: '0.00', effectiveDate: new Date('2024-01-01') },
    { productId: products[1].id, rateType: 'promotional' as const, baseRate: '1.25', loyaltyBonus: '0.00', promotionalRate: '1.25', promotionalPeriod: 4, effectiveDate: new Date('2024-01-01') },
    { productId: products[3].id, rateType: 'fixed' as const, baseRate: '0.11', loyaltyBonus: '0.00', effectiveDate: new Date('2024-01-01') },
    { productId: products[6].id, rateType: 'fixed' as const, baseRate: '0.75', loyaltyBonus: '0.00', effectiveDate: new Date('2024-01-01') },
    { productId: products[8].id, rateType: 'fixed' as const, baseRate: '0.11', loyaltyBonus: '0.35', effectiveDate: new Date('2024-01-01') },
    { productId: products[10].id, rateType: 'fixed' as const, baseRate: '0.15', loyaltyBonus: '0.10', effectiveDate: new Date('2024-01-01') },
    { productId: products[12].id, rateType: 'fixed' as const, baseRate: '1.80', loyaltyBonus: '0.00', effectiveDate: new Date('2024-01-01') },

    // Deposito rates
    { productId: products[4].id, rateType: 'fixed' as const, baseRate: '3.25', loyaltyBonus: '0.00', effectiveDate: new Date('2024-01-01') },
    { productId: products[9].id, rateType: 'fixed' as const, baseRate: '3.45', loyaltyBonus: '0.00', effectiveDate: new Date('2024-01-01') },
    { productId: products[13].id, rateType: 'fixed' as const, baseRate: '2.95', loyaltyBonus: '0.00', effectiveDate: new Date('2024-01-01') },

    // Hypotheek rates
    { productId: products[2].id, rateType: 'fixed' as const, baseRate: '3.85', loyaltyBonus: '0.00', effectiveDate: new Date('2024-01-01') },
    { productId: products[5].id, rateType: 'variable' as const, baseRate: '3.45', loyaltyBonus: '0.00', effectiveDate: new Date('2024-01-01') },
    { productId: products[11].id, rateType: 'fixed' as const, baseRate: '3.75', loyaltyBonus: '0.10', effectiveDate: new Date('2024-01-01') },

    // Personal loan rates
    { productId: products[7].id, rateType: 'fixed' as const, baseRate: '5.95', loyaltyBonus: '0.00', effectiveDate: new Date('2024-01-01') }
  ];

  const rates = await db.insert(ratesTable).values(rateData).returning();
  console.log(`✅ Inserted ${rates.length} current rates`);

  console.log('🎉 Belgian banking data seeded successfully!');
  console.log(`
  Summary:
  - ${banks.length} Belgian banks
  - ${products.length} financial products  
  - ${rates.length} current interest rates
  
  Major banks included:
  - KBC Bank
  - BNP Paribas Fortis
  - ING België
  - Belfius Bank
  - Argenta
  - Keytrade Bank
  `);

  return { banks, products, rates };
}