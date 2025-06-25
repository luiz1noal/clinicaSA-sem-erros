const pool = require('../models/db');
const bcrypt = require('bcrypt');

// ======= Usuários =======

// Criar usuário
exports.createUsuario = async (req, res) => {
  console.log('Recebido POST /usuarios:', req.body);
  const { nome, email, senha, papel } = req.body;
  try {
    const saltRounds = 10;
    const hashedSenha = await bcrypt.hash(senha, saltRounds);

    const result = await pool.query(
      'INSERT INTO consultorio.usuarios (nome, email, senha, papel) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, email, hashedSenha, papel]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ error: err.message });
  }
};

// ======= Médicos =======

// Criar médico (precisa de usuário já cadastrado)
exports.createMedico = async (req, res) => {
  const { usuario_id, especialidade, crm } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO consultorio.medicos (usuario_id, especialidade, crm) VALUES ($1, $2, $3) RETURNING *',
      [usuario_id, especialidade, crm]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar médico:', err);
    res.status(500).json({ error: err.message });
  }
};

// Listar médicos
exports.listMedicos = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT m.id, u.nome, u.email, m.especialidade, m.crm
      FROM consultorio.medicos m
      JOIN consultorio.usuarios u ON m.usuario_id = u.id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar médicos:', err);
    res.status(500).json({ error: err.message });
  }
};

// ======= Pacientes =======

// Criar paciente (precisa de usuário já cadastrado)
exports.createPaciente = async (req, res) => {
  const { usuario_id, data_nascimento } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO consultorio.pacientes (usuario_id, data_nascimento) VALUES ($1, $2) RETURNING *',
      [usuario_id, data_nascimento]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar paciente:', err);
    res.status(500).json({ error: err.message });
  }
};

// Listar pacientes
exports.listPacientes = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.id, u.nome, u.email, p.data_nascimento
      FROM consultorio.pacientes p
      JOIN consultorio.usuarios u ON p.usuario_id = u.id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar pacientes:', err);
    res.status(500).json({ error: err.message });
  }
};
