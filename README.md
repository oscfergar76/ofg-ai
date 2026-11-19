# 🚀 OFG.ai Studio • Consultoría & Laboratorio de Inteligencia Artificial

Plataforma oficial de **OFG.ai Studio**, diseñada con un enfoque dual:
1. **Marca & Consultoría:** Presentación de servicios formativos y consultoría de IA aplicada.
2. **Laboratorio Práctico Educativo:** Acceso para alumnos, asociaciones y colectivos para probar herramientas funcionales (ClassDigest AI, Flashcards Engine y exportación estructurada para Google NotebookLM).

---

## 🏗️ Arquitectura del Sistema

* **Frontend:** Single Page Application construida con React + Vite + Tailwind CSS. Diseñada modularmente para recibir componentes importados desde **Google Stitch**.
* **Backend:** Cloudflare Workers con TypeScript y enrutador Hono.
* **Base de Datos:** Cloudflare D1 (SQLite en el Edge).
* **Seguridad (El Portero):** Acceso sin contraseñas mediante código OTP de 6 dígitos enviado por correo con **Brevo**.
* **Auditoría de IA:** Registro de cada interacción, contando tokens (prompt/completion) y calculando el coste estimado en céntimos de euro (€).
* **Persistencia Segura:** Cumplimiento estricto de la política de no almacenar datos de empresa en `localStorage`.

---

## 📁 Estructura del Repositorio

```
ofg-ai/
├── backend/
│   ├── src/
│   │   ├── db/schema.sql       # Esquema D1 (users, auth_codes, sessions, deliverables, ai_audit_logs)
│   │   ├── services/
│   │   │   ├── auth.ts         # Portero OTP con Brevo
│   │   │   ├── ai.ts           # Motor de análisis pedagógico y entregables
│   │   │   └── audit.ts        # Cálculo de tokens y céntimos de €
│   │   └── index.ts            # Enrutador API y middleware de autenticación
│   ├── wrangler.toml           # Configuración de Cloudflare Workers & D1
│   └── .dev.vars.example       # Plantilla de secretos (excluido en .gitignore)
├── frontend/
│   ├── src/
│   │   ├── components/         # Navbar, GatekeeperModal, ClassRecorder, DeliverableDashboard
│   │   ├── pages/              # LandingPage
│   │   ├── App.tsx             # Estado de aplicación y vistas
│   │   └── main.tsx
│   ├── index.html
│   └── vite.config.ts
├── .gitignore
└── README.md
```

---

## ⚡ Comandos de Desarrollo

### 1. Backend (Cloudflare Worker)
```bash
cd backend
npm install
npm run dev
```

### 2. Frontend (Vite)
```bash
cd frontend
npm install
npm run dev
```
