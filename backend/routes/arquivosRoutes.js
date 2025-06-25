const express = require('express');
const router = express.Router();
const arquivoController = require('../controllers/arquivosController');

// Rota GET para listar arquivos, responde com array dos arquivos na pasta uploads
router.get('/', arquivoController.listarArquivos);

// Rota POST para enviar arquivo, middleware multer processa o upload
router.post(
  '/',
  arquivoController.upload.single('arquivo'), // 'arquivo' tem que ser o nome do campo no form
  arquivoController.enviarArquivo
);

module.exports = router;
