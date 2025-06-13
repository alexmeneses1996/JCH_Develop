import { Avatar, Box, Button, Card, Container, Drawer, IconButton, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import PersonIcon from "@mui/icons-material/Person";
//import FormEdition from './FormEdition';
import RegistrosTable from './RegistroTable';
import { supabase } from '../supabase/supabaseConfig';
import { AppContext } from '../context/userContext';
import { retornarUsuarios } from '../helppers/crearUsuario';

const Inicio = () => {

    const [count, setCount] = useState(0)
    const [countUsuarios, setCountUsuarios] = useState(0)
    //const [valor, setValor] = useState(0);
    const valorFinal = 4;
    const incremento = Math.max(1, Math.floor(valorFinal / 20));
    const duracion = 1000; // 1 segundo
    const pasos = valorFinal / incremento;
    const intervalo = duracion / pasos;
    
    const [filtered, setFiltered] = useState([]);
    const [datos, setDatos] = useState(null)
    const [usuarios, setUsuarios] = useState(null)
    const {context, setContext} = useContext(AppContext)

    useEffect(() => {
        const retornarVotantes = async () => {

                if (context.tipo == "User") {
                    const cedula_referido = context.cedula;
                    const { data, error } = await supabase
                        .from("votante")
                        .select("*")
                        .eq("referido", cedula_referido);

                    setDatos(data);
                    setFiltered(data)
                    console.log("Consulta DB. Estoy en sesion Admin")
                }else if(context.tipo == "Admin"){ //Se valida que sea de tipo Admin.
                    const { data, error } = await supabase
                        .from("votante")
                        .select("*")

                    setDatos(data);
                    setFiltered(data);

                    const result = await retornarUsuarios()
                    console.log(result)
                    if (result.success) {
                        setUsuarios(result.data) //Se actualiza la cantidad de usuarios
                        setCountUsuarios(result.data.length)
                    console.log("Consulta DB. Estoy en sesion Admin") }
                }
        };//corregimiento ,, club blanco have retornarVotantes,,,,san rafeal,, llendo santander --- 40 

        retornarVotantes();
    }, []);

/*
    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev + incremento >= valorFinal) {
                    clearInterval(timer);
                    return valorFinal;
                }
                return prev + incremento;
            });
            retornarVotantes()
        }, [intervalo, datos]);

        return () => clearInterval(timer); // Limpieza
    }, []);
*/

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
                backgroundColor: '#1e3a8a',//'rgb( 248, 249, 250)',1e3a8a
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
                    <Box sx={{ display: 'flex' }}>
                        <Card sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#059669', color: 'white', p: 2, borderRadius: 2, minWidth: '160px' }}>
                            <Avatar sx={{ bgcolor: 'white', color: '#4CAF50', mr: 2 }}>
                                <PersonIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle2">VOTANTES</Typography>
                                <Typography variant="h5">{count}</Typography>
                            </Box>
                        </Card>
                        {/*se valida que este en el usuario Admin */}
                        { context.tipo == "Admin" && (<Card sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#059669', color: 'white', p: 2,ml:2, borderRadius: 2, minWidth: '160px' }}>
                            <Avatar sx={{ bgcolor: 'white', color: '#4CAF50', mr: 2 }}>
                                <PersonIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle2">USUARIOS</Typography>
                                <Typography variant="h5">{countUsuarios}</Typography>
                            </Box>
                        </Card> )}                      

                        <Card sx={{
                            display: 'flex', alignItems: 'center', backgroundColor: '#90d8b2', color: '#0b5345', p: 2, borderRadius: 2, marginLeft: '1rem', width: '80%',
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
                    {/*<FormEdition /> */}
                    <RegistrosTable datos={datos} filtered={filtered} setFiltered={setFiltered} />
                    {/* Simulamos contenido largo */}
                    {/*Array.from({ length: 3 }).map((_, i) => (
                        <Typography key={i} color='black'>Contenido línea {i + 1}</Typography>
                    ))*/}
                </Box>
            </Box>
        </Container>
    )
}

export default Inicio