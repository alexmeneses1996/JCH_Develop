import React from "react";
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
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { isValid, parseISO, subYears } from "date-fns";
import { crearRegistro, mostrarRegistro } from "../helppers/crearVotante";
import { barriosPorComuna, comunas } from "../helppers/data";

const municipios = ["CALI"];
const barrios = ["ALFONSO BONILLA ARAGON"];
const sexos = ["Femenino", "Masculino"];

const validationSchema = Yup.object({
  cedula: Yup.string()
    .matches(/^[0-9]+$/, "Solo se permiten números")
    .required("Requerido"),
  nombre: Yup.string().required("Requerido"),
  apellidos: Yup.string().required("Requerido"),
  edad: Yup.string().required("Requerido"),
  sexo: Yup.string().required("Requerido"),
  telefono: Yup.string().required("Requerido"),
  correo: Yup.string().email("Correo inválido").required("Requerido"),
  direccion: Yup.string().required("Requerido"),
  municipio: Yup.string().required("Requerido"),
  barrio: Yup.string().required("Requerido"),
  puestoVotacion: Yup.string().required("Requerido"),
  comuna: Yup.string().required("Requerido"),
});

const FormCreation = () => {
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
      puestoVotacion: "",
      comuna: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("prueba");
      console.log(values);
      crearRegistro(values);
    },
  });

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
      <Card elevation={3}>
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            fontWeight="bold"
            color="primary"
          >
            Registrar Votantes
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
                {renderField("cedula", "Número de Cédula", formik)}
                {renderField("nombre", "Nombre", formik)}
                {renderField("apellidos", "Apellidos", formik)}
                {renderField("telefono", "Teléfono o Celular", formik)}
              </Box>
              <Box sx={{ display: "flex", width: "100%" }}>
                {renderField("direccion", "Dirección", formik)}
                {renderField("correo", "Correo", formik)}
                {renderField("edad", "Edad", formik)}
                {renderSelect("sexo", "Sexo", sexos, formik)}
              </Box>
              <Box sx={{ display: "flex", width: "100%" }}>
                {renderSelect("municipio", "Municipio", municipios, formik)}
                {renderSelect("comuna", "Comuna", comunas, formik)}
                {renderSelect("barrio", "Barrio", barrios, formik)}
                {renderField("puestoVotacion", "Puesto de Votación", formik)}
              </Box>
            </Grid>

            <Box mt={4} textAlign="center">
              <Button
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
      <Button onClick={mostrarRegistro}>MOSTRAR</Button>
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
      onChange={formik.handleChange}
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

export default FormCreation;
