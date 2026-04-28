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
    slug: "roerende-voorheffing-dividenden-2026-vrijstelling",
    title: "Roerende Voorheffing Dividenden 2026 — Vrijstelling tot €833",
    excerpt: "Hoeveel roerende voorheffing betaalt u op dividenden in 2026? Ontdek de vrijstelling tot €833 per persoon, hoe u ze terugvraagt en hoe u uw beleggingsinkomsten optimaliseert.",
    category: "Beleggen",
    author: {
      name: "Lien Vermeulen",
      bio: "Fiscaal adviseur gespecialiseerd in persoonlijke financiën en vermogensoptimalisatie in België",
      avatar: "https://ui-avatars.com/api/?name=Lien+Vermeulen&background=f59e0b&color=fff&size=200"
    },
    publishDate: "2026-04-28",
    readTime: 9,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=675&fit=crop",
    content: `
# Roerende Voorheffing Dividenden 2026 — Vrijstelling tot €833

Wie in België aandelen of beleggingsfondsen aanhoudt, krijgt op zijn dividenden bijna altijd te maken met **30% roerende voorheffing**. Toch hoeft niet elke euro dividend belast te zijn: in 2026 kunt u tot **€833 aan dividenden per persoon belastingvrij** ontvangen via de fiscale vrijstelling. Deze gids legt uit hoe u die vrijstelling correct toepast, terugvraagt via uw personenbelasting en combineert met andere fiscale voordelen.

## Wat is roerende voorheffing en waarom 30%?

De roerende voorheffing (RV) is een **bronheffing** die uw bank of broker rechtstreeks afhoudt op roerende inkomsten — dividenden, interesten en sommige meerwaarden — voordat het geld op uw rekening komt. Voor de meeste Belgische beleggers ligt het algemene tarief sinds 2017 op **30%**.

Concreet: ontvangt u €1.000 brutodividend, dan betaalt uw broker €300 RV door aan de fiscus en komt er **€700 netto** op uw rekening. Voor de fiscus is die heffing in principe **bevrijdend** — u hoeft de inkomsten niet meer aan te geven in uw personenbelasting, tenzij u een vrijstelling of teruggave wil claimen.

In bepaalde gevallen geldt een verlaagd tarief:
- **15%** voor dividenden van **VVPR-bis-aandelen** (KMO's die aan strikte reservevoorwaarden voldoen);
- **20% of 25%** als tussenstap naar de definitieve **5%** in een **liquidatiereserve**-uitkering;
- **15%** voor uitkeringen uit een **gereglementeerde vastgoedvennootschap (GVV)** met sociaal oogmerk.

Voor het overgrote deel van Belgische beleggers blijft 30% echter de norm op gewone dividenden.

## Vrijstelling 2026: €833 dividenden per persoon

Sinds 2018 mag elke Belgische belegger jaarlijks een schijf dividenden **vrijstellen** van roerende voorheffing. Voor inkomstenjaar **2026** bedraagt die vrijstelling **€833 brutodividenden per persoon**, wat overeenkomt met **€249,90 effectief teruggevorderde belasting** (€833 × 30%).

Belangrijk: deze vrijstelling is een **persoonlijke** vrijstelling. Een gehuwd of wettelijk samenwonend koppel kan dus tot **€1.666 brutodividenden per jaar** belastingvrij ontvangen, op voorwaarde dat de aandelen aan beide partners toebehoren of de dividenden afzonderlijk per partner worden aangegeven.

**Voorbeeld:**
- U ontvangt €600 brutodividend op uw individuele effectenrekening.
- Uw broker houdt automatisch €180 (30%) RV in → u ontvangt €420 netto.
- Via vak VII van uw personenbelasting vraagt u **€180 terug**, omdat het volledige bedrag onder de vrijstellingsdrempel valt.

**Voorbeeld 2 — koppel:**
- Twee partners ontvangen samen €1.500 dividend op hun gemeenschappelijke effectenrekening.
- Banken hielden €450 RV in.
- Aangifte: elke partner geeft €750 dividend aan en claimt teruggave → samen krijgen ze **€450 terug**, omdat het bedrag onder 2 × €833 = €1.666 blijft.

Let op: de vrijstelling geldt **niet** voor dividenden uit beleggingsfondsen (DBI-fondsen, ETF's), tenzij die fondsen rechtstreeks aandelen uitkeren. Voor de meeste **kapitaliserende ETF's** is er sowieso geen dividenduitkering, en daar moet u dus geen vrijstelling claimen — de fiscale logica loopt daar via TOB en eventueel meerwaarde-belasting.

## Hoe vraag ik de vrijstelling terug? Vak VII van de aangifte

De vrijstelling is **niet automatisch**. U moet de teruggave actief claimen in uw personenbelasting via **vak VII — Inkomsten van kapitalen en roerende goederen**, codes **1437/2437**.

Stappen:

1. **Verzamel bewijsstukken** van uw broker: jaaroverzicht of fiscale fiche met brutodividenden en ingehouden RV per uitkering.
2. **Tel de brutodividenden op** waarvoor u vrijstelling wil claimen (maximum €833 per partner).
3. **Vermeld het bedrag** in code 1437 (echtgenoot/zelfde aangifte: code 2437) van vak VII.
4. **Bewaar de stavingsdocumenten** minstens 7 jaar voor mogelijke controle door de fiscus.
5. Tax-on-Web berekent automatisch de teruggave en verrekent ze met uw saldo.

**Belangrijk:** vraagt u meer dividenden vrij dan toegelaten, dan wordt het surplus belast aan **30%** — er is geen sanctie, maar u verliest het verschil. Vraagt u te weinig terug, dan kunt u tot **5 jaar achteraf** uw aangifte rechtzetten via een bezwaarprocedure.

## Voor wie loont het? Rekenvoorbeeld 1 vs 2 partners

De vrijstelling is een persoonlijk maximum. Voor koppels met een gemeenschappelijke effectenrekening of dividendportefeuille is het slim om de aandelen **gezamenlijk te beheren** en de dividenden per partner aan te geven.

**Scenario A — alleenstaande belegger:**
- Portefeuille: €25.000 in dividend-aandelen met gemiddeld 4% bruto-dividendrendement → €1.000 dividend/jaar.
- Vrijstelling: €833 → terug te vorderen RV = €249,90.
- Belastbaar surplus: €167 → blijft belast aan 30% = €50,10 RV definitief.
- **Netto fiscaal voordeel: €249,90/jaar**.

**Scenario B — koppel met gemeenschappelijke rekening:**
- Zelfde portefeuille van €25.000 met €1.000 dividend/jaar.
- Beide partners claimen elk €500 → blijft volledig binnen 2 × €833 = €1.666.
- Volledige RV (€300) terugvorderbaar.
- **Netto fiscaal voordeel: €300/jaar**.

Voor wie zijn dividendrendement laat aangroeien via herinvestering, voegt deze jaarlijkse teruggave merkbaar toe aan het **samengestelde rendement** op lange termijn — gebruik onze [samengestelde interest calculator](/sparen/samengestelde-interest-berekenen) om het effect van extra €250 per jaar over 20 jaar te zien.

## Verschil met spaarrente-vrijstelling (€1.020) en interesten-RV

De dividend-vrijstelling wordt vaak verward met de **spaarrente-vrijstelling**. Beide zijn fiscaal nuttig, maar gelden voor verschillende inkomstencategorieën:

| Vrijstelling | Drempel 2026 | Tarief boven drempel | Bron |
|---|---|---|---|
| **Spaarrente** (gereglementeerde rekening) | €1.020/persoon | 15% RV | Belgische gereglementeerde spaarrekeningen |
| **Dividenden** | €833/persoon | 30% RV | Dividenden uit aandelen (geen ETF's) |
| **Interesten** (kasbon, termijnrekening, obligatie) | geen vrijstelling | 30% RV | Interest op obligaties, kasbons, termijndeposito's |

Belangrijk:
- De spaarrente-vrijstelling is **automatisch** door de bank toegepast — geen aangifte nodig tot de drempel.
- De dividend-vrijstelling moet u **actief terugvragen** via vak VII.
- **Interesten** uit kasbons, obligaties of termijnrekeningen kennen geen vrijstelling: 30% RV is meteen definitief.

Vergelijk uw spaarrente-rendement na vrijstelling met onze [spaarrente vergelijker](/sparen/spaarrekening-vergelijker), en simuleer de impact van de 30% roerende voorheffing op uw beleggingsfondsen via de [roerende voorheffing calculator](/beleggen/roerende-voorheffing-calculator).

## Veelgemaakte fouten + checklist 2026

**Fout 1 — Vrijstelling vergeten claimen.** Banken houden RV automatisch in, ook onder de drempel. Wie vak VII niet invult, **laat €100 tot €250 per jaar liggen**.

**Fout 2 — Vrijstelling claimen op ETF-dividenden.** Distributie van DBI-bevek of klassieke ETF valt **niet** onder dezelfde regeling. Lees uw fiscale fiche zorgvuldig.

**Fout 3 — Surplus niet aangeven bij buitenlandse broker.** Bij brokers zonder Belgische RV-inhouding (bv. Degiro Basic, Interactive Brokers) bent u **zelf verplicht** de aangifte te doen, ook voor het deel boven de vrijstelling. Niet aangeven = fiscale fraude.

**Fout 4 — Vrijstelling delen over meerdere jaren.** De vrijstelling is **per kalenderjaar** en niet overdraagbaar. Niet-benut = verloren.

**Fout 5 — Geen bewijsstukken bewaren.** Bij controle moet u brutobedragen kunnen aantonen met **brokerstatements**.

### Checklist 2026

- ✅ Verzamel jaaroverzichten van alle brokers (Belgisch + buitenlands).
- ✅ Bereken totaal brutodividend per partner.
- ✅ Vul code 1437/2437 in vak VII in (max €833 per persoon).
- ✅ Geef dividenden boven de drempel apart aan, ook bij buitenlandse brokers.
- ✅ Bewaar fiscale fiches en transactie-overzichten 7 jaar.

## Conclusie

De vrijstelling van **€833 per persoon op dividenden** is een van de eenvoudigste fiscale optimalisaties voor Belgische beleggers in 2026. Wie ze systematisch claimt, wint **€250 tot €500 per jaar** terug — geld dat samengesteld over 20 jaar bij een 6% rendement aangroeit tot meer dan €10.000 extra netto vermogen.

Combineer de teruggave met een doordachte spreiding tussen **kapitaliserende fondsen** (geen dividenduitkering) en **dividend-aandelen** binnen de vrijstelling, en u verlaagt uw fiscale druk zonder uw beleggingsstrategie te wijzigen.

*Disclaimer: Drempels en tarieven kunnen wijzigen door wetswijzigingen. Raadpleeg altijd uw boekhouder of fiscaal adviseur voor uw concrete situatie.*
    `,
    seo: {
      title: "Roerende Voorheffing Dividenden 2026 | Vrijstelling tot €833",
      description: "Hoeveel roerende voorheffing betaal je op dividenden in 2026? Bereken de vrijstelling tot €833 per persoon en optimaliseer je beleggingsinkomsten.",
      keywords: ["roerende voorheffing dividenden", "dividend vrijstelling 2026", "vak VII personenbelasting", "RV terugvragen", "dividend belasting belgië", "roerende voorheffing 30%", "beleggingsinkomsten optimaliseren"]
    },
    faqs: [
      {
        question: "Hoeveel dividenden zijn vrijgesteld van roerende voorheffing in 2026?",
        answer: "In 2026 mag elke belastingplichtige tot €833 brutodividenden per jaar belastingvrij ontvangen. Voor een gehuwd of wettelijk samenwonend koppel komt dat neer op €1.666 per jaar, mits beide partners de dividenden in hun aangifte vermelden."
      },
      {
        question: "Hoe vraag ik de roerende voorheffing op dividenden terug?",
        answer: "U vraagt de teruggave aan via vak VII van uw personenbelasting, codes 1437 (uzelf) of 2437 (echtgenoot/wettelijk samenwonende partner). Vermeld het brutodividend (max €833 per persoon) en bewaar de jaaroverzichten van uw broker als bewijsstuk."
      },
      {
        question: "Geldt de dividend-vrijstelling ook voor ETF's en beleggingsfondsen?",
        answer: "Nee, niet automatisch. Klassieke distributie-ETF's en DBI-beveks vallen meestal niet onder dezelfde regeling. Kapitaliserende ETF's keren geen dividend uit en zijn dus niet relevant. Controleer altijd de fiscale fiche van uw broker."
      },
      {
        question: "Wat is het verschil tussen de dividend-vrijstelling en de spaarrente-vrijstelling?",
        answer: "De spaarrente-vrijstelling (€1.020 per persoon in 2026) wordt automatisch toegepast door uw Belgische bank op gereglementeerde spaarrekeningen, met 15% RV op het surplus. De dividend-vrijstelling (€833) moet u actief terugvragen in uw aangifte, en het surplus is belast aan 30%."
      },
      {
        question: "Wat als mijn buitenlandse broker geen roerende voorheffing inhoudt?",
        answer: "Bij brokers zonder Belgische RV-inhouding (zoals Degiro Basic of Interactive Brokers) bent u zelf verplicht de dividenden aan te geven en de RV bij te betalen. Het niet-aangeven is fiscale fraude. U kunt nog wel tot €833 per persoon vrijstellen via vak VII."
      }
    ]
  }
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}
