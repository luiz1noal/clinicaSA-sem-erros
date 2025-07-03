const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require('./routes/userRoutes');       // para usuários, criação de médicos vinculados, pacientes etc
const dashboardRoutes = require('./routes/dashboardRoutes');
const arquivosRoutes = require("./routes/arquivosRoutes");
const pacientesRoutes = require("./routes/pacientesRoutes");
const consultasRoutes = require("./routes/consultasRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Rotas autenticadas (exemplo)
app.use("/api/auth", authRoutes);

// Rotas usuários e relacionadas (ex: cadastro, médicos vinculados a usuários, pacientes)
app.use("/api/users", userRoutes);


// Outras rotas específicas
app.use("/api/pacientes", pacientesRoutes);
app.use("/api/consultas", consultasRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/arquivos", arquivosRoutes);

// Servir arquivos estáticos (upload)
app.use('/uploads', express.static('uploads'));

// Middleware de tratamento de erros genérico (opcional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erro interno no servidor" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
