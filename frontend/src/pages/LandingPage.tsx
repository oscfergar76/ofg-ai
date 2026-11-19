import React from "react";
import { 
  Sparkles, 
  Mic, 
  HelpCircle, 
  Share2, 
  ArrowRight, 
  GraduationCap, 
  Database,
  Lock
} from "lucide-react";

interface LandingPageProps {
  onStartApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartApp }) => {
  return (
    <div className="space-y-24 py-12">
      {/* HERO SECTION */}
      <section className="text-center max-w-4xl mx-auto px-4 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-semibold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Innovación Práctica • OFG.ai Studio</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
          Inteligencia Artificial para <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-600 to-indigo-600">Aprender y Automatizar</span> de Verdad
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Laboratorio de soluciones prácticas en IA y consultoría formativa. Ayudamos a estudiantes, docentes y comunidades a resolver necesidades reales sin teoría vacía.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onStartApp}
            className="flex items-center gap-2.5 px-6 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-600/25 transition-all active:scale-95"
          >
            <span>Probar Gratis: ClassDigest AI</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#servicios"
            className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-xl border border-slate-200 transition-all shadow-sm"
          >
            Ver Servicios & Formación
          </a>
        </div>

        {/* Badges de Garantía Técnica */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Acceso Seguro por Código OTP (Brevo)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Database className="w-4 h-4 text-sky-600" />
            <span>Arquitectura Cloudflare en la Nube</span>
          </div>
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>Enfoque Educativo y Social</span>
          </div>
        </div>
      </section>

      {/* LAS 3 HERRAMIENTAS INTEGRADAS DEL LABORATORIO */}
      <section className="max-w-6xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Herramientas Listas para Testear en el Laboratorio
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Acceso directo y gratuito para grupos de alumnos, academias y creadores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta 1: ClassDigest */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
              <Mic className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">1. ClassDigest AI</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Graba o pega el audio de tu clase. La IA transcribe la explicación del docente y genera un resumen ejecutivo con puntos clave y dudas resueltas.
            </p>
            <button
              onClick={onStartApp}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700"
            >
              <span>Abrir grabadora</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tarjeta 2: Flashcards Engine */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">2. Flashcards & Quiz Engine</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Convierte los apuntes en un mazo de preguntas interactivas. Voltea cada tarjeta para comprobar si dominas el tema antes del examen.
            </p>
            <button
              onClick={onStartApp}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700"
            >
              <span>Probar mazo interactivo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tarjeta 3: NotebookLM Bridge */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">3. NotebookLM Bridge</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Exporta la clase en formato estructurado de Markdown, optimizado para cargarse directamente en Google NotebookLM y generar podcasts o consultas.
            </p>
            <button
              onClick={onStartApp}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800"
            >
              <span>Ver exportación</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE SERVICIOS Y CONSULTORÍA */}
      <section id="servicios" className="max-w-6xl mx-auto px-4 space-y-12 pt-8 border-t border-slate-200">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">OFG.ai Studio</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Formación Práctica & Consultoría en IA
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            ¿Cómo ayudamos a colectivos, formadores y organizaciones?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
              01
            </div>
            <h4 className="font-bold text-slate-900">Masterclasses de Cosecha Propia</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Talleres 100% prácticos y adaptados. Demostramos cómo crear copilotos y automatizaciones paso a paso, sin tecnicismos innecesarios.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
              02
            </div>
            <h4 className="font-bold text-slate-900">Laboratorio Colaborativo</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Desarrollamos pilotos y aplicaciones a medida para resolver cuellos de botella reales en grupos de trabajo, asociaciones y centros de estudio.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
              03
            </div>
            <h4 className="font-bold text-slate-900">Arquitecturas Seguras</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Diseño de sistemas que protegen la privacidad de los datos, con control de acceso por código y auditoría de costes transparente.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 pt-8 text-center text-xs text-slate-400">
        <p>© 2026 OFG.ai Studio • Consultoría & Laboratorio de Inteligencia Artificial.</p>
        <p className="mt-1">Construido con arquitecturas en la nube de Cloudflare y verificación por código.</p>
      </footer>
    </div>
  );
};
