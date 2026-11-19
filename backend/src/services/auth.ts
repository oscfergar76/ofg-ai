export interface AuthEnv {
  DB: D1Database;
  BREVO_API_KEY: string;
  BREVO_SENDER_EMAIL: string;
  BREVO_SENDER_NAME: string;
}

export function generate6DigitCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOtpEmail(env: AuthEnv, email: string, code: string): Promise<boolean> {
  const payload = {
    sender: {
      name: env.BREVO_SENDER_NAME || "OFG.ai Studio",
      email: env.BREVO_SENDER_EMAIL || "no-reply@ofg.ai"
    },
    to: [{ email }],
    subject: `Tu código de acceso a OFG.ai Studio: ${code}`,
    htmlContent: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
        <h2 style="color: #0f172a; margin-top: 0;">OFG.ai Studio</h2>
        <p style="color: #475569; font-size: 15px; line-height: 1.5;">Hola,</p>
        <p style="color: #475569; font-size: 15px; line-height: 1.5;">Has solicitado acceder a las herramientas y demostraciones de <strong>OFG.ai Studio</strong>. Introduce el siguiente código de 6 dígitos en la aplicación:</p>
        <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; text-align: center; padding: 18px; margin: 24px 0;">
          <span style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #0284c7;">${code}</span>
        </div>
        <p style="color: #94a3b8; font-size: 13px;">Este código caduca en 10 minutos. Si no has solicitado este acceso, puedes ignorar este correo.</p>
        <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 24px 0;" />
        <p style="color: #94a3b8; font-size: 11px; text-align: center;">OFG.ai Studio • Consultoría e Innovación Práctica en IA</p>
      </div>
    `
  };

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "api-key": env.BREVO_API_KEY,
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return response.ok;
}

export async function requestLoginCode(env: AuthEnv, email: string): Promise<{ success: boolean; message: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const code = generate6DigitCode();
  const now = Date.now();
  const expiresAt = now + 10 * 60 * 1000; // 10 minutos

  // Guardar en D1
  const id = crypto.randomUUID();
  await env.DB.prepare(`
    INSERT INTO auth_codes (id, email, code, expires_at, used, created_at)
    VALUES (?, ?, ?, ?, 0, ?)
  `).bind(id, cleanEmail, code, expiresAt, now).run();

  // Enviar por Brevo
  const sent = await sendOtpEmail(env, cleanEmail, code);
  if (!sent) {
    // Si la clave de Brevo es de test o falla, loguear para depuración local
    console.warn(`[AUTH] No se pudo enviar por Brevo o falta API Key. Código local de prueba para ${cleanEmail}: ${code}`);
  }

  return { success: true, message: "Código enviado a tu correo" };
}

export async function verifyLoginCode(env: AuthEnv, email: string, code: string): Promise<{ success: boolean; token?: string; user?: any; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanCode = code.trim();
  const now = Date.now();

  // Buscar código no usado y no expirado
  const record = await env.DB.prepare(`
    SELECT * FROM auth_codes 
    WHERE email = ? AND code = ? AND used = 0 AND expires_at > ?
    ORDER BY created_at DESC LIMIT 1
  `).bind(cleanEmail, cleanCode, now).first();

  if (!record) {
    return { success: false, error: "Código incorrecto o expirado" };
  }

  // Marcar como usado
  await env.DB.prepare(`UPDATE auth_codes SET used = 1 WHERE id = ?`).bind(record.id).run();

  // Crear o recuperar usuario
  let user = await env.DB.prepare(`SELECT * FROM users WHERE email = ?`).bind(cleanEmail).first();
  if (!user) {
    const userId = crypto.randomUUID();
    await env.DB.prepare(`
      INSERT INTO users (id, email, role, created_at)
      VALUES (?, ?, 'user', ?)
    `).bind(userId, cleanEmail, now).run();
    user = { id: userId, email: cleanEmail, role: 'user', created_at: now };
  }

  // Crear sesión de 30 días
  const sessionToken = crypto.randomUUID() + "-" + crypto.randomUUID();
  const sessionExpiresAt = now + 30 * 24 * 60 * 60 * 1000;
  await env.DB.prepare(`
    INSERT INTO sessions (id, user_id, token, expires_at, created_at)
    VALUES (?, ?, ?, ?, ?)
  `).bind(crypto.randomUUID(), user.id, sessionToken, sessionExpiresAt, now).run();

  return {
    success: true,
    token: sessionToken,
    user: { id: user.id, email: user.email, role: user.role }
  };
}

export async function authenticateSession(env: { DB: D1Database }, token: string): Promise<any | null> {
  const now = Date.now();
  const session = await env.DB.prepare(`
    SELECT s.user_id, u.email, u.role
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.token = ? AND s.expires_at > ?
  `).bind(token, now).first();

  return session || null;
}
