export interface AuditParams {
  userId?: string;
  model: string;
  feature: string;
  promptTokens: number;
  completionTokens: number;
}

// Coste estimado en céntimos de Euro (€)
// Ejemplo para modelos ligeros y rápidos (tipo Gemini 1.5/2.0 Flash):
// Input: ~$0.075 por millón (~0.000075$ / 1k tokens)
// Output: ~$0.30 por millón (~0.00030$ / 1k tokens)
// Conversión USD a EUR aprox 0.95 -> en céntimos (* 100):
export function calculateCostInCentsEur(model: string, promptTokens: number, completionTokens: number): number {
  const EUR_USD_RATE = 0.95;
  
  // Coste en dólares
  const inputCostUSD = (promptTokens / 1_000_000) * 0.075;
  const outputCostUSD = (completionTokens / 1_000_000) * 0.30;
  const totalUSD = inputCostUSD + outputCostUSD;
  
  // Céntimos de euro (EUR * 100)
  const totalCentsEUR = totalUSD * EUR_USD_RATE * 100;
  
  // Redondear con precisión de 4 decimales para microconsumos
  return Math.round(totalCentsEUR * 10000) / 10000;
}

export async function logAiUsage(db: D1Database, params: AuditParams): Promise<void> {
  const id = crypto.randomUUID();
  const totalTokens = params.promptTokens + params.completionTokens;
  const costCentsEur = calculateCostInCentsEur(params.model, params.promptTokens, params.completionTokens);
  const now = Date.now();

  // Validar si el userId existe en users para no violar la Foreign Key en D1
  let validUserId: string | null = null;
  if (params.userId && typeof params.userId === "string") {
    try {
      const userExists = await db.prepare("SELECT id FROM users WHERE id = ?").bind(params.userId).first();
      if (userExists) {
        validUserId = params.userId;
      }
    } catch {
      validUserId = null;
    }
  }

  await db.prepare(`
    INSERT INTO ai_audit_logs (id, user_id, model, feature, prompt_tokens, completion_tokens, total_tokens, cost_cents_eur, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    id,
    validUserId,
    params.model,
    params.feature,
    params.promptTokens,
    params.completionTokens,
    totalTokens,
    costCentsEur,
    now
  ).run();
}
