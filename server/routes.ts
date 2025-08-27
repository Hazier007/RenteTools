import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { 
  spaarrenteCalculationSchema, 
  samengesteldeRenteSchema, 
  hypotheekCalculationSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Spaarrente calculation endpoint
  app.post("/api/calculate/spaarrente", async (req, res) => {
    try {
      const data = spaarrenteCalculationSchema.parse(req.body);
      
      // Calculation logic would be implemented here
      // For now, return a simple response
      const result = {
        eindbedrag: data.startbedrag * Math.pow(1 + data.rente / 100, data.looptijd),
        totaleInterest: 0,
        inbreng: data.startbedrag,
        yearlyBreakdown: []
      };
      
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: "Invalid input data" });
    }
  });

  // Samengestelde rente calculation endpoint
  app.post("/api/calculate/samengestelde-rente", async (req, res) => {
    try {
      const data = samengesteldeRenteSchema.parse(req.body);
      
      const samengesteld = data.kapitaal * Math.pow(1 + data.rendement / 100 / data.frequentie, data.frequentie * data.termijn);
      const enkelvoudig = data.kapitaal + (data.kapitaal * data.rendement / 100 * data.termijn);
      
      const result = {
        samengesteld,
        enkelvoudig,
        verschil: samengesteld - enkelvoudig,
        comparison: []
      };
      
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: "Invalid input data" });
    }
  });

  // Hypotheek calculation endpoint
  app.post("/api/calculate/hypotheek", async (req, res) => {
    try {
      const data = hypotheekCalculationSchema.parse(req.body);
      
      const maandRente = data.rentevoet / 100 / 12;
      const aantalMaanden = data.looptijd * 12;
      
      const maandelijksBedrag = (data.leningsbedrag * maandRente * Math.pow(1 + maandRente, aantalMaanden)) / 
                               (Math.pow(1 + maandRente, aantalMaanden) - 1);
      
      const result = {
        maandelijksBedrag,
        totaalBetaald: maandelijksBedrag * aantalMaanden,
        totaleInterest: (maandelijksBedrag * aantalMaanden) - data.leningsbedrag,
        kapitaalDeel: 0,
        interestDeel: 0,
        kapitaalPercentage: 0,
        interestPercentage: 0
      };
      
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: "Invalid input data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
