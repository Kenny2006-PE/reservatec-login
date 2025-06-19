"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

const BigCalendarIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#b2b2b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="4" stroke="#b2b2b2" strokeWidth="2" fill="none"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

export default function ReservasPage() {
  const { data: session } = useSession();

  const areas = [
    {
      nombre: "Fútbol 1",
      img: "/futbol1.jpg",
    },
    {
      nombre: "Fútbol 2",
      img: "/futbol2.jpg",
    },
    {
      nombre: "Frontón",
      img: "/fronton.jpg",
    },
    {
      nombre: "Vóley/Básquet",
      img: "/basquet.jpg",
    },
  ];

  return (
    <div className="flex-1 min-h-screen">
      {/* Top bar */}
      <div className="w-full h-14 border-b border-gray-200 flex items-center justify-end pr-12 bg-white">
        <span className="text-sm text-slate-700 mr-3">{session?.user?.name || "Usuario"}</span>
        <div className="bg-[#2997ff] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
          {session?.user?.name?.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase() || "U"}
        </div>
      </div>

      <div className="px-16 py-8">
        <h1 className="text-xl font-bold mb-6">Mis Reservas</h1>
        <div className="mb-10 w-full bg-white border border-dashed border-gray-300 rounded-xl h-36 flex flex-col items-center justify-center">
          <BigCalendarIcon />
          <div className="text-center mt-2">
            <div className="font-semibold text-gray-700">Aún no hay reservas</div>
            <div className="text-gray-500 text-sm">Puedes crear una nueva reserva seleccionando un área deportiva</div>
          </div>
        </div>

        <h2 className="text-lg font-bold mb-4">Áreas disponibles</h2>
        <div className="flex gap-6 flex-wrap">
          {areas.map(area => (
            <div
              key={area.nombre}
              className="relative w-[320px] h-[140px] rounded-lg overflow-hidden shadow cursor-pointer transition-transform hover:scale-[1.03] group"
            >
              <Image
                src={area.img}
                alt={area.nombre}
                fill
                style={{ objectFit: "cover" }}
                className="group-hover:brightness-75 transition"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <span className="text-white text-lg font-bold drop-shadow">{area.nombre}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}