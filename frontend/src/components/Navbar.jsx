import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 bg-blue-600 p-4 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4 justify-center md:justify-start">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/pacientes" className="hover:underline">Pacientes</Link>
        <Link to="/consultas" className="hover:underline">Consultas</Link>
        <Link to="/uploads" className="hover:underline">Uploads</Link>

        <div className="ml-auto flex gap-4">
          <Link to="/perfil" className="hover:underline">Perfil</Link>
          <Link to="/" className="hover:underline">Sair</Link>
        </div>
      </div>
    </nav>
  );
}
