export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Sparen" | "Lenen" | "Beleggen" | "Planning";
  author: {
    name: string;
    bio: string;
    avatar: string;
  };
  publishDate: string;
  readTime: number;
  image: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "hoogste-spaarrente-verdienen-2026",
    title: "10 Tips om de Hoogste Spaarrente te Verdienen in 2026",
    excerpt: "Ontdek hoe u maximaal rendement haalt uit uw spaargeld met deze praktische strategieën voor Belgische spaarders.",
    category: "Sparen",
    author: {
      name: "Sophie Janssens",
      bio: "Financieel expert met 15 jaar ervaring in persoonlijke financiën en vermogensbeheer in België",
      avatar: "https://ui-avatars.com/api/?name=Sophie+Janssens&background=2563eb&color=fff&size=200"
    },
    publishDate: "2026-01-15",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=675&fit=crop",
    content: `
# 10 Tips om de Hoogste Spaarrente te Verdienen in 2026

In het huidige financiële klimaat is het belangrijker dan ooit om het maximale uit uw spaargeld te halen. Met inflatie die uw koopkracht beïnvloedt, kan elke extra 0,1% rente een significant verschil maken. Hier zijn 10 bewezen strategieën om de hoogste spaarrente te verdienen in België.

## 1. Vergelijk Regelmatig Spaarrekeningen

De spaarrentewereld verandert constant. Banken passen hun tarieven maandelijks aan op basis van ECB-beslissingen en concurrentie. Wat vorige maand de beste spaarrekening was, kan vandaag minder aantrekkelijk zijn.

**Actie:** Gebruik een spaarrente vergelijker minimaal één keer per kwartaal om te zien of u nog steeds de beste rente krijgt.

## 2. Profiteer van Getrouwheidspremies

Veel Belgische banken bieden getrouwheidspremies aan bovenop de basisrente. Deze premie wordt vaak pas na 12 maanden uitgekeerd.

**Voorbeeld:** Een spaarrekening met 1,5% basisrente + 1% getrouwheidspremie = 2,5% totaal na 1 jaar.

**Let op:** Haal uw geld niet tussentijds op, anders verliest u de getrouwheidspremie!

## 3. Spreiding over Meerdere Banken

Leg niet al uw eieren in één mand. Door uw spaargeld te spreiden over meerdere banken:

- Maximaliseert u welkomstbonussen
- Profiteert u van verschillende getrouwheidspremies
- Bent u beter beschermd (depositogarantie tot €100.000 per bank)

## 4. Overweeg Deposito's en Termijnrekeningen

Voor geld dat u 1-5 jaar kunt missen, bieden deposito's vaak hogere rentes dan gewone spaarrekeningen.

**Huidige tarieven (januari 2026):**
- 1 jaar deposito: tot 3,2%
- 3 jaar deposito: tot 3,5%
- 5 jaar deposito: tot 3,8%

## 5. Let op de Roerende Voorheffing

Vergeet niet dat u roerende voorheffing betaalt op spaarrente:
- **30% roerende voorheffing** op interest
- **Eerste €980 belastingvrij** (2026)

## 6. Gebruik Welkomstbonussen

Nieuwe klanten krijgen vaak extra rente als welkomstbonus:
- Tijdelijk verhoogde rente (bv. 3% voor 6 maanden)
- Eenmalige bonus bij opening (bv. €50)

**Strategie:** Open nieuwe rekeningen voor bonussen, maar vergeet de hoofdrekening niet te optimaliseren.

## 7. Automatiseer uw Spaargeld

Stel automatische overschrijvingen in van uw zichtrekening naar spaarrekening:
- Direct na salarisbetaling
- Minimaal 10-20% van uw inkomen
- "Betaal uzelf eerst" principe

## 8. Benut Spaarladders

Creëer een ladder van deposito's met verschillende looptijden:
- 25% op 1 jaar
- 25% op 2 jaar
- 25% op 3 jaar
- 25% op 4 jaar

**Voordeel:** Elk jaar komt een deposito vrij, wat liquiditeit garandeert terwijl u hogere rentes krijgt.

## 9. Controleer Minimum en Maximum Bedragen

Sommige toprentetarieven gelden alleen:
- Vanaf een minimumbedrag (bv. €5.000)
- Tot een maximumbedrag (bv. €500.000)

Lees altijd de voorwaarden!

## 10. Overweeg Beleggen voor een Deel

Voor langetermijnspaardoelen (10+ jaar) bieden beleggingen historisch gezien hoger rendement:
- Aandelen: gemiddeld 7-10% per jaar
- Obligaties: gemiddeld 3-5% per jaar
- Gemengde portefeuille: 5-7% per jaar

**Belangrijk:** Alleen geschikt voor geld dat u >10 jaar kunt missen.

## Conclusie

Met deze 10 strategieën kunt u uw spaarrendement significant verhogen. Vergeet niet regelmatig te controleren of u nog steeds de beste deal heeft - de spaarrentemarkt blijft dynamisch!

*Gebruik onze [spaarrente calculator](/sparen/hoogste-spaarrente-belgie) om te berekenen hoeveel interest u kunt verdienen.*
    `,
    seo: {
      title: "10 Tips Hoogste Spaarrente België 2026 | Maximaal Rendement",
      description: "Verdien maximale rente op uw spaargeld met deze 10 bewezen strategieën voor Belgische spaarders. Inclusief tips over deposito's, getrouwheidspremies en spreiding.",
      keywords: ["hoogste spaarrente", "spaarrente tips", "sparen belgië", "deposito tarieven", "getrouwheidspremie"]
    }
  },
  {
    slug: "hypotheek-aflossen-of-beleggen",
    title: "Hypotheek Aflossen of Beleggen? De Ultieme Gids voor België",
    excerpt: "Een diepgaande analyse om de juiste keuze te maken tussen uw hypotheek vervroegd aflossen of dat geld beleggen.",
    category: "Lenen",
    author: {
      name: "Marc Dubois",
      bio: "Hypotheekadviseur en financieel planner gespecialiseerd in woningfinanciering en vermogensopbouw",
      avatar: "https://ui-avatars.com/api/?name=Marc+Dubois&background=10b981&color=fff&size=200"
    },
    publishDate: "2026-01-10",
    readTime: 12,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=675&fit=crop",
    content: `
# Hypotheek Aflossen of Beleggen? De Ultieme Gids voor België

Een van de meest gestelde vragen door Belgische huiseigenaren: "Moet ik mijn hypotheek vervroegd aflossen of het geld beter beleggen?" De korte antwoord is: **het hangt ervan af**. Laat me u door deze complexe beslissing leiden met concrete berekeningen.

## De Basisvergelijking: Rente op Rente

Het komt neer op één cruciale vergelijking:

**Hypotheekrente** vs. **Verwacht beleggingsrendement**

### Voorbeeld Scenario

Stel, u heeft:
- €20.000 extra beschikbaar
- Hypotheek met 2,5% rente
- 20 jaar resterende looptijd

**Optie A: Hypotheek Aflossen**
- Bespaart €20.000 x 2,5% = €500/jaar aan rente
- Na 20 jaar: €10.000 bespaard (niet-compounded)
- Daadwerkelijk voordeel met compound effect: ~€12.500

**Optie B: Beleggen (7% rendement)**
- €20.000 belegd à 7% per jaar
- Na 20 jaar: €77.400 (compound interest)
- Na roerende voorheffing (30%): ~€60.000 netto

**Verschil:** €47.500 in het voordeel van beleggen!

## Wanneer Hypotheek Aflossen Beter Is

### 1. Hoge Hypotheekrente (>4%)

Als uw hypotheek 4% of meer kost, is aflossen vaak de betere keuze:
- Gegarandeerd rendement van 4%
- Risicovrij
- Lagere maandlasten = meer financiële rust

### 2. Kort voor Pensioen

Binnen 5-10 jaar van pensionering:
- Financiële zekerheid belangrijker
- Minder tijd om marktschommelingen op te vangen
- Lagere woonkosten na pensionering = essentieel

### 3. Stress Reductie

De emotionele waarde van een schuldenvrije woning:
- Slapeloze nachten voorkomen
- Financiële onafhankelijkheid
- Flexibiliteit bij baanverlies

**Dit is geen rationele overweging, maar wel valide!**

### 4. Beperkte Hypotheekrenteaftrek

In België zijn hypotheken fiscaal minder aantrekkelijk geworden:
- Woonbonus grotendeels afgeschaft voor nieuwe leningen
- Geen significante fiscale voordelen meer

## Wanneer Beleggen Beter Is

### 1. Lage Hypotheekrente (<3%)

Met historisch lage rentes:
- Gemakkelijk te verslaan met gediversifieerde beleggingen
- Inflatie "werkt" in uw voordeel (schuld wordt minder waard)

### 2. Lange Tijdshorizon (15+ jaar)

Tijd is uw bondgenoot:
- Marktschommelingen middelen uit
- Compound interest werkt zijn magie
- Risico daalt significant

### 3. Jong en Stabiel Inkomen

Als u:
- <45 jaar oud bent
- Vast contract heeft
- Noodfonds heeft (6-12 maanden)

Dan kunt u risicovoller beleggen voor hoger rendement.

### 4. Fiscaal Voordeel Beleggen

Via pensioensparen:
- Tot 30% belastingvoordeel
- Extra rendement bovenop marktrendement
- Ideaal voor langetermijnvermogensopbouw

## De Hybride Strategie: Het Beste van Beide Werelden

Waarom kiezen als u beide kunt doen?

### 70/30 Regel

- **70% beleggen** voor vermogensopbouw
- **30% aflossen** voor schuldreductie

### Trap Aflossingen

1. **Jaar 1-10:** 80% beleggen, 20% aflossen
2. **Jaar 11-15:** 50/50 split
3. **Jaar 16-20:** 20% beleggen, 80% aflossen

Zo bouwt u vermogen op terwijl u schuld reduceert.

## Belangrijke Factoren om te Overwegen

### 1. Boeterente

Check uw hypotheekcontract:
- Vervroegde aflossing kan 3-6 maanden rente kosten
- Sommige contracten staan jaarlijks x% aflossing toe zonder boete

### 2. Liquiditeit

Geld in uw huis is **illiquide**:
- Moeilijk te gebruiken bij nood
- Huis verkopen kost tijd
- Beleggingen kunnen snel verkocht worden

### 3. Diversificatie

Al uw vermogen in uw huis = **hoog risico**:
- Huizenprijzen kunnen dalen
- Lokale markt afhankelijkheid
- Geen spreiding van risico

## Praktische Berekening Tool

Gebruik onze [hypotheek calculator](/lenen/hypothecaire-lening-berekenen) om:
- Uw restschuld te berekenen
- Besparingen bij vervroegde aflossing te zien
- Verschillende scenario's te vergelijken

## Conclusie: Wat is Uw Antwoord?

Er is geen one-size-fits-all antwoord. Maar met deze richtlijnen:

**Aflossen als:**
- Hypotheekrente > verwacht beleggingsrendement + 2%
- U <10 jaar van pensionering bent
- Stress van schuld uw welzijn beïnvloedt

**Beleggen als:**
- Hypotheekrente laag is (<3%)
- U >15 jaar hebt
- U gedisciplineerd kunt beleggen

**Hybride als:**
- U wilt risico spreiden
- U flexibiliteit waardeert
- U beide voordelen wilt

*De beste keuze is de keuze die u 's nachts laat slapen terwijl uw vermogen groeit.*
    `,
    seo: {
      title: "Hypotheek Aflossen of Beleggen België? | Complete Gids 2026",
      description: "Ontdek of u beter uw hypotheek vervroegd kunt aflossen of dat geld beleggen. Inclusief berekeningen, voorbeelden en praktische strategie voor België.",
      keywords: ["hypotheek aflossen", "vervroegd aflossen", "beleggen of aflossen", "hypotheek belgië", "financiële planning"]
    }
  },
  {
    slug: "belgische-belastingvoordelen-spaarders-beleggers",
    title: "Gids: Belgische Belastingvoordelen voor Spaarders en Beleggers",
    excerpt: "Maximaliseer uw rendement door slim gebruik te maken van fiscale voordelen in België. Van pensioensparen tot langetermijnbeleggen.",
    category: "Planning",
    author: {
      name: "Lien Vermeulen",
      bio: "Fiscaal adviseur gespecialiseerd in persoonlijke financiën en vermogensoptimalisatie in België",
      avatar: "https://ui-avatars.com/api/?name=Lien+Vermeulen&background=f59e0b&color=fff&size=200"
    },
    publishDate: "2026-01-05",
    readTime: 10,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=675&fit=crop",
    content: `
# Gids: Belgische Belastingvoordelen voor Spaarders en Beleggers

Belastingen kunnen uw rendement significant beïnvloeden. Maar België biedt verschillende fiscale voordelen voor slimme spaarders en beleggers. Hier is alles wat u moet weten om uw netto-rendement te maximaliseren.

## 1. Pensioensparen: Het Belastingvoordeel bij Uitstek

### Hoeveel kunt u inleggen?

**Optie 1: Standaard Tarief**
- Maximum: **€1.310 per jaar** (2026)
- Belastingvoordeel: **30%**
- Maximale terugave: **€393**

**Optie 2: Verhoogd Tarief**
- Maximum: **€1.750 per jaar**
- Belastingvoordeel: **25%**
- Maximale terugave: **€437,50**

### Welke kiezen?

**Kies €1.310 als:**
- U in hogere belastingschijf zit (>50%)
- U ander spaar/beleggingsvermogen heeft
- U flexibiliteit wilt

**Kies €1.750 als:**
- U maximale absolute terugave wilt (€44,50 meer)
- U veel wilt sparen voor pensioen
- U weinig andere beleggingen heeft

### Uitkeringsbetaling

Let op de **eindbelasting**:
- **8%** bij uitkering vanaf 60 jaar
- **16,5%** bij vervroegde opname (vóór 60 jaar)
- **10%** bij overlijden voor begunstigden

**Netto voordeel voorbeeld:**
- Inleg €1.310 per jaar
- Belastingvoordeel €393 (30%)
- Na 30 jaar à 5% rendement: ~€90.000
- Eindbelasting (8%): €7.200
- **Netto: €82.800** (vs €68.000 zonder pensioensparen)

## 2. Langetermijnsparen: Getrouwheidspremie Belastingvrij

### Hoe werkt het?

Bij **geregelde spaarrekeningen** is de getrouwheidspremie belastingvrij, maar:
- Maximum €15 per jaar belastingvrij
- Rest valt onder 30% roerende voorheffing

**Voorbeeld:**
- Basisrente: 1% op €50.000 = €500
- Getrouwheidspremie: 0,5% = €250
- Belastingvrij: €15 getrouwheidspremie
- Belasting op: €500 + €235 = €735
- Roerende voorheffing: €220,50
- **Netto interest: €529,50**

### De €980 Vrijstelling

Sinds 2026 is **€980 aan spaarinterest belastingvrij**:
- Eerste €980 aan interest = 0% belasting
- Alles erboven = 30% roerende voorheffing

**Strategie:**
Spreid €39.200 over meerdere spaarrekeningen à 2,5% om precies €980 belastingvrije interest te krijgen!

## 3. Beleggingen: Fiscale Optimalisatie

### A. Aandelen & Dividenden

**Binnenlandse Aandelen:**
- Dividenden: **30% roerende voorheffing**
- Meerwaarden: **0% belasting** (bij normaal beheer)

**"Normaal beheer" betekent:**
- Lange termijn houden (>1 jaar)
- Niet dagelijks traden
- Geen speculatief gedrag

### B. Obligaties

**Interestinkomsten:**
- 30% roerende voorheffing
- Geen vrijstelling zoals bij spaarrente

**Staatsobligaties:**
- Zelfde 30% voorheffing
- Vroeger vrijgesteld, nu niet meer

### C. Fondsen & ETF's

**Distribuerende Fondsen:**
- Dividenden/interest: 30% roerende voorheffing
- Meerwaarden: 0% (normaal beheer)

**Kapitaliserende Fondsen:**
- Voordeel: Geen dividend uitkering = geen jaarlijkse belasting
- Meerwaarde bij verkoop: 0% (normaal beheer)
- **Optimaal voor vermogensopbouw!**

### D. Beurstaks (TOB)

Let op de **beurstaks bij aan/verkoop**:
- Aandelen: 0,35% (max €1.600 per transactie)
- Obligaties: 0,12% (max €1.300)
- ETF's: 0,12% (trackers) of 1,32% (actieve fondsen)

**Tip:** Minimaliseer aantal transacties!

## 4. Vastgoed: Voordelen en Valkuilen

### Eigen Woning

**Hypotheekrenteaftrek (Woonbonus):**
- Grotendeels afgeschaft voor leningen na 2020
- Nog beschikbaar voor oude contracten
- Vlaanderen: Woonbonus (max €1.520/jaar)

### Beleggingsvastgoed

**Kadastraal Inkomen:**
- Forfaitaire belasting op huurinkomsten
- Vaak gunstiger dan werkelijke huur belasten

**Renovatiepremies:**
- Dak isolatie: tot €4.000
- Zonnepanelen: verminderd nu
- Energiezuinige ramen: tot €2.500

## 5. Fiscale Strategie voor Verschillende Levensfases

### Jonge Starters (20-35 jaar)

**Prioriteiten:**
1. **Pensioensparen €1.310** → €393 terugave
2. **Kapitaliserende ETF's** → 0% lopende belasting
3. **Startbonussen spaarrekeningen** → extra rente

### Mid-Career (35-50 jaar)

**Prioriteiten:**
1. **Maximaal pensioensparen €1.750** → €437 terugave
2. **Gemengde portefeuille** (aandelen + obligaties)
3. **Herfinanciering hypotheek** bij lagere rentes

### Pre-Pensioen (50-65 jaar)

**Prioriteiten:**
1. **Pensioensparen afbouwen** (laatste jaren)
2. **Verschuiving naar veilige beleggingen**
3. **Hypotheek afbetalen** voor lagere woonkosten

## 6. Veelgemaakte Fouten Vermijden

### Fout 1: Niet Volledig Benutten van €980 Vrijstelling

**Oplossing:** Spreid spaarrekeningen om maximaal belastingvrij te genieten.

### Fout 2: Te Vaak Handelen in Aandelen

**Oplossing:** HODL strategie = 0% meerwaarde belasting.

### Fout 3: Distribuerende Fondsen Kiezen

**Oplossing:** Kies kapitaliserende fondsen voor langetermijnbeleggen.

### Fout 4: Pensioensparen Te Laat Beginnen

**Oplossing:** Start op 25 jaar = 2x meer rendement dan op 35 jaar starten.

## Conclusie: Uw Fiscaal Optimale Plan

1. **Benut €980 vrijstelling** voor spaarrente
2. **Maximaliseer pensioensparen** (€1.310 of €1.750)
3. **Kies kapitaliserende fondsen** voor beleggen
4. **Houd aandelen long-term** voor 0% meerwaarde belasting
5. **Minimaliseer transacties** (beurstaks vermijden)

*Gebruik onze [belastingplanning calculator](/planning/belastingplanning-calculator) om uw persoonlijke optimale strategie te berekenen.*

**Disclaimer:** Dit artikel is louter informatief. Raadpleeg een fiscaal adviseur voor persoonlijk advies.
    `,
    seo: {
      title: "Belgische Belastingvoordelen Spaarders & Beleggers 2026",
      description: "Complete gids voor fiscale voordelen in België: pensioensparen, spaarrente vrijstelling, beleggingsfondsen en meer. Maximaliseer uw netto-rendement.",
      keywords: ["belastingvoordelen belgië", "pensioensparen", "roerende voorheffing", "fiscale optimalisatie", "sparen belastingvrij"]
    }
  },
  {
    slug: "registratierechten-berekenen-2026",
    title: "Registratierechten Berekenen 2026 — Vlaanderen, Wallonië & Brussel",
    excerpt: "Bereken de registratierechten voor uw woningaankoop in 2026: tarieven per gewest, abattement, klein beschrijf en concrete voorbeelden.",
    category: "Lenen",
    author: {
      name: "Marc Dubois",
      bio: "Hypotheekadviseur en financieel planner gespecialiseerd in woningfinanciering en vermogensopbouw",
      avatar: "https://ui-avatars.com/api/?name=Marc+Dubois&background=10b981&color=fff&size=200"
    },
    publishDate: "2026-04-28",
    readTime: 9,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=675&fit=crop",
    content: `
# Registratierechten Berekenen 2026 — Vlaanderen, Wallonië & Brussel

Bij de aankoop van een woning in België komt er meer kijken dan de prijsovereenkomst met de verkoper. Eén van de grootste extra kosten zijn de **registratierechten**, een gewestelijke belasting op de overdracht van onroerend goed. In 2026 verschillen de tarieven aanzienlijk tussen Vlaanderen, Wallonië en Brussel — en het gewest waar u koopt bepaalt rechtstreeks wat u extra betaalt.

In deze gids leest u alles over de registratierechten in 2026, met concrete tarieven, voorbeeldberekeningen en de voorwaarden om voordelen zoals het abattement of klein beschrijf te benutten.

## Wat zijn registratierechten en wanneer betaalt u ze?

Registratierechten — voluit *registratie- en hypotheekrechten* — zijn de belasting die u verschuldigd bent zodra een notariële akte van vastgoedoverdracht wordt geregistreerd. Concreet betaalt u registratierechten:

- bij de **aankoop van een bestaande woning** of bouwgrond;
- bij **schenking** van onroerend goed (al gelden hier andere tarieven);
- bij **erfpacht** of overdracht van zakelijke rechten op vastgoed.

Belangrijk: bij de aankoop van een **nieuwbouwwoning met btw** betaalt u 21% btw op het gebouwgedeelte en enkel registratierechten op het grondaandeel. Voor bestaande woningen betaalt u volle registratierechten op de totale aankoopprijs.

De rechten worden berekend op de **verkoopwaarde** of de **prijs**, afhankelijk van wat het hoogste is. De koper betaalt; de notaris int de rechten en stort ze door naar de gewestelijke fiscus.

## Tarieven 2026 per gewest

De drie gewesten hebben sinds 2018 elk eigen tarieven. De verschillen zijn groot, vooral voor de gezinswoning.

### Vlaanderen

In het Vlaams Gewest geldt sinds 1 januari 2025 een hervormd tarief, dat ook in 2026 doorloopt:

- **3% voor de eigen, enige gezinswoning** (hoofdverblijfplaats);
- **12% voor andere woningen** (tweede verblijf, opbrengsteigendom, zakelijk vastgoed);
- **12% voor bouwgronden** waar geen woonst op gepland is.

De koper moet binnen drie jaar na de akte zijn domicilie vestigen op het adres om recht te behouden op het 3%-tarief.

### Wallonië

Het Waals Gewest hanteert een algemeen tarief van **12,5%** op de aankoop van vastgoed in 2026. Voor een **bescheiden woning** (klein beschrijf) geldt een verlaagd tarief van **6%**. Wie zijn enige gezinswoning koopt, kan ook genieten van een **abattement** op de eerste schijf van de aankoopprijs. Sinds 2026 is de regelgeving rond klein beschrijf vereenvoudigd, met duidelijker drempels op het kadastraal inkomen.

### Brussels Hoofdstedelijk Gewest

In Brussel geldt eveneens **12,5%** als standaardtarief in 2026. De koper kan profiteren van een **abattement van €200.000** op de aankoopprijs voor de eigen, enige gezinswoning, mits de woning maximaal €600.000 kost en de koper er minstens 5 jaar zijn hoofdverblijfplaats vestigt. Concreet betekent dit een belastingbesparing van **€25.000** op de registratierechten.

## Abattement & klein beschrijf — komt u in aanmerking?

Beide voordelen zijn populaire instrumenten om de aankoopkost te drukken, maar de voorwaarden verschillen per gewest.

**Brussel — Abattement van €200.000:**
- Het moet uw enige eigendom zijn op het moment van de akte.
- Maximale aankoopprijs: €600.000 (excl. kosten).
- Domicilie binnen 2 jaar, behoud gedurende minstens 5 jaar.
- Eerste €200.000 vrijgesteld → besparing van €25.000 (12,5% × €200.000).

**Wallonië — Klein beschrijf (verlaagd tarief 6%):**
- Maximaal kadastraal inkomen €745 (verhoogd voor gezinnen met meerdere kinderen ten laste).
- Geen ander onroerend goed in volle eigendom op moment van aankoop.
- Domicilie binnen 3 jaar, behoud gedurende 3 jaar.

**Vlaanderen — 3%-tarief vervangt het oude abattement:**
Sinds 2025 is er geen apart abattement meer in Vlaanderen; het lage 3%-tarief vormt zelf het voordeel voor de gezinswoning. Voldoet u niet aan de voorwaarden, dan vervalt u terug op 12%.

## Rekenvoorbeeld: woning van €350.000

Stel u koopt een bestaande gezinswoning van €350.000 in 2026. U bent eerstkoper en zal er domicilie nemen.

| Gewest | Tarief | Registratierechten | Toelichting |
|---|---|---|---|
| **Vlaanderen** | 3% | **€10.500** | Eigen gezinswoning, domicilie binnen 3 jaar |
| **Wallonië (klein beschrijf)** | 6% | **€21.000** | KI ≤ €745, eerste woning |
| **Wallonië (standaard)** | 12,5% | **€43.750** | Bij niet-vervulling van voorwaarden |
| **Brussel (met abattement)** | 12,5% min €25.000 | **€18.750** | Eerste woning, prijs ≤ €600.000 |
| **Brussel (standaard)** | 12,5% | **€43.750** | Tweede verblijf, vakantiehuis |

Het verschil is opvallend: voor dezelfde woning betaalt u in Vlaanderen €10.500, terwijl u in Wallonië bij een standaardtarief tot €43.750 kwijt bent. Dit gewestelijk verschil is een wezenlijke overweging bij de keuze van uw aankooplocatie.

## Notariskosten + ereloon: de totale aankoopkost

Naast de registratierechten betaalt u nog:

- **Ereloon notaris**: een wettelijk geregeld percentage van de aankoopprijs, vaak rond **1% tot 1,5%** (degressief vanaf hogere prijzen).
- **Aktekosten en administratieve kosten**: doorgaans **€800 tot €1.500** voor uittreksels, hypotheekrecherches en publicaties.
- **21% btw op het ereloon** — let op: niet op de registratierechten zelf.
- **Hypotheekrechten** indien u een lening afsluit: 1% van het ontleende bedrag voor de hypothecaire inschrijving.

**Voorbeeld totale bijkomende kosten** voor een Vlaamse gezinswoning van €350.000:

- Registratierechten: €10.500
- Ereloon notaris: ±€4.500 (1,3%) + 21% btw → €5.445
- Akte- en administratiekosten: €1.200
- Hypotheekrechten (lening van €280.000): €2.800

**Totaal extra kosten ≈ €19.945**, oftewel ongeveer 5,7% bovenop de aankoopprijs. Wie een hypothecair krediet plant, kan met onze [hypotheek calculator](/lenen/hypothecaire-lening-berekenen) eenvoudig de maandlast inclusief deze bijkomende kosten simuleren. Voor een ruimere doorrekening van uw leencapaciteit en LTV-grenzen gebruikt u onze [woningkrediet simulator](/lenen/woningkrediet-simulator).

## Tips om uw registratierechten te beperken

1. **Domicilie tijdig vestigen** — vergeet niet om binnen de gestelde termijn (3 jaar in Vlaanderen, 2 jaar in Brussel) uw hoofdverblijfplaats over te brengen, anders wordt het lage tarief teruggevorderd.
2. **Plan uw aankoopgewest** — als u flexibel bent in regio, kan een Vlaamse aankoop u tienduizenden euro's besparen tegenover Wallonië of Brussel.
3. **Onderzoek meeneembaarheid** — in sommige gewesten kunt u eerder betaalde registratierechten gedeeltelijk meenemen naar een volgende aankoop, binnen specifieke termijnen.
4. **Combineer met fiscale optimalisatie** — overweeg of u na de aankoop beter aflost dan belegt; lees hierover onze gids [hypotheek aflossen of beleggen](/blog/hypotheek-aflossen-of-beleggen).
5. **Vraag de berekening op voorhand** — uw notaris stelt vrijblijvend een afrekening op van alle bijkomende kosten, zodat u uw budget realistisch kunt plannen.

## Conclusie

Registratierechten vormen in 2026 een aanzienlijk deel van uw vastgoedbudget. Het Vlaamse tarief van 3% voor de gezinswoning blijft uitzonderlijk gunstig, terwijl Wallonië en Brussel met 12,5% standaard duurder uitvallen — al verzachten het abattement (Brussel) en klein beschrijf (Wallonië) de pijn aanzienlijk. Reken altijd door op uw eigen situatie en houd rekening met notariskosten, aktekosten en hypotheekrechten om een eerlijk beeld van de totale aankoopkost te krijgen.

*Disclaimer: Tarieven en voorwaarden kunnen wijzigen. Raadpleeg altijd uw notaris of een fiscaal adviseur voor uw concrete situatie.*
    `,
    seo: {
      title: "Registratierechten Berekenen 2026 | Per Gewest",
      description: "Bereken registratierechten 2026 voor je woning in België: tarieven Vlaanderen 3-12%, Wallonië en Brussel 12,5%, abattement, klein beschrijf, voorbeelden.",
      keywords: ["registratierechten 2026", "registratierechten berekenen", "registratierechten vlaanderen", "registratierechten brussel", "registratierechten wallonië", "abattement brussel", "klein beschrijf wallonië", "notariskosten woning"]
    },
    faqs: [
      {
        question: "Wat is het registratierechten-tarief voor de gezinswoning in Vlaanderen 2026?",
        answer: "Het tarief bedraagt 3% voor de aankoop van uw eigen, enige gezinswoning, mits u binnen drie jaar uw hoofdverblijfplaats vestigt op het adres. Voor andere woningen (tweede verblijf, opbrengsteigendom) geldt 12%."
      },
      {
        question: "Wat is het verschil tussen abattement en klein beschrijf?",
        answer: "Het abattement is een vrijstelling op de eerste schijf van de aankoopprijs (in Brussel €200.000), terwijl klein beschrijf een verlaagd tarief van 6% is in Wallonië voor bescheiden woningen met een kadastraal inkomen onder €745."
      },
      {
        question: "Betaal ik registratierechten op een nieuwbouwwoning?",
        answer: "Bij een nieuwbouw met btw betaalt u 21% btw op het gebouwgedeelte en alleen registratierechten op het grondaandeel. Bij een bestaande woning betaalt u volle registratierechten op de hele aankoopprijs."
      },
      {
        question: "Hoeveel registratierechten betaal ik op een woning van €350.000 in Brussel?",
        answer: "Met abattement betaalt u €18.750 (12,5% × €350.000 = €43.750, verminderd met €25.000 abattement). Zonder abattement betaalt u €43.750."
      },
      {
        question: "Welke kosten komen er nog bovenop de registratierechten?",
        answer: "Naast de registratierechten betaalt u het ereloon van de notaris (±1-1,5%), aktekosten (€800-€1.500), 21% btw op het ereloon, en hypotheekrechten (1% van het leenbedrag) als u een lening afsluit. Reken op 5-6% extra bovenop de aankoopprijs."
      }
    ]
  }
];

const blogSlugAliases: Record<string, string> = {
  "roerende-voorheffing-dividenden-2026-vrijstelling": "belgische-belastingvoordelen-spaarders-beleggers",
  "spaarrente-prognose-belgie-2026": "hoogste-spaarrente-verdienen-2026"
};

export function getBlogPost(slug: string): BlogPost | undefined {
  const resolvedSlug = blogSlugAliases[slug] ?? slug;
  return blogPosts.find(post => post.slug === resolvedSlug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}
