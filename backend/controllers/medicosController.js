const pool = require('../models/db');

// Listar todos os médicos com dados do usuário
exports.listarMedicos = async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT m.id, u.nome, u.email, m.especialidade, m.crm
      FROM consultorio.medicos m
      JOIN consultorio.usuarios u ON m.usuario_id = u.id
      ORDER BY u.nome
    `);
    res.json(resultado.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar médico por id
exports.buscarMedico = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await pool.query(`
      SELECT m.id, u.nome, u.email, m.especialidade, m.crm
      FROM consultorio.medicos m
      JOIN consultorio.usuarios u ON m.usuario_id = u.id
      WHERE m.id = $1
    `, [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Médico não encontrado" });
    }
    res.json(resultado.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar médico (e/ou dados do usuário, se quiser)
// Atenção: se atualizar dados do usuário junto, precisa transação e lógica extra
exports.atualizarMedico = async (req, res) => {
  const { id } = req.params;
  const { especialidade, crm } = req.body;
  try {
    // Atualiza só dados da tabela médicos
    const resultado = await pool.query(
      'UPDATE consultorio.medicos SET especialidade = $1, crm = $2 WHERE id = $3 RETURNING *',
      [especialidade, crm, id]
    );
    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Médico não encontrado" });
    }
    res.json(resultado.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
