// PDF-renderer voor de modelbrieven. Dit bestand wordt lazy geladen
// (import("./pdf-generator")) zodat jsPDF niet in de hoofdbundel zit.
import { jsPDF } from "jspdf";
import type { InterestBerekening } from "@shared/wettelijke-interest";
import { stelBriefOp } from "./brief-teksten";
import type { BriefGegevens, BriefInhoud } from "./types";

export interface GegenereerdePdf {
  bestandsnaam: string;
  bytes: ArrayBuffer;
  base64: string;
  paginas: number;
}

const PAGINA_BREEDTE = 210;
const PAGINA_HOOGTE = 297;
const MARGE_LINKS = 22;
const MARGE_RECHTS = 22;
const MARGE_BOVEN = 22;
const MARGE_ONDER = 28;
const TEKST_BREEDTE = PAGINA_BREEDTE - MARGE_LINKS - MARGE_RECHTS;
const REGEL = 5.2;
const KLEUR_TEKST: [number, number, number] = [20, 24, 32];
const KLEUR_GRIJS: [number, number, number] = [110, 116, 128];
const KLEUR_LIJN: [number, number, number] = [200, 204, 212];

class Renderer {
  readonly doc: jsPDF;
  y = MARGE_BOVEN;

  constructor() {
    this.doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
    this.doc.setFont("helvetica", "normal");
    this.doc.setTextColor(...KLEUR_TEKST);
  }

  private ruimteNodig(mm: number) {
    if (this.y + mm > PAGINA_HOOGTE - MARGE_ONDER) {
      this.doc.addPage();
      this.y = MARGE_BOVEN;
    }
  }

  regelsVan(tekst: string, breedte = TEKST_BREEDTE): string[] {
    return this.doc.splitTextToSize(tekst, breedte) as string[];
  }

  tekst(tekst: string, opties: { grootte?: number; vet?: boolean; grijs?: boolean; x?: number; breedte?: number } = {}) {
    const { grootte = 10.5, vet = false, grijs = false, x = MARGE_LINKS, breedte = TEKST_BREEDTE } = opties;
    this.doc.setFontSize(grootte);
    this.doc.setFont("helvetica", vet ? "bold" : "normal");
    this.doc.setTextColor(...(grijs ? KLEUR_GRIJS : KLEUR_TEKST));
    const regels = this.regelsVan(tekst, breedte);
    const hoogte = regels.length * REGEL * (grootte / 10.5);
    this.ruimteNodig(hoogte);
    this.doc.text(regels, x, this.y);
    this.y += hoogte;
    this.doc.setTextColor(...KLEUR_TEKST);
  }

  blok(regels: string[], opties: { grootte?: number; vet?: boolean; x?: number; breedte?: number } = {}) {
    for (const regel of regels) {
      if (regel === "") {
        this.spatie(REGEL);
        continue;
      }
      this.tekst(regel, opties);
    }
  }

  spatie(mm: number) {
    this.y += mm;
  }

  lijn() {
    this.ruimteNodig(2);
    this.doc.setDrawColor(...KLEUR_LIJN);
    this.doc.setLineWidth(0.3);
    this.doc.line(MARGE_LINKS, this.y, PAGINA_BREEDTE - MARGE_RECHTS, this.y);
    this.y += 3;
  }

  tabel(kolommen: [string, string, string, string], rijen: Array<[string, string, string, string]>) {
    const breedtes = [TEKST_BREEDTE * 0.4, TEKST_BREEDTE * 0.16, TEKST_BREEDTE * 0.2, TEKST_BREEDTE * 0.24];
    const uitlijning: Array<"left" | "right"> = ["left", "right", "right", "right"];
    const rijHoogte = 6.2;

    const kop = () => {
      this.ruimteNodig(rijHoogte * 2);
      this.doc.setFontSize(9.5);
      this.doc.setFont("helvetica", "bold");
      this.doc.setFillColor(240, 242, 246);
      this.doc.rect(MARGE_LINKS, this.y - 4.3, TEKST_BREEDTE, rijHoogte, "F");
      let x = MARGE_LINKS;
      kolommen.forEach((k, i) => {
        const tx = uitlijning[i] === "right" ? x + breedtes[i] - 1.5 : x + 1.5;
        this.doc.text(k, tx, this.y, { align: uitlijning[i] });
        x += breedtes[i];
      });
      this.y += rijHoogte;
    };

    kop();
    this.doc.setFont("helvetica", "normal");
    this.doc.setFontSize(9.5);
    rijen.forEach((rij, index) => {
      if (this.y + rijHoogte > PAGINA_HOOGTE - MARGE_ONDER) {
        this.doc.addPage();
        this.y = MARGE_BOVEN;
        kop();
        this.doc.setFont("helvetica", "normal");
        this.doc.setFontSize(9.5);
      }
      if (index % 2 === 1) {
        this.doc.setFillColor(249, 250, 252);
        this.doc.rect(MARGE_LINKS, this.y - 4.3, TEKST_BREEDTE, rijHoogte, "F");
      }
      let x = MARGE_LINKS;
      rij.forEach((cel, i) => {
        const tx = uitlijning[i] === "right" ? x + breedtes[i] - 1.5 : x + 1.5;
        this.doc.text(cel, tx, this.y, { align: uitlijning[i] });
        x += breedtes[i];
      });
      this.y += rijHoogte;
    });
    this.doc.setDrawColor(...KLEUR_LIJN);
    this.doc.line(MARGE_LINKS, this.y - 4.3, PAGINA_BREEDTE - MARGE_RECHTS, this.y - 4.3);
    this.y += 1;
  }

  totaalregel(label: string, bedrag: string, vet: boolean) {
    this.ruimteNodig(6.5);
    this.doc.setFontSize(vet ? 11 : 10);
    this.doc.setFont("helvetica", vet ? "bold" : "normal");
    this.doc.text(label, MARGE_LINKS + 1.5, this.y);
    this.doc.text(bedrag, PAGINA_BREEDTE - MARGE_RECHTS - 1.5, this.y, { align: "right" });
    this.y += 6.5;
  }

  voettekstOpElkePagina(regels: string[]) {
    const totaal = this.doc.getNumberOfPages();
    for (let p = 1; p <= totaal; p++) {
      this.doc.setPage(p);
      this.doc.setFontSize(7.5);
      this.doc.setFont("helvetica", "normal");
      this.doc.setTextColor(...KLEUR_GRIJS);
      const gesplitst = regels.flatMap((r) => this.regelsVan(r, TEKST_BREEDTE - 14));
      let y = PAGINA_HOOGTE - MARGE_ONDER + 8;
      this.doc.setDrawColor(...KLEUR_LIJN);
      this.doc.line(MARGE_LINKS, y - 4, PAGINA_BREEDTE - MARGE_RECHTS, y - 4);
      for (const regel of gesplitst) {
        this.doc.text(regel, MARGE_LINKS, y);
        y += 3.4;
      }
      this.doc.text(`${p}/${totaal}`, PAGINA_BREEDTE - MARGE_RECHTS, PAGINA_HOOGTE - MARGE_ONDER + 8, { align: "right" });
      this.doc.setTextColor(...KLEUR_TEKST);
    }
  }
}

function renderBrief(inhoud: BriefInhoud): jsPDF {
  const r = new Renderer();

  // Afzender (links) en geadresseerde (rechts, iets lager zoals in een vensterenvelop).
  r.blok(inhoud.afzender, { grootte: 10 });
  const naAfzender = r.y;
  r.y = Math.max(MARGE_BOVEN + 22, naAfzender + 6);
  const adresX = MARGE_LINKS + TEKST_BREEDTE * 0.52;
  r.blok(inhoud.geadresseerde, { grootte: 10.5, x: adresX, breedte: TEKST_BREEDTE * 0.48 });
  r.spatie(8);

  r.tekst(inhoud.plaatsDatum, { grootte: 10 });
  r.spatie(5);
  r.tekst(`Betreft: ${inhoud.betreft}`, { vet: true });
  r.spatie(5);
  r.tekst(inhoud.aanhef);
  r.spatie(3.5);
  for (const alinea of inhoud.alineas) {
    r.tekst(alinea);
    r.spatie(3.5);
  }
  r.spatie(2);
  r.blok(inhoud.slot);

  if (inhoud.bijlage) {
    r.doc.addPage();
    r.y = MARGE_BOVEN;
    r.tekst(inhoud.bijlage.titel, { grootte: 13, vet: true });
    r.spatie(2);
    r.tekst(`Bij ${inhoud.betreft.charAt(0).toLowerCase()}${inhoud.betreft.slice(1)}`, { grootte: 9.5, grijs: true });
    r.spatie(4);
    for (const intro of inhoud.bijlage.intro) {
      r.tekst(intro);
      r.spatie(3);
    }
    r.spatie(2);
    r.tabel(
      inhoud.bijlage.kolommen,
      inhoud.bijlage.rijen.map((rij) => [rij.periode, rij.dagen, rij.voet, rij.interest]),
    );
    r.spatie(4);
    for (const t of inhoud.bijlage.totalen) {
      if (t.vet) r.lijn();
      r.totaalregel(t.label, t.bedrag, Boolean(t.vet));
    }
    r.spatie(4);
    for (const noot of inhoud.bijlage.noten) {
      r.tekst(noot, { grootte: 9, grijs: true });
      r.spatie(2);
    }
  }

  r.voettekstOpElkePagina(inhoud.voettekst);
  return r.doc;
}

function naarBase64(bytes: ArrayBuffer): string {
  const view = new Uint8Array(bytes);
  if (typeof btoa === "function") {
    let binair = "";
    const stap = 0x8000;
    for (let i = 0; i < view.length; i += stap) {
      binair += String.fromCharCode.apply(null, Array.from(view.subarray(i, i + stap)));
    }
    return btoa(binair);
  }
  // Node (tests)
  return Buffer.from(view).toString("base64");
}

/** Genereert de PDF voor de gekozen brief; geeft bytes én base64 (voor de e-mailbijlage) terug. */
export async function genereerAanmaningPdf(gegevens: BriefGegevens, berekening: InterestBerekening): Promise<GegenereerdePdf> {
  const inhoud = stelBriefOp(gegevens, berekening);
  const doc = renderBrief(inhoud);
  doc.setProperties({
    title: inhoud.betreft,
    subject: "Modelbrief met interestberekening, gegenereerd op Interesten.be",
    author: gegevens.schuldeiser.naam || "Interesten.be",
    creator: "Interesten.be",
  });
  const bytes = doc.output("arraybuffer");
  return {
    bestandsnaam: inhoud.bestandsnaam,
    bytes,
    base64: naarBase64(bytes),
    paginas: doc.getNumberOfPages(),
  };
}

/** Start een download in de browser. */
export function downloadPdf(pdf: GegenereerdePdf) {
  const blob = new Blob([pdf.bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = pdf.bestandsnaam;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}
