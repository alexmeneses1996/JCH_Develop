import React, { useState } from "react";
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
import { barriosPorComuna, comunas } from "../helppers/data";
import { bg_boton } from "../styled/styled";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { registrarUsuarioAuth, validarCedulaUsuario } from "../helppers/crearUsuario";

const municipios = ["CALI"];
const sexos = ["Femenino", "Masculino"];

const validationSchema = Yup.object({
    cedula: Yup.string().matches(/^[0-9]+$/, "Solo se permiten números").required("Requerido"),
    nombre: Yup.string().required("Requerido"),
    apellidos: Yup.string().required("Requerido"),
    edad: Yup.string().required("Requerido"),
    sexo: Yup.string().required("Requerido"),
    telefono: Yup.string().required("Requerido"),
    correo: Yup.string().email("Correo inválido").required("Requerido"),
    direccion: Yup.string().required("Requerido"),
    municipio: Yup.string().required("Requerido"),
    barrio: Yup.string().required("Requerido"),
    puesto_votacion: Yup.string().required("Requerido"),
    comuna: Yup.string().required("Requerido"),
    password: Yup.string()
        .min(6, 'Mínimo 6 caracteres')
        .required('Requerido'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
        .required('Requerido'),
});
const RegistroUser = () => {

    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            cedula: "",
            nombre: "",
            apellidos: "",
            edad: "",
            sexo: "",
            telefono: "",
            correo: "",
            direccion: "",
            municipio: "",
            barrio: "",
            puesto_votacion: "",
            comuna: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: async (values, { setErrors }) => {
            //const result = await crearUsuario(values)
            const result = await registrarUsuarioAuth(values, values.password)


            if (result.success) {
                alert("✅ " + result.message)
                formik.resetForm();
            }
        },
    });


    const validacionRepetido = async (e) => {
        formik.handleBlur(e);
        const cedula = e.target.value.trim();

        if (!cedula) return;

        const yaExiste = await validarCedulaUsuario(cedula);
        console.log(yaExiste)
        if (yaExiste) {
            formik.setFieldError('cedula', 'Esta cédula ya está registrada');
        }
    }




    let valor = 1
    const selectedComuna = formik.values.comuna;
    const barrios = selectedComuna ? barriosPorComuna[selectedComuna] || [] : [];

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
                        Registrar Usuario
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
                                        onBlur={validacionRepetido}
                                        error={formik.touched.cedula && Boolean(formik.errors.cedula)}
                                        helperText={formik.touched.cedula && formik.errors.cedula}
                                    />
                                </Grid>
                                {renderField("password", "Contraseña", formik, "password")}
                                {renderField("confirmPassword", "Confirmar contraseña", formik, "password")}

                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }}>
                                {renderField("nombre", "Nombre", formik)}
                                {renderField("apellidos", "Apellidos", formik)}
                                {renderField("telefono", "Teléfono o Celular", formik)}
                                {renderSelect("sexo", "Sexo", sexos, formik)}

                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }}>
                                {renderField("direccion", "Dirección", formik)}
                                {renderField("correo", "Correo", formik)}
                                {renderField("edad", "Edad", formik)}
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }}>
                                {renderSelect("municipio", "Municipio", municipios, formik)}
                                {renderSelect("comuna", "Comuna", comunas, formik)}
                                {renderSelect("barrio", "Barrio", barrios, formik)}
                                {renderField("puesto_votacion", "Puesto de Votación", formik)}
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
                                Realizar Registro
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

        </Container>
    );
};

// 🧩 Componentes auxiliares:

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
                if (name === "cedula") {
                    formik.setFieldValue("direccion", "hola1"); // Resetea barrio si cambia comuna
                }
            }}
            onBlur={(e) => {
                if (name === "cedula") {
                    validarIdEnBD()
                    //formik.setFieldValue("direccion", "es una prueba"); // Resetea barrio si cambia comuna
                    //formik.setFieldError("cedula", "Error salio")
                    //console.log("Error establecido:", formik.errors);
                }
            }}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
            InputLabelProps={type === "date" ? { shrink: true } : {}}
        />
    </Grid>
);


const renderSelect = (name, label, options, formik) => (
    <Grid item xs={12} sm={6} sx={{ padding: "3px" }}>
        <TextField
            fullWidth
            select
            label={label}
            name={name}
            value={formik.values[name]}
            onChange={(e) => {
                formik.handleChange(e);
                if (name === "comuna") {
                    formik.setFieldValue("barrio", ""); // Resetea barrio si cambia comuna
                }
            }}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
            sx={{ minWidth: "150px" }}
        >
            {options.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
    </Grid>
);
export default RegistroUser