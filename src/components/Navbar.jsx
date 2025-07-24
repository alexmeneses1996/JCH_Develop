import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import Person3Icon from '@mui/icons-material/Person3';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import { bgcolor_select_menu, color_primario, color_select_menu } from "../styled/styled";
import { cerrarSesion } from "../helppers/crearUsuario";
import { AppContext } from "../context/userContext";
import UserCreationByLink from "./UserCreationByLink";

const Navbar = ({ setAutenticacion }) => {
  const [openSession, setOpenSession] = useState(false);
  const handleOpenSession = () => { setOpenSession(true); handleClose() }
  const handleCloseSession = () => setOpenSession(false)



  const [openDrawer, setOpenDrawer] = useState(false);
  const navegate = useNavigate();
  const { context, setContext } = useContext(AppContext)

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCerrarSesion = async () => {
    const sessionCerrada = await cerrarSesion()
    if (sessionCerrada.success) {
      handleCloseSession()
      setContext({}) //se reinicia el contexto
      setAutenticacion(false)
      navegate("/login"); // Redirige a la página de login
    } else {
      alert(sessionCerrada.message)
    }

  };

  const handlePerfil = () => {
    handleClose()
    navegate("/perfil");

  }

  const handleReferido = () => {

    ///navegate("/perfil");

  }


  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: color_primario, //BACKGROUND_COLOR,#0b5345 #117a65
        color: "#000",
        boxShadow: "none",
        width: "100%",
        maxHeight: '64px'
      }}
    >
      <Toolbar>
        <IconButton onClick={() => setOpenDrawer(true)} sx={{ color: "black" }}>
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 200,
              backgroundColor: color_primario,
              color: "white",
              padding: 2,
            },
          }}
        >
          <Box>
            <Box component="img" src="https://res.cloudinary.com/dqgbna4ni/image/upload/v1749935686/logo_xnitmu.png" alt="Logo" sx={{ height: "30%", width: "100%", objectFit: "cover" }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button
                component={Link}
                to="/inicio"
                onClick={() => {
                  setOpenDrawer(false);
                  navegate("/inicio");
                }}
                sx={{ fontWeight: "bold", color: bgcolor_select_menu, ":hover": { backgroundColor: bgcolor_select_menu, color: color_select_menu, fontWeight: "bold" } }}
              >
                Inicio
              </Button>

              {context.tipo != "Admin" && (<Button
                onClick={() => {
                  setOpenDrawer(false);
                  navegate("/nuevoRegistro");
                }}
                sx={{ fontWeight: "bold", color: bgcolor_select_menu, ":hover": { backgroundColor: bgcolor_select_menu, color: color_select_menu, fontWeight: "bold" } }}

              >
                Registrar Referidos
              </Button>)}
              {context.tipo == "Admin" && (<Button
                onClick={() => {
                  setOpenDrawer(false);
                  navegate("/solicitudes");
                }}
                sx={{ fontWeight: "bold", color: bgcolor_select_menu, ":hover": { backgroundColor: bgcolor_select_menu, color: color_select_menu, fontWeight: "bold" } }}

              >
                Solicitudes
              </Button>)}

              <Button
                onClick={() => {
                  setOpenDrawer(false);
                  navegate("/graficos");
                }}
                sx={{ fontWeight: "bold", color: bgcolor_select_menu, ":hover": { backgroundColor: bgcolor_select_menu, color: color_select_menu, fontWeight: "bold" } }}
              >
                Gráficas
              </Button>
              {context.tipo == "Admin" && (<Button
                onClick={() => {
                  setOpenDrawer(false);
                  navegate("/proyeccion");
                }}
                sx={{ fontWeight: "bold", color: bgcolor_select_menu, ":hover": { backgroundColor: bgcolor_select_menu, color: color_select_menu, fontWeight: "bold" } }}
              >
                Proyeccion
              </Button>)}
            </Box>
          </Box>
        </Drawer>

        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "inherit",
            textDecoration: "none !important",
            ":hover": {
              color: "#90d8b2",
              fontWeight: 700,
              paddingBottom: "1px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: 1,
            }}
          >
            <Box
              component="img"
              src="https://res.cloudinary.com/dqgbna4ni/image/upload/v1749935686/logo_xnitmu.png"
              alt="Logo"
              sx={{ height: 50, width: 80, objectFit: "cover" }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: ".1rem",
                fontSize: "1.4rem",
              }}
            >
              JCH
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            mx: "auto",
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          {!context?.nombre && (<Button
            component={Link}
            to="/login"
            sx={{
              backgroundColor: "#90d8b2",
              color: "white",
              padding: "0.3rem 0.8rem",
              borderRadius: "5px",
              transition: "background 0.3s ease-in-out",
              ":hover": { backgroundColor: "#059669", color: "white" },
            }}
          >
            Ingresar
          </Button>)}
        </Box>

        {context?.nombre && (<Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={handleClick}
            sx={{
              color: "white",
              maxWidth: {xs: 230,sm: 500 }, // ajusta según el tamaño que necesites
              //textTransform: "none", // opcional: evita que el texto se vuelva mayúsculas
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              "&:focus": {
                outline: "none",
              },
            }}
          > <ExpandMoreIcon />
            {context.sexo == "femenino" ? (<Person3Icon />) : (<PersonIcon />)}
            <Typography variant="subtitle2" sx={{
              mx: 1, fontWeight: 500, overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flexGrow: 1,
            }}>
             
              {context.nombre} {context.apellidos} <span style={{ fontWeight: 300 }}>({context.tipo})</span>
            </Typography>
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {context.tipo != "Admin" && (<MenuItem onClick={handlePerfil}>Mi perfil</MenuItem>)}
            {context.tipo != "Admin" && (<MenuItem onClick={handleReferido}><UserCreationByLink handleClose={handleClose} />
            </MenuItem>)}
            <MenuItem onClick={handleOpenSession}>Cerrar sesión</MenuItem>
          </Menu>
        </Box>)}


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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
