import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function Privacybeleid() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacybeleid</h1>
          <p className="text-xl mb-8 opacity-90">
            Hoe Hazier persoonsgegevens verwerkt op Interesten.be, conform AVG en de Belgische Wet van 30 juli 2018.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">

          <Card>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none pt-6">
              <p>
                <strong>Laatst bijgewerkt:</strong> 24 april 2026
              </p>
              <p>
                Dit privacybeleid beschrijft hoe persoonsgegevens worden verwerkt wanneer u Interesten.be
                (online rekentool voor leningrente en Belgische financiële calculators) bezoekt of gebruikt.
                Wij nemen uw privacy serieus en verwerken uw gegevens uitsluitend conform de Algemene
                Verordening Gegevensbescherming (AVG / GDPR) en de Belgische Wet van 30 juli 2018.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">1. Verwerkingsverantwoordelijke</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>Verantwoordelijke voor de verwerking van uw persoonsgegevens is:</p>
              <div className="bg-muted p-4 rounded-lg not-prose">
                <p className="font-semibold">Hazier</p>
                <p>Blijde-Inkomststraat 16, 9000 Gent</p>
                <p>Ondernemingsnummer: 0672.948.386</p>
                <p>
                  Contact:{" "}
                  <a href="mailto:info@hazier.be" className="text-primary hover:underline">
                    info@hazier.be
                  </a>
                </p>
              </div>
              <p>
                Voor vragen, klachten of het uitoefenen van uw rechten kunt u ons bereiken via bovenstaand
                e-mailadres.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">2. Welke gegevens verzamelen we?</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <ul>
                <li>
                  <strong>Technische loggegevens:</strong> IP-adres, browser, besturingssysteem, tijdstip
                  van bezoek, bezochte pagina. Automatisch verzameld voor beveiliging en foutopsporing.
                </li>
                <li>
                  <strong>Gebruiksstatistieken (Google Analytics 4):</strong> anonieme paginaweergaven,
                  sessieduur, verkeersbron. Geaggregeerd en geanonimiseerd.
                </li>
                <li>
                  <strong>Advertentiegegevens (Google AdSense):</strong> cookies en device-identifiers voor
                  het tonen van advertenties, uitsluitend na uw toestemming via de cookiebanner.
                </li>
                <li>
                  <strong>Formulierinvoer:</strong> getallen die u invoert in onze rekentools worden
                  uitsluitend in uw browser verwerkt en niet naar onze servers verzonden.
                </li>
              </ul>
              <p>
                Wij verzamelen <strong>geen</strong> namen, telefoonnummers of betaalgegevens.
                Interesten.be vereist geen registratie of account.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">3. Doeleinden en rechtsgrond</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <table className="not-prose w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2">Doel</th>
                    <th className="text-left py-2">Rechtsgrond (AVG art. 6)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2">Weergave van de rekentool</td>
                    <td className="py-2">Uitvoering dienst / art. 6(1)(b)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2">Beveiliging en foutopsporing (logs)</td>
                    <td className="py-2">Gerechtvaardigd belang / art. 6(1)(f)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2">Statistieken (GA4, geanonimiseerd)</td>
                    <td className="py-2">Toestemming / art. 6(1)(a)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2">Gepersonaliseerde advertenties</td>
                    <td className="py-2">Toestemming / art. 6(1)(a)</td>
                  </tr>
                  <tr>
                    <td className="py-2">Niet-gepersonaliseerde advertenties</td>
                    <td className="py-2">Gerechtvaardigd belang / art. 6(1)(f)</td>
                  </tr>
                </tbody>
              </table>
              <p>
                U kunt uw toestemming op elk moment intrekken via het instellingenvenster van onze
                cookiebanner.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">4. Cookies en Consent Mode v2</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Interesten.be gebruikt Google Consent Mode v2. Wanneer u onze site voor het eerst bezoekt
                staan advertentie- en analytics-cookies standaard op <strong>geweigerd</strong>. Pas nadat
                u via onze cookiebanner toestemming geeft worden deze cookies geplaatst.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">5. Ontvangers van uw gegevens</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Wij delen uw gegevens alleen met verwerkers die contractueel gebonden zijn aan
                AVG-verplichtingen:
              </p>
              <ul>
                <li>
                  <strong>Google Ireland Ltd.</strong> (AdSense, Funding Choices, GA4) — Gordon House,
                  Barrow Street, Dublin 4, Ierland.
                </li>
                <li>
                  <strong>Hostingprovider</strong> — voor opslag en serving van interesten.be.
                </li>
              </ul>
              <p>
                Wij verkopen uw gegevens <strong>nooit</strong> aan derden.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">6. Internationale doorgifte</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Enkele ontvangers (Google) kunnen gegevens verwerken buiten de EER, met name in de
                Verenigde Staten. Deze doorgiften vinden plaats onder het <strong>EU-US Data Privacy
                Framework</strong> (adequaatheidsbesluit van 10 juli 2023) en aanvullende Standard
                Contractual Clauses, conform art. 45–46 AVG.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">7. Bewaartermijnen</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <ul>
                <li>Technische logs: maximaal 30 dagen, daarna automatisch verwijderd.</li>
                <li>Analytics-data: tot 14 maanden (GA4-standaard).</li>
                <li>Cookie-consent: 13 maanden (conform GBA-richtlijn), daarna opnieuw gevraagd.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">8. Uw rechten</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>Onder de AVG heeft u de volgende rechten:</p>
              <ul>
                <li><strong>Inzage</strong> — een kopie van de gegevens die wij van u verwerken (art. 15).</li>
                <li><strong>Rectificatie</strong> — correctie van onjuiste gegevens (art. 16).</li>
                <li><strong>Wissing</strong> ("recht om vergeten te worden") (art. 17).</li>
                <li><strong>Beperking</strong> van de verwerking (art. 18).</li>
                <li><strong>Gegevensoverdraagbaarheid</strong> (art. 20).</li>
                <li><strong>Bezwaar</strong> tegen verwerking op basis van gerechtvaardigd belang (art. 21).</li>
                <li><strong>Intrekken van toestemming</strong> — op elk moment, zonder opgaaf van reden.</li>
              </ul>
              <p>
                Een verzoek kunt u sturen naar{" "}
                <a href="mailto:info@hazier.be" className="text-primary hover:underline">info@hazier.be</a>.
                Wij antwoorden binnen 30 kalenderdagen.
              </p>
              <p>
                U heeft ook het recht klacht in te dienen bij de{" "}
                <strong>Gegevensbeschermingsautoriteit</strong>:
              </p>
              <div className="bg-muted p-4 rounded-lg not-prose">
                <p>Drukpersstraat 35, 1000 Brussel</p>
                <p>
                  <a href="mailto:contact@apd-gba.be" className="text-primary hover:underline">contact@apd-gba.be</a>
                  {" · "}
                  <a
                    href="https://www.gegevensbeschermingsautoriteit.be"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    gegevensbeschermingsautoriteit.be
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">9. Wijzigingen</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Dit beleid kan wijzigen, bijvoorbeeld bij nieuwe functionaliteit of gewijzigde regelgeving.
                De laatste versie vindt u steeds op{" "}
                <code>https://interesten.be/privacybeleid</code>. Bij substantiële wijzigingen wordt de
                datum bovenaan dit document aangepast.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">10. Contact</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Vragen of verzoeken? Mail ons op{" "}
                <a href="mailto:info@hazier.be" className="text-primary hover:underline">info@hazier.be</a>.
              </p>
            </CardContent>
          </Card>

        </div>
      </section>

      <Footer />
    </div>
  );
}
