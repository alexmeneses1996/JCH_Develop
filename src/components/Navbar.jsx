import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/imagen.jpg";
import logo_1 from "/logo.png";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import { bgcolor_select_menu, color_primario, color_select_menu } from "../styled/styled";

const Navbar = () => {
  //const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const navegate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCerrarSesion = () => {
    localStorage.removeItem("usuario");
    navegate("/login"); // Redirige a la página de login
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: color_primario, //BACKGROUND_COLOR,#0b5345 #117a65
        color: "#000",
        boxShadow: "none",
        width: "100%",
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
            <Box component="img" src={logo_1} alt="Logo" sx={{ height: "30%",width:"100%", objectFit: "cover" }} />
                       
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button
                component={Link}
                to="/inicio"
                onClick={() => {
                  setOpenDrawer(false);
                  navegate("/inicio");
                }}
                sx={{fontWeight:"bold",color: bgcolor_select_menu,":hover":{backgroundColor:bgcolor_select_menu, color:color_select_menu, fontWeight:"bold"}}}
              >
                Inicio
              </Button>

              <Button
                onClick={() => {
                  setOpenDrawer(false);
                  navegate("/nuevoRegistro");
                }}
              sx={{fontWeight:"bold",color: bgcolor_select_menu,":hover":{backgroundColor:bgcolor_select_menu, color:color_select_menu, fontWeight:"bold"}}}

              >
                Registrar Votantes
              </Button>

              <Button
                onClick={() => {
                  setOpenDrawer(false);
                  navegate("/graficos");
                }}
                sx={{fontWeight:"bold",color: bgcolor_select_menu, ":hover":{backgroundColor:bgcolor_select_menu, color:color_select_menu, fontWeight:"bold"}}}
              >
                Gráficas
              </Button>
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
              src={logo_1}
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
          <Button
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
          </Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={handleClick}
            sx={{
              color: "white",
              "&:focus": {
                outline: "none",
              },
            }}
          >
            <PersonIcon />
            <Typography variant="subtitle2" sx={{ mx: 1, fontWeight: 500 }}>
              MARIA HORMAZA <span style={{ fontWeight: 300 }}>(LIDER)</span>
            </Typography>
            <ExpandMoreIcon />
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleClose}>Mi perfil</MenuItem>
            <MenuItem onClick={handleCerrarSesion}>Cerrar sesión</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
