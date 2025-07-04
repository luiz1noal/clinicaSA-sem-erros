import Perfil from "../components/Perfil.jsx";
import { useState } from "react";

export default function PerfilAdmin() {
  const [notificacoes] = useState([
    "Backup do sistema realizado com sucesso",
    "Nova atualização disponível",
    "3 usuários aguardando aprovação",
  ]);

  const acoes = [
    {
      id: 1,
      nome: "Gerenciar Usuários",
      descricao: "Adicionar, editar ou remover usuários.",
    },
    {
      id: 2,
      nome: "Configurações do Sistema",
      descricao: "Ajustar preferências e parâmetros.",
    },
    {
      id: 3,
      nome: "Relatórios",
      descricao: "Visualizar relatórios administrativos.",
    },
  ];

  return (
    <Perfil
      titulo="Perfil do Administrador"
      descricao="Área exclusiva para administradores gerenciarem o sistema."
    >
      <section className="mt-8 space-y-8">
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-5 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-blue-700 mb-2">Usuários Ativos</h3>
            <p className="text-3xl font-bold text-gray-800">125</p>
          </div>
          <div className="bg-green-100 p-5 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-green-700 mb-2">Consultas Hoje</h3>
            <p className="text-3xl font-bold text-gray-800">34</p>
          </div>
          <div className="bg-yellow-100 p-5 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-yellow-700 mb-2">Alertas Pendentes</h3>
            <p className="text-3xl font-bold text-gray-800">5</p>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-purple-700">Ações Rápidas</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {acoes.map((acao) => (
              <li key={acao.id}>
                <strong>{acao.nome}:</strong> {acao.descricao}
              </li>
            ))}
          </ul>
        </div>

        {/* Notificações */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-orange-700">Notificações Recentes</h3>
          <ul className="bg-gray-100 border border-gray-200 p-4 rounded-lg max-h-40 overflow-auto space-y-2">
            {notificacoes.map((msg, i) => (
              <li
                key={i}
                className="text-gray-600 hover:text-gray-800 cursor-default"
              >
                • {msg}
              </li>
            ))}
          </ul>
        </div>

        {/* Logout */}
        <button
          onClick={() => alert("Logout executado")}
          className="mt-6 px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Sair
        </button>
      </section>
    </Perfil>
  );
}
