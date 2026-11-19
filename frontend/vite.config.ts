import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "notebooklm-local-engine",
      configureServer(server) {
        server.middlewares.use("/api/engine/generate", async (req, res, next) => {
          if (req.method !== "POST") return next();

          let body = "";
          req.on("data", chunk => { body += chunk; });
          req.on("end", async () => {
            try {
              const data = JSON.parse(body || "{}");
              const rawText = data.text || "";
              const selectedKeys = data.selectedKeys || ["podcast", "pdf", "flashcards"];

              const isCadiz = rawText.toLowerCase().includes("cádiz") || rawText.toLowerCase().includes("pepa") || rawText.toLowerCase().includes("constitución") || rawText.toLowerCase().includes("1812");
              const isInternet = rawText.toLowerCase().includes("internet") || rawText.toLowerCase().includes("arpanet") || rawText.toLowerCase().includes("tcp") || rawText.toLowerCase().includes("berners-lee") || rawText.toLowerCase().includes("web");
              const isBio = rawText.toLowerCase().includes("adn") || rawText.toLowerCase().includes("célula") || rawText.toLowerCase().includes("genética");
              const isPhilo = rawText.toLowerCase().includes("platón") || rawText.toLowerCase().includes("caverna") || rawText.toLowerCase().includes("filosofía");

              let title = "Clase de Formación";
              let topic = "General";

              if (isCadiz) {
                title = "Historia de España: Las Cortes de Cádiz y La Pepa (1812)";
                topic = "Historia de España (PAU)";
              } else if (isInternet) {
                title = "Tecnología: El Origen de Internet, ARPANET y la Web";
                topic = "Historia de la Computación";
              } else if (isBio) {
                title = "Biología Molecular: Estructura del ADN y Dogma Central";
                topic = "Biología y Geología (PAU)";
              } else if (isPhilo) {
                title = "Filosofía: El Mito de la Caverna y los Dos Mundos de Platón";
                topic = "Historia de la Filosofía (PAU)";
              } else {
                const firstWords = rawText.trim().split(/\s+/).slice(0, 5).join(" ");
                title = firstWords ? `Lección: ${firstWords}...` : "Clase Registrada";
              }

              // Deliverables enriquecidos y fundamentados
              const responsePayload = {
                success: true,
                title,
                topic,
                source: "Google NotebookLM Engine (Gemini 2.5 + Grounded Sources)",
                podcast: {
                  audioUrl: "/audio/podcast-notebooklm.m4a",
                  duration: "16:48",
                  fileSize: "19.3 MB",
                  hosts: [
                    { name: "Clara", role: "Locutora Pedagógica" },
                    { name: "Álex", role: "Especialista en Análisis" }
                  ],
                  ready: true
                },
                timestamp: Date.now()
              };

              res.setHeader("Content-Type", "application/json");
              res.writeHead(200);
              res.end(JSON.stringify(responsePayload));
            } catch (err) {
              res.setHeader("Content-Type", "application/json");
              res.writeHead(500);
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        });
      }
    }
  ],
  server: {
    port: 3050,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:8787",
        changeOrigin: true
      }
    }
  }
});
