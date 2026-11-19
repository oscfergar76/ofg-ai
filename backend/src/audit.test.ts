import { describe, it, expect } from "vitest";
import { calculateCostInCentsEur } from "./services/audit";
import { generate6DigitCode } from "./services/auth";

describe("Auditoría de IA y Cálculo de Costes", () => {
  it("debe calcular el coste en céntimos de euro correctamente", () => {
    // 1000 tokens prompt y 500 tokens completion
    const cost = calculateCostInCentsEur("gemini-1.5-flash", 1000, 500);
    expect(cost).toBeGreaterThan(0);
    expect(typeof cost).toBe("number");
  });

  it("debe retornar 0 céntimos si no hay tokens consumidos", () => {
    const cost = calculateCostInCentsEur("gemini-1.5-flash", 0, 0);
    expect(cost).toBe(0);
  });
});

describe("Seguridad y Portero OTP", () => {
  it("debe generar un código de exactamente 6 dígitos numéricos", () => {
    const code = generate6DigitCode();
    expect(code).toHaveLength(6);
    expect(/^\d{6}$/.test(code)).toBe(true);
  });
});

describe("Motor NotebookLM / Studio Suite Endpoint", () => {
  it("debe responder con la estructura de entregables completa", async () => {
    // Importación dinámica de la app de Hono
    const { default: app } = await import("./index");
    const res = await app.request("/api/engine/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: "Cádiz 1812 Constitución La Pepa",
        selectedKeys: ["podcast", "pdf", "flashcards"]
      })
    });

    expect(res.status).toBe(200);
    const data = await res.json() as any;
    expect(data.success).toBe(true);
    expect(data.podcast).toBeDefined();
    expect(data.podcast.audioUrl).toBe("/audio/podcast-notebooklm.m4a");
    expect(data.podcast.ready).toBe(true);
    expect(data.title).toContain("Cádiz");
  });
});
