const pool = require('../models/db');
const bcrypt = require('bcrypt');

// Cria usuário (genérico)
exports.createUsuario = async (req, res) => {
  const { nome, email, senha, papel } = req.body;
  try {
    const hashedSenha = await bcrypt.hash(senha, 10);
    const result = await pool.query(
      'INSERT INTO consultorio.usuarios (nome, email, senha, papel) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, email, hashedSenha, papel]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cria médico vinculado a usuário existente
exports.createMedico = async (req, res) => {
  const { usuario_id, especialidade, crm } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO consultorio.medicos (usuario_id, especialidade, crm) VALUES ($1, $2, $3) RETURNING *',
      [usuario_id, especialidade, crm]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cria médico completo: cria usuário e médico dentro de uma transação
exports.createMedicoCompleto = async (req, res) => {
  const { nome, email, senha, especialidade, crm } = req.body;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const hashedSenha = await bcrypt.hash(senha, 10);

    // Cria usuário com papel 'medico'
    const usuarioResult = await client.query(
      'INSERT INTO consultorio.usuarios (nome, email, senha, papel) VALUES ($1, $2, $3, $4) RETURNING id',
      [nome, email, hashedSenha, 'medico']
    );

    const usuarioId = usuarioResult.rows[0].id;

    // Cria médico vinculado ao usuário criado
    const medicoResult = await client.query(
      'INSERT INTO consultorio.medicos (usuario_id, especialidade, crm) VALUES ($1, $2, $3) RETURNING *',
      [usuarioId, especialidade, crm]
    );

    await client.query('COMMIT');

    res.status(201).json({ usuarioId, medico: medicoResult.rows[0] });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};

// Lista médicos com dados do usuário vinculado
exports.listMedicos = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT m.id, u.nome, u.email, m.especialidade, m.crm
      FROM consultorio.medicos m
      JOIN consultorio.usuarios u ON m.usuario_id = u.id
      ORDER BY u.nome
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cria paciente vinculado a usuário existente
exports.createPaciente = async (req, res) => {
  const { usuario_id, data_nascimento } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO consultorio.pacientes (usuario_id, data_nascimento) VALUES ($1, $2) RETURNING *',
      [usuario_id, data_nascimento]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lista pacientes com dados do usuário vinculado
exports.listPacientes = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.id, u.nome, u.email, p.data_nascimento
      FROM consultorio.pacientes p
      JOIN consultorio.usuarios u ON p.usuario_id = u.id
      ORDER BY u.nome
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
