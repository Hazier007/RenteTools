import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import RateComparisonWidget from "@/components/rate-comparison";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area, ComposedChart } from 'recharts';

interface CryptoAsset {
  symbol: string;
  naam: string;
  huidigeKoers: number;
  allocatie: number; // percentage
  marktKap: number; // in miljarden
  volatiliteit: number; // 30-dagen volatiliteit
  yield: number; // staking/DeFi yield
  type: 'Bitcoin' | 'Altcoin' | 'DeFi' | 'Stablecoin' | 'NFT/Gaming';
  kleur: string;
  correlatieBTC: number;
}

interface HistoricalData {
  periode: number;
  datum: string;
  btcKoers: number;
  portfolioWaarde: number;
  rendement: number;
  volatiliteit: number;
  maxDrawdown: number;
}

export default function CryptocurrencyCalculatorPage() {
  useEffect(() => {
    document.title = "Cryptocurrency Calculator België - Crypto Portfolio Analyse";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Analyseer crypto portfolio met volatiliteit, DeFi yields en Belgische belastingimplicaties. Bereken risico-rendement en portfolio optimalisatie voor cryptocurrency.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Analyseer crypto portfolio met volatiliteit, DeFi yields en Belgische belastingimplicaties. Bereken risico-rendement en portfolio optimalisatie voor cryptocurrency.';
      document.head.appendChild(meta);
    }
  }, []);

  const [cryptoPortfolio, setCryptoPortfolio] = useState({
    totaalInvestering: 25000,
    investeringsHorizon: 24, // maanden
    risicoTolerantie: 8, // 1-10 (crypto = hoog risico)
    dcaStrategy: true,
    maandelijkseBijdrage: 1000,
    stakingParticipatie: 75, // percentage in staking
    transactiekosten: 0.5, // percentage
    belastingStrategy: 'hodl' // hodl, trading, mining
  });

  const [cryptoAssets, setCryptoAssets] = useState<CryptoAsset[]>([
    {
      symbol: 'BTC',
      naam: 'Bitcoin',
      huidigeKoers: 42500,
      allocatie: 45,
      marktKap: 830,
      volatiliteit: 65,
      yield: 0,
      type: 'Bitcoin',
      kleur: '#F7931A',
      correlatieBTC: 1.0
    },
    {
      symbol: 'ETH',
      naam: 'Ethereum',
      huidigeKoers: 2650,
      allocatie: 25,
      marktKap: 320,
      volatiliteit: 75,
      yield: 4.2,
      type: 'Altcoin',
      kleur: '#627EEA',
      correlatieBTC: 0.8
    },
    {
      symbol: 'ADA',
      naam: 'Cardano',
      huidigeKoers: 0.45,
      allocatie: 10,
      marktKap: 16,
      volatiliteit: 85,
      yield: 5.1,
      type: 'Altcoin',
      kleur: '#0033AD',
      correlatieBTC: 0.7
    },
    {
      symbol: 'MATIC',
      naam: 'Polygon',
      huidigeKoers: 0.82,
      allocatie: 8,
      marktKap: 8,
      volatiliteit: 95,
      yield: 7.8,
      type: 'DeFi',
      kleur: '#8247E5',
      correlatieBTC: 0.6
    },
    {
      symbol: 'DOT',
      naam: 'Polkadot',
      huidigeKoers: 6.15,
      allocatie: 7,
      marktKap: 8,
      volatiliteit: 88,
      yield: 14.2,
      type: 'Altcoin',
      kleur: '#E6007A',
      correlatieBTC: 0.65
    },
    {
      symbol: 'USDC',
      naam: 'USD Coin',
      huidigeKoers: 1.0,
      allocatie: 5,
      marktKap: 24,
      volatiliteit: 2,
      yield: 3.5,
      type: 'Stablecoin',
      kleur: '#2775CA',
      correlatieBTC: 0.1
    }
  ]);

  // Generate simulated historical data
  const generateHistoricalData = (): HistoricalData[] => {
    const maanden = cryptoPortfolio.investeringsHorizon;
    const data: HistoricalData[] = [];
    
    let btcStartKoers = 35000;
    let portfolioWaarde = cryptoPortfolio.totaalInvestering;
    let maxPortfolioWaarde = portfolioWaarde;
    
    for (let maand = 0; maand <= maanden; maand++) {
      // Simulate Bitcoin price movement
      const maandelijksRendement = maand === 0 ? 0 : 
        (Math.random() - 0.4) * 0.3; // Slightly positive bias but very volatile
      
      const btcKoers = maand === 0 ? btcStartKoers : 
        data[maand - 1].btcKoers * (1 + maandelijksRendement);
      
      // Calculate portfolio value based on crypto correlations
      if (maand > 0) {
        let portfolioRendement = 0;
        cryptoAssets.forEach(asset => {
          const assetRendement = maandelijksRendement * asset.correlatieBTC + 
            (Math.random() - 0.5) * 0.1; // Add uncorrelated noise
          portfolioRendement += assetRendement * (asset.allocatie / 100);
        });
        
        portfolioWaarde *= (1 + portfolioRendement);
        
        // Add DCA contribution
        if (cryptoPortfolio.dcaStrategy) {
          portfolioWaarde += cryptoPortfolio.maandelijkseBijdrage;
        }
        
        maxPortfolioWaarde = Math.max(maxPortfolioWaarde, portfolioWaarde);
      }
      
      const datum = new Date(2022, maand, 1);
      const rendement = maand === 0 ? 0 : 
        ((portfolioWaarde - cryptoPortfolio.totaalInvestering - (maand * cryptoPortfolio.maandelijkseBijdrage)) / 
         (cryptoPortfolio.totaalInvestering + (maand * cryptoPortfolio.maandelijkseBijdrage))) * 100;
      
      const volatiliteit = maand < 3 ? 0 : 
        data.slice(Math.max(0, maand - 3), maand)
          .reduce((sum, d, i, arr) => {
            if (i === 0) return 0;
            const dailyReturn = (d.portfolioWaarde / arr[i-1].portfolioWaarde) - 1;
            return sum + Math.pow(dailyReturn, 2);
          }, 0) / 3;
      
      const maxDrawdown = ((portfolioWaarde - maxPortfolioWaarde) / maxPortfolioWaarde) * 100;
      
      data.push({
        periode: maand,
        datum: datum.toISOString().split('T')[0],
        btcKoers: Math.round(btcKoers),
        portfolioWaarde: Math.round(portfolioWaarde),
        rendement,
        volatiliteit: Math.sqrt(volatiliteit) * 100,
        maxDrawdown
      });
    }
    
    return data;
  };

  const historicalData = generateHistoricalData();

  // Calculate portfolio metrics
  const berekenCryptoMetrics = () => {
    const totaalAllocatie = cryptoAssets.reduce((sum, asset) => sum + asset.allocatie, 0);
    
    // Weighted metrics
    const gewogenGemiddeldeVolatiliteit = cryptoAssets.reduce((sum, asset) => 
      sum + (asset.volatiliteit * asset.allocatie / 100), 0);
    
    const gewogenGemiddeldeYield = cryptoAssets.reduce((sum, asset) => 
      sum + (asset.yield * asset.allocatie / 100), 0);
    
    const gewogenGemiddeldeMarktKap = cryptoAssets.reduce((sum, asset) => 
      sum + (asset.marktKap * asset.allocatie / 100), 0);
    
    // Calculate portfolio correlation with Bitcoin
    const portfolioBTCCorrelatie = cryptoAssets.reduce((sum, asset) => 
      sum + (asset.correlatieBTC * asset.allocatie / 100), 0);
    
    // Risk metrics from historical data
    const rendementen = historicalData.slice(1).map(d => d.rendement);
    const gemiddeldeRendement = rendementen.reduce((sum, r) => sum + r, 0) / rendementen.length;
    const rendementVolatiliteit = Math.sqrt(
      rendementen.reduce((sum, r) => sum + Math.pow(r - gemiddeldeRendement, 2), 0) / rendementen.length
    );
    
    const maxDrawdown = Math.min(...historicalData.map(d => d.maxDrawdown));
    const sharpeRatio = gemiddeldeRendement / rendementVolatiliteit;
    
    // Current portfolio value breakdown
    const portfolioVerdeling = cryptoAssets.map(asset => {
      const investering = (cryptoPortfolio.totaalInvestering * asset.allocatie) / 100;
      const aantalTokens = investering / asset.huidigeKoers;
      const stakingReward = asset.yield > 0 ? 
        investering * (asset.yield / 100) * (cryptoPortfolio.stakingParticipatie / 100) : 0;
      
      return {
        ...asset,
        investering,
        aantalTokens,
        stakingReward
      };
    });
    
    // Calculate staking rewards
    const totaalStakingRewards = portfolioVerdeling.reduce((sum, asset) => sum + asset.stakingReward, 0);
    
    // DeFi opportunity analysis
    const defiOpportunities = cryptoAssets.filter(asset => asset.type === 'DeFi' || asset.yield > 0)
      .map(asset => ({
        symbol: asset.symbol,
        naam: asset.naam,
        apy: asset.yield,
        risicoNiveau: asset.volatiliteit > 80 ? 'Hoog' : asset.volatiliteit > 60 ? 'Gemiddeld' : 'Laag',
        geschatteJaarInkomst: (cryptoPortfolio.totaalInvestering * asset.allocatie / 100) * (asset.yield / 100)
      }));
    
    return {
      totaalAllocatie,
      gewogenGemiddeldeVolatiliteit,
      gewogenGemiddeldeYield,
      gewogenGemiddeldeMarktKap,
      portfolioBTCCorrelatie,
      gemiddeldeRendement,
      rendementVolatiliteit,
      maxDrawdown,
      sharpeRatio,
      portfolioVerdeling,
      totaalStakingRewards,
      defiOpportunities
    };
  };

  const cryptoMetrics = berekenCryptoMetrics();

  // Risk management strategies
  const risicoStrategieën = [
    {
      strategie: "Diversificatie",
      beschrijving: "Spreiding over verschillende crypto categorieën",
      implementatie: "Max 50% in Bitcoin, rest verdeeld over altcoins en DeFi",
      risicoReductie: "Gemiddeld"
    },
    {
      strategie: "Dollar Cost Averaging",
      beschrijving: "Periodieke aankopen onafhankelijk van prijs",
      implementatie: "Maandelijkse aankopen volgens vaste strategie",
      risicoReductie: "Hoog"
    },
    {
      strategie: "Stop-Loss Orders",
      beschrijving: "Automatische verkoop bij prijsdaling",
      implementatie: "Stop-loss op 20-30% onder aankoopprijs",
      risicoReductie: "Gemiddeld"
    },
    {
      strategie: "Profit Taking",
      beschrijving: "Winst nemen bij bepaalde percentages",
      implementatie: "Verkoop 25% bij 100% winst, 50% bij 300% winst",
      risicoReductie: "Hoog"
    },
    {
      strategie: "Stablecoin Buffer",
      beschrijving: "Buffer in stabiele cryptocurrencies",
      implementatie: "5-15% in USDC/USDT voor opportuniteiten",
      risicoReductie: "Gemiddeld"
    }
  ];

  // Belgian tax implications
  const belgischeBelastingen = {
    particulierBelegger: {
      titel: "Particuliere Belegger",
      kapitaalWinsten: "Vrijgesteld van belasting (momenteel)",
      dividenden: "N.v.t. - crypto heeft geen dividenden",
      mining: "Belastbaar als bijkomende inkomsten",
      trading: "Mogelijk belastbaar als professionele activiteit"
    },
    professioneleBelegger: {
      titel: "Professionele Handelaar",
      kapitaalWinsten: "Belastbaar tegen progressief tarief",
      dividenden: "N.v.t.",
      mining: "Belastbaar als bedrijfsinkomsten",
      trading: "Volledig belastbaar als bedrijfsactiviteit"
    },
    toekomstigeWetgeving: [
      "EU MiCA regulatie implementatie (2024-2025)",
      "Mogelijke crypto belasting op kapitaalwinsten",
      "Rapportageplicht voor crypto exchanges",
      "Verscherpte anti-witwaswetgeving"
    ]
  };

  const updateAssetAllocatie = (index: number, nieuweAllocatie: number) => {
    const updated = [...cryptoAssets];
    updated[index].allocatie = nieuweAllocatie;
    setCryptoAssets(updated);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeCalculator="cryptocurrency-calculator" onCalculatorChange={() => {}} />
      
      {/* Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Cryptocurrency Calculator België
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Analyseer uw crypto portfolio met geavanceerde risico-rendement berekeningen, 
              DeFi yields en Belgische belastingimplicaties.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Portfolio Analyse
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                DeFi Yields
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Risico Management
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Top Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <GoogleAdsense slot="banner" className="w-full max-w-4xl mx-auto" />
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Portfolio Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fab fa-bitcoin mr-3 text-primary"></i>
                  Crypto Portfolio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="totaalInvestering">Totale investering (€)</Label>
                  <Input
                    id="totaalInvestering"
                    type="number"
                    value={cryptoPortfolio.totaalInvestering}
                    onChange={(e) => setCryptoPortfolio({...cryptoPortfolio, totaalInvestering: Number(e.target.value)})}
                    data-testid="input-totaal-investering"
                  />
                </div>

                <div>
                  <Label htmlFor="investeringsHorizon">Investerings horizon (maanden)</Label>
                  <Input
                    id="investeringsHorizon"
                    type="number"
                    value={cryptoPortfolio.investeringsHorizon}
                    onChange={(e) => setCryptoPortfolio({...cryptoPortfolio, investeringsHorizon: Number(e.target.value)})}
                    data-testid="input-investerings-horizon"
                  />
                </div>

                <div className="space-y-2">
                  <Label>DCA Strategie</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="dcaStrategy"
                      checked={cryptoPortfolio.dcaStrategy}
                      onChange={(e) => setCryptoPortfolio({...cryptoPortfolio, dcaStrategy: e.target.checked})}
                      data-testid="checkbox-dca-strategy"
                    />
                    <Label htmlFor="dcaStrategy" className="text-sm">
                      Periodieke bijdragen
                    </Label>
                  </div>
                </div>

                {cryptoPortfolio.dcaStrategy && (
                  <div>
                    <Label htmlFor="maandelijkseBijdrage">Maandelijkse bijdrage (€)</Label>
                    <Input
                      id="maandelijkseBijdrage"
                      type="number"
                      value={cryptoPortfolio.maandelijkseBijdrage}
                      onChange={(e) => setCryptoPortfolio({...cryptoPortfolio, maandelijkseBijdrage: Number(e.target.value)})}
                      data-testid="input-maandelijkse-bijdrage"
                    />
                  </div>
                )}

                <div>
                  <Label>Staking participatie: {cryptoPortfolio.stakingParticipatie}%</Label>
                  <Slider
                    value={[cryptoPortfolio.stakingParticipatie]}
                    onValueChange={(value) => setCryptoPortfolio({...cryptoPortfolio, stakingParticipatie: value[0]})}
                    max={100}
                    min={0}
                    step={5}
                    className="mt-2"
                    data-testid="slider-staking-participatie"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Risk Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Risico Instellingen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Risico tolerantie: {cryptoPortfolio.risicoTolerantie}/10</Label>
                  <Slider
                    value={[cryptoPortfolio.risicoTolerantie]}
                    onValueChange={(value) => setCryptoPortfolio({...cryptoPortfolio, risicoTolerantie: value[0]})}
                    max={10}
                    min={1}
                    step={1}
                    className="mt-2"
                    data-testid="slider-risico-tolerantie"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Conservatief</span>
                    <span>Zeer Agressief</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="belastingStrategy">Belasting strategie</Label>
                  <Select value={cryptoPortfolio.belastingStrategy} onValueChange={(value) => setCryptoPortfolio({...cryptoPortfolio, belastingStrategy: value})}>
                    <SelectTrigger data-testid="select-belasting-strategy">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hodl">HODL (lange termijn)</SelectItem>
                      <SelectItem value="trading">Actieve handel</SelectItem>
                      <SelectItem value="mining">Mining/Staking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="transactiekosten">Transactiekosten (%)</Label>
                  <Input
                    id="transactiekosten"
                    type="number"
                    step="0.1"
                    value={cryptoPortfolio.transactiekosten}
                    onChange={(e) => setCryptoPortfolio({...cryptoPortfolio, transactiekosten: Number(e.target.value)})}
                    data-testid="input-transactiekosten"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Portfolio Metrics */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Portfolio Volatiliteit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600" data-testid="text-volatiliteit">
                    {cryptoMetrics.gewogenGemiddeldeVolatiliteit.toFixed(1)}%
                  </div>
                  <p className="text-sm text-muted-foreground">30-dagen volatiliteit</p>
                  <div className="mt-2 text-sm">
                    {cryptoMetrics.gewogenGemiddeldeVolatiliteit > 80 ? 'Zeer Hoog Risico' : 
                     cryptoMetrics.gewogenGemiddeldeVolatiliteit > 60 ? 'Hoog Risico' : 'Gemiddeld Risico'}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">DeFi Yield</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600" data-testid="text-defi-yield">
                    {cryptoMetrics.gewogenGemiddeldeYield.toFixed(1)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Gewogen staking yield</p>
                  <div className="mt-2 text-sm">
                    Jaarlijks: €{Math.round(cryptoMetrics.totaalStakingRewards).toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">BTC Correlatie</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600" data-testid="text-btc-correlatie">
                    {cryptoMetrics.portfolioBTCCorrelatie.toFixed(2)}
                  </div>
                  <p className="text-sm text-muted-foreground">Bitcoin correlatie</p>
                  <div className="mt-2 text-sm">
                    {cryptoMetrics.portfolioBTCCorrelatie > 0.8 ? 'Hoge correlatie' : 
                     cryptoMetrics.portfolioBTCCorrelatie > 0.6 ? 'Gemiddelde correlatie' : 'Lage correlatie'}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sharpe Ratio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600" data-testid="text-sharpe-ratio">
                    {cryptoMetrics.sharpeRatio.toFixed(2)}
                  </div>
                  <p className="text-sm text-muted-foreground">Risico-aangepast rendement</p>
                  <div className="mt-2 text-sm">
                    Max Drawdown: {cryptoMetrics.maxDrawdown.toFixed(1)}%
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Portfolio Allocation */}
            <Card>
              <CardHeader>
                <CardTitle>Crypto Asset Allocatie</CardTitle>
                <p className="text-muted-foreground">
                  Totaal: {cryptoMetrics.totaalAllocatie.toFixed(0)}%
                  {cryptoMetrics.totaalAllocatie !== 100 && (
                    <span className="text-red-600 ml-2">⚠️ Moet 100% zijn</span>
                  )}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {cryptoAssets.map((asset, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{backgroundColor: asset.kleur}}
                            ></div>
                            <Label className="text-sm font-medium">{asset.symbol} - {asset.naam}</Label>
                          </div>
                          <span className="text-sm font-semibold">{asset.allocatie}%</span>
                        </div>
                        <Slider
                          value={[asset.allocatie]}
                          onValueChange={(value) => updateAssetAllocatie(index, value[0])}
                          max={70}
                          min={0}
                          step={1}
                          className="w-full"
                          data-testid={`slider-allocatie-${index}`}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>€{asset.huidigeKoers.toLocaleString()}</span>
                          <span>Vol: {asset.volatiliteit}% | Yield: {asset.yield}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={cryptoAssets}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ symbol, allocatie }) => `${symbol} ${allocatie}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="allocatie"
                        >
                          {cryptoAssets.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.kleur} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [`${value}%`]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Analysis */}
            <Tabs defaultValue="performance" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="defi">DeFi Opportunities</TabsTrigger>
                <TabsTrigger value="risico">Risico Management</TabsTrigger>
                <TabsTrigger value="belastingen">Belgische Belastingen</TabsTrigger>
              </TabsList>

              <TabsContent value="performance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Performance Simulatie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={historicalData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="periode" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip 
                            formatter={(value: number, name: string) => [
                              name === 'portfolioWaarde' ? `€${Math.round(value).toLocaleString()}` : 
                              name === 'btcKoers' ? `€${Math.round(value).toLocaleString()}` :
                              `${value.toFixed(1)}%`,
                              name === 'portfolioWaarde' ? 'Portfolio Waarde' :
                              name === 'btcKoers' ? 'Bitcoin Koers' :
                              name === 'rendement' ? 'Rendement' : name
                            ]}
                            labelFormatter={(label) => `Maand ${label}`}
                          />
                          <Area yAxisId="left" type="monotone" dataKey="portfolioWaarde" fill="#8884d8" fillOpacity={0.3} />
                          <Line yAxisId="right" type="monotone" dataKey="btcKoers" stroke="#F7931A" strokeWidth={2} />
                          <Line yAxisId="right" type="monotone" dataKey="rendement" stroke="#82ca9d" strokeWidth={2} />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Asset</th>
                            <th className="text-right p-2">Investering</th>
                            <th className="text-right p-2">Tokens</th>
                            <th className="text-right p-2">Huidige Waarde</th>
                            <th className="text-right p-2">Staking Reward</th>
                            <th className="text-right p-2">Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cryptoMetrics.portfolioVerdeling.map((asset, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-2">
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="w-3 h-3 rounded-full" 
                                    style={{backgroundColor: asset.kleur}}
                                  ></div>
                                  <span className="font-medium">{asset.symbol}</span>
                                </div>
                              </td>
                              <td className="p-2 text-right">€{Math.round(asset.investering).toLocaleString()}</td>
                              <td className="p-2 text-right">{asset.aantalTokens.toFixed(asset.symbol === 'BTC' ? 4 : 2)}</td>
                              <td className="p-2 text-right">€{Math.round(asset.aantalTokens * asset.huidigeKoers).toLocaleString()}</td>
                              <td className="p-2 text-right">€{Math.round(asset.stakingReward).toLocaleString()}</td>
                              <td className="p-2 text-right">
                                <Badge variant="secondary" className="text-xs">
                                  {asset.type}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="defi" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>DeFi Yield Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {cryptoMetrics.defiOpportunities.map((opportunity, index) => (
                        <div key={index} className="border rounded p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">{opportunity.naam} ({opportunity.symbol})</h4>
                              <p className="text-sm text-muted-foreground">
                                Geschatte jaarlijkse inkomst: €{Math.round(opportunity.geschatteJaarInkomst).toLocaleString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-green-600">
                                {opportunity.apy.toFixed(1)}% APY
                              </div>
                              <Badge variant={
                                opportunity.risicoNiveau === 'Hoog' ? 'destructive' :
                                opportunity.risicoNiveau === 'Gemiddeld' ? 'default' : 'secondary'
                              }>
                                {opportunity.risicoNiveau} Risico
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Staking Strategieën</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Alert>
                        <AlertDescription>
                          🔒 <strong>Native Staking:</strong> Directe staking via validator nodes. 
                          Hoogste yields maar vereist technische kennis en lock-up periodes.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          🏦 <strong>Exchange Staking:</strong> Staking via exchanges zoals Binance, Kraken. 
                          Gemakkelijk maar lagere yields en tegenpartijrisico.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          💎 <strong>Liquid Staking:</strong> Tokens blijven verhandelbaar tijdens staking. 
                          Flexibiliteit maar vaak complexere smart contract risico's.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          ⚖️ <strong>DeFi Protocollen:</strong> Yield farming in DeFi protocollen. 
                          Hoge yields mogelijk maar significant smart contract en impermanent loss risico.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="risico" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Risico Management Strategieën</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {risicoStrategieën.map((strategie, index) => (
                        <div key={index} className="border rounded p-4">
                          <h4 className="font-semibold">{strategie.strategie}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{strategie.beschrijving}</p>
                          <div className="mt-2 text-sm">
                            <strong>Implementatie:</strong> {strategie.implementatie}
                          </div>
                          <div className="mt-1 flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Risico reductie</span>
                            <Badge variant={
                              strategie.risicoReductie === 'Hoog' ? 'default' : 'secondary'
                            }>
                              {strategie.risicoReductie}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Risico Analyse</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={cryptoAssets.map(asset => ({
                          naam: asset.symbol,
                          volatiliteit: asset.volatiliteit,
                          marktKap: Math.log10(asset.marktKap) * 10, // Log scale for better visualization
                          yield: asset.yield * 5, // Scale up for visibility
                          allocatie: asset.allocatie
                        }))}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="naam" />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} />
                          <Radar name="Volatiliteit" dataKey="volatiliteit" stroke="#ff7300" fill="#ff7300" fillOpacity={0.3} />
                          <Radar name="Marktkapitalisatie" dataKey="marktKap" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                          <Radar name="Yield (x5)" dataKey="yield" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="belastingen" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Belgische Crypto Belastingen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-green-700">{belgischeBelastingen.particulierBelegger.titel}</h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <strong>Kapitaalwinsten:</strong> {belgischeBelastingen.particulierBelegger.kapitaalWinsten}
                          </div>
                          <div>
                            <strong>Mining:</strong> {belgischeBelastingen.particulierBelegger.mining}
                          </div>
                          <div>
                            <strong>Trading:</strong> {belgischeBelastingen.particulierBelegger.trading}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-orange-700">{belgischeBelastingen.professioneleBelegger.titel}</h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <strong>Kapitaalwinsten:</strong> {belgischeBelastingen.professioneleBelegger.kapitaalWinsten}
                          </div>
                          <div>
                            <strong>Mining:</strong> {belgischeBelastingen.professioneleBelegger.mining}
                          </div>
                          <div>
                            <strong>Trading:</strong> {belgischeBelastingen.professioneleBelegger.trading}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Toekomstige Wetgeving</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {belgischeBelastingen.toekomstigeWetgeving.map((item, index) => (
                        <Alert key={index}>
                          <AlertDescription>
                            📋 {item}
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Belasting Optimalisatie Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Alert>
                        <AlertDescription>
                          📊 <strong>Portfolio tracking:</strong> Houd nauwkeurige records bij 
                          van alle transacties voor belastingdoeleinden.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          ⏰ <strong>HODL strategie:</strong> Lange termijn houden vermijdt 
                          classificatie als professionele handelaar.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          🏛️ <strong>Tax loss harvesting:</strong> Verkoop verlieslatende posities 
                          voor het jaar einde om winsten te compenseren.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          ⚖️ <strong>Professioneel advies:</strong> Raadpleeg een fiscalist 
                          bij complexe crypto transacties of hoge volumes.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Mid Ad */}
            <GoogleAdsense slot="rectangle" />
          </div>
        </div>
      </section>

      {/* Rate Comparison Widget */}
      <RateComparisonWidget productType="crypto-exchange" title="Vergelijk Crypto Exchanges" />

      {/* Bottom Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <GoogleAdsense slot="banner" className="w-full max-w-4xl mx-auto" />
      </section>

      <Footer />
    </div>
  );
}