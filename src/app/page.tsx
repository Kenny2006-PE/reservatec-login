"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg-reservatec.jpeg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
          priority
        />
      </div>
      {/* Login card */}
      <main className="relative z-10 bg-white rounded-xl shadow-xl px-10 py-8 w-full max-w-md flex flex-col items-center">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6 w-full">
          <Image
            src="/logo-reservatec.png"
            alt="Reserva Tec Logo"
            width={280}
            height={120}
            priority
            className="mb-2"
          />
        </div>
        <p className="text-gray-600 text-center mb-8">
          Sistema de Reservas de Áreas Deportivas
        </p>
        {/* Google Button */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="flex items-center justify-center w-full border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 transition mb-2"
        >
          <span className="flex items-center">
            <Image src="/google.svg" alt="Google" width={20} height={20} />
            <span className="ml-2">Acceder con Google</span>
          </span>
        </button>
      </main>
      {/* Footer */}
      <footer className="absolute bottom-4 left-0 w-full text-center text-xs text-white z-10">
        © 2025 ReservaTec. Todos los derechos reservados.
      </footer>
    </div>
  );
}