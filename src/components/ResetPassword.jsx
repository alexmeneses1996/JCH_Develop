import React, { useState } from "react";
import { Container, Paper, TextField, Button, Typography, Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { bg_boton } from "../styled/styled";

export default function ResetPasswordPage() {
    const [params] = useSearchParams();
    const token = params.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje(null);
        setError(null);

        if (!password || !confirmPassword) {
            setError("Por favor completa ambos campos.");
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        const res = await fetch("/api/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, nuevaClave: password }),
        });

        const data = await res.json();
        setMensaje(data.mensaje || data.error);
    };

    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgb(248, 249, 250)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >


            <h2>Restablecer contraseña</h2>
            <Paper elevation={5} sx={{ width: "90%", maxWidth: 400, padding: "2rem", margin: 0 }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Nueva contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        error={!!error && (password.length < 6 || password !== confirmPassword)}
                        helperText={error}
                    />
                    <TextField
                        fullWidth
                        label="Confirmar contraseña"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        margin="normal"
                        error={!!error && password !== confirmPassword}
                        helperText={error}
                    />
                    <Button fullWidth type="submit" variant="contained" color="primary"
                        sx={{ backgroundColor: bg_boton }} size="large">
                        Actualizar contraseña
                    </Button>
                </form>

                {mensaje && (
                    <Typography variant="body2" color="success.main" mt={2}>
                        {mensaje}
                    </Typography>
                )}

            </Paper>
            <Box sx={{ margin: 0 }}>
                <img
                    src="https://res.cloudinary.com/dqgbna4ni/image/upload/v1749935686/logo_xnitmu.png"
                    alt="Logo"
                    style={{ width: "200px", height: "250px" }}
                />

            </Box>
        </Container>
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




/*// src/pages/reset-password.jsx
import { Container, Paper } from "@mui/material";
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
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgb( 248, 249, 250)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0px",
                margin: "0px",
            }}
        >
           
                <h2>Restablecer contraseña</h2>
                <Paper elevation={5} sx={{ width: "30%", padding: "2rem" }}>
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
                </Paper>
           
        </Container>
    );
}*/
