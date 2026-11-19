import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { GatekeeperModal } from "./components/GatekeeperModal";
import { LandingPage } from "./pages/LandingPage";
import { ClassRecorder } from "./components/ClassRecorder";
import { DeliverableDashboard } from "./components/DeliverableDashboard";
import { ArrowLeft, Layers } from "lucide-react";

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<"landing" | "workspace">("landing");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [currentDeliverable, setCurrentDeliverable] = useState<any | null>(null);

  // Almacenamiento seguro en sessionStorage durante la pestaña activa (NUNCA en localStorage)
  useEffect(() => {
    const savedToken = sessionStorage.getItem("ofg_session_token");
    const savedEmail = sessionStorage.getItem("ofg_session_email");
    if (savedToken && savedEmail) {
      setToken(savedToken);
      setUser({ email: savedEmail, role: "user" });
    }
  }, []);

  const handleLoginSuccess = (newToken: string, newUser: { email: string; role: string }) => {
    setToken(newToken);
    setUser(newUser);
    sessionStorage.setItem("ofg_session_token", newToken);
    sessionStorage.setItem("ofg_session_email", newUser.email);
    setCurrentView("workspace");
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem("ofg_session_token");
    sessionStorage.removeItem("ofg_session_email");
    setCurrentView("landing");
  };

  const handleStartApp = () => {
    if (user) {
      setCurrentView("workspace");
    } else {
      setIsLoginOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar
        user={user}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {currentView === "landing" ? (
          <LandingPage onStartApp={handleStartApp} />
        ) : (
          <div className="py-8 space-y-8 animate-in fade-in duration-200">
            {/* Cabecera del Workspace de Alumnos */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <button
                  onClick={() => setCurrentView("landing")}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Volver a la web principal</span>
                </button>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-slate-900">Laboratorio: ClassDigest AI</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
                    v1.0 Live
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Graba tu clase, procesa los apuntes con IA y genera entregables inmediatos para repasar.
                </p>
              </div>

              <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
                <Layers className="w-4 h-4 text-sky-600" />
                <span>Sesión activa: <strong className="text-slate-900">{user?.email}</strong></span>
              </div>
            </div>

            {/* Componente Grabador de Clase */}
            <ClassRecorder
              token={token || ""}
              onAnalysisComplete={(deliv) => {
                setCurrentDeliverable(deliv);
              }}
            />

            {/* Visualizador de Entregables Generados */}
            {currentDeliverable && (
              <div className="pt-4">
                <DeliverableDashboard deliverable={currentDeliverable} />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modal Portero (Autenticación OTP vía Brevo) */}
      <GatekeeperModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default App;
