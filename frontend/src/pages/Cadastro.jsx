import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [papel, setPapel] = useState('paciente'); // valor padrão
  const [especialidade, setEspecialidade] = useState('');
  const [crm, setCrm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (papel === 'medico') {
        // Cria usuário + médico
        await api.post('/users/medicos-completo', {
          nome,
          email,
          senha,
          especialidade,
          crm,
        });
      } else {
        // Cria usuário comum (paciente ou admin)
        await api.post('/users/usuarios', { nome, email, senha, papel });
      }

      alert('Usuário cadastrado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);

      // Tenta mostrar mensagem do backend, se houver
      const msgErro =
        error.response?.data?.error || error.message || 'Erro ao cadastrar usuário';

      alert(msgErro);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Cadastro</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />
        <select
          value={papel}
          onChange={(e) => setPapel(e.target.value)}
          required
          className="border p-2 w-full rounded"
        >
          <option value="">Selecione o papel</option>
          <option value="paciente">Paciente</option>
          <option value="medico">Médico</option>
          <option value="admin">Administrador</option>
        </select>

        {papel === 'medico' && (
          <>
            <input
              type="text"
              placeholder="Especialidade"
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />
            <input
              type="text"
              placeholder="CRM"
              value={crm}
              onChange={(e) => setCrm(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />
          </>
        )}

        <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
