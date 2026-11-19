import React, { useState, useRef, useEffect } from "react";
import { Mic, Square, Sparkles, Loader2, Volume2 } from "lucide-react";

interface ClassRecorderProps {
  token: string;
  onAnalysisComplete: (deliverable: any) => void;
}

export const ClassRecorder: React.FC<ClassRecorderProps> = ({
  token,
  onAnalysisComplete,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("Sesión: Introducción a Redes Neuronales y LLMs");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  // Muestras predeterminadas para que cualquier alumno pueda testear con 1 clic
  const loadPreset = (type: "ai" | "history" | "math") => {
    if (type === "ai") {
      setTitle("Clase de IA: ¿Cómo aprende un Modelo de Lenguaje?");
      setContent(`Profesor: Bienvenidos a la clase de hoy. Vamos a entender cómo funciona un LLM por dentro. No son magia, son modelos estadísticos que predicen la siguiente palabra más probable o token.
      
El concepto fundamental es el 'Transformer', introducido por Google en 2017. Lo revolucionario de esta arquitectura es el mecanismo de 'Atención' (Self-Attention). A diferencia de las redes recurrentes antiguas que leían palabra por palabra de izquierda a derecha, la atención permite al modelo conectar cualquier palabra de la frase con todas las demás simultáneamente.

Por ejemplo, si decimos: 'El perro cruzó la calle porque estaba cansado', el modelo sabe que 'cansado' se refiere al perro y no a la calle gracias a las matrices de atención.

Para el examen de la semana que viene, es imprescindible que dominéis:
1. Qué es un token y cómo se diferencia de una palabra.
2. La diferencia entre Pre-entrenamiento masivo y Fine-Tuning.
3. El papel del RLHF (Aprendizaje por refuerzo con feedback humano) para alinear las respuestas.`);
    } else if (type === "history") {
      setTitle("Historia: Causas y Consecuencias de la Revolución Industrial");
      setContent(`Profesor: Hoy iniciamos el bloque de la Revolución Industrial en la Inglaterra del siglo XVIII.
      
Tres factores convergieron para que ocurriera allí:
Primero, la revolución agrícola británica que liberó mano de obra y aumentó la producción de alimentos.
Segundo, los yacimientos abundantes de carbón y hierro junto a una red de canales navegables.
Tercero, la invención de la máquina de vapor perfeccionada por James Watt en 1769, que transformó el sector textil y la minería.

Consecuencias clave: el éxodo rural hacia las ciudades, el surgimiento del proletariado industrial y la necesidad de nuevas leyes laborales. Para la próxima sesión, leed los capítulos 3 y 4 del manual.`);
    } else {
      setTitle("Matemáticas: Introducción a las Derivadas y Tasas de Variación");
      setContent(`Profesor: La derivada no es más que la pendiente de la recta tangente a una curva en un punto exacto, es decir, la tasa de cambio instantánea.
      
Si una función posición mide los kilómetros recorridos en un tiempo t, su derivada es la velocidad instantánea. Si volvemos a derivar, obtenemos la aceleración.
La definición formal se basa en el límite cuando h tiende a cero de (f(x+h) - f(x)) / h. Recordad aplicar siempre la regla de la cadena cuando tengáis funciones compuestas.`);
    }
  };

  useEffect(() => {
    // Cargar muestra inicial por defecto para experiencia inmediata
    loadPreset("ai");
  }, []);

  const startRecording = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      setError("No se pudo acceder al micrófono. Puedes usar las muestras o escribir directamente tus apuntes.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const handleProcess = async () => {
    if (!content.trim()) {
      setError("Por favor, introduce apuntes o transcribe la clase antes de procesar.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/classes/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          content,
          audioDurationSeconds: recordSeconds
        })
      });

      const data = await res.json() as any;
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Error al procesar la clase");
      }

      onAnalysisComplete(data.deliverable);
    } catch (err: any) {
      setError(err.message || "Fallo durante el procesamiento de la clase");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
      {/* Selector de Presets de Prueba Rápida */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-sky-50/70 border border-sky-100 rounded-xl">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-600" />
          <span className="text-xs font-bold text-sky-900">Demostraciones listas para probar:</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => loadPreset("ai")}
            className="px-2.5 py-1 text-xs font-semibold bg-white hover:bg-sky-100/50 text-sky-700 rounded-lg border border-sky-200 transition-colors"
          >
            Clase de IA
          </button>
          <button
            onClick={() => loadPreset("history")}
            className="px-2.5 py-1 text-xs font-semibold bg-white hover:bg-sky-100/50 text-sky-700 rounded-lg border border-sky-200 transition-colors"
          >
            Clase de Historia
          </button>
          <button
            onClick={() => loadPreset("math")}
            className="px-2.5 py-1 text-xs font-semibold bg-white hover:bg-sky-100/50 text-sky-700 rounded-lg border border-sky-200 transition-colors"
          >
            Matemáticas
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
          {error}
        </div>
      )}

      {/* Controles de Grabación de Audio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-4 bg-slate-50 border border-slate-200 rounded-xl">
        <div>
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-sky-600" />
            Grabación en Vivo de la Sesión
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Graba al profesor desde tu dispositivo o sube notas de audio
          </p>
        </div>

        <div className="flex items-center justify-end gap-3">
          {isRecording ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-100 text-rose-700 font-mono text-sm font-bold rounded-lg animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                {formatTime(recordSeconds)}
              </div>
              <button
                onClick={stopRecording}
                className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-rose-600/20"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Detener</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {audioUrl && (
                <audio controls src={audioUrl} className="h-9 max-w-[200px]" />
              )}
              <button
                onClick={startRecording}
                className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-sky-600/20 active:scale-95"
              >
                <Mic className="w-4 h-4" />
                <span>{audioUrl ? "Grabar de nuevo" : "Grabar Audio"}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Editor de Título y Notas */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Título de la Sesión o Asignatura
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Transcripción / Notas de la Clase
            </label>
            <span className="text-[11px] text-slate-400">
              {content.length} caracteres
            </span>
          </div>
          <textarea
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Pega aquí los apuntes de la clase o deja que la grabación los analice..."
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 leading-relaxed font-mono focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
          />
        </div>
      </div>

      {/* Botón de Ejecución IA */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleProcess}
          disabled={loading || !content.trim()}
          className="flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-600/25 transition-all disabled:opacity-50 active:scale-95"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analizando con IA y Generando Entregables...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generar Entregables, Flashcards y Resumen</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
