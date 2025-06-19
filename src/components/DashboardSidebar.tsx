"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

const CalendarIcon = () => (
  <svg height="20" viewBox="0 0 24 24" width="20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="4" stroke="#fff" strokeWidth="2" fill="none"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const InfoIcon = () => (
  <svg height="20" viewBox="0 0 24 24" width="20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" fill="none"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12" y2="8"/>
  </svg>
);
const LogoutIcon = () => (
  <svg height="20" viewBox="0 0 24 24" width="20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

export default function DashboardSidebar({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
  const pathname = usePathname();

  // Sidebar content
  const sidebarContent = (
    <>
      <div className="flex flex-col items-center gap-2 px-4 py-8 border-b border-blue-400">
        <Image
          src="/logo-blanco-dashboard.png"
          alt="ReservaTec Logo"
          width={170}
          height={50}
          priority
          style={{ maxWidth: "170px", height: "auto" }}
        />
      </div>
      <nav className="flex-1 px-2 py-6">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard/reservas"
              className={`flex items-center gap-3 py-2 px-4 rounded font-medium transition 
                ${pathname === "/dashboard/reservas" ? "bg-[#217be0]" : "hover:bg-[#217be0]"}`}
              onClick={() => setOpen(false)}
            >
              <CalendarIcon />
              <span className="text-white">Reservas</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 py-2 px-4 rounded font-medium transition 
                ${pathname === "/dashboard" ? "bg-[#217be0]" : "hover:bg-[#217be0]"}`}
              onClick={() => setOpen(false)}
            >
              <InfoIcon />
              <span className="text-white">Mi Info</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="px-5 py-5">
        <button
          className="flex items-center gap-3 text-white font-medium w-full py-2 rounded hover:bg-[#217be0] transition"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogoutIcon />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </>
  );

  // Drawer for mobile/tablet
  return (
    <>
      {/* Overlay + sidebar as drawer on mobile/tablet */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 lg:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`
          fixed z-50 top-0 left-0 h-full w-64 bg-[#2997ff] flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:block
        `}
        style={{ minHeight: "100vh" }}
      >
        {sidebarContent}
      </aside>
    </>
  );
}