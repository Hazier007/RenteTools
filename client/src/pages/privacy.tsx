import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Header activeCalculator="" onCalculatorChange={() => {}} />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Privacy Beleid - Interesten.be
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Uw privacy is belangrijk voor ons. Lees hoe we uw gegevens beschermen en gebruiken.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-shield-alt mr-3 text-primary"></i>
                Privacy Overzicht
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg">
                Bij Interesten.be respecteren wij uw privacy en zijn wij toegewijd aan het beschermen 
                van uw persoonlijke gegevens. Dit privacy beleid legt uit hoe wij informatie verzamelen, 
                gebruiken en beschermen wanneer u onze website gebruikt.
              </p>
              <p>
                <strong>Laatste update:</strong> 27 augustus 2025
              </p>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-database mr-3 text-primary"></i>
                Welke Gegevens Verzamelen Wij?
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <h3>Automatisch Verzamelde Gegevens</h3>
              <ul>
                <li><strong>Website bezoek informatie:</strong> IP-adres, browsertype, besturingssysteem</li>
                <li><strong>Gebruiksstatistieken:</strong> Welke pagina's u bezoekt en hoe lang</li>
                <li><strong>Cookies:</strong> Voor website functionaliteit en analytics</li>
              </ul>

              <h3>Calculator Gegevens</h3>
              <ul>
                <li><strong>Invoer gegevens:</strong> Bedragen, percentages en termijnen die u invoert</li>
                <li><strong>Opmerking:</strong> Alle calculator gegevens worden lokaal verwerkt en niet opgeslagen</li>
              </ul>

              <h3>Geen Persoonlijke Identificatie</h3>
              <p>
                Wij vragen niet om persoonlijke gegevens zoals naam, e-mailadres, of telefoonnummer 
                voor het gebruik van onze calculators. Alle berekeningen gebeuren in uw browser.
              </p>
            </CardContent>
          </Card>

          {/* Data Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-cogs mr-3 text-primary"></i>
                Hoe Gebruiken Wij Uw Gegevens?
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <div className="grid gap-6">
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-green-600 mr-3 mt-1"></i>
                  <div>
                    <h4 className="font-semibold">Website Verbetering</h4>
                    <p className="text-muted-foreground">Analytics helpen ons begrijpen welke calculators het meest gebruikt worden</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-green-600 mr-3 mt-1"></i>
                  <div>
                    <h4 className="font-semibold">Technische Optimalisatie</h4>
                    <p className="text-muted-foreground">Gebruiksdata helpt ons de website sneller en stabieler te maken</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-green-600 mr-3 mt-1"></i>
                  <div>
                    <h4 className="font-semibold">Beveiliging</h4>
                    <p className="text-muted-foreground">IP-adressen helpen ons misbruik en spam te voorkomen</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-cookie-bite mr-3 text-primary"></i>
                Cookies en Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg mb-6">
                Onze website gebruikt cookies om uw ervaring te verbeteren en relevante advertenties te tonen. 
                U kunt uw cookie voorkeuren beheren via de banner die verschijnt bij uw eerste bezoek.
              </p>
              
              <h3>Soorten Cookies</h3>
              <div className="space-y-6">
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <h4 className="font-semibold flex items-center">
                    <i className="fas fa-check-circle text-green-600 mr-2"></i>
                    Noodzakelijke Cookies
                  </h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Deze cookies zijn essentieel voor de werking van de website en kunnen niet worden uitgeschakeld.
                  </p>
                  <ul className="text-sm mt-2">
                    <li>• Sessie cookies voor website functionaliteit</li>
                    <li>• Cookie consent voorkeuren opslag</li>
                    <li>• Dark mode en taalvoorkeuren</li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <h4 className="font-semibold flex items-center">
                    <i className="fas fa-chart-bar text-blue-600 mr-2"></i>
                    Analytische Cookies - Google Analytics (G-P5BE4RN7QX)
                  </h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    We gebruiken Google Analytics om websitestatistieken te verzamelen. <strong>Alleen met uw toestemming.</strong>
                  </p>
                  <ul className="text-sm mt-2">
                    <li>• Aantal bezoekers en paginaweergaven</li>
                    <li>• Populairste calculators en gebruikerstrajecten</li>
                    <li>• Technische informatie (browser, apparaat)</li>
                    <li>• Geografische locatie (land/regio niveau)</li>
                    <li>• Sessieduur en terugkerende bezoekers</li>
                  </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                  <h4 className="font-semibold flex items-center">
                    <i className="fas fa-ad text-purple-600 mr-2"></i>
                    Advertentie Cookies - Google AdSense
                  </h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    We tonen advertenties via Google AdSense om de kosten van de website te dekken. <strong>Alleen met uw toestemming.</strong>
                  </p>
                  <ul className="text-sm mt-2">
                    <li>• Relevante advertenties gebaseerd op uw interesses</li>
                    <li>• Voorkoming van herhaaldelijke advertenties</li>
                    <li>• Meting van advertentie-effectiviteit</li>
                    <li>• Cross-site tracking voor personalisatie</li>
                    <li>• Advertentie targeting en optimalisatie</li>
                  </ul>
                </div>
              </div>

              <h3>Uw Cookie Rechten</h3>
              <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">🛡️ Volledige Controle Over Uw Privacy</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Vrije keuze:</strong> U kunt kiezen welke cookies u wilt accepteren</li>
                  <li>• <strong>Intrekken toestemming:</strong> Wijzig uw voorkeuren op elk moment</li>
                  <li>• <strong>Browser controle:</strong> Beheer cookies in uw browserinstellingen</li>
                  <li>• <strong>Geen verplichting:</strong> Bij weigering functioneert de website nog steeds volledig</li>
                  <li>• <strong>Transparantie:</strong> Alle tracking is duidelijk gecommuniceerd</li>
                </ul>
              </div>

              <h3>Cookie Beheer</h3>
              <p>
                U kunt uw cookie voorkeuren op drie manieren beheren:
              </p>
              <ol className="text-sm">
                <li><strong>Via onze cookie banner:</strong> Bij uw eerste bezoek verschijnt een banner</li>
                <li><strong>Via browserinstellingen:</strong> Alle browsers hebben cookie beheeropties</li>
                <li><strong>Via opt-out tools:</strong> Google biedt advertentie opt-out mogelijkheden</li>
              </ol>
            </CardContent>
          </Card>

          {/* Third Parties */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-handshake mr-3 text-primary"></i>
                Derde Partijen
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <h3>Google Services</h3>
              <ul>
                <li><strong>Google Analytics:</strong> Voor website statistieken</li>
                <li><strong>Google Ads:</strong> Voor advertentie-inkomsten</li>
                <li><strong>Google Fonts:</strong> Voor website typografie</li>
              </ul>

              <h3>Data Delen</h3>
              <p>
                Wij delen geen persoonlijke gegevens met derde partijen, behalve zoals beschreven 
                in dit privacy beleid of indien wettelijk verplicht.
              </p>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-lock mr-3 text-primary"></i>
                Gegevensbeveiliging
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Technische Maatregelen</h4>
                  <ul>
                    <li>HTTPS versleuteling</li>
                    <li>Veilige hosting infrastructuur</li>
                    <li>Regelmatige security updates</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Organisatorische Maatregelen</h4>
                  <ul>
                    <li>Beperkte toegang tot systemen</li>
                    <li>Privacy training voor medewerkers</li>
                    <li>Incident response procedures</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-user-shield mr-3 text-primary"></i>
                Uw Rechten (AVG/GDPR)
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Onder de Algemene Verordening Gegevensbescherming (AVG/GDPR) heeft u de volgende rechten:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <ul>
                  <li><strong>Recht op inzage:</strong> Welke gegevens wij hebben</li>
                  <li><strong>Recht op rectificatie:</strong> Correctie van onjuiste gegevens</li>
                  <li><strong>Recht op vergetelheid:</strong> Verwijdering van uw gegevens</li>
                </ul>
                <ul>
                  <li><strong>Recht op beperking:</strong> Beperking van verwerking</li>
                  <li><strong>Recht op overdraagbaarheid:</strong> Gegevens in gestructureerd formaat</li>
                  <li><strong>Recht van bezwaar:</strong> Bezwaar tegen verwerking</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-envelope mr-3 text-primary"></i>
                Contact & Vragen
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Voor vragen over dit privacy beleid of uw gegevens kunt u contact met ons opnemen:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="mb-2"><strong>Email:</strong> privacy@interesten.be</p>
                <p className="mb-2"><strong>Website:</strong> <a href="/" className="text-primary hover:underline">www.interesten.be</a></p>
                <p><strong>Reactietijd:</strong> Wij streven ernaar binnen 30 dagen te reageren op uw verzoek</p>
              </div>
            </CardContent>
          </Card>

        </div>
      </section>

      <Footer />
    </div>
  );
}