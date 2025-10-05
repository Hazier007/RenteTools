import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function Voorwaarden() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Algemene Voorwaarden - Interesten.be
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Gebruiksvoorwaarden voor onze financiële calculators en diensten in België.
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
                <i className="fas fa-file-contract mr-3 text-primary"></i>
                Algemene Informatie
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg">
                Deze algemene voorwaarden zijn van toepassing op het gebruik van de website 
                Interesten.be en alle bijbehorende diensten. Door onze website te gebruiken, 
                gaat u akkoord met deze voorwaarden.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p><strong>Website:</strong> www.interesten.be</p>
                <p><strong>Eigenaar:</strong> Interesten.be</p>
                <p><strong>Laatste update:</strong> 27 augustus 2025</p>
              </div>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-calculator mr-3 text-primary"></i>
                Onze Diensten
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <h3>Wat Bieden Wij?</h3>
              <ul>
                <li><strong>Financiële Calculators:</strong> Gratis online rekenhulpen voor sparen, lenen en beleggen</li>
                <li><strong>Informatie:</strong> Educatieve content over financiële onderwerpen</li>
                <li><strong>Vergelijkingstools:</strong> Tools om financiële producten te vergelijken</li>
                <li><strong>Belgische Focus:</strong> Alle tools specifiek aangepast aan de Belgische markt</li>
              </ul>

              <h3>Beschikbaarheid</h3>
              <p>
                Onze diensten zijn 24/7 beschikbaar, maar wij kunnen niet garanderen dat de website 
                altijd operationeel is. Onderhoud en updates kunnen tijdelijke onderbrekingen veroorzaken.
              </p>
            </CardContent>
          </Card>

          {/* Usage Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-users mr-3 text-primary"></i>
                Gebruiksregels
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <h3>Toegestaan Gebruik</h3>
              <div className="grid gap-4">
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-green-600 mr-3 mt-1"></i>
                  <div>
                    <h4 className="font-semibold">Persoonlijk Gebruik</h4>
                    <p className="text-muted-foreground">Calculators gebruiken voor uw eigen financiële berekeningen</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-green-600 mr-3 mt-1"></i>
                  <div>
                    <h4 className="font-semibold">Educatief Gebruik</h4>
                    <p className="text-muted-foreground">Tools gebruiken voor onderwijs en informatieve doeleinden</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-green-600 mr-3 mt-1"></i>
                  <div>
                    <h4 className="font-semibold">Delen van Links</h4>
                    <p className="text-muted-foreground">Links naar onze calculators delen met anderen</p>
                  </div>
                </div>
              </div>

              <h3>Niet Toegestaan</h3>
              <div className="grid gap-4">
                <div className="flex items-start">
                  <i className="fas fa-times-circle text-red-600 mr-3 mt-1"></i>
                  <div>
                    <h4 className="font-semibold">Commercieel Hergebruik</h4>
                    <p className="text-muted-foreground">Content of calculators kopiëren voor commerciële doeleinden</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-times-circle text-red-600 mr-3 mt-1"></i>
                  <div>
                    <h4 className="font-semibold">Misbruik</h4>
                    <p className="text-muted-foreground">Automatische tools of bots gebruiken om de website te belasten</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-times-circle text-red-600 mr-3 mt-1"></i>
                  <div>
                    <h4 className="font-semibold">Illegale Activiteiten</h4>
                    <p className="text-muted-foreground">De website gebruiken voor illegale of frauduleuze doeleinden</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-exclamation-triangle mr-3 text-primary"></i>
                Disclaimer & Aansprakelijkheid
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-2 flex items-center">
                  <i className="fas fa-warning mr-2"></i>
                  Belangrijke Waarschuwing
                </h4>
                <p>
                  Onze calculators zijn bedoeld als informatieve hulpmiddelen. 
                  Altijd professioneel financieel advies inwinnen voor belangrijke beslissingen.
                </p>
              </div>

              <h3>Nauwkeurigheid van Informatie</h3>
              <ul>
                <li>Wij streven naar nauwkeurige berekeningen, maar kunnen geen garanties geven</li>
                <li>Tarieven en regelgeving kunnen wijzigen zonder voorafgaande kennisgeving</li>
                <li>Gebruikers zijn verantwoordelijk voor het verifiëren van resultaten</li>
              </ul>

              <h3>Beperking van Aansprakelijkheid</h3>
              <p>
                Interesten.be is niet aansprakelijk voor:
              </p>
              <ul>
                <li>Financiële verliezen als gevolg van gebruik van onze calculators</li>
                <li>Beslissingen genomen op basis van onze informatie</li>
                <li>Tijdelijke onbeschikbaarheid van de website</li>
                <li>Fouten of onnauwkeurigheden in berekeningen</li>
              </ul>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-copyright mr-3 text-primary"></i>
                Intellectueel Eigendom
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <h3>Auteursrechten</h3>
              <p>
                Alle content op Interesten.be, inclusief teksten, afbeeldingen, logo's en calculator code, 
                is beschermd door auteursrecht en eigendom van Interesten.be.
              </p>

              <h3>Toegestaan Gebruik</h3>
              <ul>
                <li>Bekijken en gebruiken van content voor persoonlijke doeleinden</li>
                <li>Delen van links naar onze pagina's</li>
                <li>Citeren van kleine delen van content met bronvermelding</li>
              </ul>

              <h3>Niet Toegestaan</h3>
              <ul>
                <li>Kopiëren, distribueren of hergebruiken van content zonder toestemming</li>
                <li>Gebruik van onze merknaam of logo's zonder toestemming</li>
                <li>Reverse engineering van onze calculator algoritmes</li>
              </ul>
            </CardContent>
          </Card>

          {/* Third Party Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-external-link-alt mr-3 text-primary"></i>
                Links naar Derde Partijen
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Onze website kan links bevatten naar externe websites. Wij zijn niet verantwoordelijk 
                voor de content, privacy beleid of praktijken van deze externe sites.
              </p>

              <h3>Advertenties</h3>
              <p>
                Wij tonen advertenties van Google Ads om onze gratis diensten te financieren. 
                Deze advertenties leiden naar externe websites waarvoor wij geen verantwoordelijkheid dragen.
              </p>
            </CardContent>
          </Card>

          {/* Changes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-edit mr-3 text-primary"></i>
                Wijzigingen in Voorwaarden
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Wij behouden ons het recht voor om deze algemene voorwaarden te wijzigen. 
                Belangrijke wijzigingen zullen worden aangekondigd op onze website.
              </p>

              <h3>Kennisgeving</h3>
              <ul>
                <li>Kleine wijzigingen: Update datum wordt aangepast</li>
                <li>Grote wijzigingen: Melding op de homepage gedurende 30 dagen</li>
                <li>Gebruikers: Controleer regelmatig op updates</li>
              </ul>
            </CardContent>
          </Card>

          {/* Applicable Law */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-balance-scale mr-3 text-primary"></i>
                Toepasselijk Recht
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Deze algemene voorwaarden vallen onder Belgisch recht. 
                Geschillen zullen worden behandeld door de bevoegde Belgische rechtbanken.
              </p>

              <h3>Geschillenregeling</h3>
              <p>
                Bij geschillen streven wij naar een minnelijke regeling. 
                Neem eerst contact met ons op voordat u juridische stappen onderneemt.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-envelope mr-3 text-primary"></i>
                Contact Informatie
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Voor vragen over deze algemene voorwaarden kunt u contact met ons opnemen:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="mb-2"><strong>Email:</strong> info@interesten.be</p>
                <p className="mb-2"><strong>Website:</strong> <a href="/" className="text-primary hover:underline">www.interesten.be</a></p>
                <p><strong>Reactietijd:</strong> Wij reageren binnen 5 werkdagen op uw vragen</p>
              </div>
            </CardContent>
          </Card>

        </div>
      </section>

      <Footer />
    </div>
  );
}