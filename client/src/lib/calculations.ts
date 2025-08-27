interface SavingsCalculationInput {
  startbedrag: number;
  storting?: number;
  stortingFrequentie: "maandelijks" | "jaarlijks" | "geen";
  rente: number;
  looptijd: number;
  kapitalisatie: boolean;
}

interface CompoundInterestInput {
  kapitaal: number;
  rendement: number;
  termijn: number;
  frequentie: number;
}

interface MortgageInput {
  leningsbedrag: number;
  looptijd: number;
  rentevoet: number;
  rentetype: "vast" | "variabel";
  herzieningsfrequentie?: string;
  maximaleStijging?: number;
  notariskosten?: number;
}

export function calculateSavingsGrowth(input: SavingsCalculationInput) {
  const { startbedrag, storting = 0, stortingFrequentie, rente, looptijd, kapitalisatie } = input;
  
  const jaarlijkseRente = rente / 100;
  let currentBalance = startbedrag;
  const yearlyBreakdown = [];
  
  // Calculate yearly deposits
  let jaarlijkseStorting = 0;
  if (stortingFrequentie === "maandelijks") {
    jaarlijkseStorting = storting * 12;
  } else if (stortingFrequentie === "jaarlijks") {
    jaarlijkseStorting = storting;
  }
  
  for (let jaar = 1; jaar <= looptijd; jaar++) {
    const beginsaldo = currentBalance;
    
    // Add yearly deposit at beginning of year
    currentBalance += jaarlijkseStorting;
    
    // Calculate interest
    let renteVerdient;
    if (kapitalisatie) {
      // Compound interest: interest on the balance including deposits
      renteVerdient = currentBalance * jaarlijkseRente;
      currentBalance += renteVerdient;
    } else {
      // Simple interest: only on original amount plus deposits
      renteVerdient = currentBalance * jaarlijkseRente;
      // Don't add to balance for simple interest
    }
    
    yearlyBreakdown.push({
      jaar,
      beginsaldo,
      storting: jaarlijkseStorting,
      rente: renteVerdient,
      eindsaldo: kapitalisatie ? currentBalance : currentBalance
    });
  }
  
  const totalDeposits = startbedrag + (jaarlijkseStorting * looptijd);
  const totalInterest = currentBalance - totalDeposits;
  
  return {
    eindbedrag: currentBalance,
    totaleInterest: totalInterest,
    inbreng: totalDeposits,
    yearlyBreakdown
  };
}

export function calculateCompoundInterest(input: CompoundInterestInput) {
  const { kapitaal, rendement, termijn, frequentie } = input;
  
  const jaarlijkseRente = rendement / 100;
  const samengesteld = kapitaal * Math.pow(1 + jaarlijkseRente / frequentie, frequentie * termijn);
  const enkelvoudig = kapitaal + (kapitaal * jaarlijkseRente * termijn);
  const verschil = samengesteld - enkelvoudig;
  
  // Generate comparison data for chart
  const comparison = [];
  for (let jaar = 0; jaar <= termijn; jaar++) {
    const samengesteldeWaarde = kapitaal * Math.pow(1 + jaarlijkseRente / frequentie, frequentie * jaar);
    const enkelvoudigeWaarde = kapitaal + (kapitaal * jaarlijkseRente * jaar);
    
    comparison.push({
      jaar,
      samengesteld: samengesteldeWaarde,
      enkelvoudig: enkelvoudigeWaarde
    });
  }
  
  return {
    samengesteld,
    enkelvoudig,
    verschil,
    comparison
  };
}

export function calculateMortgage(input: MortgageInput) {
  const { leningsbedrag, looptijd, rentevoet } = input;
  
  const maandRente = rentevoet / 100 / 12;
  const aantalMaanden = looptijd * 12;
  
  // Calculate monthly payment using annuity formula
  const maandelijksBedrag = (leningsbedrag * maandRente * Math.pow(1 + maandRente, aantalMaanden)) / 
                           (Math.pow(1 + maandRente, aantalMaanden) - 1);
  
  const totaalBetaald = maandelijksBedrag * aantalMaanden;
  const totaleInterest = totaalBetaald - leningsbedrag;
  
  // Calculate first month breakdown
  const interestDeel = leningsbedrag * maandRente;
  const kapitaalDeel = maandelijksBedrag - interestDeel;
  const kapitaalPercentage = (kapitaalDeel / maandelijksBedrag) * 100;
  const interestPercentage = (interestDeel / maandelijksBedrag) * 100;
  
  return {
    maandelijksBedrag,
    totaalBetaald,
    totaleInterest,
    kapitaalDeel,
    interestDeel,
    kapitaalPercentage,
    interestPercentage
  };
}
