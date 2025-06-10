import React from 'react'
import {
    Box,
    Grid,
    TextField,
    Button,
    MenuItem,
    InputLabel,
    Typography,
    Container,
    Card,
    CardContent,
    Divider,
    IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { bg_boton } from "../styled/styled";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { mostrarSolicitudes, solicitudCambioPassword } from '../helppers/solicitudes';

const validationSchema = Yup.object({
    cedula: Yup.string().matches(/^[0-9]+$/, "Solo se permiten números").required("Requerido"),
    telefono: Yup.string().required("Requerido"),
    correo: Yup.string().email("Correo inválido").required("Requerido"),
    password: Yup.string()
        .min(6, 'Mínimo 6 caracteres')
        .required('Requerido'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
        .required('Requerido'),
});
const CambiarPassword = () => {

    const navigate = useNavigate()

        const formik = useFormik({
            initialValues: {
                cedula: "",
                telefono: "",
                correo: "",
                password: "",
                confirmPassword: "",
            },
            validationSchema,
            onSubmit: async (values, { setErrors }) => {
                console.log("enviando.....")
                const datos = await mostrarSolicitudes()
                 console.log(datos)
                const result = await solicitudCambioPassword(values.cedula, values.password)
                //const result = await crearUsuario(values)
                //const result = await registrarUsuarioAuth(values, values.password)
    
    
                if (result.success) {
                  alert("✅ " + result.message)
                   formik.resetForm();
                }
            },
        });

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
            <Card elevation={3} sx={{ position: 'relative' }}>
                <IconButton sx={{ position: "absolute", top: 18, left: 18, "&:hover": { color: bg_boton } }} onClick={
                    () => {
                        navigate("/login")
                    }
                }><ArrowBackIcon /></IconButton>
                <CardContent>

                    <Typography
                        sx={{ color: bg_boton }}
                        variant="h5"
                        gutterBottom
                        fontWeight="bold"
                    >
                        Cambiar Contraseña
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    <Box component="form" onSubmit={formik.handleSubmit}>
                        <Grid
                            container
                            spacing={2}
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Box sx={{ display: "flex", width: "100%" }}>
                                <Grid item xs={12} sm={6} sx={{ padding: "3px" }}>
                                    <TextField
                                        fullWidth
                                        type='text'
                                        name='cedula'
                                        label="Número de Cédula"
                                        value={formik.values.cedula}
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                        }}
                                        error={formik.touched.cedula && Boolean(formik.errors.cedula)}
                                        helperText={formik.touched.cedula && formik.errors.cedula}
                                    />
                                </Grid>
                                {renderField("telefono", "Teléfono o Celular", formik)}
                                {renderField("correo", "Correo", formik)}
                                

                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }}>
                                {renderField("password", "Nueva Contraseña", formik, "password")}
                                {renderField("confirmPassword", "Confirmar Nueva contraseña", formik, "password")}

                            </Box>
                        </Grid>

                        <Box mt={4} textAlign="center">
                            <Button
                                sx={{ backgroundColor: bg_boton }}
                                variant="contained"
                                color="primary"
                                type="submit"
                                size="large"

                            >
                                Solicitar Cambio
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

        </Container>
    );
  
}
const renderField = (name, label, formik, type = "text") => (
    <Grid item xs={12} sm={6} sx={{ padding: "3px" }}>
        <TextField
            fullWidth
            type={type}
            name={name}
            label={label}
            value={formik.values[name]}
            onChange={(e) => {

                formik.handleChange(e);
      
            }}

            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
            InputLabelProps={type === "date" ? { shrink: true } : {}}
        />
    </Grid>
);
export default CambiarPassword