import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children, papelPermitido }) {
  const { usuario, token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (papelPermitido && usuario?.papel !== papelPermitido) {
    return <Navigate to="/acesso-negado" replace />;
  }

  return children;
}
