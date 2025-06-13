import React, { useContext, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Avatar,
    Divider,
    Stack,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { color_primario } from "../styled/styled";
import { cerrarSesion } from "../helppers/crearUsuario";
import { AppContext } from "../context/userContext";

const PerfilUser = ({ user, setAutenticacion }) => {
    const navigate = useNavigate();
    const { context, setContext } = useContext(AppContext)

      const [openSession, setOpenSession] = useState(false);
      const handleOpenSession = () => setOpenSession(true)
      const handleCloseSession = () => setOpenSession(false)

    const handleEditarPerfil = () => {
        navigate("/editar_perfil"); // Asegúrate de tener esta ruta
    };

    const handleCerrarSesion = async () => {
        const sessionCerrada = await cerrarSesion()
        if (sessionCerrada.success) {
            setContext({}) //se reinicia el contexto
            setAutenticacion(false)
            navigate("/login"); // Redirige a la página de login
        } else {
            alert(sessionCerrada.message)
        }

    };

    const handleVerActividad = () => {
        alert("Actividad reciente: Has iniciado sesión 3 veces esta semana.");
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
            <Card elevation={3} sx={{ width: 400, position: 'relative' }}>
                <CardContent>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Avatar sx={{ width: 80, height: 80, mb: 2 }}>
                            {user?.nombre?.charAt(0) || "U"}
                        </Avatar>
                        <Typography variant="h6" fontWeight="bold">
                            {user?.nombre} {user?.apellidos}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Cédula: {user?.cedula}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Correo: {user?.correo}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Teléfono: {user?.telefono}
                        </Typography>
                        <Divider sx={{ my: 2, width: "100%" }} />
                        <Stack spacing={2} width="100%">
                            <Button variant="contained" sx={{ bgcolor: color_primario }} onClick={handleEditarPerfil}>
                                Editar Perfil
                            </Button>
                            <Button variant="outlined" sx={{ borderColor: color_primario, color: color_primario }} onClick={handleVerActividad}>
                                Ver Solicitudes
                            </Button>
                            <Button color="error" onClick={handleOpenSession}>
                                Cerrar Sesión
                            </Button>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>


            <Dialog open={openSession} onClose={handleCloseSession}>
                <DialogTitle>¿Cerrar sesión?</DialogTitle>
                <DialogContent>
                    ¿Estás seguro de que deseas cerrar sesión? Perderás el acceso hasta iniciar sesión nuevamente.
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSession} color="primary">
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleCerrarSesion}
                        color="error"
                    >
                        Cerrar sesión
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>


    );
};

export default PerfilUser;