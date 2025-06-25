import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function Pacientes() {
  // Estados únicos e organizados
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  useEffect(() => {
    listar();
  }, []);

  async function listar() {
    setLoading(true);
    setErro("");
    try {
      const res = await api.get("/api/pacientes"); // Supondo que esta seja a rota correta
      setPacientes(res.data);
    } catch (err) {
      setErro("Erro ao carregar pacientes.");
      console.error("Erro ao listar pacientes:", err);
    } finally {
      setLoading(false);
    }
  }

  async function cadastrar(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    // Validação simples
    if (!nome.trim() || !email.trim() || !telefone.trim() || !dataNascimento || !senha) {
      setErro("Preencha todos os campos corretamente.");
      return;
    }

    try {
      await api.post("/api/pacientes", {
        nome,
        email,
        telefone,
        data_nascimento: dataNascimento,
        senha,
      });

      setNome("");
      setEmail("");
      setTelefone("");
      setDataNascimento("");
      setSenha("");
      setSucesso("Paciente cadastrado com sucesso!");
      listar(); // Atualiza a lista após cadastro
    } catch (err) {
      setErro("Erro ao cadastrar paciente.");
      console.error("Erro ao cadastrar paciente:", err);
    }
  }

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Pacientes</h2>

        {erro && (
          <div className="bg-red-200 text-red-800 p-3 rounded mb-4">{erro}</div>
        )}

        {sucesso && (
          <div className="bg-green-200 text-green-800 p-3 rounded mb-4">{sucesso}</div>
        )}

        {/* Formulário único de cadastro */}
        <form onSubmit={cadastrar} className="grid grid-cols-1 gap-3 mb-6">
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="email"
            className="border p-2 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            className="border p-2 rounded"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
          <input
            type="date"
            className="border p-2 rounded"
            placeholder="Data de nascimento"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
          <input
            type="password"
            className="border p-2 rounded"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Adicionar"}
          </button>
        </form>

        {/* Lista de pacientes */}
        {loading && pacientes.length === 0 ? (
          <p>Carregando pacientes...</p>
        ) : pacientes.length > 0 ? (
          <ul className="bg-white p-4 rounded shadow max-h-96 overflow-auto">
            {pacientes.map((p) => (
              <li key={p.id} className="py-2 border-b">
                <strong>{p.nome}</strong> — {p.email}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">Nenhum paciente cadastrado.</p>
        )}
      </div>
    </>
  );
}
