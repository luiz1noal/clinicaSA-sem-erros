import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function Consultas() {
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [consultas, setConsultas] = useState([]);

  const [pacienteId, setPacienteId] = useState("");
  const [medicoId, setMedicoId] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [motivo, setMotivo] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    listarPacientes();
    listarMedicos();
    listarConsultas();
  }, []);

  async function listarPacientes() {
    try {
      const res = await api.get("/api/pacientes");
      setPacientes(res.data);
    } catch (err) {
      console.error("Erro ao listar pacientes:", err);
      setErro("Erro ao listar pacientes");
    }
  }

  async function listarMedicos() {
    try {
      const res = await api.get("/api/medicos");
      setMedicos(res.data);
    } catch (err) {
      console.error("Erro ao listar médicos:", err);
      setErro("Erro ao listar médicos");
    }
  }

  async function listarConsultas() {
    try {
      const res = await api.get("/api/consultas");
      setConsultas(res.data);
    } catch (err) {
      console.error("Erro ao listar consultas:", err);
      setErro("Erro ao listar consultas");
    }
  }

  async function cadastrar(e) {
    e.preventDefault();

    if (!pacienteId || !medicoId || !dataHora) {
      alert("Preencha paciente, médico e data/hora");
      return;
    }

    try {
      await api.post("/api/consultas", {
        paciente_id: pacienteId,
        medico_id: medicoId,
        data_hora: dataHora,
        motivo: motivo || "Consulta agendada",
      });

      setPacienteId("");
      setMedicoId("");
      setDataHora("");
      setMotivo("");
      listarConsultas();
      alert("Consulta cadastrada com sucesso!");
    } catch (err) {
      alert("Erro ao cadastrar consulta: " + err.message);
    }
  }

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center">Consultas</h2>

        {erro && <div className="text-red-500 mb-4">{erro}</div>}

        <form
          onSubmit={cadastrar}
          className="flex flex-col md:flex-row md:items-end gap-4 mb-8"
        >
          <div className="flex-1">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="paciente"
            >
              Paciente
            </label>
            <select
              id="paciente"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={pacienteId}
              onChange={(e) => setPacienteId(e.target.value)}
              required
            >
              <option value="">Selecione o paciente</option>
              {pacientes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="medico"
            >
              Médico
            </label>
            <select
              id="medico"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={medicoId}
              onChange={(e) => setMedicoId(e.target.value)}
              required
            >
              <option value="">Selecione o médico</option>
              {medicos.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="dataHora"
            >
              Data e Hora
            </label>
            <input
              id="dataHora"
              type="datetime-local"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dataHora}
              onChange={(e) => setDataHora(e.target.value)}
              required
            />
          </div>

          <div className="flex-1">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="motivo"
            >
              Motivo (opcional)
            </label>
            <input
              id="motivo"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Motivo da consulta"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition mt-2 md:mt-0"
          >
            Agendar
          </button>
        </form>

        <ul className="bg-white rounded shadow divide-y divide-gray-200">
          {consultas.length === 0 ? (
            <li className="p-4 text-center text-gray-500">
              Nenhuma consulta cadastrada.
            </li>
          ) : (
            consultas.map((c) => (
              <li
                key={c.id}
                className="p-4 flex flex-col md:flex-row md:justify-between md:items-center"
              >
                <div>
                  <span className="font-semibold">{c.nome_paciente}</span> –{" "}
                  {new Date(c.data_hora).toLocaleString("pt-BR")}
                </div>
                <div className="text-gray-600 md:text-right">
                  <div>
                    Médico: <span className="font-medium">{c.nome_medico || "-"}</span>
                  </div>
                  <div>Motivo: {c.motivo || "-"}</div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
}
