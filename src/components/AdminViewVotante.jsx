import React, { useState } from 'react'
import { Box, FormControl, IconButton, Modal, TextField, Typography } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import { Visibility } from '@mui/icons-material';
import { colorViewVotante } from '../styled/styled';


const  AdminViewVotante = ({ votante }) => {

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

    const [fecha_de_nacimiento, setFecha_de_nacimiento] = useState(votante.fecha_de_nacimiento);

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


    return (
        <>
            <IconButton><Visibility color="primary" onClick={handleOpen} /></IconButton>
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
                            justifyContent: "center", fontSize: "40px", fontWeight: "bold", color: '#0b5345',
                        }}>Visualizar Votante</Typography>

                        <Box sx={{ display: 'flex' }}>

                            <FormControl sx={{ m: 1, width: '200px',fontWeight: 'bold',backgroundColor:colorViewVotante, borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Cedula"
                                    id="Cedula"
                                    value={cedula}
                                    onChange={(event) => setCedula(event.target.value)}
                                    variant='filled'
                                    InputProps={{ readOnly: true }}
                                    sx={{
                                        borderRadius: "20px",
                                        overflow: "hidden",
                                        fontWeight: 'bold',
                                        '& .MuiFilledInput-root': {
                                            borderRadius: "20px",
                                            color: '#0b5345',
                                            backgroundColor: colorViewVotante 
                                        }
                                    }}
                                />
                            </FormControl>

                            <FormControl sx={{ m: 1, width: '200px', backgroundColor: colorViewVotante, borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Nombre"
                                    id="Nombre"
                                    value={nombre}
                                    onChange={(event) => setNombre(event.target.value)}
                                    variant='filled'
                                    InputProps={{ readOnly: true }}
                                    sx={{
                                        borderRadius: "20px",
                                        overflow: "hidden",
                                        '& .MuiFilledInput-root': {
                                            borderRadius: "20px",
                                            color: '#0b5345',
                                            backgroundColor: colorViewVotante 
                                        }
                                    }}
                                />
                            </FormControl>


                            <FormControl sx={{ m: 1, width: '200px', backgroundColor: colorViewVotante, borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Apellido"
                                    id="Apellido"
                                    value={apellido}
                                    onChange={(event) => setApellido(event.target.value)}
                                    variant='filled'
                                    InputProps={{ readOnly: true }}
                                    sx={{
                                        borderRadius: "20px",
                                        overflow: "hidden",
                                        '& .MuiFilledInput-root': {
                                            borderRadius: "20px",
                                            color: '#0b5345',
                                            backgroundColor: colorViewVotante
                                        }
                                    }}
                                />
                            </FormControl>
                        </Box>

                        <Box sx={{ display: 'flex' }}>
                            <FormControl sx={{ m: 1, width: '110px', backgroundColor: colorViewVotante, borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Sexo"
                                    id="Sexo"
                                    value={sexo}
                                    onChange={(event) => setSexo(event.target.value)}
                                    variant='filled'
                                    InputProps={{ readOnly: true }}
                                    sx={{
                                        borderRadius: "20px",
                                        overflow: "hidden",
                                        '& .MuiFilledInput-root': {
                                            borderRadius: "20px",
                                            color: '#0b5345',
                                            backgroundColor: colorViewVotante
                                        }
                                    }}
                                />
                            </FormControl>

                            <FormControl sx={{ m: 1, width: '130px', backgroundColor: colorViewVotante, borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Fecha de nacimiento"
                                    id="fecha_de_nacimiento"
                                    value={fecha_de_nacimiento}
                                    type='date'
                                    onChange={(event) => setFecha_de_nacimiento(event.target.value)}
                                    variant='filled'
                                    InputProps={{ readOnly: true }}
                                    sx={{
                                        borderRadius: "20px",
                                        overflow: "hidden",
                                        '& .MuiFilledInput-root': {
                                            borderRadius: "20px",
                                            color: '#0b5345',
                                            backgroundColor: colorViewVotante
                                        }
                                    }}

                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '120px', backgroundColor: colorViewVotante, borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Telefono"
                                    id="Telefono"
                                    value={telefono}
                                    onChange={(event) => setTelefono(event.target.value)}
                                    variant='filled'
                                    InputProps={{ readOnly: true }}
                                    sx={{
                                        borderRadius: "20px",
                                        overflow: "hidden",
                                        '& .MuiFilledInput-root': {
                                            borderRadius: "20px",
                                            color: '#0b5345',
                                            backgroundColor: colorViewVotante
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '240px', backgroundColor: colorViewVotante, borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Correo"
                                    id="Correo"
                                    value={correo}
                                    onChange={(event) => setCorreo(event.target.value)}
                                    variant='filled'
                                    InputProps={{ readOnly: true }}
                                    sx={{
                                        borderRadius: "20px",
                                        overflow: "hidden",
                                        '& .MuiFilledInput-root': {
                                            borderRadius: "20px",
                                            color: '#0b5345',
                                            backgroundColor: colorViewVotante
                                        }
                                    }}
                                />
                            </FormControl>
                        </Box>

                        <Box sx={{ display: 'flex' }}>
                            <FormControl sx={{ m: 1, width: '200px', backgroundColor: colorViewVotante, borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Direccion"
                                    id="Direccion"
                                    value={direccion}
                                    onChange={(event) => setDireccion(event.target.value)}
                                    variant='filled'
                                    InputProps={{ readOnly: true }}
                                    sx={{
                                        borderRadius: "20px",
                                        overflow: "hidden",
                                        '& .MuiFilledInput-root': {
                                            borderRadius: "20px",
                                            color: '#0b5345',
                                            backgroundColor: colorViewVotante
                                        }
                                    }}
                                />
                            </FormControl>

                            <FormControl sx={{ m: 1, width: '200px', backgroundColor: colorViewVotante, borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Comuna"
                                    id="Comuna"
                                    value={comuna}
                                    onChange={(event) => setComuna(event.target.value)}
                                    variant='filled'
                                    InputProps={{ readOnly: true }}
                                    sx={{
                                        borderRadius: "20px",
                                        overflow: "hidden",
                                        '& .MuiFilledInput-root': {
                                            borderRadius: "20px",
                                            color: '#0b5345',
                                            backgroundColor: colorViewVotante
                                        }
                                    }} />
                                
                            </FormControl>

                            <FormControl sx={{ m: 1, width: '200px', backgroundColor: colorViewVotante, borderRadius: "20px" }} variant="filled">
                                <TextField
                                    label="Barrio"
                                    id="Barrio"
                                    value={barrio}
                                    onChange={(event) => setBarrio(event.target.value)}
                                    variant='filled'
                                    InputProps={{ readOnly: true }}
                                    sx={{
                                        borderRadius: "20px",
                                        overflow: "hidden",
                                        '& .MuiFilledInput-root': {
                                            borderRadius: "20px",
                                            color: '#0b5345',
                                            backgroundColor: colorViewVotante
                                        }
                                    }}
                                    />
                            </FormControl>
                        </Box>
                        <FormControl sx={{ m: 1, width: '450px', backgroundColor: colorViewVotante, borderRadius: "20px" }} variant="filled">
                            <TextField
                                label="Puesto de Votacion"
                                id="Puesto_votacion"
                                value={puesto_votacion}
                                onChange={(event) => setPuesto_votacion(event.target.value)}
                                variant='filled'
                                InputProps={{ readOnly: true }}
                                sx={{
                                    borderRadius: "20px",
                                    overflow: "hidden",
                                    '& .MuiFilledInput-root': {
                                        borderRadius: "20px",
                                        color: '#0b5345',
                                        backgroundColor: colorViewVotante
                                    }
                                }}
                            />
                        </FormControl>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default AdminViewVotante
