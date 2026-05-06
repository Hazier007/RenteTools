import type { CalculatorEducationalContent } from "./types";

export const reeleRenteBerekenenContent: CalculatorEducationalContent = {
  sections: [
    {
      heading: "Wat doet de Reële Rente Calculator?",
      blocks: [
        {
          kind: "p",
          text: "De Reële Rente Calculator toont u de werkelijke koopkracht van uw spaargeld na inflatie. Een nominale spaarrente van 2,5% ziet er goed uit — maar bij 2,1% inflatie is uw reële rendement amper 0,4%. Bij hogere inflatie kan uw spaargeld zelfs koopkracht verliezen ondanks rentegroei. Deze tool berekent uw reële rente, projecteert hoe uw kapitaal in echte koopkracht evolueert over 1 tot 30 jaar, en helpt u beslissen of een spaarrekening volstaat of dat u moet beleggen om inflatie te verslaan.",
        },
      ],
    },
    {
      heading: "Hoe werkt het?",
      blocks: [
        {
          kind: "p",
          text: "De calculator gebruikt de Fisher-vergelijking, de standaardformule voor reële rente in de financiële wetenschap:",
        },
        {
          kind: "formula",
          text: "Reële rente ≈ (1 + nominale rente) ÷ (1 + inflatie) − 1",
        },
        {
          kind: "p",
          text: "Een snelle benadering die bij lage percentages ook goed werkt is: Reële rente ≈ Nominale rente − Inflatie. Bij 2,5% spaarrente en 2,1% inflatie: 2,5 − 2,1 = 0,4% reële rente. Of via Fisher: (1,025 ÷ 1,021) − 1 = 0,392%.",
        },
        {
          kind: "p",
          text: "De tool projecteert vervolgens drie kapitaalcurves:",
        },
        {
          kind: "ul",
          items: [
            "Nominaal eindkapitaal: wat de bank op uw rekening toont.",
            "Koopkracht-eindkapitaal: wat dat geld in échte aankoopwaarde voorstelt.",
            "Reëel rendement: het verschil — winst of verlies aan koopkracht.",
          ],
        },
        {
          kind: "p",
          text: "Voorbeeld: €10.000 op 2,5% spaarrente over 10 jaar = €12.801 nominaal, maar slechts €10.395 in koopkracht van vandaag (bij 2,1% inflatie). Uw werkelijke winst over 10 jaar: €395, of ±0,4% per jaar.",
        },
      ],
    },
    {
      heading: "Belgisch fiscaal kader",
      blocks: [
        {
          kind: "p",
          text: "In België wordt op spaarrenten roerende voorheffing geheven: 15% op interest van gereglementeerde spaarrekeningen (boven de jaarlijkse vrijstelling van €1.020 per persoon in 2026), en 30% op termijnrekeningen, kasbons en spaarverzekeringen Tak 21. Dat heeft een direct effect op uw reële rente: een nominale 3% rente op een termijnrekening wordt na 30% voorheffing slechts 2,1% vóór inflatie. Bij 2,1% inflatie: reële rente = ±0%. Op de gereglementeerde spaarrekening blijft van 2,5% rente meestal de volledige 2,5% over (binnen vrijstelling), waardoor het netto-reëel rendement vaak hoger ligt dan op een termijnrekening — ondanks de schijnbaar lagere nominale rente. Reken altijd netto na voorheffing vs. inflatie om uw werkelijke koopkrachtevolutie te kennen.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Wat is reële rente precies?",
      answer:
        "De reële rente is uw rendement na inflatie — de echte groei van uw koopkracht. Nominale rente is wat de bank u op papier biedt; reële rente is wat u er na inflatie effectief mee koopt.",
    },
    {
      question: "Welke inflatie moet ik invullen?",
      answer:
        "Voor België: gebruik de geharmoniseerde consumptieprijsindex (HICP) van Statbel. Het Belgische gemiddelde voor 2025 lag rond 2,1%. Voor langetermijnplanning kunt u rekenen met een gemiddelde 2-2,5% — de doelinflatie van de ECB.",
    },
    {
      question: "Kan reële rente negatief zijn?",
      answer:
        "Ja. Wanneer inflatie hoger is dan uw nominale spaarrente, verliest uw geld koopkracht ondanks groei in euro's. In 2022-2023 was dat het geval voor de meeste Belgische spaarrekeningen — inflatie >9% tegenover spaarrente <1%.",
    },
    {
      question: "Hoe versla ik inflatie?",
      answer:
        "Drie opties: (1) hogere nominale rente zoeken via vergelijking, (2) langere looptijd vastleggen via een termijnrekening of staatsbon, (3) deels beleggen in aandelen of ETF's voor de lange termijn (>10 jaar) — historisch hoger reëel rendement, maar met volatiliteit.",
    },
    {
      question: "Houdt de calculator rekening met belasting?",
      answer:
        "De basisversie rekent met brutorendement. Voor netto reële rente trekt u eerst de roerende voorheffing af (15% of 30%) van uw nominale rente, vóór u die invult.",
    },
  ],
};
