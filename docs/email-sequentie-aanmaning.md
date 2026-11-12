# E-mailsequentie aanmaningsgenerator (Interesten.be → CollectPro.be)

Drie e-mails voor leads die op `/lenen/wettelijke-rentevoet-belgie` een modelbrief (PDF) aanvroegen.
Dag 0 wordt automatisch verstuurd door `POST /api/aanmaning-lead` (`server/services/aanmaning-mail.ts`).
Dag 7 en dag 14 zet u handmatig als **Resend Broadcasts** op het segment uit `RESEND_AUDIENCE_ID`.
De automatisering (wachttijden, filters) is bewust niet gebouwd; dit document bevat enkel de teksten en de regels.

## Spelregels

- **Afzender**: `Interesten.be <aanmaning@interesten.be>`, reply-to `info@interesten.be`. Toon: Vlaams, "u", kort en praktisch.
- **Disclosure** in elke mail die CollectPro noemt: *CollectPro.be en Interesten.be hebben dezelfde oprichter (Bart Deblock).*
  Tekst en CTA-regel staan in `shared/collectpro.ts`; wijzig ze daar en kopieer ze hier.
- **Segmentatie**: dag 7 en dag 14 enkel naar contacten met type `onderneming` of `zelfstandige` **en** regime `handel`
  (B2B). Particulieren en consumentenschulden krijgen géén CollectPro-pitch: minnelijke invordering van
  consumentenschulden door een derde valt onder Boek XIX, titel 2 WER (inschrijving FOD Economie). Sla die velden bij het
  aanmaken van het contact op als Resend-properties (`type`, `regime`, `sjabloon`) en filter het segment daarop.
- **Uitschrijven**: elke broadcast eindigt met `{{{RESEND_UNSUBSCRIBE_URL}}}`. Wie uitschrijft, krijgt niets meer.
- **Juridisch**: geen beloftes over slaagkansen of termijnen; "no cure no pay" enkel als dat de effectieve CollectPro-prijs is.
- **Placeholders** tussen vierkante haken (`[…]`) invullen vóór verzending.

---

## Dag 0 — PDF in bijlage (transactioneel, automatisch)

**Onderwerp:** Uw aanmaning met interestberekening (PDF)
*(consument-sjabloon: "Uw eerste herinnering (PDF) staat klaar")*

**Preheader:** De modelbrief en de berekening per periode staan in bijlage.

**Tekst:**

> Dag,
>
> In bijlage vindt u de PDF **[bestandsnaam]**, gegenereerd met de wettelijke interestvoeten van de FOD Financiën.
> Controleer de gegevens, onderteken en verstuur.
>
> **Samenvatting**
> Hoofdsom: €[hoofdsom]
> Nalatigheidsinterest ([dagen] dagen): €[interest]
> Forfaitaire schadevergoeding: €40,00
> Totaal verschuldigd: €[totaal]
>
> **Drie praktische tips**
> 1. Verstuur de brief per e-mail én per post (een ingebrekestelling liefst aangetekend) en bewaar het bewijs.
> 2. Noteer de uiterste betaaldatum in uw agenda en reken bij latere betaling de interest opnieuw uit op Interesten.be.
> 3. Forfaitaire schadevergoeding: €40 per onbetaalde factuur, van rechtswege, bovenop de interest. Daarnaast kunt u een
>    redelijke vergoeding vragen voor hogere invorderingskosten, zoals de kosten van een incassobureau of advocaat.
>
> *(Enkel B2B én hoofdsom > €500 of > 30 dagen vertraging:)*
> **Blijft deze factuur onbetaald?**
> Bij €[hoofdsom] en [dagen] dagen vertraging loont het om de invordering uit handen te geven. CollectPro.be volgt uw
> factuur minnelijk op, no cure no pay: betaalt de klant niet, dan betaalt u niets.
> **[Laat deze factuur innen via CollectPro.be →](https://collectpro.be?utm_source=interesten&utm_medium=email&utm_campaign=aanmaning-dag0)**
> Transparantie: CollectPro.be en Interesten.be hebben dezelfde oprichter (Bart Deblock).
>
> Wilt u de berekening aanpassen? Dat kan altijd opnieuw op interesten.be/lenen/wettelijke-rentevoet-belgie.
>
> Deze tool geeft algemene informatie en rekenhulp, geen juridisch advies: laat bij betwisting of grote bedragen uw
> berekening nakijken door een advocaat, gerechtsdeurwaarder of incassopartner.
>
> U ontvangt deze e-mail omdat u op Interesten.be een modelbrief aanvroeg en toestemming gaf voor enkele praktische
> e-mails over onbetaalde facturen. Uitschrijven kan door te antwoorden op deze e-mail of via de link in elke volgende
> e-mail. Interesten.be is een uitgave van Bart Deblock (Hazier), Blijde-Inkomststraat 16, 9000 Gent.

---

## Dag 7 — Nog niet betaald? (Broadcast, segment B2B)

**Onderwerp:** Is factuur [factuurnummer] intussen betaald?
*(alternatief A/B: "Een week na uw aanmaning: wat nu?")*

**Preheader:** Zo niet: dit zijn uw drie opties, en wat elke optie kost.

**Tekst:**

> Dag,
>
> Een week geleden downloadde u op Interesten.be een aanmaning met interestberekening. Is de factuur intussen betaald?
> Dan kunt u deze e-mail negeren, en proficiat.
>
> Zo niet, dan hebt u drie opties:
>
> **1. Zelf verder opvolgen.** Stuur na de aanmaning een ingebrekestelling met een korte termijn (8 dagen) en verstuur ze
> aangetekend. De interest loopt verder (bij €5.000 is dat ongeveer €1,44 per dag) en het forfait van €40 blijft
> verschuldigd. Nadeel: het kost u tijd, en de klant weet dat u geduld hebt.
>
> **2. Een advocaat of gerechtsdeurwaarder.** Doeltreffend, maar u betaalt doorgaans een voorschot en de kosten lopen op,
> ook als de klant uiteindelijk niet kan betalen.
>
> **3. Minnelijke invordering via CollectPro.be.** CollectPro neemt het dossier over: herinneringen, telefonische opvolging
> en een afbetalingsregeling als dat nodig is. **No cure no pay**: betaalt de klant niet, dan betaalt u niets. De
> wettelijke interest en het forfait van €40 worden mee ingevorderd, dus de kost van de invordering ligt in de praktijk
> grotendeels bij de schuldenaar.
>
> **[Laat deze factuur innen via CollectPro.be →](https://collectpro.be?utm_source=interesten&utm_medium=email&utm_campaign=aanmaning-dag7)**
>
> Transparantie: CollectPro.be en Interesten.be hebben dezelfde oprichter (Bart Deblock). De rekentools en de uitleg op
> Interesten.be blijven neutraal; waar we naar CollectPro verwijzen, zeggen we dat uitdrukkelijk.
>
> Vragen over uw dossier? Antwoord gewoon op deze e-mail.
>
> Met vriendelijke groeten,
> Bart Deblock
> Interesten.be · CollectPro.be
>
> U ontvangt deze e-mail omdat u op Interesten.be een modelbrief aanvroeg. Geen behoefte aan deze tips? [Uitschrijven]({{{RESEND_UNSUBSCRIBE_URL}}}).

---

## Dag 14 — Case en prijs (Broadcast, segment B2B)

**Onderwerp:** Hoe een kmo €4.800 recupereerde zonder advocaat
*(alternatief: "Wat kost het om een factuur te laten innen?")*

**Preheader:** Een concreet dossier, de doorlooptijd en de volledige prijs van CollectPro.

**Tekst:**

> Dag,
>
> Twee weken geleden downloadde u een aanmaning op Interesten.be. Staat de factuur nog open, dan is dit het moment om
> te beslissen: zelf blijven herinneren, of uit handen geven.
>
> **Een concreet dossier** *(invullen met een echte, geanonimiseerde case zodra beschikbaar)*
> Een [sector, bv. installatiebedrijf] uit [regio] had een factuur van €[4.800] die [75] dagen openstond. Twee eigen
> herinneringen bleven onbeantwoord. Na overdracht aan CollectPro volgde binnen [3] werkdagen een ingebrekestelling met
> de wettelijke interest (€[xxx]) en het forfait van €40 erbij, gevolgd door een telefonische opvolging. De klant betaalde
> op dag [12] het volledige bedrag plus interest. Kost voor de ondernemer: €[0] voorschot; de vergoeding werd gedekt door
> de ingevorderde interest en kosten.
>
> **Wat kost CollectPro?**
> - Geen opstartkost, geen voorschot.
> - No cure no pay bij losse dossiers: [x]% op het ingevorderde bedrag, enkel bij effectieve betaling. *(Prijs bevestigen
>   zodra Stripe gekoppeld is.)*
> - Doorlopende factuuropvolging voor kmo's met meerdere facturen per maand: vanaf €200 tot €800 per maand, afhankelijk
>   van het volume. *(Tarieven uit het CollectPro-businessplan; bevestigen vóór verzending.)*
> - De wettelijke interest en het forfait van €40 per factuur worden altijd mee ingevorderd.
>
> **[Bespreek uw dossier met CollectPro.be →](https://collectpro.be?utm_source=interesten&utm_medium=email&utm_campaign=aanmaning-dag14)**
>
> Liever eerst zelf nog een stap zetten? Op interesten.be/lenen/wettelijke-rentevoet-belgie maakt u in twee minuten een
> ingebrekestelling met bijgewerkte interest.
>
> Transparantie: CollectPro.be en Interesten.be hebben dezelfde oprichter (Bart Deblock).
>
> Met vriendelijke groeten,
> Bart Deblock
> Interesten.be · CollectPro.be
>
> Dit is de laatste e-mail van deze reeks. U ontvangt ze omdat u op Interesten.be een modelbrief aanvroeg.
> [Uitschrijven]({{{RESEND_UNSUBSCRIBE_URL}}}).

---

## Checklist vóór activering in Resend

- [ ] Domein `interesten.be` geverifieerd in Resend (SPF, DKIM, DMARC) en `RESEND_FROM` ingesteld.
- [ ] Segment aangemaakt; id in `RESEND_AUDIENCE_ID` (Vercel-project interesten-be, Production + Preview).
- [ ] Properties `type`, `regime`, `sjabloon` aangemaakt in Resend Contacts (worden meegestuurd door de lead-route).
- [ ] Dag 7 en dag 14 als Broadcast aangemaakt op het B2B-filter; placeholders ingevuld; testmail naar uzelf verstuurd.
- [ ] Briefteksten en e-mails juridisch nagelezen door een advocaat (Boek XIX WER, wet 2 augustus 2002, reclame-regels).
- [ ] CollectPro-prijzen bevestigd en Stripe gekoppeld vóór de dag 14-mail live gaat.
