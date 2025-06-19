"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const CARRERAS = [
  "Ingeniería de Sistemas",
  "Ingeniería Industrial",
  "Ingeniería Civil",
  "Administración",
  "Contabilidad",
  "Derecho",
  "Otra",
];

function splitName(fullName: string | undefined) {
  if (!fullName) return { nombre: "", apellido: "" };
  const parts = fullName.split(" ");
  return {
    nombre: parts[0] || "",
    apellido: parts.slice(1).join(" ") || "",
  };
}

export default function DashboardPage() {
  // No repitas el topbar aquí, solo el formulario
  const { data: session } = useSession();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [codigo, setCodigo] = useState("");
  const [carrera, setCarrera] = useState("");
  const [condicionMedica, setCondicionMedica] = useState<"sí" | "no" | "">("");
  const [guardado, setGuardado] = useState(false);
  const [loginMsg, setLoginMsg] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      const { nombre, apellido, dni, codigo, carrera, condicionMedica } = JSON.parse(saved);
      setNombre(nombre);
      setApellido(apellido);
      setDni(dni);
      setCodigo(codigo);
      setCarrera(carrera);
      setCondicionMedica(condicionMedica);
    } else if (session?.user?.name) {
      const { nombre, apellido } = splitName(session.user.name);
      setNombre(nombre);
      setApellido(apellido);
    }
    setLoginMsg(true);
    const timer = setTimeout(() => setLoginMsg(false), 4000);
    return () => clearTimeout(timer);
  }, [session?.user?.name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(
      "userProfile",
      JSON.stringify({ nombre, apellido, dni, codigo, carrera, condicionMedica })
    );
    setGuardado(true);
    setTimeout(() => setGuardado(false), 4000);
  };

  return (
    <div className="flex-1 min-h-screen">
      <div className="flex justify-center items-start mt-6 sm:mt-12 px-2">
        <div className="w-full max-w-lg sm:max-w-2xl bg-white rounded-xl shadow border border-gray-100 p-4 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-bold mb-6">Mi Información Personal</h1>
          <h2 className="text-lg font-semibold mb-1">Completa tu perfil</h2>
          <p className="text-gray-500 mb-6 text-sm">Por favor completa tu información personal para continuar</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-semibold mb-1">Nombre</label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-semibold mb-1">Apellido</label>
                <input
                  type="text"
                  placeholder="Perez"
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={apellido}
                  onChange={e => setApellido(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-semibold mb-1">DNI</label>
                <input
                  type="text"
                  placeholder=""
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={dni}
                  onChange={e => setDni(e.target.value)}
                  required
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-semibold mb-1">Código Institucional</label>
                <input
                  type="text"
                  placeholder=""
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={codigo}
                  onChange={e => setCodigo(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-semibold mb-1">Carrera</label>
                <select
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={carrera}
                  onChange={e => setCarrera(e.target.value)}
                  required
                >
                  <option value="">Seleccione...</option>
                  {CARRERAS.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div className="w-full sm:w-1/2 flex flex-col justify-end">
                <label className="block text-sm font-semibold mb-1">¿Tiene alguna condición médica?</label>
                <div className="flex gap-5 mt-2">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="condicionMedica"
                      value="sí"
                      checked={condicionMedica === "sí"}
                      onChange={() => setCondicionMedica("sí")}
                      required
                    />
                    <span>Sí</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="condicionMedica"
                      value="no"
                      checked={condicionMedica === "no"}
                      onChange={() => setCondicionMedica("no")}
                      required
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-slate-900 text-white font-semibold py-2 rounded hover:bg-slate-800 transition"
            >
              Guardar información
            </button>
          </form>
        </div>
      </div>
      {/* Notificaciones */}
      {loginMsg && (
        <div className="fixed bottom-2 right-2 sm:bottom-8 sm:right-8 z-50 shadow-lg">
          <div className="flex items-center gap-2 bg-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg border border-gray-200">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-base">
              ✓
            </span>
            <span className="text-slate-900 font-medium text-sm sm:text-base">Sesión iniciada correctamente</span>
          </div>
        </div>
      )}
      {guardado && (
        <div className="fixed bottom-2 right-2 sm:bottom-8 sm:right-8 z-50 shadow-lg">
          <div className="flex items-center gap-2 bg-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg border border-gray-200">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-base">
              ✓
            </span>
            <span className="text-slate-900 font-medium text-sm sm:text-base">Información guardada correctamente</span>
          </div>
        </div>
      )}
    </div>
  );
}