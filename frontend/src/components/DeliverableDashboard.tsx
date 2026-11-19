import React, { useState } from "react";
import { 
  FileText, 
  HelpCircle, 
  Share2, 
  Copy, 
  Check, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Sparkles,
  ExternalLink
} from "lucide-react";

interface DeliverableDashboardProps {
  deliverable: {
    id: string;
    title: string;
    summary: {
      overview: string;
      keyPoints: string[];
      actionItems: string[];
    };
    concepts?: Array<{ term: string; definition: string }>;
    flashcards?: Array<{ question: string; answer: string; hint?: string }>;
    notebooklmExport: string;
    createdAt?: number;
  };
}

export const DeliverableDashboard: React.FC<DeliverableDashboardProps> = ({
  deliverable,
}) => {
  const [activeTab, setActiveTab] = useState<"summary" | "flashcards" | "notebooklm">("summary");
  const [copied, setCopied] = useState(false);

  // Estado para las Flashcards interactivas
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const flashcards = deliverable.flashcards || [];
  const currentCard = flashcards[cardIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(deliverable.notebooklmExport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMd = () => {
    const blob = new Blob([deliverable.notebooklmExport], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${deliverable.title.replace(/[^a-zA-Z0-9]/g, "_")}_NotebookLM.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden animate-in fade-in duration-300">
      {/* Cabecera del Entregable */}
      <div className="p-6 border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
                Entregable Generado
              </span>
              <span className="text-xs text-slate-400">OFG.ai Engine</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">{deliverable.title}</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copiado" : "Copiar Fuente"}</span>
            </button>
            <button
              onClick={handleDownloadMd}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold rounded-lg transition-colors border border-sky-200"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar .md</span>
            </button>
          </div>
        </div>

        {/* Pestañas de Navegación del Entregable */}
        <div className="flex gap-2 mt-6 border-b border-slate-200 -mb-6">
          <button
            onClick={() => setActiveTab("summary")}
            className={`flex items-center gap-2 pb-3 px-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === "summary"
                ? "border-sky-600 text-sky-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>1. Resumen & Glosario</span>
          </button>

          <button
            onClick={() => setActiveTab("flashcards")}
            className={`flex items-center gap-2 pb-3 px-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === "flashcards"
                ? "border-sky-600 text-sky-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>2. Mazo de Flashcards ({flashcards.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("notebooklm")}
            className={`flex items-center gap-2 pb-3 px-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === "notebooklm"
                ? "border-sky-600 text-sky-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>3. NotebookLM Bridge</span>
          </button>
        </div>
      </div>

      {/* Contenido de la Pestaña */}
      <div className="p-6">
        {/* PESTAÑA 1: RESUMEN Y GLOSARIO */}
        {activeTab === "summary" && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Resumen Ejecutivo
              </h4>
              <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {deliverable.summary.overview}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Puntos Clave y Conceptos Explicados
              </h4>
              <ul className="space-y-2">
                {deliverable.summary.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {deliverable.concepts && deliverable.concepts.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Glosario de Términos
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {deliverable.concepts.map((c, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                      <span className="font-bold text-xs text-sky-900 block mb-1">{c.term}</span>
                      <p className="text-xs text-slate-600 leading-relaxed">{c.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PESTAÑA 2: FLASHCARDS INTERACTIVAS */}
        {activeTab === "flashcards" && (
          <div className="max-w-xl mx-auto py-4 space-y-6">
            {flashcards.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-8">No se han generado flashcards para esta sesión.</p>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Tarjeta {cardIndex + 1} de {flashcards.length}</span>
                  <span className="text-sky-600">Haz clic en la tarjeta para voltearla</span>
                </div>

                {/* Tarjeta volteable 3D */}
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="cursor-pointer min-h-[220px] p-8 rounded-2xl border-2 border-dashed border-sky-300 bg-gradient-to-b from-sky-50/50 to-white flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
                >
                  {!isFlipped ? (
                    <div className="space-y-3">
                      <span className="px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 text-[11px] font-bold uppercase">
                        Pregunta
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900">
                        {currentCard.question}
                      </h4>
                      {currentCard.hint && (
                        <p className="text-xs text-slate-400 italic">Pista: {currentCard.hint}</p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase">
                        Respuesta
                      </span>
                      <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
                        {currentCard.answer}
                      </p>
                    </div>
                  )}
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Voltear tarjeta</span>
                  </div>
                </div>

                {/* Controles de navegación */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    disabled={cardIndex === 0}
                    onClick={() => {
                      setIsFlipped(false);
                      setCardIndex((prev) => Math.max(0, prev - 1));
                    }}
                    className="flex items-center gap-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Anterior</span>
                  </button>

                  <button
                    disabled={cardIndex === flashcards.length - 1}
                    onClick={() => {
                      setIsFlipped(false);
                      setCardIndex((prev) => Math.min(flashcards.length - 1, prev + 1));
                    }}
                    className="flex items-center gap-1 px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    <span>Siguiente</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* PESTAÑA 3: NOTEBOOKLM BRIDGE */}
        {activeTab === "notebooklm" && (
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-xs text-amber-900">¿Cómo usarlo con Google NotebookLM?</h5>
                <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                  Copia el contenido a continuación o descarga el archivo <code>.md</code>. Luego entra en{" "}
                  <a href="https://notebooklm.google.com" target="_blank" rel="noreferrer" className="underline font-bold inline-flex items-center gap-1">
                    NotebookLM <ExternalLink className="w-3 h-3" />
                  </a>{" "}
                  y añádelo como fuente (Source) para hacer preguntas, generar mapas conceptuales o crear podcasts explicativos de tu clase.
                </p>
              </div>
            </div>

            <div className="relative">
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto max-h-[350px] leading-relaxed">
                {deliverable.notebooklmExport}
              </pre>
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg border border-slate-700 transition-colors shadow-md"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "¡Copiado!" : "Copiar Markdown"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
