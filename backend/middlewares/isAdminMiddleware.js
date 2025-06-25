// middlewares/isAdminMiddleware.js
module.exports = (req, res, next) => {
    if (req.usuario && req.usuario.papel === 'admin') {
      return next(); // continua a rota normalmente
    } else {
      return res.status(403).json({ erro: "Acesso negado. Apenas administradores podem acessar esta rota." });
    }
  };
  