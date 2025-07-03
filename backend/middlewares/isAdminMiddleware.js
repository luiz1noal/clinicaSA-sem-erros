// middlewares/isAdminMiddleware.js
module.exports = (req, res, next) => {
  if (req.usuario && req.usuario.papel === 'admin') {
    return next(); // continua a rota normalmente
  } else {
    // Se o cliente aceita HTML, redireciona para login
    if (req.accepts('html')) {
      return res.redirect('/login');
    }
    
    // Caso contrário, responde com JSON (API)
    return res.status(403).json({ erro: "Acesso negado. Apenas administradores podem acessar esta rota." });
  }
};
