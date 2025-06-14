// src/routes/OlvideMiClave.jsx

import { useState } from "react";
import { requestPasswordReset } from "../helppers/requestPasswordReset";

function OlvideMiClave() {
  const [cedula, setCedula] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje(null);

    const result = await requestPasswordReset(cedula);
    setCargando(false);
    setMensaje(result.message);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Recuperar contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Cédula:
          <input
            type="text"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={cargando}>
          {cargando ? "Enviando..." : "Enviar enlace"}
        </button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default OlvideMiClave;
