import { Avatar, Box, Button, Card, Container, Drawer, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PersonIcon from "@mui/icons-material/Person";
//import FormEdition from './FormEdition';
import RegistrosTable from './RegistroTable';

const Inicio = () => {

    const [count, setCount] = useState(0)
    //const [valor, setValor] = useState(0);
    const valorFinal = 100;
    const incremento = Math.max(1, Math.floor(valorFinal / 20));
    const duracion = 1000; // 1 segundo
    const pasos = valorFinal / incremento;
    const intervalo = duracion / pasos;

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev + incremento >= valorFinal) {
                    clearInterval(timer);
                    return valorFinal;
                }
                return prev + incremento;
            });
        }, intervalo);

        return () => clearInterval(timer); // Limpieza
    }, []);



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
                    <Box sx={{ display: 'flex' }}>
                        <Card sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#4CAF50', color: 'white', p: 2, borderRadius: 2, minWidth: '160px' }}>
                            <Avatar sx={{ bgcolor: 'white', color: '#4CAF50', mr: 2 }}>
                                <PersonIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle2">CONTACTOS</Typography>
                                <Typography variant="h5">{count}</Typography>
                            </Box>
                        </Card>

                        <Card sx={{
                            display: 'flex', alignItems: 'center', backgroundColor: '#00BCD4', color: 'white', p: 2, borderRadius: 2, marginLeft: '1rem', width: '80%',
                            minHeight: '64px'
                        }}>

                            <Box>
                                <Typography variant="body1">
                                    <strong>YO PUEDO, YO QUIERO, YO VOY A LOGRARLO</strong>
                                    <Typography component="span" sx={{ fontWeight: 300, fontSize: '0.875rem', ml: 1 }}>
                                        - Tony Melendez
                                    </Typography>
                                </Typography>
                            </Box>
                        </Card>

                    </Box>
                    {/*<FormEdition /> */}
                    <RegistrosTable />
                    {/* Simulamos contenido largo */}
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Typography key={i} color='black'>Contenido línea {i + 1}</Typography>
                    ))}
                </Box>
            </Box>
        </Container>
    )
}

export default Inicio