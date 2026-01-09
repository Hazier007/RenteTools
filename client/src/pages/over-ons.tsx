import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function OverOns() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Over Ons - Interesten.be
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Uw vertrouwde partner voor financiële calculators en tools in België sinds 2026.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          
          {/* Mission */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-bullseye mr-3 text-primary"></i>
                Onze Missie
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg">
                Interesten.be is ontstaan uit de behoefte aan betrouwbare, Nederlandse financiële calculators 
                die specifiek zijn afgestemd op de Belgische markt. Wij geloven dat iedereen toegang moet hebben 
                tot professionele financiële tools om betere beslissingen te maken over sparen, lenen en beleggen.
              </p>
              <p>
                Onze calculators zijn ontwikkeld door financiële experts en worden regelmatig bijgewerkt 
                met de nieuwste tarieven, belastingregels en wetgeving in België.
              </p>
            </CardContent>
          </Card>

          {/* What We Offer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-star mr-3 text-primary"></i>
                Wat Wij Bieden
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-green-600 mr-3 mt-1"></i>
                    <div>
                      <h4 className="font-semibold">16+ Financiële Calculators</h4>
                      <p className="text-muted-foreground">Van spaarrekeningen tot hypotheken en beleggingen</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-green-600 mr-3 mt-1"></i>
                    <div>
                      <h4 className="font-semibold">Belgische Specificaties</h4>
                      <p className="text-muted-foreground">Alle tools aangepast aan Belgische wetgeving</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-green-600 mr-3 mt-1"></i>
                    <div>
                      <h4 className="font-semibold">Gratis Toegang</h4>
                      <p className="text-muted-foreground">Alle calculators zijn 100% gratis te gebruiken</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-green-600 mr-3 mt-1"></i>
                    <div>
                      <h4 className="font-semibold">Actuele Informatie</h4>
                      <p className="text-muted-foreground">Regelmatig bijgewerkt met nieuwste tarieven</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-green-600 mr-3 mt-1"></i>
                    <div>
                      <h4 className="font-semibold">Mobiel Vriendelijk</h4>
                      <p className="text-muted-foreground">Werkt perfect op alle apparaten</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-green-600 mr-3 mt-1"></i>
                    <div>
                      <h4 className="font-semibold">Privacy Gericht</h4>
                      <p className="text-muted-foreground">Uw gegevens blijven privé en veilig</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Our Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-calculator mr-3 text-primary"></i>
                Onze Calculator Categorieën
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <i className="fas fa-piggy-bank text-3xl text-blue-600 mb-3"></i>
                  <h4 className="font-semibold mb-2">Sparen</h4>
                  <p className="text-sm text-muted-foreground">Spaarrekeningen, deposito's en samengestelde interest</p>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <i className="fas fa-home text-3xl text-orange-600 mb-3"></i>
                  <h4 className="font-semibold mb-2">Lenen</h4>
                  <p className="text-sm text-muted-foreground">Hypotheken, autoleningen en persoonlijke kredieten</p>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <i className="fas fa-chart-line text-3xl text-green-600 mb-3"></i>
                  <h4 className="font-semibold mb-2">Beleggen</h4>
                  <p className="text-sm text-muted-foreground">Rendement calculators voor portefeuilles</p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <i className="fas fa-calendar-alt text-3xl text-purple-600 mb-3"></i>
                  <h4 className="font-semibold mb-2">Planning</h4>
                  <p className="text-sm text-muted-foreground">Pensioen, inflatie en financiële planning</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Values */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-heart mr-3 text-primary"></i>
                Onze Waarden
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-shield-alt text-2xl"></i>
                  </div>
                  <h4 className="font-semibold mb-2">Betrouwbaarheid</h4>
                  <p className="text-muted-foreground">Accurate berekeningen gebaseerd op officiële bronnen</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-users text-2xl"></i>
                  </div>
                  <h4 className="font-semibold mb-2">Toegankelijkheid</h4>
                  <p className="text-muted-foreground">Financiële tools voor iedereen, gratis en eenvoudig</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-sync text-2xl"></i>
                  </div>
                  <h4 className="font-semibold mb-2">Innovatie</h4>
                  <p className="text-muted-foreground">Continu verbeteren en bijwerken van onze tools</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-envelope mr-3 text-primary"></i>
                Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Heeft u vragen, suggesties of feedback over onze calculators? 
                We horen graag van u! Uw input helpt ons om onze tools te verbeteren 
                en nieuwe features toe te voegen die nuttig zijn voor de Belgische markt.
              </p>
              <p>
                <strong>Email:</strong> info@interesten.be<br />
                <strong>Website:</strong> <a href="/" className="text-primary hover:underline">www.interesten.be</a>
              </p>
            </CardContent>
          </Card>

        </div>
      </section>

      <Footer />
    </div>
  );
}