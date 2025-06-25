import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null); 

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) {
      try {
        setUsuario(JSON.parse(userData));
      } catch {
        console.warn("Usuário inválido no localStorage, removendo...");
        localStorage.removeItem("usuario");
        setUsuario(null);
      }
    }
  }, []);

  function login(token, usuario) {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setUsuario(usuario);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
