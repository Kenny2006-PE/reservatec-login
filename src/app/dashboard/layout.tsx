"use client";
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useSession } from "next-auth/react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      {/* Sidebar */}
      <DashboardSidebar open={open} setOpen={setOpen} />
      {/* Main content */}
      <div className="flex-1 min-h-screen flex flex-col">
        {/* Topbar */}
        <div className="flex items-center h-14 border-b border-gray-200 bg-white px-2 sm:px-4 lg:px-12">
          {/* Hamburger for mobile/tablet */}
          <button
            className="lg:hidden mr-3"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
          >
            <span className="block w-6 h-0.5 bg-slate-800 mb-1 rounded"></span>
            <span className="block w-6 h-0.5 bg-slate-800 mb-1 rounded"></span>
            <span className="block w-6 h-0.5 bg-slate-800 rounded"></span>
          </button>
          <div className="flex-1" />
          <span className="text-sm text-slate-700 mr-3 hidden sm:block">{session?.user?.name || "Usuario"}</span>
          <div className="bg-[#2997ff] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
            {session?.user?.name?.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase() || "U"}
          </div>
        </div>
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    </div>
  );
}