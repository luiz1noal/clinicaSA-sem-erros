import { useState } from "react";
import api from "../services/api";

export default function CadastroMedico() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [crm, setCrm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/cadastrar-medico", {
        nome,
        email,
        senha,
        especialidade,
        crm,
      });
      alert("Médico cadastrado com sucesso!");
      setNome("");
      setEmail("");
      setSenha("");
      setEspecialidade("");
      setCrm("");
    } catch (err) {
      console.error("Erro ao cadastrar médico:", err);
      alert("Erro ao cadastrar médico");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Cadastrar Médico</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Especialidade"
          value={especialidade}
          onChange={(e) => setEspecialidade(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="CRM"
          value={crm}
          onChange={(e) => setCrm(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 w-full">
          Cadastrar Médico
        </button>
      </form>
    </div>
  );
}
