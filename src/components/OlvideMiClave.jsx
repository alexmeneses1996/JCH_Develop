// src/routes/OlvideMiClave.jsx

import { useState } from "react";
import { requestPasswordReset } from "../helppers/requestPasswordReset";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { bg_boton } from "../styled/styled";

function OlvideMiClave() {
    const [cedula, setCedula] = useState("");
    const [mensaje, setMensaje] = useState(null);
    const [cargando, setCargando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cedula.trim() === "") {
            setMensaje("Por favor ingresa tu cédula.");
            return;
        }

        //validar que 
        if (cedula.trim() === "") {
            setMensaje("Por favor ingresa tu cédula.");
            return;
        }
        setCargando(true);
        setMensaje(null);

        const result = await requestPasswordReset(cedula);

        setCargando(false);
        setMensaje(result.message);
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
                alignItems: "flex-start",
                justifyContent: "center",
                paddingTop: "64px",
                margin: "0px",
            }}
        >
            <div style={{ margin: "auto" }}>
                <Typography
                    sx={{ color: bg_boton }}
                    variant="h5"
                    gutterBottom
                    fontWeight="bold"
                >
                    Recuperar contraseña
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            fullWidth
                            label="Cédula"
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value)}
                        />

                        <Button sx={{ backgroundColor: bg_boton }}
                            variant="contained"
                            color="primary"
                            type="submit"
                            size="large" disabled={cargando}>
                            {cargando ? "Enviando..." : "Enviar enlace"}
                        </Button>
                    </Box>
                </form>

                {mensaje && <p>{mensaje}</p>}
            </div>
        </Container>
    );
}

export default OlvideMiClave;
