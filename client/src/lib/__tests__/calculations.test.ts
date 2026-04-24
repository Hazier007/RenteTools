import { describe, it, expect } from 'vitest';
import { calculateSavingsGrowth, calculateCompoundInterest, calculateMortgage } from '../calculations';

describe('calculateSavingsGrowth', () => {
  it('should calculate basic compound interest for 1 year', () => {
    const result = calculateSavingsGrowth({
      startbedrag: 10000,
      rente: 5,
      looptijd: 1,
      kapitalisatie: true,
      stortingFrequentie: 'geen',
    });

    expect(result.eindbedrag).toBeCloseTo(10500, 0);
    expect(result.totaleInterest).toBeCloseTo(500, 0);
    expect(result.inbreng).toBe(10000);
  });

  it('should calculate compound interest over multiple years', () => {
    const result = calculateSavingsGrowth({
      startbedrag: 10000,
      rente: 5,
      looptijd: 3,
      kapitalisatie: true,
      stortingFrequentie: 'geen',
    });

    // Year 1: 10000 * 1.05 = 10500
    // Year 2: 10500 * 1.05 = 11025
    // Year 3: 11025 * 1.05 = 11576.25
    expect(result.eindbedrag).toBeCloseTo(11576.25, 2);
    expect(result.totaleInterest).toBeCloseTo(1576.25, 2);
    expect(result.yearlyBreakdown).toHaveLength(3);
  });

  it('should calculate simple interest (kapitalisatie=false) without compounding', () => {
    const result = calculateSavingsGrowth({
      startbedrag: 10000,
      rente: 5,
      looptijd: 3,
      kapitalisatie: false,
      stortingFrequentie: 'geen',
    });

    // Simple interest: each year interest is calculated on principal only
    // Year 1: 10000 * 0.05 = 500
    // Year 2: 10000 * 0.05 = 500
    // Year 3: 10000 * 0.05 = 500
    // Total: 10000 + 1500 = 11500
    expect(result.eindbedrag).toBeCloseTo(11500, 2);
    expect(result.totaleInterest).toBeCloseTo(1500, 2);
  });

  it('simple interest should always be less than or equal to compound interest', () => {
    const compoundResult = calculateSavingsGrowth({
      startbedrag: 10000,
      rente: 5,
      looptijd: 5,
      kapitalisatie: true,
      stortingFrequentie: 'geen',
    });

    const simpleResult = calculateSavingsGrowth({
      startbedrag: 10000,
      rente: 5,
      looptijd: 5,
      kapitalisatie: false,
      stortingFrequentie: 'geen',
    });

    expect(compoundResult.eindbedrag).toBeGreaterThan(simpleResult.eindbedrag);
  });

  it('should handle monthly deposits correctly', () => {
    const result = calculateSavingsGrowth({
      startbedrag: 10000,
      storting: 100,
      stortingFrequentie: 'maandelijks',
      rente: 5,
      looptijd: 1,
      kapitalisatie: true,
    });

    // Year 1: (10000 + 1200) * 1.05 = 11760
    // Yearly deposit = 100 * 12 = 1200, added at start of year
    // Balance after deposit: 10000 + 1200 = 11200
    // Interest: 11200 * 0.05 = 560
    // End: 11200 + 560 = 11760
    expect(result.eindbedrag).toBeCloseTo(11760, 0);
    expect(result.inbreng).toBe(10000 + 1200); // startbedrag + yearly deposits
  });

  it('should handle yearly deposits correctly', () => {
    const result = calculateSavingsGrowth({
      startbedrag: 10000,
      storting: 1200,
      stortingFrequentie: 'jaarlijks',
      rente: 5,
      looptijd: 1,
      kapitalisatie: true,
    });

    // Same as monthly 100: deposit 1200 at start of year
    // (10000 + 1200) * 1.05 = 11760
    expect(result.eindbedrag).toBeCloseTo(11760, 0);
    expect(result.inbreng).toBe(10000 + 1200);
  });

  it('should handle zero interest rate', () => {
    const result = calculateSavingsGrowth({
      startbedrag: 10000,
      rente: 0,
      looptijd: 5,
      kapitalisatie: true,
      stortingFrequentie: 'geen',
    });

    expect(result.eindbedrag).toBe(10000);
    expect(result.totaleInterest).toBe(0);
    expect(result.inbreng).toBe(10000);
  });

  it('should handle zero starting amount with deposits', () => {
    const result = calculateSavingsGrowth({
      startbedrag: 0,
      storting: 500,
      stortingFrequentie: 'maandelijks',
      rente: 5,
      looptijd: 2,
      kapitalisatie: true,
    });

    // Year 1: 0 + 6000 = 6000 at start, interest = 6000 * 0.05 = 300, end = 6300
    // Year 2: 6300 + 6000 = 12300 at start, interest = 12300 * 0.05 = 615, end = 12915
    expect(result.eindbedrag).toBeCloseTo(12915, 0);
    expect(result.inbreng).toBe(12000); // 0 + 6000 * 2
    expect(result.totaleInterest).toBeCloseTo(915, 0);
  });

  it('should return correct yearly breakdown entries', () => {
    const result = calculateSavingsGrowth({
      startbedrag: 10000,
      rente: 5,
      looptijd: 2,
      kapitalisatie: true,
      stortingFrequentie: 'geen',
    });

    expect(result.yearlyBreakdown).toHaveLength(2);

    // Year 1
    expect(result.yearlyBreakdown[0].jaar).toBe(1);
    expect(result.yearlyBreakdown[0].beginsaldo).toBe(10000);
    expect(result.yearlyBreakdown[0].rente).toBeCloseTo(500, 2);
    expect(result.yearlyBreakdown[0].eindsaldo).toBeCloseTo(10500, 2);

    // Year 2
    expect(result.yearlyBreakdown[1].jaar).toBe(2);
    expect(result.yearlyBreakdown[1].beginsaldo).toBeCloseTo(10500, 2);
    expect(result.yearlyBreakdown[1].rente).toBeCloseTo(525, 2);
    expect(result.yearlyBreakdown[1].eindsaldo).toBeCloseTo(11025, 2);
  });
});

describe('calculateCompoundInterest', () => {
  it('should calculate known values: 1000 at 10% for 1 year, quarterly compounding', () => {
    const result = calculateCompoundInterest({
      kapitaal: 1000,
      rendement: 10,
      termijn: 1,
      frequentie: 4,
    });

    // A = 1000 * (1 + 0.10/4)^(4*1) = 1000 * (1.025)^4 = 1103.8128...
    expect(result.samengesteld).toBeCloseTo(1103.81, 1);
    // Simple: 1000 + 1000 * 0.10 * 1 = 1100
    expect(result.enkelvoudig).toBeCloseTo(1100, 2);
    expect(result.verschil).toBeCloseTo(3.81, 0);
  });

  it('compound should always be >= simple interest', () => {
    const result = calculateCompoundInterest({
      kapitaal: 5000,
      rendement: 8,
      termijn: 10,
      frequentie: 12,
    });

    expect(result.samengesteld).toBeGreaterThanOrEqual(result.enkelvoudig);
    expect(result.verschil).toBeGreaterThanOrEqual(0);
  });

  it('should handle annual compounding (frequentie=1)', () => {
    const result = calculateCompoundInterest({
      kapitaal: 1000,
      rendement: 10,
      termijn: 2,
      frequentie: 1,
    });

    // A = 1000 * (1 + 0.10/1)^(1*2) = 1000 * 1.10^2 = 1210
    expect(result.samengesteld).toBeCloseTo(1210, 2);
    // Simple: 1000 + 1000 * 0.10 * 2 = 1200
    expect(result.enkelvoudig).toBeCloseTo(1200, 2);
    expect(result.verschil).toBeCloseTo(10, 2);
  });

  it('should handle quarterly compounding (frequentie=4)', () => {
    const result = calculateCompoundInterest({
      kapitaal: 1000,
      rendement: 10,
      termijn: 2,
      frequentie: 4,
    });

    // A = 1000 * (1 + 0.10/4)^(4*2) = 1000 * (1.025)^8
    const expected = 1000 * Math.pow(1.025, 8);
    expect(result.samengesteld).toBeCloseTo(expected, 2);
  });

  it('should handle monthly compounding (frequentie=12)', () => {
    const result = calculateCompoundInterest({
      kapitaal: 1000,
      rendement: 10,
      termijn: 2,
      frequentie: 12,
    });

    // A = 1000 * (1 + 0.10/12)^(12*2)
    const expected = 1000 * Math.pow(1 + 0.10 / 12, 24);
    expect(result.samengesteld).toBeCloseTo(expected, 2);
  });

  it('should handle daily compounding (frequentie=365)', () => {
    const result = calculateCompoundInterest({
      kapitaal: 1000,
      rendement: 10,
      termijn: 1,
      frequentie: 365,
    });

    // A = 1000 * (1 + 0.10/365)^(365*1)
    const expected = 1000 * Math.pow(1 + 0.10 / 365, 365);
    expect(result.samengesteld).toBeCloseTo(expected, 2);
    // Simple stays the same regardless of frequency
    expect(result.enkelvoudig).toBeCloseTo(1100, 2);
  });

  it('higher compounding frequency should yield higher compound result', () => {
    const annual = calculateCompoundInterest({
      kapitaal: 1000,
      rendement: 10,
      termijn: 5,
      frequentie: 1,
    });
    const quarterly = calculateCompoundInterest({
      kapitaal: 1000,
      rendement: 10,
      termijn: 5,
      frequentie: 4,
    });
    const monthly = calculateCompoundInterest({
      kapitaal: 1000,
      rendement: 10,
      termijn: 5,
      frequentie: 12,
    });
    const daily = calculateCompoundInterest({
      kapitaal: 1000,
      rendement: 10,
      termijn: 5,
      frequentie: 365,
    });

    expect(daily.samengesteld).toBeGreaterThan(monthly.samengesteld);
    expect(monthly.samengesteld).toBeGreaterThan(quarterly.samengesteld);
    expect(quarterly.samengesteld).toBeGreaterThan(annual.samengesteld);
  });

  it('should generate correct comparison data', () => {
    const result = calculateCompoundInterest({
      kapitaal: 1000,
      rendement: 10,
      termijn: 3,
      frequentie: 1,
    });

    // comparison array should have entries for year 0 through year 3 (4 entries)
    expect(result.comparison).toHaveLength(4);
    expect(result.comparison[0].jaar).toBe(0);
    expect(result.comparison[0].samengesteld).toBeCloseTo(1000, 2);
    expect(result.comparison[0].enkelvoudig).toBeCloseTo(1000, 2);
    expect(result.comparison[3].jaar).toBe(3);
  });
});

describe('calculateMortgage', () => {
  it('should calculate known mortgage: 200000 at 3% for 20 years', () => {
    const result = calculateMortgage({
      leningsbedrag: 200000,
      rentevoet: 3,
      looptijd: 20,
      rentetype: 'vast',
    });

    // Monthly payment for 200000 at 3% over 20 years should be ~1109.20
    expect(result.maandelijksBedrag).toBeCloseTo(1109.20, 0);
  });

  it('total paid should be monthly payment times number of months', () => {
    const result = calculateMortgage({
      leningsbedrag: 200000,
      rentevoet: 3,
      looptijd: 20,
      rentetype: 'vast',
    });

    const expectedTotal = result.maandelijksBedrag * (20 * 12);
    expect(result.totaalBetaald).toBeCloseTo(expectedTotal, 2);
  });

  it('total interest should be total paid minus loan amount', () => {
    const result = calculateMortgage({
      leningsbedrag: 200000,
      rentevoet: 3,
      looptijd: 20,
      rentetype: 'vast',
    });

    expect(result.totaleInterest).toBeCloseTo(result.totaalBetaald - 200000, 2);
  });

  it('interest + capital parts should sum to monthly payment', () => {
    const result = calculateMortgage({
      leningsbedrag: 200000,
      rentevoet: 3,
      looptijd: 20,
      rentetype: 'vast',
    });

    expect(result.kapitaalDeel + result.interestDeel).toBeCloseTo(result.maandelijksBedrag, 2);
  });

  it('interest and capital percentages should sum to 100', () => {
    const result = calculateMortgage({
      leningsbedrag: 200000,
      rentevoet: 3,
      looptijd: 20,
      rentetype: 'vast',
    });

    expect(result.kapitaalPercentage + result.interestPercentage).toBeCloseTo(100, 2);
  });

  it('should calculate correctly for a different loan scenario', () => {
    const result = calculateMortgage({
      leningsbedrag: 300000,
      rentevoet: 4,
      looptijd: 25,
      rentetype: 'vast',
    });

    // Monthly rate = 4/100/12 = 0.003333...
    // Months = 25 * 12 = 300
    // M = 300000 * 0.003333 * (1.003333)^300 / ((1.003333)^300 - 1)
    const monthlyRate = 0.04 / 12;
    const months = 300;
    const expectedMonthly = (300000 * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    expect(result.maandelijksBedrag).toBeCloseTo(expectedMonthly, 2);
    expect(result.totaalBetaald).toBeCloseTo(expectedMonthly * months, 2);
    expect(result.totaleInterest).toBeCloseTo(expectedMonthly * months - 300000, 2);
  });

  it('first month interest should equal loan amount times monthly rate', () => {
    const result = calculateMortgage({
      leningsbedrag: 200000,
      rentevoet: 3,
      looptijd: 20,
      rentetype: 'vast',
    });

    const expectedFirstMonthInterest = 200000 * (3 / 100 / 12);
    expect(result.interestDeel).toBeCloseTo(expectedFirstMonthInterest, 2);
  });

  it('capital portion should be positive for a standard mortgage', () => {
    const result = calculateMortgage({
      leningsbedrag: 200000,
      rentevoet: 3,
      looptijd: 20,
      rentetype: 'vast',
    });

    expect(result.kapitaalDeel).toBeGreaterThan(0);
    expect(result.interestDeel).toBeGreaterThan(0);
  });
});
