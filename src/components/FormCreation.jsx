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
  Autocomplete,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { isValid, parseISO, subYears } from "date-fns";
import { crearRegistro, validarCedulaVotante } from "../helppers/crearVotante";
import { barriosPorComuna, comunas, listado_puestos_votacion, puestos_de_Votacion } from "../helppers/data";
import { bg_boton } from "../styled/styled";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/userContext";
import { validarCedulaUsuario } from "../helppers/crearUsuario";
import { calcularEdad } from "../helppers/functions";
import { Label } from "@mui/icons-material";

const municipios = ["CALI"];
const sexos = ["Femenino", "Masculino"];

const fechaLimite = new Date('2011-10-18');


const validationSchema = Yup.object({
  cedula: Yup.string().matches(/^[0-9]+$/, "Solo se permiten números").min(6, "Debe tener al menos 6 dígitos").required("Requerido"),
  nombre: Yup.string().required("Requerido"),
  apellidos: Yup.string().required("Requerido"),
  fecha_de_nacimiento: Yup.date().required("Requerido")
    .max(new Date(), "No puede ser una fecha futura").max(fechaLimite, 'Debe tener al menos 14 años a la fecha de votacion'),
  sexo: Yup.string().required("Requerido"),
  telefono: Yup.string().required("Requerido"),
  correo: Yup.string().email("Correo inválido").required("Requerido"),
  direccion: Yup.string().required("Requerido"),
  municipio: Yup.string().required("Requerido"),
  barrio: Yup.string().required("Requerido"),
  puesto_votacion: Yup.string().oneOf(listado_puestos_votacion, 'Selecciona un puesto válido'),
  comuna: Yup.string().required("Requerido"),
});

const FormCreation = () => {

  const { context, setContext } = useContext(AppContext)
  const [usuarioExistente, setUsuarioExistente] = useState(false)
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      cedula: "",
      nombre: "",
      apellidos: "",
      edad: "",
      fecha_de_nacimiento: "",
      sexo: "",
      telefono: "",
      correo: "",
      direccion: "",
      municipio: "CALI",
      barrio: "",
      puesto_votacion: "",
      comuna: "",
      comunaPuestoVotacion: "",
      direccionPuestoVotacion: "",
      validacion_puesto: "NO",
    },
    validationSchema,
    onSubmit: async (values) => {

      if (!usuarioExistente) {
        const result = await crearRegistro(values, context.cedula, "NO");
        if (result.success) {
          alert("✅ " + result.message)
          formik.resetForm();
        } else {
          alert("❌ " + "El referido ya se encuentra registrado")
        }
      } else {
        alert("❌ " + "El referido ya se encuentra registrado como usuario")
      }
    },
  });

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

  //const selectedPuesto = formik.values.puesto_votacion;
  ///const comunaPuesto = selectedPuesto && formik.setFieldValue('comunaPuestoVotacion', puestos_de_Votacion[selectedPuesto].Comuna || 'ninguno');

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
            navigate("/inicio")

          }
        }><ArrowBackIcon /></IconButton>
        <Box sx={{ position: 'absolute', top: 4, right: 18 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button
              component="a"
              href="https://wsp.registraduria.gov.co/censocmlj/consultar/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                width: 120,
                height: 45,
                borderRadius: '10%',
                backgroundImage: 'url("https://res.cloudinary.com/dqgbna4ni/image/upload/v1752270907/registraduria_mgsmit.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minWidth: 0,
                padding: 0,
                border: '2px solid #ccc',
                '&:hover': {
                  filter: 'brightness(1.1)',
                  border: '2px solid #999',
                },
              }}
            />
            <Typography variant="caption" sx={{ color: bg_boton, marginTop: '4px' }}>
              Consulta puesto
            </Typography>
          </Box>
        </Box>





        <CardContent>

          <Typography
            sx={{ color: bg_boton, textAlign: { xs: 'left', sm: 'center' } , marginLeft:  { xs: '60px', sm: '1px' } }}
            variant="h5"
            gutterBottom
            fontWeight="bold"
          >
            Registrar Referido
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
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    onBlur={async (e) => {
                      formik.handleBlur(e);
                      const cedula = e.target.value.trim();

                      if (!cedula) return;

                      const yaExiste = await validarCedulaVotante(parseInt(cedula, 10));
                      const yaExisteUsuario = await validarCedulaUsuario(parseInt(cedula, 10));
                      setUsuarioExistente(yaExisteUsuario)

                      if (yaExiste || yaExisteUsuario) {
                        formik.setFieldError('cedula', 'Esta cédula ya está registrada');
                      }
                    }}
                    error={formik.touched.cedula && Boolean(formik.errors.cedula)}
                    helperText={formik.touched.cedula && formik.errors.cedula}
                  />
                </Grid>

                {renderField("nombre", "Nombre", formik)}
                {renderField("apellidos", "Apellidos", formik)}
                {renderField("telefono", "Teléfono o Celular", formik)}
              </Grid>
              <Grid container spacing={2}>
                {renderField("direccion", "Dirección", formik)}
                {renderField("correo", "Correo", formik)}
                {renderField("fecha_de_nacimiento", "Fecha de nacimiento", formik, "date")}
                {renderSelect("sexo", "Sexo", sexos, formik)}
              </Grid>
              <Grid container spacing={2}>
                {renderSelect("municipio", "Municipio", municipios, formik)}
                {renderSelect("comuna", "Comuna", comunas, formik)}
                {renderSelect("barrio", "Barrio", barrios, formik)}
              </Grid>
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
                <Grid container spacing={2}>
                  <TextField
                    fullWidth
                    label="Comuna por Puesto"
                    value={formik.values.comunaPuestoVotacion || ''}
                    margin="normal"
                    InputProps={{ readOnly: true }}
                    sx={{ marginTop: 0, width: '150px', backgroundColor: '#D3D3D3' }}
                  />
                </Grid>
                <Grid container spacing={2}>
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
      value={formik.values[name] ?? ''}
      onChange={(e) => {

        formik.handleChange(e);
        if (name === "fecha_de_nacimiento") {
          formik.setFieldValue("edad", calcularEdad(formik.values.fecha_de_nacimiento)); // Resetea barrio si cambia comuna
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

      }}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      sx={{ minWidth: "200px" }}
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
