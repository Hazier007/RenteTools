# Interesten.be

Belgische rekentools voor sparen, lenen en wettelijke interest. Vite + React (wouter) front-end met een Express-handler
(`server/vercel-handler.ts`) op Vercel; geen Next.js. Zie `replit.md` voor de architectuur en `docs/` voor draaiboeken.

## Ontwikkelen

```bash
npm install
npm run dev          # Express + Vite op http://localhost:5000
npx tsc --noEmit     # typecontrole
npx vitest run       # unit tests
node build-vercel.mjs   # volledige Vercel-build (Build Output API v3) in .vercel/output
```

## Omgevingsvariabelen

Instellen in het Vercel-project **interesten-be** (Settings → Environment Variables) en lokaal in `.env.local`
(staat in `.gitignore`). Zonder deze variabelen blijft de site volledig werken; enkel de bijbehorende functie valt
netjes terug.

| Variabele | Verplicht voor | Toelichting |
| --- | --- | --- |
| `SESSION_SECRET` | productie | Geheim voor de express-session cookies van het admingedeelte. |
| `DATABASE_URL` | optioneel | Neon/PostgreSQL-connectiestring; ontbreekt hij, dan draait de site op in-memory data. |
| `RESEND_API_KEY` | aanmaningsflow (e-mail) | API-sleutel van [Resend](https://resend.com). Ontbreekt hij, dan antwoordt `POST /api/aanmaning-lead` met `503` en blijft de PDF gewoon lokaal downloadbaar. |
| `RESEND_AUDIENCE_ID` | aanmaningsflow (nurture) | Id van de Resend-audience (sinds 2025 "segment" genoemd) waarin leads van de aanmaningsgenerator terechtkomen. `RESEND_SEGMENT_ID` werkt als alias. Zonder deze waarde wordt het contact wel aangemaakt, maar niet aan een segment gekoppeld. |
| `RESEND_FROM` | optioneel | Afzender van de dag 0-mail, standaard `Interesten.be <aanmaning@interesten.be>`. Het domein moet in Resend geverifieerd zijn (SPF + DKIM). |
| `RESEND_REPLY_TO` | optioneel | Antwoordadres, standaard `info@interesten.be`. |

### Aanmaningsflow (`/lenen/wettelijke-rentevoet-belgie`)

1. De bezoeker berekent de nalatigheidsinterest en kiest een briefsjabloon (B2B-aanmaning, B2B-ingebrekestelling of
   kosteloze eerste herinnering aan een consument).
2. De PDF wordt **client-side** gegenereerd met jsPDF (lazy geladen, `client/src/lib/aanmaning/`) zodra een e-mailadres
   en toestemming zijn gegeven, en meteen gedownload.
3. De browser POST naar `/api/aanmaning-lead` (`server/routes.ts`): het adres gaat naar de Resend-audience en de PDF
   wordt als bijlage gemaild (`server/services/aanmaning-mail.ts`). De teksten voor dag 7 en dag 14 staan in
   `docs/email-sequentie-aanmaning.md` en worden handmatig als Resend Broadcasts ingesteld.
4. De CTA naar CollectPro.be (zelfde oprichter als Interesten.be, altijd vermeld) verschijnt enkel bij B2B-facturen
   boven €500 of met meer dan 30 dagen vertraging; de regel staat in `shared/collectpro.ts`.

Juridische teksten in brieven en op de pagina komen uit één bron: `shared/wettelijke-interest.ts`
(`WETTELIJKE_VERMELDINGEN`) en `client/src/seo/calculator-content/wettelijke-rentevoet-belgie.ts`.
