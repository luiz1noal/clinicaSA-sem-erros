const express = require('express');
const router = express.Router();

const {
  createUsuario,
  createMedicoCompleto,
  listMedicos,
  createPaciente,
  listPacientes,
} = require('../controllers/userController');

const {
  listMedicos: listMedicosMedico,
  buscarMedico,
  atualizarMedico,
} = require('../controllers/medicosController');

// Rotas de usuário, paciente e médico completo
router.post('/usuarios', createUsuario);
router.post('/medicos-completo', createMedicoCompleto);  // USAR A FUNÇÃO CORRETA AQUI
router.post('/pacientes', createPaciente);
router.get('/pacientes', listPacientes);

// Rotas específicas de médicos
router.get('/medicos', listMedicos);           // Lista todos os médicos (do medicosController)
router.get('/medicos/:id', buscarMedico);            // Busca médico por id
router.put('/medicos/:id', atualizarMedico);         // Atualiza médico por id

module.exports = router;
