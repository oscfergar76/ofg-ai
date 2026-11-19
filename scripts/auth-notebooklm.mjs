import { pathToFileURL } from "node:url";

const modulePath = "C:/Users/oscfe/AppData/Local/npm-cache/_npx/0d29dd9f4e472da9/node_modules/notebooklm-mcp/dist/auth/auth-manager.js";
const { AuthManager } = await import(pathToFileURL(modulePath).href);

async function main() {
  console.log("Iniciando configurador de autenticacion de NotebookLM...");
  const auth = new AuthManager();
  
  const success = await auth.performSetup(async (msg, step, total) => {
    console.log(`[AUTH ${step}/${total}] ${msg}`);
  }, true);

  if (success) {
    console.log("¡AUTENTICACION COMPLETADA CON EXITO!");
    process.exit(0);
  } else {
    console.error("Fallo la autenticacion.");
    process.exit(1);
  }
}

main().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
