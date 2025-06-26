import PerfilAdmin from "./PerfilAdmin";
import PerfilPaciente from "./PerfilPaciente";
import PerfilMedico from "./PerfilMedico";

export default function PgPerfil() {
  const usuarioJSON = localStorage.getItem("usuario");
  console.log("usuarioJSON:", usuarioJSON); // debug
  const usuario = usuarioJSON ? JSON.parse(usuarioJSON) : null;
  console.log("usuario objeto:", usuario);  // debug

  if (!usuario) {
    return <div>Você precisa estar logado para acessar o perfil.</div>;
  }

  console.log("Tipo do usuário:", usuario.tipo); // debug

  switch (usuario.tipo) {
    case "admin":
      return <PerfilAdmin />;
    case "paciente":
      return <PerfilPaciente />;
    case "medico":
      return <PerfilMedico />;
    default:
      return <div>Tipo de usuário não reconhecido.</div>;
  }
}
