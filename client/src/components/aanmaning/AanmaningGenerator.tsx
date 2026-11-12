import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SJABLOON_LABELS, sjablonenVoorRegime } from "@/lib/aanmaning/brief-teksten";
import type { BriefGegevens, BriefSjabloon } from "@/lib/aanmaning/types";
import {
  CONSUMENT_WACHTTERMIJN_DAGEN,
  type HerinneringKanaal,
  type InterestBerekening,
  type InterestRegime,
} from "@shared/wettelijke-interest";

type LeadType = "onderneming" | "zelfstandige" | "particulier";

interface Props {
  regime: InterestRegime;
  berekening: InterestBerekening | null;
}

type Status =
  | { fase: "idle" }
  | { fase: "bezig" }
  | { fase: "klaar"; bestandsnaam: string; email: "verzonden" | "niet-beschikbaar" | "mislukt" }
  | { fase: "fout"; melding: string };

function toISODate(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function parseISODate(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function AanmaningGenerator({ regime, berekening }: Props) {
  const sjablonen = useMemo(() => sjablonenVoorRegime(regime), [regime]);
  const [sjabloon, setSjabloon] = useState<BriefSjabloon | null>(sjablonen[0] ?? null);

  useEffect(() => {
    if (!sjabloon || !sjablonen.includes(sjabloon)) setSjabloon(sjablonen[0] ?? null);
  }, [sjablonen, sjabloon]);

  // Schuldeiser
  const [seNaam, setSeNaam] = useState("");
  const [seAdres, setSeAdres] = useState("");
  const [seKbo, setSeKbo] = useState("");
  const [seEmail, setSeEmail] = useState("");
  const [seTelefoon, setSeTelefoon] = useState("");
  // Schuldenaar
  const [snNaam, setSnNaam] = useState("");
  const [snAdres, setSnAdres] = useState("");
  // Factuur
  const [factuurnummer, setFactuurnummer] = useState("");
  const [factuurdatum, setFactuurdatum] = useState("");
  const [vervaldag, setVervaldag] = useState("");
  const [omschrijving, setOmschrijving] = useState("");
  const [iban, setIban] = useState("");
  const [termijnDagen, setTermijnDagen] = useState("8");
  const [kanaal, setKanaal] = useState<HerinneringKanaal>("elektronisch");
  const [verzonden, setVerzonden] = useState(() => toISODate(new Date()));
  // Lead
  const [leadEmail, setLeadEmail] = useState("");
  const [bedrijfsnaam, setBedrijfsnaam] = useState("");
  const [leadType, setLeadType] = useState<LeadType>(regime === "consument" ? "zelfstandige" : "onderneming");
  const [toestemming, setToestemming] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const [fouten, setFouten] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>({ fase: "idle" });

  // Vervaldag voorstellen: bij B2B is dat de dag vóór de startdatum van de interest.
  useEffect(() => {
    if (!berekening || vervaldag) return;
    if (regime === "handel") {
      const d = new Date(berekening.van);
      d.setDate(d.getDate() - 1);
      setVervaldag(toISODate(d));
    }
  }, [berekening, regime, vervaldag]);

  if (!berekening || berekening.dagen <= 0 || sjablonen.length === 0 || !sjabloon) return null;

  const isConsument = sjabloon === "consument-eerste-herinnering";
  const isIngebrekestelling = sjabloon === "b2b-ingebrekestelling";

  const valideer = (): string[] => {
    const f: string[] = [];
    if (!seNaam.trim()) f.push("Vul de naam van de schuldeiser (uw bedrijf) in.");
    if (!seAdres.trim()) f.push("Vul het adres van de schuldeiser in.");
    if (isConsument && !seKbo.trim()) f.push("Bij een consumentenherinnering is uw ondernemingsnummer verplicht (art. XIX.2 WER).");
    if (!snNaam.trim()) f.push("Vul de naam van de schuldenaar in.");
    if (!snAdres.trim()) f.push("Vul het adres van de schuldenaar in.");
    if (!factuurnummer.trim()) f.push("Vul het factuurnummer in.");
    if (!vervaldag || !parseISODate(vervaldag)) f.push("Vul de vervaldag van de factuur in.");
    if (isConsument && !omschrijving.trim()) f.push("Omschrijf het product of de dienst (verplicht in de eerste herinnering, art. XIX.2 WER).");
    if (!iban.trim()) f.push("Vul de betaalrekening (IBAN) in.");
    if (isIngebrekestelling && !(Number(termijnDagen) >= 1)) f.push("Geef een betaaltermijn van minstens 1 dag.");
    if (isConsument && !parseISODate(verzonden)) f.push("Vul de verzenddatum van de herinnering in.");
    if (!EMAIL_RE.test(leadEmail.trim())) f.push("Vul een geldig e-mailadres in om de PDF te ontvangen.");
    if (!toestemming) f.push("Vink de toestemming aan om de PDF per e-mail te ontvangen.");
    return f;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const f = valideer();
    setFouten(f);
    if (f.length > 0) return;
    if (honeypot) return; // bot

    setStatus({ fase: "bezig" });
    const gegevens: BriefGegevens = {
      sjabloon,
      schuldeiser: { naam: seNaam, adres: seAdres, ondernemingsnummer: seKbo, email: seEmail, telefoon: seTelefoon },
      schuldenaar: { naam: snNaam, adres: snAdres },
      factuurnummer,
      factuurdatum: parseISODate(factuurdatum),
      vervaldag: parseISODate(vervaldag),
      omschrijving,
      betaalrekening: iban,
      briefdatum: new Date(),
      termijnDagen: Number(termijnDagen) || 8,
      herinneringKanaal: kanaal,
      herinneringVerzonden: parseISODate(verzonden) ?? new Date(),
    };

    try {
      // jsPDF wordt pas hier geladen, zodat de hoofdbundel klein blijft.
      const { genereerAanmaningPdf, downloadPdf } = await import("@/lib/aanmaning/pdf-generator");
      const pdf = await genereerAanmaningPdf(gegevens, berekening);
      downloadPdf(pdf);

      let emailStatus: "verzonden" | "niet-beschikbaar" | "mislukt" = "mislukt";
      try {
        const res = await fetch("/api/aanmaning-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: leadEmail.trim(),
            bedrijfsnaam: bedrijfsnaam.trim(),
            type: leadType,
            sjabloon,
            regime,
            hoofdsom: berekening.hoofdsom,
            dagen: berekening.dagen,
            interest: Math.round(berekening.interest * 100) / 100,
            forfait: berekening.forfait,
            totaal: Math.round(berekening.totaal * 100) / 100,
            bestandsnaam: pdf.bestandsnaam,
            pdfBase64: pdf.base64,
            toestemming: true,
            website: honeypot,
          }),
        });
        if (res.ok) emailStatus = "verzonden";
        else if (res.status === 503) emailStatus = "niet-beschikbaar";
      } catch {
        emailStatus = "mislukt";
      }

      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", { lead_source: "aanmaning-pdf", sjabloon, regime, email_status: emailStatus });
      }
      setStatus({ fase: "klaar", bestandsnaam: pdf.bestandsnaam, email: emailStatus });
    } catch (error) {
      console.error("PDF genereren mislukt", error);
      setStatus({ fase: "fout", melding: "De PDF kon niet aangemaakt worden. Probeer het opnieuw of gebruik een andere browser." });
    }
  };

  return (
    <Card data-testid="card-aanmaning-generator">
      <CardHeader>
        <CardTitle className="text-2xl">
          <i className="fas fa-file-download mr-3 text-primary"></i>
          Download een aanmaning met deze berekening
        </CardTitle>
        <p className="text-muted-foreground">
          Vul de gegevens in en ontvang een kant-en-klare modelbrief (PDF) met de berekening per periode als bijlage. De
          brief gebruikt letterlijk de wettelijke voeten en vermeldingen van deze pagina.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} noValidate className="space-y-8">
          {/* Sjabloon */}
          <fieldset>
            <legend className="font-semibold mb-3">1. Kies de brief</legend>
            <div className="grid sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Briefsjabloon">
              {sjablonen.map((id) => (
                <Button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={sjabloon === id}
                  variant={sjabloon === id ? "default" : "outline"}
                  className="h-auto flex-col items-start text-left py-3 whitespace-normal"
                  onClick={() => setSjabloon(id)}
                  data-testid={`button-sjabloon-${id}`}
                >
                  <span className="font-semibold">{SJABLOON_LABELS[id].titel}</span>
                  <span className={`text-xs ${sjabloon === id ? "opacity-90" : "text-muted-foreground"}`}>
                    {SJABLOON_LABELS[id].toelichting}
                  </span>
                </Button>
              ))}
            </div>
            {isConsument && (
              <p className="text-xs text-muted-foreground mt-3">
                Deze brief rekent bewust geen kosten of interest aan. Ze vermeldt de wettelijke termijn van{" "}
                {CONSUMENT_WACHTTERMIJN_DAGEN} kalenderdagen, de startdatum ervan en het schadebeding uit uw algemene voorwaarden.
                De berekening hieronder gaat als indicatieve bijlage mee.
              </p>
            )}
          </fieldset>

          {/* Partijen */}
          <fieldset className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <legend className="font-semibold">2. Schuldeiser (u)</legend>
              <div>
                <Label htmlFor="se-naam">Naam of bedrijfsnaam *</Label>
                <Input id="se-naam" value={seNaam} onChange={(e) => setSeNaam(e.target.value)} autoComplete="organization" />
              </div>
              <div>
                <Label htmlFor="se-adres">Adres *</Label>
                <Textarea
                  id="se-adres"
                  rows={2}
                  value={seAdres}
                  onChange={(e) => setSeAdres(e.target.value)}
                  placeholder={"Straat en nummer\nPostcode Gemeente"}
                />
              </div>
              <div>
                <Label htmlFor="se-kbo">Ondernemingsnummer {isConsument ? "*" : ""}</Label>
                <Input id="se-kbo" value={seKbo} onChange={(e) => setSeKbo(e.target.value)} placeholder="0123.456.789" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="se-email">E-mail (op de brief)</Label>
                  <Input id="se-email" type="email" value={seEmail} onChange={(e) => setSeEmail(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="se-tel">Telefoon</Label>
                  <Input id="se-tel" type="tel" value={seTelefoon} onChange={(e) => setSeTelefoon(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-semibold">3. Schuldenaar</p>
              <div>
                <Label htmlFor="sn-naam">Naam of bedrijfsnaam *</Label>
                <Input id="sn-naam" value={snNaam} onChange={(e) => setSnNaam(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="sn-adres">Adres *</Label>
                <Textarea
                  id="sn-adres"
                  rows={2}
                  value={snAdres}
                  onChange={(e) => setSnAdres(e.target.value)}
                  placeholder={"Straat en nummer\nPostcode Gemeente"}
                />
              </div>
            </div>
          </fieldset>

          {/* Factuur */}
          <fieldset className="space-y-3">
            <legend className="font-semibold mb-1">4. Factuur en betaling</legend>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <Label htmlFor="factuurnummer">Factuurnummer *</Label>
                <Input id="factuurnummer" value={factuurnummer} onChange={(e) => setFactuurnummer(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="factuurdatum">Factuurdatum</Label>
                <Input id="factuurdatum" type="date" value={factuurdatum} onChange={(e) => setFactuurdatum(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="vervaldag">Vervaldag *</Label>
                <Input id="vervaldag" type="date" value={vervaldag} onChange={(e) => setVervaldag(e.target.value)} />
              </div>
            </div>
            {isConsument && (
              <div>
                <Label htmlFor="omschrijving">Product of dienst *</Label>
                <Input
                  id="omschrijving"
                  value={omschrijving}
                  onChange={(e) => setOmschrijving(e.target.value)}
                  placeholder="bv. levering en plaatsing keuken, maart 2026"
                />
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="iban">Betaalrekening (IBAN) *</Label>
                <Input id="iban" value={iban} onChange={(e) => setIban(e.target.value)} placeholder="BE00 0000 0000 0000" />
              </div>
              {isIngebrekestelling && (
                <div>
                  <Label htmlFor="termijn">Betaaltermijn (kalenderdagen) *</Label>
                  <Input id="termijn" type="number" min={1} max={60} value={termijnDagen} onChange={(e) => setTermijnDagen(e.target.value)} />
                </div>
              )}
              {isConsument && (
                <div className="space-y-2">
                  <Label>Verzending van de herinnering *</Label>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="kanaal" checked={kanaal === "elektronisch"} onChange={() => setKanaal("elektronisch")} />
                      per e-mail
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="kanaal" checked={kanaal === "post"} onChange={() => setKanaal("post")} />
                      per post
                    </label>
                  </div>
                  <Input type="date" aria-label="Verzenddatum" value={verzonden} onChange={(e) => setVerzonden(e.target.value)} />
                  <p className="text-xs text-muted-foreground">
                    De termijn van {CONSUMENT_WACHTTERMIJN_DAGEN} dagen start de dag na een e-mail, of de derde werkdag na verzending per post.
                  </p>
                </div>
              )}
            </div>
          </fieldset>

          {/* Lead */}
          <fieldset className="rounded-lg border border-border bg-muted/40 p-4 space-y-3">
            <legend className="font-semibold px-1">5. Waar mogen we de PDF naartoe sturen?</legend>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <Label htmlFor="lead-email">Uw e-mailadres *</Label>
                <Input
                  id="lead-email"
                  type="email"
                  autoComplete="email"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  data-testid="input-lead-email"
                />
              </div>
              <div>
                <Label htmlFor="lead-bedrijf">Bedrijfsnaam</Label>
                <Input id="lead-bedrijf" value={bedrijfsnaam} onChange={(e) => setBedrijfsnaam(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="lead-type">U bent</Label>
                <Select value={leadType} onValueChange={(v) => setLeadType(v as LeadType)}>
                  <SelectTrigger id="lead-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="onderneming">Onderneming (vennootschap)</SelectItem>
                    <SelectItem value="zelfstandige">Zelfstandige / eenmanszaak</SelectItem>
                    <SelectItem value="particulier">Particulier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Honeypot: onzichtbaar voor mensen */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </div>
            <label className="flex items-start gap-3 text-sm cursor-pointer">
              <Checkbox
                checked={toestemming}
                onCheckedChange={(v) => setToestemming(v === true)}
                className="mt-0.5"
                data-testid="checkbox-toestemming"
              />
              <span>
                Stuur mij de PDF per e-mail en houd mij op de hoogte met enkele praktische e-mails over onbetaalde facturen
                (max. 3, uitschrijven kan in elke e-mail). Ik las het{" "}
                <a href="/privacybeleid" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  privacybeleid
                </a>
                . *
              </span>
            </label>
          </fieldset>

          {fouten.length > 0 && (
            <div className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm" role="alert">
              <p className="font-semibold mb-1">Nog even nakijken:</p>
              <ul className="list-disc pl-5 space-y-0.5">
                {fouten.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Button type="submit" size="lg" disabled={status.fase === "bezig"} data-testid="button-genereer-pdf">
              {status.fase === "bezig" ? "PDF wordt aangemaakt…" : "PDF aanmaken en downloaden"}
            </Button>
            <p className="text-xs text-muted-foreground">
              Gratis, zonder account. Interesten.be is een uitgave van Bart Deblock (Hazier). De PDF is een model, geen
              juridisch advies.
            </p>
          </div>

          {status.fase === "klaar" && (
            <div className="rounded-md border border-border bg-primary/5 p-4 text-sm space-y-1" role="status" data-testid="status-pdf-klaar">
              <p className="font-semibold">
                Uw PDF <span className="font-mono">{status.bestandsnaam}</span> is gedownload.
              </p>
              {status.email === "verzonden" && <p>We hebben ze ook gemaild naar {leadEmail.trim()}.</p>}
              {status.email === "niet-beschikbaar" && (
                <p className="text-muted-foreground">
                  E-mail versturen is op dit moment niet beschikbaar; de download hierboven is volledig.
                </p>
              )}
              {status.email === "mislukt" && (
                <p className="text-muted-foreground">
                  De e-mail kon niet verstuurd worden, maar uw download is volledig. Probeer het later opnieuw als u ze ook per
                  mail wilt.
                </p>
              )}
            </div>
          )}
          {status.fase === "fout" && (
            <div className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm" role="alert">
              {status.melding}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
