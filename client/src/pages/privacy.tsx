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
              <h3>Soorten Cookies</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Essentiële Cookies</h4>
                  <p>Noodzakelijk voor het functioneren van de website (bijvoorbeeld donkere modus voorkeur)</p>
                </div>
                <div>
                  <h4 className="font-semibold">Analytics Cookies</h4>
                  <p>Google Analytics voor het meten van websiteverkeer en gebruikersgedrag</p>
                </div>
                <div>
                  <h4 className="font-semibold">Advertentie Cookies</h4>
                  <p>Google Ads voor het tonen van relevante advertenties</p>
                </div>
              </div>

              <h3>Cookie Beheer</h3>
              <p>
                U kunt cookies beheren via uw browserinstellingen. Het uitschakelen van cookies 
                kan de functionaliteit van onze website beperken.
              </p>
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