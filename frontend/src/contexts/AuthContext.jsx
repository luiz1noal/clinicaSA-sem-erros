import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    const tokenData = localStorage.getItem("token");
    if (userData && tokenData) {
      try {
        setUsuario(JSON.parse(userData));
        setToken(tokenData);
      } catch {
        console.warn("Usuário inválido no localStorage, removendo...");
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
        setUsuario(null);
        setToken(null);
      }
    }
  }, []);

  function login(token, usuario) {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setToken(token);
    setUsuario(usuario);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setToken(null);
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
