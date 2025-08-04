import { Autocomplete, Box, Button, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Modal, Select, Switch, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import { Edit } from '@mui/icons-material';
import { barriosPorComuna, comunas, listado_puestos_votacion, puestos_de_Votacion } from '../helppers/data';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { AppContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { updateVotante } from '../helppers/crearVotante';
import { calcularEdad, capitalizarCadaPalabra } from '../helppers/functions';

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
    barrio: Yup.string().required("Requerido"),
    puesto_votacion: Yup.string().oneOf(listado_puestos_votacion, 'Selecciona un puesto válido'),
    comuna: Yup.string().required("Requerido"),

});
const AdminEditVotante = ({ votante }) => {
    const { context, setContext } = useContext(AppContext)
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            cedula: votante.cedula,
            nombre: votante.nombre,
            apellidos: votante.apellidos,
            edad: votante.edad,
            fecha_de_nacimiento: votante.fecha_de_nacimiento,
            sexo: votante.sexo,
            telefono: votante.telefono,
            correo: votante.correo,
            direccion: votante.direccion,
            municipio: "CALI",
            barrio: votante.barrio,
            puesto_votacion: votante.puesto_votacion,
            comuna: votante.comuna,
            validacion_puesto: votante.validacion_puesto,
            comunaPuestoVotacion:"",
            direccionPuestoVotacion: "",
        },
        validationSchema,
        onSubmit: async (values, { setErrors }) => {


            const newData = {
                nombre: capitalizarCadaPalabra(values.nombre),
                apellidos: capitalizarCadaPalabra(values.apellidos),
                edad: calcularEdad(datos.fecha_de_nacimiento),
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


            //
            const result = await updateVotante(values.cedula, newData)

            //const result = await updateUser(values.cedula, newData)

            if (result.success) {
                alert("✅ " + result.message)
                handleClose()
                navigate("/")

                //const res = await devolverUsuario(values.cedula)
                //if (res.success) {
                //  setContext(res.data)
                //  alert("✅ " + result.message)
                //}

            }

            // navigate("/perfil")
        },
    });

    const [cedula, setCedula] = useState(votante.cedula);
    const [nombre, setNombre] = useState(votante.nombre);
    const [apellido, setApellido] = useState(votante.apellidos);
    const [sexo, setSexo] = useState(votante.sexo);
    const [correo, setCorreo] = useState(votante.correo);
    const [telefono, setTelefono] = useState(votante.telefono);
    const [direccion, setDireccion] = useState(votante.direccion);
    const [comuna, setComuna] = useState(votante.comuna);
    const [barrio, setBarrio] = useState(votante.barrio);
    const [puesto_votacion, setPuesto_votacion] = useState(votante.puesto_votacion);



    const sexos = ["Femenino", "Masculino"];


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmitAdmin = async (event) => {
        event.preventDefault();
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90vw',
        maxWidth: "700px",
        bgcolor: 'background.paper',
        border: '2px solid #efe7da',
        boxShadow: 24,
        borderRadius: 4,
        p: 1,
        margin: '5px'
        
    };



    useEffect(() => {

        const nuevaComuna = formik.values.comuna;
        const barriosActualizados = nuevaComuna ? barriosPorComuna[nuevaComuna] || [] : [];

        // Si el barrio actual no está en la nueva lista, lo reseteamos
        if (!barriosActualizados.includes(formik.values.barrio)) {
            formik.setFieldValue('barrio', '');
        }
    }, [formik.values.comuna]);


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


    const selectedComuna = formik.values.comuna;
    const barrios = selectedComuna ? barriosPorComuna[selectedComuna] || [] : [];

    return (
        <>
            <IconButton><Edit color="info" onClick={handleOpen} /></IconButton>

            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        onSubmit={formik.handleSubmit}
                    >
                        <IconButton onClick={handleClose} sx={{ position: "absolute", top: 8, left: 8, "&:hover": { color: 'red' } }}>
                            <CancelIcon />
                        </IconButton>

                        <Typography sx={{
                            display: 'flex', alignItems: "center",
                            justifyContent: "center", fontSize: "40px", fontWeight: "bold"
                        }}>Editar Referido</Typography>

                       <Box sx={{ display: 'flex' 
                             }}>

                            <FormControl sx={{ m: 1, width: { xs: '100%', sm: '200px' }, backgroundColor: "#efe7da", borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Documento"
                                    name="cedula"
                                    value={formik.values.cedula}
                                    variant='filled'
                                    InputProps={{ readOnly: true }}
                                    onChange={formik.handleChange}
                                    error={formik.touched.cedula && Boolean(formik.errors.cedula)}
                                    helperText={formik.touched.cedula && formik.errors.cedula}
                                    sx={{
                                        borderRadius: "40px",
                                        overflow: "hidden",
                                        '& .MuiFilledInput-root': {
                                            borderRadius: "40px",
                                            backgroundColor: "#efe7da" // Asegura que el color de fondo coincida
                                        }
                                    }}
                                />
                            </FormControl>

                            <FormControl sx={{ m: 1, width: { xs: '100%', sm: '200px' }, backgroundColor: "#efe7da", borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Nombre"
                                    name="nombre"
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                    error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                                    helperText={formik.touched.nombre && formik.errors.nombre}
                                    variant='filled'
                                    sx={{
                                        borderRadius: "40px",
                                        overflow: "hidden",
                                        '& .MuiFilledInput-root': {
                                            borderRadius: "40px",
                                            backgroundColor: "#efe7da" // Asegura que el color de fondo coincida
                                        }
                                    }}
                                />
                            </FormControl>


                            <FormControl sx={{ m: 1, width: { xs: '100%', sm: '200px' }, backgroundColor: "#efe7da", borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Apellido"
                                    name="apellidos"
                                    value={formik.values.apellidos}
                                    onChange={formik.handleChange}
                                    error={formik.touched.apellidos && Boolean(formik.errors.apellidos)}
                                    helperText={formik.touched.apellidos && formik.errors.apellidos}
                                    variant='filled'
                                    sx={{
                                        borderRadius: "40px",
                                        overflow: "hidden",
                                        '& .MuiFilledInput-root': {
                                            borderRadius: "40px",
                                            backgroundColor: "#efe7da" // Asegura que el color de fondo coincida
                                        }
                                    }}
                                />
                            </FormControl>
                        </Box>

                        <Box sx={{flex: {
                                xs: "0 0 100%", 
                                sm: "0 0 50%",  
                                md: "0 0 25%",  
                            },}}>

                            <FormControl sx={{ m: 1, width: { xs: '100%', sm: '120px' }, backgroundColor: "#efe7da", borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Sexo"
                                    name="sexo"
                                    select
                                    value={formik.values.sexo}
                                    onChange={formik.handleChange}
                                    error={formik.touched.sexo && Boolean(formik.errors.sexo)}
                                    helperText={formik.touched.sexo && formik.errors.sexo}
                                    variant='filled'
                                    sx={{
                                        borderRadius: "40px",
                                        overflow: "hidden",
                                        '& .MuiFilledInput-root': {
                                            borderRadius: "40px",
                                            backgroundColor: "#efe7da" // Asegura que el color de fondo coincida
                                        }
                                    }}
                                >
                                    {sexos.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>

                            <FormControl sx={{ m: 1, width: { xs: '100%', sm: '130px' }, backgroundColor: "#efe7da", borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Fecha de nacimiento"
                                    name="fecha_de_nacimiento"
                                    value={formik.values.fecha_de_nacimiento ?? ""}
                                    type='date'
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        if (name === "fecha_de_nacimiento") {
                                            formik.setFieldValue("edad", calcularEdad(formik.values.fecha_de_nacimiento)); // Resetea barrio si cambia comuna
                                        }
                                    }}
                                    error={formik.touched.fecha_de_nacimiento && Boolean(formik.errors.fecha_de_nacimiento)}
                                    helperText={formik.touched.fecha_de_nacimiento && formik.errors.fecha_de_nacimiento}
                                    variant='filled'
                                    sx={{
                                        borderRadius: "40px",
                                        overflow: "hidden",
                                        '& .MuiFilledInput-root': {
                                            borderRadius: "40px",
                                            backgroundColor: "#efe7da" // Asegura que el color de fondo coincida
                                        }
                                    }}
                                    inputProps={{
                                        maxLength: 2
                                    }}

                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: { xs: '100%', sm: '130px' }, backgroundColor: "#efe7da", borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Telefono"
                                    name="telefono"
                                    value={formik.values.telefono}
                                    onChange={formik.handleChange}
                                    error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                                    helperText={formik.touched.telefono && formik.errors.telefono}
                                    variant='filled'
                                    sx={{
                                        borderRadius: "40px",
                                        overflow: "hidden",
                                        '& .MuiFilledInput-root': {
                                            borderRadius: "40px",
                                            backgroundColor: "#efe7da" // Asegura que el color de fondo coincida
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: { xs: '100%', sm: '230px' }, backgroundColor: "#efe7da", borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Correo"
                                    name="correo"
                                    value={formik.values.correo}
                                    onChange={formik.handleChange}
                                    error={formik.touched.correo && Boolean(formik.errors.correo)}
                                    helperText={formik.touched.correo && formik.errors.correo}
                                    variant='filled'
                                    sx={{
                                        borderRadius: "40px",
                                        overflow: "hidden",
                                        '& .MuiFilledInput-root': {
                                            borderRadius: "40px",
                                            backgroundColor: "#efe7da" // Asegura que el color de fondo coincida
                                        }
                                    }}
                                />
                            </FormControl>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap:'nowrap' }}>
                            <FormControl sx={{ m: 1, width: { xs: '100%', sm: '200px' }, backgroundColor: "#efe7da", borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Direccion"
                                    name="direccion"
                                    value={formik.values.direccion}
                                    onChange={formik.handleChange}
                                    error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                                    helperText={formik.touched.direccion && formik.errors.direccion}
                                    variant='filled'
                                    sx={{
                                        borderRadius: "40px",
                                        overflow: "hidden",
                                        '& .MuiFilledInput-root': {
                                            borderRadius: "40px",
                                            backgroundColor: "#efe7da" // Asegura que el color de fondo coincida
                                        }
                                    }}
                                />
                            </FormControl>

                            <FormControl sx={{ m: 1,width: { xs: '100%', sm: '200px' }, backgroundColor: "#efe7da", borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Comuna"
                                    name="comuna"
                                    select
                                    value={formik.values.comuna}
                                    onChange={formik.handleChange}
                                    error={formik.touched.comuna && Boolean(formik.errors.comuna)}
                                    helperText={formik.touched.comuna && formik.errors.comuna}
                                    variant='filled'
                                    sx={{
                                        borderRadius: "40px",
                                        overflow: "hidden",
                                        '& .MuiFilledInput-root': {
                                            borderRadius: "40px",
                                            backgroundColor: "#efe7da" // Asegura que el color de fondo coincida
                                        }
                                    }} >
                                    {comunas.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>

                            <FormControl sx={{ m: 1,width: { xs: '100%', sm: '200px' }, backgroundColor: "#efe7da", borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Barrio"
                                    name="barrio"
                                    select
                                    value={formik.values.barrio}
                                    onChange={formik.handleChange}
                                    error={formik.touched.barrio && Boolean(formik.errors.barrio)}
                                    helperText={formik.touched.barrio && formik.errors.barrio}
                                    variant='filled'
                                    sx={{
                                        borderRadius: "40px",
                                        overflow: "hidden",
                                        '& .MuiFilledInput-root': {
                                            borderRadius: "40px",
                                            backgroundColor: "#efe7da" // Asegura que el color de fondo coincida
                                        }
                                    }}
                                >
                                    <MenuItem value="">Selecciona un barrio</MenuItem>
                                    {barrios.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        </Box>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, width: "100%" }}>
                            {/* Autocomplete - Puesto de Votación */}
                            <FormControl
                                sx={{
                                    m: 1,
                                    width: "350px",
                                    backgroundColor: "#efe7da",
                                    borderRadius: "20px",
                                }}
                                variant="filled"
                            >
                                <Autocomplete
                                    freeSolo
                                    options={listado_puestos_votacion}
                                    value={formik.values.puesto_votacion ?? ""}
                                    onChange={(event, newValue) => {
                                        formik.setFieldValue("puesto_votacion", newValue || "");
                                    }}
                                    onInputChange={(event, newInputValue) => {
                                        formik.setFieldValue("puesto_votacion", newInputValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Puesto de Votación"
                                            name="puesto_votacion"
                                            variant="filled"
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.puesto_votacion &&
                                                Boolean(formik.errors.puesto_votacion)
                                            }
                                            helperText={
                                                formik.touched.puesto_votacion && formik.errors.puesto_votacion
                                            }
                                            sx={{
                                                '& .MuiFilledInput-root': {
                                                    borderRadius: "40px",
                                                    backgroundColor: "#efe7da",
                                                },
                                            }}
                                        />
                                    )}
                                />
                            </FormControl>

                            {/* Comuna por Puesto (readonly) */}
                            <FormControl
                                sx={{
                                    m: 1,
                                    width: "150px",
                                    backgroundColor: "#D3D3D3",
                                    borderRadius: "20px",
                                }}
                                variant="filled"
                            >
                                <TextField
                                    label="Comuna por Puesto"
                                    variant="filled"
                                    value={formik.values.comunaPuestoVotacion ?? ""}
                                    InputProps={{ readOnly: true }}
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            borderRadius: "40px",
                                            backgroundColor: "#D3D3D3",
                                        },
                                    }}
                                />
                            </FormControl>

                            {/* Dirección por Puesto (readonly) */}
                            <FormControl
                                sx={{
                                    m: 1,
                                    minWidth: "300px",
                                    backgroundColor: "#D3D3D3",
                                    borderRadius: "20px",
                                }}
                                variant="filled"
                            >
                                <TextField
                                    label="Dirección por Puesto"
                                    variant="filled"
                                    value={formik.values.direccionPuestoVotacion ?? ""}
                                    InputProps={{ readOnly: true }}
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            borderRadius: "40px",
                                            backgroundColor: "#D3D3D3",
                                        },
                                    }}
                                />
                            </FormControl>
                        </Box>
                        <Button
                            type="submit"
                            sx={{
                                padding: "10px 20px",
                                fontSize: "16px",
                                backgroundColor: "#7EA6CF",
                                borderRadius: "30px",
                                border: "0",
                                width: "250px",
                                height: "44px",
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                color: "white",
                                marginTop: '7px',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#5E87B0'
                                }
                            }}
                        >
                            Finalizar Edición
                        </Button>

                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default AdminEditVotante