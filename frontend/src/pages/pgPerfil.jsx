import React from "react";
import Navbar from "../components/Navbar";

export default function Perfil() {
  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-blue-100 flex flex-col items-center justify-start p-6">
        <h1 className="text-3xl font-bold mb-4">Página de Perfil</h1>
        <p>Conteúdo do perfil vai aqui.</p>
      </div>
    </>
  );
}
