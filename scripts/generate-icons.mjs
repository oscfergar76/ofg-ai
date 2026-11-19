import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const patchrightPath = "C:/Users/oscfe/AppData/Local/npm-cache/_npx/0d29dd9f4e472da9/node_modules/patchright/index.mjs";
const { chromium } = await import(pathToFileURL(patchrightPath).href);

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
  });
  const page = await browser.newPage();
  
  const svgPath = path.resolve("frontend/public/icons/icon.svg");
  const svgContent = fs.readFileSync(svgPath, "utf8");
  
  await page.setContent(`<!DOCTYPE html><html><body style="margin:0;padding:0;display:flex;align-items:center;justify-content:center;background:#051424;">${svgContent}</body></html>`);
  
  // 512x512
  await page.setViewportSize({ width: 512, height: 512 });
  const svg512 = await page.$("svg");
  if (svg512) {
    await svg512.screenshot({ path: "frontend/public/icons/icon-512.png" });
  }

  // 192x192
  await page.setViewportSize({ width: 192, height: 192 });
  const svg192 = await page.$("svg");
  if (svg192) {
    await svg192.screenshot({ path: "frontend/public/icons/icon-192.png" });
  }

  await browser.close();
  console.log("Iconos PNG generados exitosamente en frontend/public/icons/");
}

main().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
