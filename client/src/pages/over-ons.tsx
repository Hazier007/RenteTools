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
            Betrouwbare, Nederlandstalige financiële calculators voor de Belgische markt.
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
                Interesten.be is ontstaan uit de behoefte aan betrouwbare, Nederlandstalige financiële calculators, 
                specifiek afgestemd op de Belgische markt. Het platform combineert technologie, praktijkervaring 
                en financiële expertise om particulieren en ondernemers te helpen betere beslissingen te nemen 
                rond sparen, lenen en beleggen.
              </p>
            </CardContent>
          </Card>

          {/* Founder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-user mr-3 text-primary"></i>
                De Oprichter
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Achter interesten.be staat{" "}
                <a 
                  href="https://www.linkedin.com/in/bart-deblock-6a028a74/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-semibold"
                >
                  Bart
                </a>
                , webdesigner en AI-bouwer (via{" "}
                <a 
                  href="https://hazier.be" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  hazier.be
                </a>
                ) én cofounder van{" "}
                <a 
                  href="https://collectpro.be" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  CollectPro.be
                </a>
                , actief binnen de incasso- en kredietbeheerwereld. Die unieke combinatie van digitale knowhow 
                en financiële praktijkervaring vormt de basis van alle tools en inzichten op dit platform.
              </p>
            </CardContent>
          </Card>

          {/* Contributors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-users mr-3 text-primary"></i>
                Gastschrijvers & Experts
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Naast eigen content werkt interesten.be samen met gastschrijvers en financiële professionals 
                die hun kennis en ervaring delen via artikelen en analyses. Elke bijdrage wordt inhoudelijk 
                nagekeken en afgestemd op de Belgische context, zodat kwaliteit, correctheid en relevantie 
                steeds gewaarborgd blijven.
              </p>
            </CardContent>
          </Card>

          {/* Quality & Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-shield-alt mr-3 text-primary"></i>
                Kwaliteit & Actualiteit
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Onze calculators en artikels worden ontwikkeld met oog voor nauwkeurigheid, transparantie 
                en actuele Belgische regelgeving, en worden regelmatig bijgewerkt volgens de nieuwste rentes, 
                fiscale regels en wetgeving. Zo ben je zeker dat je rekent op cijfers die kloppen — vandaag én morgen.
              </p>
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
