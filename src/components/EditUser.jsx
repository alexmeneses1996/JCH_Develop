import React, { useContext, useEffect, useState } from "react";
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
    Checkbox,
    FormControlLabel,
    Autocomplete,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { barriosPorComuna, comunas, listado_puestos_votacion, puestos_de_Votacion } from "../helppers/data";
import { bg_boton } from "../styled/styled";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { devolverUsuario, updateUser } from "../helppers/crearUsuario";
import { AppContext } from "../context/userContext";
import { calcularEdad, capitalizarCadaPalabra } from "../helppers/functions";

const municipios = ["CALI"];
const sexos = ["Femenino", "Masculino"];


const validationSchema = Yup.object({
    actualizarContrasena: Yup.boolean(),
    cedula: Yup.string().matches(/^[0-9]+$/, "Solo se permiten números").required("Requerido"),
    nombre: Yup.string().required("Requerido"),
    apellidos: Yup.string().required("Requerido"),
    fecha_de_nacimiento: Yup.date().required("Requerido")
        .max(new Date(), "No puede ser una fecha futura"),
    sexo: Yup.string().required("Requerido"),
    telefono: Yup.string().required("Requerido"),
    correo: Yup.string().email("Correo inválido").required("Requerido"),
    direccion: Yup.string().required("Requerido"),
    municipio: Yup.string().required("Requerido"),
    barrio: Yup.string().required("Requerido"),
    puesto_votacion: Yup.string().oneOf(listado_puestos_votacion, 'Selecciona un puesto válido'),
    comuna: Yup.string().required("Requerido"),
    password: Yup.string().when("actualizarContrasena", {
        is: true,
        then: () => Yup.string().min(6, 'Mínimo 6 caracteres').required('Requerido'),
        otherwise: () => Yup.string().notRequired(),
    }),
    confirmPassword: Yup.string().when("actualizarContrasena", {
        is: true,
        then: () => Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden').required('Requerido'),
        otherwise: () => Yup.string().notRequired(),
    })

});
const EditUser = ({ user }) => {

    const navigate = useNavigate()
    const { context, setContext } = useContext(AppContext)
    const formik = useFormik({
        initialValues: {
            actualizarContrasena: false,
            cedula: user.cedula,
            nombre: user.nombre,
            apellidos: user.apellidos,
            edad: user.edad,
            fecha_de_nacimiento: user.fecha_de_nacimiento,
            sexo: user.sexo,
            telefono: user.telefono,
            correo: user.correo,
            direccion: user.direccion,
            municipio: "CALI",
            barrio: user.barrio,
            puesto_votacion: user.puesto_votacion,
            comuna: user.comuna,
            password: "",
            confirmPassword: "",
            validacion_puesto: "NO",
            comunaPuestoVotacion: "",
            direccionPuestoVotacion: "",

        },
        validationSchema,
        onSubmit: async (values, { setErrors }) => {
            alert("editado correctamente")
            const newData = {
                nombre: capitalizarCadaPalabra(values.nombre),
                apellidos: capitalizarCadaPalabra(values.apellidos),
                edad: values.edad,
                fecha_de_nacimiento: values.fecha_de_nacimiento,
                sexo: values.sexo,
                telefono: values.telefono,
                correo: values.correo,
                direccion: values.direccion,
                municipio: values.municipio,
                barrio: values.barrio,
                puesto_votacion: values.puesto_votacion,
                comuna: values.comuna,
                nombre_completo: capitalizarCadaPalabra(values.nombre + " " + values.apellidos)
            }
            const result = await updateUser(values.cedula, newData)

            if (result.success) {

                const res = await devolverUsuario(values.cedula)
                if (res.success) {
                    setContext(res.data)
                    alert("✅ " + result.message)
                }

            }

            navigate("/perfil")

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

    useEffect(() => {
        const puesto = formik.values.puesto_votacion;
        if (puesto && puestos_de_Votacion[puesto]) {
            const info = puestos_de_Votacion[puesto];
            formik.setFieldValue('comunaPuestoVotacion', info.Comuna);
            formik.setFieldValue('direccionPuestoVotacion', info.Direccion);

        } else {
            formik.setFieldValue('comunaPuestoVotacion', '');
            formik.setFieldValue('direccionPuestoVotacion', '');

        }
    }, [formik.values.puesto_votacion]);




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
                        navigate("/perfil")
                    }
                }><ArrowBackIcon /></IconButton>
                <CardContent>

                    <Typography
                        sx={{ color: bg_boton }}
                        variant="h5"
                        gutterBottom
                        fontWeight="bold"
                    >
                        Editar Perfil
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
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} sx={{ padding: "3px" }}>
                                    <TextField
                                        fullWidth
                                        type='text'
                                        name='cedula'
                                        label="Número de Documento"
                                        value={formik.values.cedula}
                                        InputProps={{ readOnly: true }}
                                        onChange={formik.handleChange}
                                        //onBlur={validacionRepetido}
                                        error={formik.touched.cedula && Boolean(formik.errors.cedula)}
                                        helperText={formik.touched.cedula && formik.errors.cedula}
                                    />
                                </Grid>
                                {renderField("nombre", "Nombre", formik)}
                                {renderField("apellidos", "Apellidos", formik)}
                                {renderField("fecha_de_nacimiento", "Fecha de nacimiento", formik, "date")}

                            </Grid>
                            <Box sx={{ display: "flex", width: "100%" }}>
                                {renderField("telefono", "Teléfono o Celular", formik)}
                                {renderSelect("sexo", "Sexo", sexos, formik)}
                                


                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }}>
                                {renderField("direccion", "Dirección", formik)}
                                {renderField("correo", "Correo", formik)}
                                {renderSelect("municipio", "Municipio", municipios, formik)}
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }}>
                                {renderSelect("comuna", "Comuna", comunas, formik)}
                                {renderSelect("barrio", "Barrio", barrios, formik)}

                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} sx={{ padding: "3px" }}>
                                    <Autocomplete
                                        fullWidth
                                        freeSolo
                                        options={listado_puestos_votacion}
                                        value={formik.values.puesto_votacion}
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('puesto_votacion', newValue || '');
                                        }}
                                        sx={{ width: "350px" }}
                                        onInputChange={(event, newInputValue) => {
                                            formik.setFieldValue('puesto_votacion', newInputValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Puesto de Votación"
                                                name="puesto_votacion"
                                                fullWidth
                                                margin="normal"
                                                error={
                                                    formik.touched.puesto_votacion &&
                                                    Boolean(formik.errors.puesto_votacion)
                                                }
                                                helperText={
                                                    formik.touched.puesto_votacion && formik.errors.puesto_votacion
                                                }
                                                sx={{ marginTop: 0 }}
                                                onBlur={formik.handleBlur}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ padding: "3px" }}>
                                    <TextField
                                        fullWidth
                                        label="Comuna por Puesto"
                                        value={formik.values.comunaPuestoVotacion || ''}
                                        margin="normal"
                                        InputProps={{ readOnly: true }}
                                        sx={{ marginTop: 0, width: '150px', backgroundColor: '#D3D3D3' }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ padding: "3px" }}>
                                    <TextField
                                        fullWidth
                                        label="Direccion por Puesto"
                                        value={formik.values.direccionPuestoVotacion || ''}
                                        margin="normal"
                                        InputProps={{ readOnly: true }}
                                        sx={{ marginTop: 0, minWidth: '300px', backgroundColor: '#D3D3D3' }}
                                    />
                                </Grid>
                            </Grid>
                            <Box sx={{ display: "flex", width: "100%" }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="actualizarContrasena"
                                            checked={formik.values.actualizarContrasena}
                                            onChange={formik.handleChange}
                                            color="primary"
                                        />
                                    }
                                    label="¿Deseas actualizar contraseña?"
                                />
                                {renderField("password", "Contraseña", formik, "password", !formik.values.actualizarContrasena)}
                                {renderField("confirmPassword", "Confirmar contraseña", formik, "password", !formik.values.actualizarContrasena)}
                                {/*formik.values.actualizarContrasena && (
                                    <>
                                        {renderField("password", "Contraseña", formik, "password", !formik.values.actualizarContrasena)}
                                        {renderField("confirmPassword", "Confirmar contraseña", formik, "password", !formik.values.actualizarContrasena)}
                                   /*</Box> </>)*/}

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
                                Finalizar Edición
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

        </Container>
    );
};

// 🧩 Componentes auxiliares:

const renderField = (name, label, formik, type = "text", disabled = false) => (
    <Grid item xs={12} sm={6} sx={{ padding: "3px" }}>
        <TextField
            fullWidth
            type={type}
            name={name}
            label={label}
            value={formik.values[name]}
            onChange={(e) => {
                formik.handleChange(e);
                if (name === "fecha_de_nacimiento") {
                    formik.setFieldValue("edad", calcularEdad(formik.values.fecha_de_nacimiento)); // Resetea barrio si cambia comuna
                }
            }}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
            InputLabelProps={type === "date" ? { shrink: true } : {}}
            disabled={disabled}
            autoComplete={
                name === "password" ? "new-password" :
                    name === "confirmPassword" ? "new-password" :
                        "off"
            }
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
            onChange={formik.handleChange}
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
export default EditUser