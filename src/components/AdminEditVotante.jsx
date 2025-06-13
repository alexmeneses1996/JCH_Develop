import { Box, Button, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, MenuItem, Modal, Select, Switch, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import { Edit } from '@mui/icons-material';
import { barriosPorComuna, comunas } from '../helppers/data';
const AdminEditVotante = ({ votante }) => {

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

    const [edad, setEdad] = useState(votante.edad);

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
        width: 640,
        bgcolor: 'background.paper',
        border: '2px solid #efe7da',
        boxShadow: 24,
        borderRadius: 4,
        p: 1,
        margin: '5px'
    };

    const selectedComuna = comuna;
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
                        onSubmit={handleSubmitAdmin}
                    >
                        <IconButton onClick={handleClose} sx={{ position: "absolute", top: 8, left: 8, "&:hover": { color: 'red' } }}>
                            <CancelIcon />
                        </IconButton>

                        <Typography sx={{
                            display: 'flex', alignItems: "center",
                            justifyContent: "center", fontSize: "40px", fontWeight: "bold"
                        }}>Editar Votante</Typography>

                        <Box sx={{ display: 'flex' }}>

                            <FormControl sx={{ m: 1, width: '200px', backgroundColor: "#efe7da", borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Cedula"
                                    id="Cedula"
                                    value={cedula}
                                    onChange={(event) => setCedula(event.target.value)}
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

                            <FormControl sx={{ m: 1, width: '200px', backgroundColor: "#efe7da", borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Nombre"
                                    id="Nombre"
                                    value={nombre}
                                    onChange={(event) => setNombre(event.target.value)}
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


                            <FormControl sx={{ m: 1, width: '200px', backgroundColor: "#efe7da", borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Apellido"
                                    id="Apellido"
                                    value={apellido}
                                    onChange={(event) => setApellido(event.target.value)}
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

                        <Box sx={{ display: 'flex' }}>
                            <FormControl sx={{ m: 1, width: '150px', backgroundColor: "#efe7da", borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Sexo"
                                    id="Sexo"
                                    select
                                    value={sexo}
                                    onChange={(event) => setSexo(event.target.value)}
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

                            <FormControl sx={{ m: 1, width: '70px', backgroundColor: "#efe7da", borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Edad"
                                    id="edad"
                                    value={edad}
                                    onChange={(event) => setEdad(event.target.value)}
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
                                    type='number'
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '130px', backgroundColor: "#efe7da", borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Telefono"
                                    id="Telefono"
                                    value={telefono}
                                    onChange={(event) => setTelefono(event.target.value)}
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
                            <FormControl sx={{ m: 1, width: '240px', backgroundColor: "#efe7da", borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Correo"
                                    id="Correo"
                                    value={correo}
                                    onChange={(event) => setCorreo(event.target.value)}
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

                        <Box sx={{ display: 'flex' }}>
                            <FormControl sx={{ m: 1, width: '200px', backgroundColor: "#efe7da", borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Direccion"
                                    id="Direccion"
                                    value={direccion}
                                    onChange={(event) => setDireccion(event.target.value)}
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

                            <FormControl sx={{ m: 1, width: '200px', backgroundColor: "#efe7da", borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Comuna"
                                    id="Comuna"
                                    select
                                    value={comuna}
                                    onChange={(event) => setComuna(event.target.value)}
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

                            <FormControl sx={{ m: 1, width: '200px', backgroundColor: "#efe7da", borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Barrio"
                                    id="Barrio"
                                    select
                                    value={barrio}
                                    onChange={(event) => setBarrio(event.target.value)}
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
                                {barrios.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                                </TextField>
                            </FormControl>
                        </Box>
                        <FormControl sx={{ m: 1, width: '450px', backgroundColor: "#efe7da", borderRadius: "20px" }} variant="filled">
                            <TextField
                                label="Puesto de Votacion"
                                id="Puesto_votacion"
                                value={puesto_votacion}
                                onChange={(event) => setPuesto_votacion(event.target.value)}
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