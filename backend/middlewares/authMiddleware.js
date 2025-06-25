const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica se o cabeçalho Authorization foi enviado
  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  // Espera-se que o formato seja: Bearer <token>
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensagem: 'Token malformado' });
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreta');

    // Adiciona os dados do usuário ao objeto req
    req.usuario = decoded;

    // Continua para o próximo middleware ou rota
    next();
  } catch (err) {
    console.error('Erro na verificação do token:', err);
    return res.status(403).json({ mensagem: 'Token inválido ou expirado' });
  }
};
