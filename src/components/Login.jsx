import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  //Alert,
  Box,
  Button,
  Container,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  //Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as yup from "yup";
import {
  colorBgPrimary,
  colorBgSecondary,
  colorTextPrimary,
  colorTextSecondary,
} from "../styled/styled";
import LockIcon from "@mui/icons-material/Lock";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Link, useNavigate } from "react-router-dom";
import { loginConCedula } from "../helppers/loginCedula";
import AdminLogin from "./AdminLogin";
import { devolverUsuario, loginUsuarioAuth } from "../helppers/crearUsuario";
import { AppContext } from "../context/userContext";

const Login = ({ setAutenticacion }) => {
  const navegate = useNavigate();
  const {contex, setContext} = useContext(AppContext)

  const formik = useFormik({
    initialValues: {
      cedula: "",
      password: "",
      showPassword: false,
    },
    validationSchema: yup.object({
      cedula: yup
        .string()
    //.matches(
       //   /^[0-9]{6,12}$/,
        //  "La cédula debe tener entre 6 y 12 dígitos numéricos"
        //)
        .required("La cédula es obligatoria"),
      password: yup
        .string()
        .min(6, "Mínimo 6 caracteres")
        //.matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
        //.matches(/[0-9]/, "Debe contener al menos un número")
        .required("La contraseña es obligatoria"),
    }),

    onSubmit: async (values, { setErrors }) => {
      //const res = await loginConCedula(values.cedula, values.password);
      const res = await loginUsuarioAuth(values.cedula, values.password)
      if (res.success) {
        alert("✅ Bienvenido " + res.data.user);
        console.log(res.data)
        //localStorage.setItem("usuario", JSON.stringify(res.data.user));
        const usuario = await devolverUsuario(cedula)
        setContext(usuario)
        setAutenticacion(true)
        navegate("/");
        // podés guardar en localStorage o context el user
      } else {
        alert("❌ " + res.message);
      }

      /*

                  //Validacion de correo electronico si existe
                  const isRegistred = await validarEmail({ email: values.email })
                  if (!isRegistred) {
                    setErrors({ email: ' El email no se encuentra registrado.' })
                    return
                  }
            
                  //Se realiza el proceso de ingreso con contraseña y correo
                  await emailLogin({ email: values.email, password: values.password}).then(response => {
            
                    //Validar si el usuario no es null,
                    if(!response){
                      setErrors({ password: 'Contraseña incorrecta.' })
                      return
                    }else{
            
                      dispatch(
                        saveUser({
                         ...response,
                          role: 'user'
                        })
                      )
                      //setAutentication(true)
                      //navegate('/')
                    }
                  
                  }
                  )
                  */
    },
  });

  return (
    <>
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
        <Box>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              fontWeight: "bold",
              color: colorTextPrimary,
            }}
          >
            Sistema de Registro
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "20px" }}>
            Inicia sesion para continuar
          </Typography>
        </Box>

        <Paper elevation={5} sx={{ width: "30%", padding: "2rem" }}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onSubmit={formik.handleSubmit}
          >
            <FormControl
              sx={{
                m: 1,
                width: "100%",
                maxWidth: "300px",
                //height:'44px',
                borderRadius: "20px",
              }}
              variant="filled"
            >
              <TextField
                label="Cedula"
                id="cedula"
                value={formik.values.cedula}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cedula && Boolean(formik.errors.cedula)}
                helperText={formik.touched.cedula && formik.errors.cedula}
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentityIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  "& .MuiFilledInput-root": {
                    borderRadius: "20px",
                    backgroundColor: "#F0F0F0", // Asegura que el color de fondo coincida
                  },
                }}
              />
            </FormControl>
            <FormControl
              sx={{
                m: 1,
                width: "100%",
                maxWidth: "300px",
                backgroundColor: "#fff",
                borderRadius: "20px",
              }}
              variant="filled"
            >
              <InputLabel htmlFor="filled-adornment-password">
                Contraseña
              </InputLabel>
              <FilledInput
                id="filled-adornment-password"
                name="password"
                type={formik.values.showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        formik.setFieldValue(
                          "showPassword",
                          !formik.values.showPassword
                        )
                      }
                      edge="end"
                    >
                      {!formik.values.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                variant="filled"
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  "& .MuiFilledInput-root": {
                    borderRadius: "20px",
                    backgroundColor: "#fff", // Asegura que el color de fondo coincida
                  },
                }}
              />
              {formik.touched.password && formik.errors.password && (
                <FormHelperText error>{formik.errors.password}</FormHelperText>
              )}
            </FormControl>

            <Button
              variant="text"
              sx={{
                width: "10",
                display: "flex",
                alignItems: "center",
                color: colorTextSecondary,
                justifyContent: "center",
                marginTop: "4px",
                textTransform: "none",
                "&:focus": {
                  outline: "none",
                },

                ":hover": {
                  textDecoration: "underline",
                  backgroundColor: "white",
                  color: colorTextPrimary,
                },
              }}
            >
              ¿Olvidaste tu contraseña?
            </Button>

            <Button
              type="submit"
              sx={{
                padding: "10px 20px",
                fontSize: "16px",
                width: "100%",
                backgroundColor: colorBgPrimary,
                borderRadius: "20px",
                border: "0",
                maxWidth: "300px",
                height: "44px",
                display: "flex",
                justifyContent: "center",
                textTransform: "none",
                alignItems: "center",
                cursor: "pointer",
                color: "white",
                ":hover": { backgroundColor: colorBgSecondary },
                "&:focus": {
                  outline: "none",
                },
              }}
            >
              Iniciar Sesión
            </Button>

            <Typography variant="body2" align="center">
              ¿No tienes una cuenta?
              <Button
                variant="text"
                sx={{
                  color: colorTextSecondary,
                  textTransform: "none",
                  "&:focus": {
                    outline: "none",
                  },
                  ":hover": {
                    textDecoration: "underline",
                    backgroundColor: "white",
                    color: colorTextPrimary,
                  },
                }}
                onClick={()=>{navegate("/registrar")}}
              >
                Regístrate aquí
              </Button>
            </Typography>
          </form>
          <AdminLogin setAutenticacion={setAutenticacion} />

        </Paper>
        <Typography variant="body2" color="#5D5D5D" marginTop={2}>
          © 2025 Sistema de Registro. Todos los derechos reservados.
        </Typography>
      </Container>

      {/*<div>
        <Snackbar open={openAddCart} autoHideDuration={3400} onClose={() => setOpenAddCart(false)}>
          <Alert onClose={() => setOpenAddCart(false)} severity="success" sx={{ width: "100%", backgroundColor: "#00A78E", color: 'white' }}>
            ¡Producto Agregado al carrito con éxito!
          </Alert>
        </Snackbar>
      </div>*/}
    </>
  );
};

export default Login;
