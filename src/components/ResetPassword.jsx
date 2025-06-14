
// src/pages/reset-password.jsx
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, nuevaClave: password }),
    });

    const data = await res.json();
    setMensaje(data.mensaje || data.error);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Restablecer contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Actualizar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}


// src/routes/ResetPassword.jsx

/*import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseConfig";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario está autenticado con el token temporal
    supabase.auth.getUser().then(({ data, error }) => {
      if (data?.user) {
        setUsuario(data.user);
      } else {
        setMensaje("No tienes acceso a esta página.");
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);

    if (password !== confirmar) {
      return setMensaje("Las contraseñas no coinciden.");
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      return setMensaje("Error al cambiar la contraseña.");
    }

    setMensaje("Contraseña actualizada correctamente. Serás redirigido...");
    setTimeout(() => navigate("/"), 3000); // Redirigir al inicio después de 3s
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Restablecer contraseña</h2>
      {!usuario ? (
        <p>{mensaje || "Verificando sesión..."}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Nueva contraseña:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Confirmar contraseña:
            <input
              type="password"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              required
            />
          </label>
          <button type="submit">Cambiar contraseña</button>
        </form>
      )}

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default ResetPassword;
*/