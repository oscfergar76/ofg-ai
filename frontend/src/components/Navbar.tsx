import React from "react";
import { Sparkles, Shield, User, LogOut } from "lucide-react";

interface NavbarProps {
  user: { email: string; role: string } | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  currentView: "landing" | "workspace";
  setCurrentView: (view: "landing" | "workspace") => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenLogin,
  onLogout,
  currentView,
  setCurrentView,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => setCurrentView("landing")}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 font-black text-xl">
            O
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">OFG.ai</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-700">Studio</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Applied AI & Learning Lab</p>
          </div>
        </div>

        <nav className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setCurrentView("landing")}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              currentView === "landing"
                ? "text-sky-700 bg-sky-50"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            Inicio & Servicios
          </button>

          <button
            onClick={() => {
              if (user) {
                setCurrentView("workspace");
              } else {
                onOpenLogin();
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              currentView === "workspace"
                ? "text-sky-700 bg-sky-50"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span>App: ClassDigest</span>
          </button>

          <div className="h-5 w-[1px] bg-slate-200 mx-1 hidden sm:block" />

          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-700">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span className="max-w-[120px] truncate">{user.email}</span>
              </div>
              <button
                onClick={onLogout}
                title="Cerrar sesión"
                className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-all shadow-slate-900/10 active:scale-95"
            >
              <Shield className="w-4 h-4 text-sky-400" />
              <span>Acceso Alumnos</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};
