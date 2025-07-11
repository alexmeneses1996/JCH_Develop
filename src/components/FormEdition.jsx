import React from 'react';
import { Box, Grid, TextField, Button, MenuItem, InputLabel, Typography, Container } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const municipios = ['CALI'];
const barrios = ['ALFONSO BONILLA ARAGON'];
const generos = ['Femenino', 'Masculino', 'Otro'];
const comunas = ['Comuna 1', 'Comuna 22', 'Comuna 3']

const validationSchema = Yup.object({
  cedula: Yup.string().required('Requerido'),
  nombres: Yup.string().required('Requerido'),
  apellidos: Yup.string().required('Requerido'),
  fechaNacimiento: Yup.date().required('Requerido'),
  genero: Yup.string().required('Requerido'),
  telefono: Yup.string().required('Requerido'),
  correo: Yup.string().email('Correo inválido').required('Requerido'),
  direccion: Yup.string().required('Requerido'),
  municipio: Yup.string().required('Requerido'),
  barrio: Yup.string().required('Requerido'),
  puesto_votacion: Yup.string().required('Requerido'),
  zona: Yup.string().required('Requerido'),
  comuna: Yup.string().required('Requerido'),
  referido: Yup.string(),
  password: Yup.string(),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
});

const FormEdition = () => {
  const formik = useFormik({
    initialValues: {
      cedula: '',
      nombres: '',
      apellidos: '',
      fechaNacimiento: '',
      genero: '',
      telefono: '',
      correo: '',
      direccion: '',
      municipio: '',
      barrio: '',
      puesto_votacion: '',
      zona: '',
      comuna: '',
      referido: '',
      password: '',
      confirmPassword: '',
      imagen: null,
      validacion_puesto:"NO",
    },
    validationSchema,
    onSubmit: values => {
      console.log(values);
    }
  });

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb( 248, 249, 250)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '64px',
        margin: '0px'
      }}
    >


      <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Actualizar Perfil</Typography>

        <Grid container spacing={2}>
          {/* Primera fila */}
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Número de Documento"
              name="cedula"
              value={formik.values.cedula}
              onChange={formik.handleChange}
              error={formik.touched.cedula && Boolean(formik.errors.cedula)}
              helperText={formik.touched.cedula && formik.errors.cedula}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Nombres"
              name="nombres"
              value={formik.values.nombres}
              onChange={formik.handleChange}
              error={formik.touched.nombres && Boolean(formik.errors.nombres)}
              helperText={formik.touched.nombres && formik.errors.nombres}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Apellidos"
              name="apellidos"
              value={formik.values.apellidos}
              onChange={formik.handleChange}
              error={formik.touched.apellidos && Boolean(formik.errors.apellidos)}
              helperText={formik.touched.apellidos && formik.errors.apellidos}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Fecha de Nacimiento"
              name="fechaNacimiento"
              type="date"
              value={formik.values.fechaNacimiento}
              onChange={formik.handleChange}
              InputLabelProps={{ shrink: true }}
              error={formik.touched.fechaNacimiento && Boolean(formik.errors.fechaNacimiento)}
              helperText={formik.touched.fechaNacimiento && formik.errors.fechaNacimiento}
            />
          </Grid>

          {/* Segunda fila */}
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Género"
              name="genero"
              value={formik.values.genero}
              onChange={formik.handleChange}
              error={formik.touched.genero && Boolean(formik.errors.genero)}
              helperText={formik.touched.genero && formik.errors.genero}
              sx={{ minWidth: '100px' }}
            >
              {generos.map(op => <MenuItem key={op} value={op}>{op}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Teléfono o Celular"
              name="telefono"
              value={formik.values.telefono}
              onChange={formik.handleChange}
              error={formik.touched.telefono && Boolean(formik.errors.telefono)}
              helperText={formik.touched.telefono && formik.errors.telefono}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Correo"
              name="correo"
              value={formik.values.correo}
              onChange={formik.handleChange}
              error={formik.touched.correo && Boolean(formik.errors.correo)}
              helperText={formik.touched.correo && formik.errors.correo}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Dirección"
              name="direccion"
              value={formik.values.direccion}
              onChange={formik.handleChange}
              error={formik.touched.direccion && Boolean(formik.errors.direccion)}
              helperText={formik.touched.direccion && formik.errors.direccion}
            />
          </Grid>

          {/* Tercera fila */}
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Municipio"
              name="municipio"
              value={formik.values.municipio}
              onChange={formik.handleChange}
              error={formik.touched.municipio && Boolean(formik.errors.municipio)}
              helperText={formik.touched.municipio && formik.errors.municipio}
              sx={{ minWidth: '120px' }}
            >
              {municipios.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Barrio"
              name="barrio"
              value={formik.values.barrio}
              onChange={formik.handleChange}
              error={formik.touched.barrio && Boolean(formik.errors.barrio)}
              helperText={formik.touched.barrio && formik.errors.barrio}
              sx={{ minWidth: '100px' }}
            >
              {barrios.map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Puesto de Votación"
              name="puesto_votacion"
              value={formik.values.puesto_votacion}
              onChange={formik.handleChange}
              error={formik.touched.puesto-votacion && Boolean(formik.errors.puesto_votacion)}
              helperText={formik.touched.puesto_votacion && formik.errors.puesto_votacion}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Zona"
              name="zona"
              value={formik.values.zona}
              onChange={formik.handleChange}
              error={formik.touched.zona && Boolean(formik.errors.zona)}
              helperText={formik.touched.zona && formik.errors.zona}
            />
          </Grid>

          {/* Otros campos */}
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Comuna"
              name="comuna"
              value={formik.values.comuna}
              onChange={formik.handleChange}
              error={formik.touched.comuna && Boolean(formik.errors.comuna)}
              helperText={formik.touched.comuna && formik.errors.comuna}
              sx={{ minWidth: '120px' }}
            >
              {comunas.map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Referido / Observación"
              name="referido"
              value={formik.values.referido}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Desea cambiar contraseña"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Confirmar Contraseña"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </Grid>

          {/* Imagen */}
          <Grid item xs={12}>
            <InputLabel>Imagen</InputLabel>
            <input
              name="imagen"
              type="file"
              onChange={(event) => {
                formik.setFieldValue("imagen", event.currentTarget.files[0]);
              }}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '3rem' }}>
          Actualizar Perfil
        </Button>
      </Box>
    </Container>
  );
};

export default FormEdition;
