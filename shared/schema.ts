import { z } from "zod";

// Spaarrente calculation schema
export const spaarrenteCalculationSchema = z.object({
  startbedrag: z.number().min(0, "Startbedrag moet positief zijn"),
  storting: z.number().min(0, "Storting moet positief zijn").optional(),
  stortingFrequentie: z.enum(["maandelijks", "jaarlijks", "geen"]),
  rente: z.number().min(0, "Rente moet positief zijn").max(100, "Rente kan niet meer dan 100% zijn"),
  looptijd: z.number().min(1, "Looptijd moet minimaal 1 jaar zijn").max(100, "Looptijd kan niet meer dan 100 jaar zijn"),
  kapitalisatie: z.boolean(),
});

// Samengestelde rente calculation schema  
export const samengesteldeRenteSchema = z.object({
  kapitaal: z.number().min(0, "Kapitaal moet positief zijn"),
  rendement: z.number().min(0, "Rendement moet positief zijn").max(100, "Rendement kan niet meer dan 100% zijn"),
  termijn: z.number().min(1, "Termijn moet minimaal 1 jaar zijn").max(100, "Termijn kan niet meer dan 100 jaar zijn"),
  frequentie: z.number().min(1, "Frequentie moet minimaal 1 zijn"),
});

// Hypotheek calculation schema
export const hypotheekCalculationSchema = z.object({
  leningsbedrag: z.number().min(0, "Leningsbedrag moet positief zijn"),
  looptijd: z.number().min(1, "Looptijd moet minimaal 1 jaar zijn").max(50, "Looptijd kan niet meer dan 50 jaar zijn"),
  rentevoet: z.number().min(0, "Rentevoet moet positief zijn").max(100, "Rentevoet kan niet meer dan 100% zijn"),
  rentetype: z.enum(["vast", "variabel"]),
  herzieningsfrequentie: z.string().optional(),
  maximaleStijging: z.number().optional(),
  notariskosten: z.number().min(0, "Notariskosten moet positief zijn").optional(),
});

export type SpaarrenteCalculation = z.infer<typeof spaarrenteCalculationSchema>;
export type SamengesteldeRenteCalculation = z.infer<typeof samengesteldeRenteSchema>;
export type HypotheekCalculation = z.infer<typeof hypotheekCalculationSchema>;
