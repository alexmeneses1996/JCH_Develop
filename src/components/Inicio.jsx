import { Avatar, Box, Button, Card, Container, Drawer, FormControlLabel, IconButton, Switch, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import PersonIcon from "@mui/icons-material/Person";
//import FormEdition from './FormEdition';
import RegistrosTable from './RegistroTable';
import { supabase } from '../supabase/supabaseConfig';
import { AppContext } from '../context/userContext';
import { retornarUsuarios } from '../helppers/crearUsuario';
import { retornarTodosLosVotantes, retornarVotantesPorUsuario } from '../helppers/crearVotante';
import { bg_boton } from '../styled/styled';
import RegistroTableUser from './RegistroTableUser';

const Inicio = () => {

    const [count, setCount] = useState(0)
    const [countUsuarios, setCountUsuarios] = useState(0)
    //const [valor, setValor] = useState(0);
    const valorFinal = 4;
    const incremento = Math.max(1, Math.floor(valorFinal / 10));
    const duracion = 1000; // 1 segundo
    const pasos = valorFinal / incremento;
    const intervalo = duracion / pasos;

    const [buscarPorCedula, setBuscarPorCedula] = useState(false);

    const [filtered, setFiltered] = useState([]);
    const [filteredUser, setFilteredUser] = useState([]);
    const [datos, setDatos] = useState(null)
    const [usuarios, setUsuarios] = useState(null)
    const { context, setContext } = useContext(AppContext)

    useEffect(() => {
        const retornarVotantes = async () => {

            if (context.tipo == "User") {
                const cedula_referido = context.cedula;
                const result = await retornarVotantesPorUsuario(cedula_referido)
                if (result.success) {
                    setDatos(result.data);
                    setFiltered(result.data)
                } else alert("Ocurrio un problema al mostrar los datos")

            } else if (context.tipo == "Admin") { //Se valida que sea de tipo Admin.
                const res = await retornarTodosLosVotantes()
                if (res.success) {
                    setDatos(res.data);
                    setFiltered(res.data);

                    const result = await retornarUsuarios()
                    if (result.success) {


                        const datosConConteo = result.data?.map(usuario => {
                        const cantidadVotantes = res.data?.filter(
                            v => v.referido === usuario.cedula
                        ).length;


                        return {
                            ...usuario,
                            cantidadVotantes
                        };
                    });

                        setUsuarios(datosConConteo);
                        //setUsuarios(result.data) //Se actualiza la cantidad de usuarios
                        setCountUsuarios(result.data.length)
                        setFilteredUser(datosConConteo)
                    }

                }

            }
        };//corregimiento ,, club blanco have retornarVotantes,,,,san rafeal,, llendo santander --- 40 

        retornarVotantes();
    }, []);


    useEffect(() => {
        if (!datos || datos.length === 0) return;
        const valorFinal = datos.length; // o el campo que necesitas
        const timer = setInterval(() => {
            setCount((prev) => {
                const next = prev + incremento;

                if (next >= valorFinal) {
                    clearInterval(timer);
                    return valorFinal;
                }
                return next;
            });
        }, intervalo);

        return () => clearInterval(timer);

    }, [datos, incremento, intervalo]);


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



            <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
                {/* //Panel lateral fijo 
                <Box
                    sx={{
                        width: '200px',
                        backgroundColor: 'green',
                        color: 'white',
                        p: 2,
                        flexShrink: 0, // para que no se reduzca
                    }}
                >
                    <Box sx={{ height: '30%' }}>logo</Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Button>Inicio</Button>
                        <Button>Registrar Votantes</Button>
                        <Button>Gráficas</Button>
                    </Box>
                </Box>*/}



                {/* Contenido scrollable */}
                <Box
                    sx={{
                        flexGrow: 1,
                        backgroundColor: 'white',
                        color: 'white',
                        p: 2,
                        overflowY: 'auto',
                    }}

                >
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2,
                        justifyContent: 'left',
                        alignItems: 'stretch',
                        width: '100%',
                    }}>
                        <Card sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#059669', color: 'white', p: 2, borderRadius: 2, minWidth: '160px', maxWidth: "200px", flex: "1 1 240px" }}>
                            <Avatar sx={{ bgcolor: 'white', color: '#4CAF50', mr: 2 }}>
                                <PersonIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle2">CONTACTOS</Typography>
                                <Typography variant="h5">{count}</Typography>
                            </Box>
                        </Card>
                        {/*se valida que este en el usuario Admin */}
                        {context.tipo == "Admin" && (
                            <Card sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#059669', color: 'white', p: 2, borderRadius: 2, minWidth: '160px', flex: "1 1 240px", maxWidth: "200px", }}>
                                <Avatar sx={{ bgcolor: 'white', color: '#4CAF50', mr: 2 }}>
                                    <PersonIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle2">USUARIOS</Typography>
                                    <Typography variant="h5">{countUsuarios}</Typography>
                                </Box>
                            </Card>)}

                        <Card sx={{
                            display: 'flex', alignItems: 'center', backgroundColor: '#90d8b2', color: '#0b5345', p: 2, borderRadius: 2, flex: '1 1 100%',
                            minHeight: '64px'
                        }}>

                            <Box>
                                <Typography variant="body1">
                                    <strong>NO SOMOS UNA GENERACIÓN QUE  ESPERA EL CAMBIO, SOMOS LA QUE LO CONSTRUYE.</strong>
                                    <Typography component="span" sx={{ fontWeight: 300, fontSize: '0.875rem', ml: 1 }}>

                                    </Typography>
                                </Typography>
                            </Box>
                        </Card>

                    </Box>
                    {context.tipo == "Admin" && (
                        <FormControlLabel
                            sx={{ display: 'flex', color: 'black' }}
                            control={
                                <Switch
                                    checked={buscarPorCedula}
                                    onChange={() => setBuscarPorCedula(!buscarPorCedula)}
                                    name="buscarPorCedula"
                                    sx={{ color: bg_boton }}
                                />
                            }
                            label="Mostrar info por referidos"

                        />)}
                    {/*<RegistrosTable datos={datos} filtered={filtered} setFiltered={setFiltered} />*/}
                    {buscarPorCedula ? (<RegistrosTable datos={datos} filtered={filtered} setFiltered={setFiltered} />) :
                        (<RegistroTableUser datos={usuarios} setUsuarios={setUsuarios} filteredUser={filteredUser} setFilteredUser={setFilteredUser} />)}
                </Box>
            </Box>
        </Container>
    )
}

export default Inicio